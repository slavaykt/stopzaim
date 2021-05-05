import React, { useContext } from 'react';
import { useDateFormat } from '../../hooks/date.format.hook';
import { TabContext } from '../context';
import IndexTable from './IndexTable';

const ClientIndex = () => {

  const { localeDate } = useDateFormat();
  const tabContext = useContext(TabContext);

  const columns = [
    { header: 'Наименование', key: 'Наименование', width: '300px', primary: true },
  ];

  const editInfo = {
    api: '/api/clients',
    component: 'ClientEdit',
    newTabName: 'Новый клиент',
  }

  return (
    <TabContext.Provider value={{...tabContext, columns, editInfo }}>
      <IndexTable />
    </TabContext.Provider>
  );
}

export default ClientIndex;