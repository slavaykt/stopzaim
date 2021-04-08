import React, { useContext } from 'react';
import { TabContext } from '../context';
import IndexTable from './IndexTable';

const CompanyIndex = ({tabIndex}) => {

  const tabContext = useContext(TabContext);
  
  const columns = [
    { header: 'Наименование', key: 'Наименование', width: '300px', primary: true },
    { header: 'ИНН', key: 'ИНН', width: '100px' },
    { header: 'Адрес', key: 'Адрес', width: '300px' },
  ];
  const editInfo = {
    api: '/api/companies',
    component: 'CompanyEdit',
    newTabName: 'Новая компания'
  }

  return (
    <TabContext.Provider value={{...tabContext, columns, editInfo }}>
      <IndexTable columns={columns} editInfo={editInfo} />
    </TabContext.Provider>
  );
}

export default CompanyIndex;