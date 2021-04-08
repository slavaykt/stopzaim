import React from 'react';
import { TabContext } from '../context';
import EditableTable from './EditableTable';

const ClientAttachmentSectionSetup = () => {

  const columns = [
    { header: '№', key: 'Порядок', width: '50px' },
    { header: 'Наименование', key: 'Наименование', width: '200px' },
    { header: 'Текст для печати', key: 'ТекстДляПечати', width: '300px' },
    { header: 'Текст приложения', key: 'ТекстПриложения', width: '300px' },
    { header: 'Текст отсутствие приложения', key: 'ТекстОтсутствиеПриложения', width: '300px' },
  ];

  return (
    <EditableTable columns={columns} />
  );
}

export default ClientAttachmentSectionSetup;