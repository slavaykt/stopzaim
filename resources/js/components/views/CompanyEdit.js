import React, { useContext, useEffect, useState } from 'react';
import useAxios from "axios-hooks";
import EditForm from './EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeCollectionData, setLayout } from '../../redux/actions/actions';
import { TabContext } from '../context';

const CompanyEdit = () => {

  const dispatch = useDispatch();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const { data, sourceTabId } = useSelector(state => state.app.getTab(tabId));
  const enumerations = useSelector(state => state.config.enumerations);
  const [layout, setLayout] = useState([]);

  useEffect(() => {
    setLayout([
      {
        type: 'input',
        label: 'Код',
        key: 'id',
        size: 2,
        inputType: 'text',
        readOnly: true
      },
      {
        type: 'input',
        label: 'Наименование',
        key: 'Наименование',
        size: 10,
        inputType: 'text'
      },
      {
        type: 'input',
        label: 'ИНН',
        key: 'ИНН',
        size: 4,
        inputType: 'text'
      },
      {
        type: 'input',
        label: 'КПП',
        key: 'КПП',
        size: 4,
        inputType: 'text'
      },
      {
        type: 'input',
        label: 'ОГРН',
        key: 'ОГРН',
        size: 4,
        inputType: 'text'
      },
      {
        type: 'modalComponent',
        componentName: 'AddressComponent',
        key: 'Адрес',
        size: 12,
      },
    ])
  }, []);

  const printOptions = [];

  return (
    <TabContext.Provider value={{...tabContext, sourceTabId }}>
      <EditForm
        layout={layout}
        printOptions={printOptions}
        api="api/companies" />
    </TabContext.Provider>
  )
}

export default CompanyEdit;