import React, { useContext } from 'react';
import { useDateFormat } from '../../hooks/date.format.hook';
import { TabContext } from '../context';
import IndexTable from './IndexTable';

const ClientIndex = () => {

  const { localeDate } = useDateFormat();
  const tabContext = useContext(TabContext);

  const columns = [
    { header: 'Наименование', key: 'Наименование', width: '300px', primary: true },
    { header: 'Фамилия', key: 'Фамилия', width: '100px' },
    { header: 'Имя', key: 'Имя', width: '100px' },
    { header: 'Отчество', key: 'Отчество', width: '100px' },
    { header: 'Пол', key: 'Пол', width: '100px' },
    { header: 'Дата рождения', key: 'ДатаРождения', width: '100px', function: localeDate },
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