import axios from 'axios';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleRegister } from '../redux/actions/actions';

export const useRegisterHandler = () => {

  const dispatch = useDispatch();

  const cashIncomeRegisterHandler = useCallback(async (method, data, tabType) => {
    const payload = {
      method: method,
      data: data.map(el => {
        const result = [];
        result.push(
          {
            registerName: 'App\\Models\\CashRegister',
            registerable_type: "App\\Models\\CashIncomeOrder",
            registerable_id: el.id,
            startDate: el.Дата,
            data: [
              {
                Дата: el.Дата,
                СуммаПриход: tabType === 'index' ? el.Приход : el.Сумма,
              }
            ]
          }
        );
        if (el.Клиент) {
          result.push(
            {
              registerName: 'App\\Models\\ClientSettlementRegister',
              registerable_type: "App\\Models\\CashIncomeOrder",
              registerable_id: el.id,
              startDate: el.Дата,
              data: [
                {
                  Дата: el.Дата,
                  Клиент: el.Клиент.id,
                  СуммаРасход: tabType === 'index' ? el.Приход : el.Сумма,
                }
              ]
            }
          );
        }
        return result;
      })
    };
    const response = await axios.post('api/register', payload);

    return response.status;
  }, [])

  const cashExpenseRegisterHandler = useCallback(async (method, data, tabType) => {
    const payload = {
      method: method,
      data: data.map(el => {
        const result = [];
        result.push(
          {
            registerName: 'App\\Models\\CashRegister',
            registerable_type: "App\\Models\\CashExpenseOrder",
            registerable_id: el.id,
            startDate: el.Дата,
            data: [
              {
                Дата: el.Дата,
                СуммаРасход: tabType === 'index' ? el.Расход : el.Сумма,
              }
            ]
          }
        );
        return result;
      })
    };
    const response = await axios.post('api/register', payload);

    return response.status;
  }, [])

  const contractRegisterHandler = useCallback(async (method, data, tabType) => {
    const payload = {
      method: method,
      data: data.map(el => {
        const result = [];
        if (!el.Клиент) {
          return result;
        }
        result.push(
          {
            registerName: 'App\\Models\\ClientSettlementRegister',
            registerable_type: "App\\Models\\Contract",
            registerable_id: el.id,
            startDate: el.ГрафикПлатежей.reduce((result, item) => {
              if (result) {
                return item.Дата < result ? item.Дата : result;
              } else {
                return item.Дата;
              }
            }, null),
            data: el.ГрафикПлатежей.map(item => (
              {
                Дата: item.Дата,
                Клиент: el.Клиент.id,
                СуммаПриход: item.Сумма,
              }
            ))
          }
        );
        return result;
      }),
    };
    const response = await axios.post('api/register', payload);

    return response.status;
  }, [])

  return { cashIncomeRegisterHandler, cashExpenseRegisterHandler, contractRegisterHandler }
}