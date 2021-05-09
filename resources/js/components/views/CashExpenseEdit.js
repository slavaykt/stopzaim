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
import { Cancel, CheckCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const CashExpenseEdit = () => {

  const dispatch = useDispatch();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const { data, sourceTabId, api: tabApi } = useSelector(state => state.app.getTab(tabId));
  const enumerations = useSelector(state => state.config.enumerations);
  const sourceTab = useSelector(state => state.app.getTab(sourceTabId));
  const [{ data: fetchedData, loading, error: fetchError }, refetch] = useAxios(tabApi, { useCache: false });
  const [saving, setSaving] = useState(false);
  const classes = useStyles();
  const { cashExpenseRegisterHandler } = useRegisterHandler();

  useEffect(() => {
    if (fetchedData) {
      dispatch(loadData(tabId, fetchedData));
    }
  }, [fetchedData]);

  const [layout, setLayout] = useState(
    [
      {

        type: 'select',
        label: 'Вид операции',
        key: 'ВидОперации',
        size: 12,
        getOptions: () => {
          return enumerations.cashExpenseTypes;
        },
      },
      {

        type: 'input',
        label: 'Номер',
        key: 'Номер',
        size: 4,
        inputType: 'number',
        readOnly: true
      },
      {
        type: 'input',
        label: 'Дата',
        key: 'Дата',
        size: 4,
        inputType: 'datetime-local'
      },
      {

        type: 'relationship',
        label: 'Клиент',
        key: 'Клиент',
        size: 12,
        api: '/api/clients',
        hideHandler: (data) => {
          return data.ВидОперации === 'Прочий расход';
        }
      },
      {
        type: 'input',
        label: 'Выдано',
        key: 'Выдано',
        size: 12,
        inputType: 'text'
      },
      {
        type: 'input',
        label: 'Сумма',
        key: 'Сумма',
        size: 4,
        inputType: 'number'
      },
      {
        type: 'input',
        label: 'Основание платежа',
        key: 'ОснованиеПлатежа',
        size: 12,
        inputType: 'text'
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

  return (
    <TabContext.Provider value={{ ...tabContext, sourceTabId }}>
      <div className={classes.buttonGroup}>
        <StandardEditButtons
          tabId={tabId}
          refetchHandler={() => refetch()}
          setSaving={setSaving}
          api="api/cash/orders/expense"
          displayRegister={true}
          requiredToRegister={[]}
          registerHandler={cashExpenseRegisterHandler}
        />
      </div>
      {(saving || loading) && <LinearProgress />}
      {data &&
        <EditForm
          layout={layout} />
      }
    </TabContext.Provider>
  )

}

export default CashExpenseEdit;