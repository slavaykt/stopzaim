import React, { useContext, useEffect, useState } from 'react';
import useAxios from "axios-hooks";
import EditForm from './EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeCollectionData, changeData, deleteRecord, loadData, refetchTab, setLayout } from '../../redux/actions/actions';
import { TabContext } from '../context';
import { LinearProgress, makeStyles } from '@material-ui/core';
import StandardEditButtons from './StandardEditButtons';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const CompanyEdit = () => {

  const dispatch = useDispatch();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const enumerations = useSelector(state => state.config.enumerations);
  const [layout, setLayout] = useState([]);
  const { data, sourceTabId, api: tabApi } = useSelector(state => state.app.getTab(tabId));
  const [{ data: fetchedData, loading, error: fetchError }, refetch] = useAxios(tabApi, { useCache: false });
  const [saving, setSaving] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (fetchedData) {
      dispatch(loadData(tabId, fetchedData));
    }
  }, [fetchedData]);

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

  return (
    <TabContext.Provider value={{ ...tabContext, sourceTabId }}>
      <div className={classes.buttonGroup}>
        <StandardEditButtons
          tabId={tabId}
          refetchHandler={() => refetch()}
          setSaving={setSaving}
          api="api/companies"
        />
      </div>
      {(saving || loading) && <LinearProgress />}
      {data &&
        <EditForm
          layout={layout}
          api="api/clients" />
      }

    </TabContext.Provider>
  )
}

export default CompanyEdit;