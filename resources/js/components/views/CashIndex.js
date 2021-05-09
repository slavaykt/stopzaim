import React, { useContext, useEffect } from 'react';
import LibraryAddCheckOutlinedIcon from '@material-ui/icons/LibraryAddCheckOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import { useDateFormat } from '../../hooks/date.format.hook';
import { TabContext } from '../context';
import VirtualIndexTable from './VirtualIndexTable';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, deleteRow, loadData } from '../../redux/actions/actions';
import DropDownButton from './DropDownButton';
import { AddCircle as AddCircleIcon, Cancel, CheckCircle, Delete as DeleteIcon, FileCopy, Refresh } from '@material-ui/icons';
import ConfirmableButton from './ConfirmableButton';
import { Toolbar, makeStyles, Typography } from '@material-ui/core';
import ExtendableButton from './ExtendableButton';
import { useRegisterHandler } from '../../hooks/register.handlers.hook';
import useAxios from 'axios-hooks';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
    padding: 0
  },
}));

const CashIndex = () => {
  const dispatch = useDispatch();
  const { localeDate } = useDateFormat();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const { data, api: tabApi } = useSelector(state => state.app.getTab(tabId));
  const classes = useStyles();
  const [{ data: fetchedData, loading, error }, refetch] = useAxios(tabApi, { useCache: false });
  const { cashIncomeRegisterHandler, cashExpenseRegisterHandler } = useRegisterHandler();

  useEffect(() => {
    if (fetchedData) {
      dispatch(loadData(tabId, fetchedData));
    }
  }, [fetchedData]);

  const columns = [
    {
      label: <LibraryAddCheckOutlinedIcon />,
      dataKey: 'registered',
      width: 50,
      handler: (value) => {
        return value ? <CheckBoxOutlinedIcon /> : <CheckBoxOutlineBlankOutlinedIcon />
      }
    },
    {
      label: 'Дата',
      dataKey: 'Дата',
      width: 150,
      handler: localeDate
    },
    {
      label: 'Номер',
      dataKey: 'Номер',
      width: 150
    },
    {
      label: 'От кого/кому',
      dataKey: 'ОтКогоКому',
      width: 300
    },
    {
      label: 'Приход',
      dataKey: 'Приход',
      width: 100
    },
    {
      label: 'Расход',
      dataKey: 'Расход',
      width: 100
    },
    {
      label: 'Основание платежа',
      dataKey: 'ОснованиеПлатежа',
      width: 300
    },
    {
      label: 'Остаток',
      dataKey: 'Остаток',
      width: 100
    },
  ];

  const docs = [
    {
      name: 'Приходный кассовый ордер',
      api: '/api/cash/orders/income',
      component: 'CashIncomeEdit'
    },
    {
      name: 'Расходный кассовый ордер',
      api: '/api/cash/orders/expense',
      component: 'CashExpenseEdit',
    }
  ];

  const doubleClickHandler = ({ rowData }) => {
    const doc = docs.find(el => el.name === rowData.ВидДокумента);
    if (!doc) return;
    const tabName = `${doc.name} №${rowData.Номер} от ${localeDate(rowData.Дата)}`;
    dispatch(addTab(tabName, `${doc.api}/${String(rowData.id)}`, doc.component, tabId));
  }

  const handleAdd = (doc) => {
    const { name, api, component } = doc;
    dispatch(addTab('Новый ' + name, api + '/create', component, tabId));
  }

  const handleDelete = () => {
    docs.map(doc => {
      const ids = data.filter(el => el.isActive && el.ВидДокумента === doc.name).map(el => el.id);
      if (ids.length) {
        dispatch(deleteRow(tabId, doc.api, tabApi, ids));
      }
    });
  }

  const handleCopy = () => {
    const rowData = data.find(el => el.isActive);
    if (!rowData) return;
    const doc = docs.find(el => el.name === rowData.ВидДокумента);
    if (!doc) return;
    const { name, api, component } = doc;
    dispatch(addTab('Новый ' + name, `${api}/${String(rowData.id)}/edit?copy=true`, component, tabId));
  }

  const handleRegister = async (isRegister) => {
    const method = isRegister ? 'updateOrCreate' : 'delete';
    const dataToRegister = data.filter(el => el.isActive && el.registered !== isRegister);
    const CashIncomeToRegister = dataToRegister.filter(el => el.ВидДокумента === 'Приходный кассовый ордер');
    if (CashIncomeToRegister.length) {
      const status = await cashIncomeRegisterHandler(method, CashIncomeToRegister, 'index');
      if (status === 201) {
        handleRefetch();
      }
    }
    const CashExpenseToRegister = dataToRegister.filter(el => el.ВидДокумента === 'Расходный кассовый ордер');
    if (CashExpenseToRegister.length) {
      const status = await cashExpenseRegisterHandler(method, CashExpenseToRegister, 'index');
      if (status === 201) {
        handleRefetch();
      }
    }
  }

  const handleRefetch = () => {
    refetch();
  }

  return (
    <>
      <Toolbar
        className={classes.buttonGroup}
        variant="dense">
        <DropDownButton
          icon={<AddCircleIcon color="primary" />}
          buttonLabel="Создать"
          options={
            docs.map(doc => (
              { label: doc.name, handler: () => handleAdd(doc) }
            ))
          }
        />
        <ConfirmableButton
          title="Вы уверены?"
          handler={handleDelete}
          icon={<DeleteIcon color="primary" />}
          buttonLabel="Удалить" />
        <ExtendableButton
          variant="contained"
          startIcon={<FileCopy color="primary" />}
          onClick={handleCopy}
        >
          <Typography variant="body2">Копировать</Typography>
        </ExtendableButton>
        <ExtendableButton
          variant="contained"
          startIcon={<CheckCircle color="primary" />}
          onClick={() => handleRegister(1)}
        >
          <Typography variant="body2">Провести</Typography>
        </ExtendableButton>
        <ExtendableButton
          variant="contained"
          startIcon={<Cancel color="primary" />}
          onClick={() => handleRegister(0)}
        >
          <Typography variant="body2">Отменить проведение</Typography>
        </ExtendableButton>
        <ExtendableButton
          variant="contained"
          startIcon={<Refresh color="primary" />}
          onClick={handleRefetch}
        >
          <Typography variant="body2">Обновить</Typography>
        </ExtendableButton>
      </Toolbar>
      <VirtualIndexTable
        columns={columns}
        loading={loading}
        doubleClickHandler={doubleClickHandler}
      />
    </>
  );
}

export default CashIndex;