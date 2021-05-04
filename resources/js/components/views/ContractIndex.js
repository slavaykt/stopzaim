import React, { useContext, useEffect } from 'react';
import { useDateFormat } from '../../hooks/date.format.hook';
import { TabContext } from '../context';
import VirtualIndexTable from './VirtualIndexTable';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, deleteRow, loadData } from '../../redux/actions/actions';
import DropDownButton from './DropDownButton';
import { AddCircle as AddCircleIcon, CheckBoxOutlineBlankOutlined, CheckBoxOutlined, Delete as DeleteIcon, FileCopy, LibraryAddCheckOutlined, Cancel, CheckCircle, Refresh } from '@material-ui/icons';
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

const ContractIndex = () => {

  const dispatch = useDispatch();
  const { localeDate } = useDateFormat();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const { data, api: tabApi } = useSelector(state => state.app.getTab(tabId));
  const [{ data: fetchedData, loading, error }, refetch] = useAxios(tabApi, { useCache: false });
  const { contractRegisterHandler, contractUnregisterHandler } = useRegisterHandler();
  const classes = useStyles();

  useEffect(() => {
    if (fetchedData) {
      dispatch(loadData(tabId, fetchedData));
    }
  }, [fetchedData]);

  const columns = [
    {
      label: <LibraryAddCheckOutlined />,
      dataKey: 'registered',
      width: 50,
      handler: (value) => {
        return value ? <CheckBoxOutlined /> : <CheckBoxOutlineBlankOutlined />
      }
    },
    {
      label: 'Дата',
      dataKey: 'Дата',
      width: 100,
      handler: localeDate
    },
    {
      label: 'Номер',
      dataKey: 'Номер',
      width: 100
    },
    {
      label: 'Клиент',
      dataKey: 'Клиент.Наименование',
      width: 300,
    },
    {
      label: 'Сумма',
      dataKey: 'Сумма',
      width: 100
    },
    {
      label: 'Комментарий',
      dataKey: 'Комментарий',
      width: 300
    },
  ];

  const docs = [
    {
      name: 'Договор',
      api: '/api/contracts',
      component: 'ContractEdit',
    }
  ]

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

  const handleRegister = () => {
    data.filter(el => el.isActive && !el.registered).map(rowData => {
      contractRegisterHandler(tabId, rowData, 'index');
    });
  }

  const handleUnRegister = () => {
    data.filter(el => el.isActive && el.registered).map(rowData => {
      contractUnregisterHandler(tabId, rowData, 'index');
    });
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
          onClick={handleRegister}
        >
          <Typography variant="body2">Провести</Typography>
        </ExtendableButton>
        <ExtendableButton
          variant="contained"
          startIcon={<Cancel color="primary" />}
          onClick={handleUnRegister}
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

export default ContractIndex;