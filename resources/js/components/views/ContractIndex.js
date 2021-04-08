import React, { useContext } from 'react';
import { useDateFormat } from '../../hooks/date.format.hook';
import { TabContext } from '../context';
import DocumentsIndexTable from './DocumentsIndexTable';

const ContractIndex = () => {

  const { localeDate } = useDateFormat();
  const tabContext = useContext(TabContext);

  const columns = [
    { header: 'Дата', key: 'Дата', width: '100px', function: localeDate },
    { header: 'Номер', key: 'Номер', width: '100px' },
    { header: 'Клиент', key: 'Клиент.Наименование', width: '300px' },
    { header: 'Сумма', key: 'Сумма', width: '100px' },
    { header: 'Комментарий', key: 'Комментарий', width: '300px' },
  ];

  const editInfo = {
    'Договор': {
      api: '/api/contracts',
      component: 'ContractEdit',
      newTabName: 'Новый договор',
      tabNamePrepend: 'Договор'
    }
  }

  return (
    <TabContext.Provider value={{...tabContext, columns, editInfo }}>
      <DocumentsIndexTable />
    </TabContext.Provider>
  );
}

export default ContractIndex;