import React, { useContext, useEffect, useState } from 'react';
import useAxios from "axios-hooks";
import EditForm from './EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeCollectionData, changeData, handleRegister, register, setLayout } from '../../redux/actions/actions';
import { TabContext } from '../context';
import axios from 'axios';

const CashIncomeEdit = () => {

  const dispatch = useDispatch();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const { data, sourceTabId } = useSelector(state => state.app.getTab(tabId));
  const enumerations = useSelector(state => state.config.enumerations);
  const baseApi = '/api/cash/orders/income';

  const [layout, setLayout] = useState(
    [
      {
        type: 'select',
        label: 'Вид операции',
        key: 'ВидОперации',
        size: 12,
        getOptions: () => {
          return enumerations.cashIncomeTypes;
        },
      },
      {
        type: 'input',
        label: 'Номер',
        key: 'Номер',
        size: 4,
        inputType: 'number',
        readOnly: true
      },
      {
        type: 'input',
        label: 'Дата',
        key: 'Дата',
        size: 4,
        inputType: 'datetime-local'
      },
      {
        type: 'relationship',
        label: 'Клиент',
        key: 'Клиент',
        size: 12,
        api: '/api/clients',
        hideHandler: (data) => {
          return data.ВидОперации === 'Прочее поступление'
        },
        onChangeHandler: (data, client) => {
          console.log(data);
          if (!data.ПринятоОт) {
            dispatch(changeData(tabId, 'ПринятоОт', client.Наименование));
          }
        }
      },
      {
        type: 'input',
        label: 'Принято от',
        key: 'ПринятоОт',
        size: 12,
        inputType: 'text'
      },
      {
        type: 'input',
        label: 'Сумма',
        key: 'Сумма',
        size: 4,
        inputType: 'number'
      },
      {
        type: 'input',
        label: 'Основание платежа',
        key: 'ОснованиеПлатежа',
        size: 12,
        inputType: 'text'
      },
      {
        type: 'input',
        label: 'Комментарий',
        key: 'Комментарий',
        size: 12,
        inputType: 'text'
      },
    ]
  );

  const registerHandler = async () => {
    const payloadToCash = {
      method: 'updateOrCreate',
      registerable_type: "App\\Models\\CashIncomeOrder",
      registerable_id: data.id,
      startDate: data.Дата,
      data: [
        {
          Дата: data.Дата,
          СуммаПриход: data.Сумма,
          registerable_type: "App\\Models\\CashIncomeOrder",
          registerable_id: data.id,
        }
      ]
    };
    const responseFromCash = await axios.post('api/cash_register', payloadToCash);

    if (!data.Клиент) {
      if (responseFromCash.status === 201) {
        await dispatch(handleRegister(tabId, baseApi, data, 1));
      }
      return;
    }
    const payloadToClientSettlement = {
      method: 'updateOrCreate',
      registerable_type: "App\\Models\\CashIncomeOrder",
      registerable_id: data.id,
      startDate: data.Дата,
      data: [
        {
          Дата: data.Дата,
          Клиент: data.Клиент.id,
          СуммаРасход: data.Сумма,
          registerable_type: "App\\Models\\CashIncomeOrder",
          registerable_id: data.id,
        }
      ]
    };
    const responseFromClientSettlement = await axios.post('api/client_settlement_register', payloadToClientSettlement);
    if (responseFromCash.status === 201 && responseFromClientSettlement.status === 201) {
      await dispatch(handleRegister(tabId, baseApi, data, 1));
    }
  }

  const unRegisterHandler = async () => {
    const payloadToCash = {
      method: 'delete',
      registerable_type: "App\\Models\\CashIncomeOrder",
      registerable_id: data.id,
      startDate: data.Дата,
      data: [
        {
          Дата: data.Дата,
          СуммаПриход: data.Сумма,
          registerable_type: "App\\Models\\CashIncomeOrder",
          registerable_id: data.id,
        }
      ]
    };
    const responseFromCash = await axios.post('api/cash_register', payloadToCash);
    if (!data.Клиент) {
      if (responseFromCash.status === 201) {
        await dispatch(handleRegister(tabId, baseApi, data, 1));
      }
      return;
    }
    const payloadToClientSettlement = {
      method: 'delete',
      registerable_type: "App\\Models\\CashIncomeOrder",
      registerable_id: data.id,
      startDate: data.Дата,
      data: [
        {
          Дата: data.Дата,
          Клиент: data.Клиент.id,
          СуммаРасход: data.Сумма,
          registerable_type: "App\\Models\\CashIncomeOrder",
          registerable_id: data.id,
        }
      ]
    };
    const responseFromClientSettlement = await axios.post('api/client_settlement_register', payloadToClientSettlement);
    if (responseFromCash.status === 201 && responseFromClientSettlement.status === 201) {
      await dispatch(handleRegister(tabId, baseApi, data, 0));
    }
  }

  const printOptions = [];

  return (
    <TabContext.Provider value={{ ...tabContext, sourceTabId }}>
      <EditForm
        layout={layout}
        printOptions={printOptions}
        registerHandler={registerHandler}
        unRegisterHandler={unRegisterHandler}
        api={baseApi} />
    </TabContext.Provider>
  )

}

export default CashIncomeEdit;