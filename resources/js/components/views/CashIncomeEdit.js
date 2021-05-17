import React, { Component, useContext, useEffect, useRef, useState } from 'react';
import useAxios from "axios-hooks";
import EditForm from './EditForm';
import { useDispatch, useSelector } from 'react-redux';
import { changeData, loadData } from '../../redux/actions/actions';
import { TabContext } from '../context';
import { useRegisterHandler } from '../../hooks/register.handlers.hook';
import { Divider, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import StandardEditButtons from './StandardEditButtons';
import ExtendableButton from './ExtendableButton';
import { Print } from '@material-ui/icons';
import { useReactToPrint } from 'react-to-print';
import classNames from 'classnames/bind';
import CashIncomePrintForm from '../printForms/CashIncomePrintForm';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const CashIncomeEdit = () => {

  const dispatch = useDispatch();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const { data, sourceTabId, api: tabApi } = useSelector(state => state.app.getTab(tabId));
  const enumerations = useSelector(state => state.config.enumerations);
  const sourceTab = useSelector(state => state.app.getTab(sourceTabId));
  const [{ data: fetchedData, loading, error: fetchError }, refetch] = useAxios(tabApi, { useCache: false });
  const [saving, setSaving] = useState(false);
  const classes = useStyles();
  const { cashIncomeRegisterHandler } = useRegisterHandler();
  const componentRef = useRef();

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
          return enumerations.cashIncomeTypes;
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
        inputType: 'datetime-local',
        onChangeHandler: async (data, dateString) => {
          const response = await axios.get(`api/cash/orders/income/dateTime/${dateString}`);
          if (response.status === 200) {
            const resData = await response.data;
            dispatch(changeData(tabId, 'Дата', resData));
          }
        }
      },
      {
        type: 'relationship',
        label: 'Клиент',
        key: 'Клиент',
        size: 12,
        api: '/api/clients',
        hideHandler: (data) => {
          return data.ВидОперации === 'Прочее поступление'
        },
        onChangeHandler: (data, client) => {
          console.log(data);
          if (!data.ПринятоОт) {
            dispatch(changeData(tabId, 'ПринятоОт', client.Наименование));
          }
        }
      },
      {
        type: 'input',
        label: 'Принято от',
        key: 'ПринятоОт',
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

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "printWindow",
  });

  return (
    <TabContext.Provider value={{ ...tabContext, sourceTabId }}>
      <div className={classes.buttonGroup}>
        <StandardEditButtons
          tabId={tabId}
          refetchHandler={() => refetch()}
          setSaving={setSaving}
          api="api/cash/orders/income"
          displayRegister={true}
          requiredToRegister={[]}
          registerHandler={cashIncomeRegisterHandler}
        />
        <ExtendableButton
          variant="contained"
          startIcon={<Print color="primary" />}
          onClick={handlePrint}
        >
          <Typography variant="body2">Печать</Typography>
        </ExtendableButton>
      </div>
      {(saving || loading) && <LinearProgress />}
      {data &&
        <EditForm
          layout={layout} />
      }
      <div style={{ display: "none" }}>
        {data &&
          <CashIncomePrintForm ref={componentRef} data={data} />
        }
      </div>
    </TabContext.Provider>
  )

}

export default CashIncomeEdit;