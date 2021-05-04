import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleRegister } from '../redux/actions/actions';

export const useRegisterHandler = () => {

  const dispatch = useDispatch();

  const cashIncomeRegisterHandler = useCallback(async (tabId, data, tabType) => {
    const baseApi = '/api/cash/orders/income';
    const payloadToCash = {
      method: 'updateOrCreate',
      registerable_type: "App\\Models\\CashIncomeOrder",
      registerable_id: data.id,
      startDate: data.Дата,
      data: [
        {
          Дата: data.Дата,
          СуммаПриход: tabType === 'index' ? data.Приход : data.Сумма,
          registerable_type: "App\\Models\\CashIncomeOrder",
          registerable_id: data.id,
        }
      ]
    };
    const responseFromCash = await axios.post('api/cash_register', payloadToCash);

    if (!data.Клиент) {
      if (responseFromCash.status === 201) {
        await dispatch(handleRegister(tabId, baseApi, data, tabType, 1));
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
          СуммаРасход: tabType === 'index' ? data.Приход : data.Сумма,
          registerable_type: "App\\Models\\CashIncomeOrder",
          registerable_id: data.id,
        }
      ]
    };
    const responseFromClientSettlement = await axios.post('api/client_settlement_register', payloadToClientSettlement);
    if (responseFromCash.status === 201 && responseFromClientSettlement.status === 201) {
      await dispatch(handleRegister(tabId, baseApi, data, tabType, 1));
    }
  }, [])

  const cashIncomeUnregisterHandler = useCallback(async (tabId, data, tabType) => {
    const baseApi = '/api/cash/orders/income';
    const payloadToCash = {
      method: 'delete',
      registerable_type: "App\\Models\\CashIncomeOrder",
      registerable_id: data.id,
      startDate: data.Дата,
      data: [
        {
          Дата: data.Дата,
          СуммаПриход: tabType === 'index' ? data.Приход : data.Сумма,
          registerable_type: "App\\Models\\CashIncomeOrder",
          registerable_id: data.id,
        }
      ]
    };
    const responseFromCash = await axios.post('api/cash_register', payloadToCash);
    if (!data.Клиент) {
      if (responseFromCash.status === 201) {
        await dispatch(handleRegister(tabId, baseApi, data, tabType, 1));
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
          СуммаРасход: tabType === 'index' ? data.Приход : data.Сумма,
          registerable_type: "App\\Models\\CashIncomeOrder",
          registerable_id: data.id,
        }
      ]
    };
    const responseFromClientSettlement = await axios.post('api/client_settlement_register', payloadToClientSettlement);
    if (responseFromCash.status === 201 && responseFromClientSettlement.status === 201) {
      await dispatch(handleRegister(tabId, baseApi, data, tabType, 0));
    }
  }, [])

  const cashExpenseRegisterHandler = useCallback(async (tabId, data, tabType) => {
    const baseApi = '/api/cash/orders/expense';
    const payload = {
      method: 'updateOrCreate',
      registerable_type: "App\\Models\\CashExpenseOrder",
      registerable_id: data.id,
      startDate: data.Дата,
      data: [
        {
          Дата: data.Дата,
          СуммаРасход: tabType === 'index' ? data.Расход : data.Сумма,
          registerable_type: "App\\Models\\CashExpenseOrder",
          registerable_id: data.id,
        }
      ]
    };
    const res = await axios.post('api/cash_register', payload);
    if (res.status === 201) {
      await dispatch(handleRegister(tabId, baseApi, data, tabType, 1));
    }
  }, [])

  const cashExpenseUnregisterHandler = useCallback(async (tabId, data, tabType) => {
    const baseApi = '/api/cash/orders/expense';
    const payload = {
      method: 'delete',
      registerable_type: "App\\Models\\CashExpenseOrder",
      registerable_id: data.id,
      startDate: data.Дата,
      data: [
        {
          Дата: data.Дата,
          СуммаРасход: tabType === 'index' ? data.Расход : data.Сумма,
          registerable_type: "App\\Models\\CashExpenseOrder",
          registerable_id: data.id,
        }
      ]
    };
    const res = await axios.post('api/cash_register', payload);
    if (res.status === 201) {
      await dispatch(handleRegister(tabId, baseApi, data, tabType, 0));
    }
  }, [])

  const contractRegisterHandler = useCallback(async (tabId, data, tabType) => {
    const baseApi = '/api/contracts';
    if (!data.Клиент) return;
    const payload = {
      method: 'updateOrCreate',
      registerable_type: "App\\Models\\Contract",
      registerable_id: data.id,
      startDate: data.ГрафикПлатежей.reduce((result, el) => {
        if (result) {
          return el.Дата < result ? el.Дата : result;
        } else {
          return el.Дата;
        }
      }, null),
      data: data.ГрафикПлатежей.map(el => (
        {
          Дата: el.Дата,
          Клиент: data.Клиент.id,
          СуммаПриход: el.Сумма,
          registerable_type: "App\\Models\\Contract",
          registerable_id: data.id,
        }
      ))
    };
    const res = await axios.post('api/client_settlement_register', payload);
    if (res.status === 201) {
      await dispatch(handleRegister(tabId, baseApi, data, tabType, 1));
    }
  }, [])

  const contractUnregisterHandler = useCallback(async (tabId, data, tabType) => {
    const baseApi = '/api/contracts';
    const payload = {
      method: 'delete',
      registerable_type: "App\\Models\\Contract",
      registerable_id: data.id,
      startDate: data.ГрафикПлатежей.reduce((result, el) => {
        if (result) {
          return el.Дата < result ? el.Дата : result;
        } else {
          return el.Дата;
        }
      }, null),
      data: data.ГрафикПлатежей.map(el => (
        {
          Дата: el.Дата,
          Клиент: data.Клиент.id,
          СуммаПриход: el.Сумма,
          registerable_type: "App\\Models\\Contract",
          registerable_id: data.id,
        }
      ))
    }
    const res = await axios.post('api/client_settlement_register', payload);
    if (res.status === 201) {
      await dispatch(handleRegister(tabId, baseApi, data, tabType, 0));
    }
  }, [])

  return { cashIncomeRegisterHandler, cashIncomeUnregisterHandler, cashExpenseRegisterHandler, cashExpenseUnregisterHandler, contractRegisterHandler, contractUnregisterHandler }
}