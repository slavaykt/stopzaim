import React, { useContext } from 'react';
import { useDateFormat } from '../../hooks/date.format.hook';
import { TabContext } from '../context';
import DocumentsIndexTable from './DocumentsIndexTable';

const CashExpenseindex = () => {

  const { localeDate } = useDateFormat();
  const tabContext = useContext(TabContext);

  const columns = [
    { header: 'Дата', key: 'Дата', width: '100px', function: localeDate },
    { header: 'Номер', key: 'Номер', width: '100px' },
    { header: 'Выдано', key: 'Выдано', width: '300px' },
    { header: 'Сумма', key: 'Сумма', width: '100px' },
    { header: 'Основание платежа', key: 'ОснованиеПлатежа', width: '300px' },
  ];

  const editInfo = {
    'Расходный кассовый ордер': {
      api: '/api/cash/orders/expense',
      component: 'CashExpenseEdit',
      newTabName: 'Новый расходный касовый ордер',
      tabNamePrepend: 'Расходный кассовый ордер'
    }
  }

  return (
    <TabContext.Provider value={{...tabContext, columns, editInfo }}>
      <DocumentsIndexTable />
    </TabContext.Provider>
  );
}

export default CashExpenseindex;