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
import { AddCircle as AddCircleIcon, Cancel, CheckCircle, Delete as DeleteIcon, Done, DoneAll, FileCopy, Refresh } from '@material-ui/icons';
import ConfirmableButton from './ConfirmableButton';
import { Toolbar, makeStyles, Typography } from '@material-ui/core';
import ExtendableButton from './ExtendableButton';
import { useRegisterHandler } from '../../hooks/register.handlers.hook';
import useAxios from 'axios-hooks';
import { green, red } from '@material-ui/core/colors';

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
      label: <DoneAll />,
      dataKey: 'registered',
      width: 50,
      handler: (value) => {
        return value ? <Done style={{ color: green[800] }}/> : ""
      }
    },
    {
      label: '????????',
      dataKey: '????????',
      width: 150,
      handler: localeDate
    },
    {
      label: '??????????',
      dataKey: '??????????',
      width: 150
    },
    {
      label: '???? ????????/????????',
      dataKey: '????????????????????',
      width: 300
    },
    {
      label: '????????????',
      dataKey: '????????????',
      width: 100
    },
    {
      label: '????????????',
      dataKey: '????????????',
      width: 100
    },
    {
      label: '?????????????????? ??????????????',
      dataKey: '????????????????????????????????',
      width: 300
    },
    {
      label: '??????????????',
      dataKey: '??????????????',
      width: 100
    },
  ];

  const docs = [
    {
      name: '?????????????????? ???????????????? ??????????',
      api: '/api/cash/orders/income',
      component: 'CashIncomeEdit'
    },
    {
      name: '?????????????????? ???????????????? ??????????',
      api: '/api/cash/orders/expense',
      component: 'CashExpenseEdit',
    }
  ];

  const doubleClickHandler = ({ rowData }) => {
    const doc = docs.find(el => el.name === rowData.????????????????????????);
    if (!doc) return;
    const tabName = `${doc.name} ???${rowData.??????????} ???? ${localeDate(rowData.????????)}`;
    dispatch(addTab(tabName, `${doc.api}/${String(rowData.id)}`, doc.component, tabId));
  }

  const handleAdd = (doc) => {
    const { name, api, component } = doc;
    dispatch(addTab('?????????? ' + name, api + '/create', component, tabId));
  }

  const handleDelete = () => {
    docs.map(doc => {
      const ids = data.filter(el => el.isActive && el.???????????????????????? === doc.name).map(el => el.id);
      if (ids.length) {
        dispatch(deleteRow(tabId, doc.api, tabApi, ids));
      }
    });
  }

  const handleCopy = () => {
    const rowData = data.find(el => el.isActive);
    if (!rowData) return;
    const doc = docs.find(el => el.name === rowData.????????????????????????);
    if (!doc) return;
    const { name, api, component } = doc;
    dispatch(addTab('?????????? ' + name, `${api}/${String(rowData.id)}/edit?copy=true`, component, tabId));
  }

  const handleRegister = async (isRegister) => {
    const method = isRegister ? 'updateOrCreate' : 'delete';
    const dataToRegister = data.filter(el => el.isActive && el.registered !== isRegister);
    const CashIncomeToRegister = dataToRegister.filter(el => el.???????????????????????? === '?????????????????? ???????????????? ??????????');
    if (CashIncomeToRegister.length) {
      const status = await cashIncomeRegisterHandler(method, CashIncomeToRegister, 'index');
      if (status === 201) {
        handleRefetch();
      }
    }
    const CashExpenseToRegister = dataToRegister.filter(el => el.???????????????????????? === '?????????????????? ???????????????? ??????????');
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
          icon={<AddCircleIcon style={{ color: green[800] }} />}
          buttonLabel="??????????????"
          options={
            docs.map(doc => (
              { label: doc.name, handler: () => handleAdd(doc) }
            ))
          }
        />
        <ConfirmableButton
          title="???? ???????????????"
          handler={handleDelete}
          icon={<DeleteIcon style={{ color: red[800] }} />}
          buttonLabel="??????????????" />
        <ExtendableButton
          variant="contained"
          startIcon={<FileCopy color="primary" />}
          onClick={handleCopy}
        >
          <Typography variant="body2">????????????????????</Typography>
        </ExtendableButton>
        <ExtendableButton
          variant="contained"
          startIcon={<CheckCircle color="primary" />}
          onClick={() => handleRegister(1)}
        >
          <Typography variant="body2">????????????????</Typography>
        </ExtendableButton>
        <ExtendableButton
          variant="contained"
          startIcon={<Cancel color="primary" />}
          onClick={() => handleRegister(0)}
        >
          <Typography variant="body2">???????????????? ????????????????????</Typography>
        </ExtendableButton>
        <ExtendableButton
          variant="contained"
          startIcon={<Refresh color="primary" />}
          onClick={handleRefetch}
        >
          <Typography variant="body2">????????????????</Typography>
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