import React, { useContext, useEffect, useState } from 'react';
import useAxios from "axios-hooks";
import EditForm from './EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeCollectionData, changeData, handleRegister, setLayout } from '../../redux/actions/actions';
import { TabContext } from '../context';
import axios from 'axios';
import { useRegisterHandler } from '../../hooks/register.handlers.hook';


const CashExpenseEdit = () => {

  const dispatch = useDispatch();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const { data, sourceTabId } = useSelector(state => state.app.getTab(tabId));
  const enumerations = useSelector(state => state.config.enumerations);
  const baseApi = '/api/cash/orders/expense';
  const { cashExpenseRegisterHandler } = useRegisterHandler();
  const [layout, setLayout] = useState(
    [
      {

        type: 'select',
        label: 'Вид операции',
        key: 'ВидОперации',
        size: 12,
        getOptions: () => {
          return enumerations.cashExpenseTypes;
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
          return data.ВидОперации === 'Прочий расход';
        }
      },
      {
        type: 'input',
        label: 'Выдано',
        key: 'Выдано',
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

  const printOptions = [];

  return (
    <TabContext.Provider value={{ ...tabContext, sourceTabId }}>
      <EditForm
        layout={layout}
        printOptions={printOptions}
        registerHandler={cashExpenseRegisterHandler}
        api={baseApi} />
    </TabContext.Provider>
  )

}

export default CashExpenseEdit;