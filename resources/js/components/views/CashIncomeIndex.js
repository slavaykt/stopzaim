import React, { useContext } from 'react';
import { useDateFormat } from '../../hooks/date.format.hook';
import { TabContext } from '../context';
import DocumentsIndexTable from './DocumentsIndexTable';

const CashIncomeIndex = () => {

  const { localeDate } = useDateFormat();
  const tabContext = useContext(TabContext);

  const columns = [
    { header: 'Дата', key: 'Дата', width: '100px', function: localeDate },
    { header: 'Номер', key: 'Номер', width: '100px' },
    { header: 'Принято от', key: 'ПринятоОт', width: '300px' },
    { header: 'Сумма', key: 'Сумма', width: '100px' },
    { header: 'Основание платежа', key: 'ОснованиеПлатежа', width: '300px' },
  ];

  const editInfo = {
    'Приходный кассовый ордер': {
      api: '/api/cash/orders/income',
      component: 'CashIncomeEdit',
      newTabName: 'Новый приходный касовый ордер',
      tabNamePrepend: 'Приходный кассовый ордер'
    }
  }

  return (
    <TabContext.Provider value={{...tabContext, columns, editInfo }}>
      <DocumentsIndexTable />
    </TabContext.Provider>
  );
}

export default CashIncomeIndex;