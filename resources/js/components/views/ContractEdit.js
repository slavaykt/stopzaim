import React, { useContext, useEffect, useState } from 'react';
import useAxios from "axios-hooks";
import EditForm from './EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeData, deleteRecord, loadData, refetchTab, setError } from '../../redux/actions/actions';
import { TabContext } from '../context';
import axios from 'axios';
import { useRegisterHandler } from '../../hooks/register.handlers.hook';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import StandardEditButtons from './StandardEditButtons';
import ExtendableButton from './ExtendableButton';
import { Cancel, CheckCircle, Print } from '@material-ui/icons';
import DropDownButton from './DropDownButton';
import PrintButton from './PrintButton';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const ContractEdit = () => {

  const dispatch = useDispatch();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const { data, sourceTabId, api: tabApi } = useSelector(state => state.app.getTab(tabId));
  const enumerations = useSelector(state => state.config.enumerations);
  const sourceTab = useSelector(state => state.app.getTab(sourceTabId));
  const [{ data: fetchedData, loading, error: fetchError }, refetch] = useAxios(tabApi, { useCache: false });
  const [saving, setSaving] = useState(false);
  const classes = useStyles();
  const { contractRegisterHandler } = useRegisterHandler();

  useEffect(() => {
    if (fetchedData) {
      dispatch(loadData(tabId, fetchedData));
    }
  }, [fetchedData]);

  console.log(data);

  const [layout, setLayout] = useState(
    [
      {
        type: 'input',
        label: 'Номер',
        key: 'Номер',
        size: 6,
        inputType: 'text',
        readOnly: true
      },
      {
        type: 'input',
        label: 'Дата',
        key: 'Дата',
        size: 6,
        inputType: 'datetime-local'
      },
      {

        type: 'relationship',
        label: 'Клиент',
        key: 'Клиент',
        size: 8,
        api: '/api/clients',
      },
      {
        type: 'input',
        label: 'Сумма',
        key: 'Сумма',
        size: 4,
        inputType: 'number'
      },
      {
        type: 'tableComponent',
        collection: 'ГрафикПлатежей',
        size: 12,
        columns: [
          {
            header: 'Дата',
            key: 'Дата',
            type: 'date',
            width: '100px'
          },
          {
            header: 'Сумма',
            key: 'Сумма',
            type: 'number',
            width: '100px',
            onChangeHandler: (data, rowIndex, value) => {
              const total = data.ГрафикПлатежей.reduce((prev, el) => {
                return prev + el.Сумма;
              }, 0);
              dispatch(changeData(tabId, 'Сумма', total));
            }
          },
        ]
      },
      {
        type: 'input',
        label: 'Комментарий',
        key: 'Комментарий',
        size: 12,
        inputType: 'text'
      },
    ]
  );

  const printOptions =
    !data
      ?
      []
      :
      [
        { label: 'Договор', url: `/print/contract/${data.id}` },
      ];

  return (
    <TabContext.Provider value={{ ...tabContext, sourceTabId }}>
      <div className={classes.buttonGroup}>
        <StandardEditButtons
          tabId={tabId}
          refetchHandler={() => refetch()}
          setSaving={setSaving}
          api="api/contracts"
          displayRegister={true}
          requiredToRegister={['Клиент']}
          registerHandler={contractRegisterHandler}
        />
        <PrintButton options={printOptions} />
      </div>
      {(saving || loading) && <LinearProgress />}
      {data &&
        <EditForm
          layout={layout} />
      }
    </TabContext.Provider>
  )

}

export default ContractEdit;