import React, { useContext } from 'react';
import LibraryAddCheckOutlinedIcon from '@material-ui/icons/LibraryAddCheckOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import { useDateFormat } from '../../hooks/date.format.hook';
import { TabContext } from '../context';
import DocumentsIndexTable from './DocumentsIndexTable';

const CashIndex = () => {

  const { localeDate } = useDateFormat();
  const tabContext = useContext(TabContext);

  const columns = [
    {
      header: <LibraryAddCheckOutlinedIcon />, key: 'registered', width: '50px', function: (value) => {
        return value ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />
      }
    },
    { header: 'Дата', key: 'Дата', width: '100px', function: localeDate },
    { header: 'Номер', key: 'Номер', width: '100px' },
    { header: 'От кого/кому', key: 'ОтКогоКому', width: '300px' },
    { header: 'Приход', key: 'Приход', width: '100px' },
    { header: 'Расход', key: 'Расход', width: '100px' },
    { header: 'Основание платежа', key: 'ОснованиеПлатежа', width: '300px' },
    { header: 'Остаток', key: 'Остаток', width: '100px' },
  ];

  const editInfo = {
    'Приходный кассовый ордер': {
      api: '/api/cash/orders/income',
      component: 'CashIncomeEdit',
      newTabName: 'Новый приходный касовый ордер',
      tabNamePrepend: 'Приходный кассовый ордер'
    },
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

export default CashIndex;