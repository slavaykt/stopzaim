import React, { useContext } from 'react';
import LibraryAddCheckOutlinedIcon from '@material-ui/icons/LibraryAddCheckOutlined';
import CheckBoxOutlinedIcon from '@material-ui/icons/CheckBoxOutlined';
import CheckBoxOutlineBlankOutlinedIcon from '@material-ui/icons/CheckBoxOutlineBlankOutlined';
import { useDateFormat } from '../../hooks/date.format.hook';
import { TabContext } from '../context';
import DocumentsIndexTable from './DocumentsIndexTable';
import VirtualIndexTable from './VirtualIndexTable';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, deleteRow } from '../../redux/actions/actions';
import DropDownButton from './DropDownButton';
import { AddCircle as AddCircleIcon, Delete as DeleteIcon } from '@material-ui/icons';
import ConfirmableButton from './ConfirmableButton';
import { Toolbar, makeStyles } from '@material-ui/core';

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
  const { data } = useSelector(state => state.app.getTab(tabId));
  const classes = useStyles();

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
        dispatch(deleteRow(tabId, doc.api, '/api/cash', ids));
      }
    });
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
      </Toolbar>
      <VirtualIndexTable
        columns={columns}
        doubleClickHandler={doubleClickHandler}
      />
    </>
  );
}

export default CashIndex;