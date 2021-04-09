import React, { useContext } from 'react';
import { useDateFormat } from '../../hooks/date.format.hook';
import { TabContext } from '../context';
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

const ContractIndex = () => {

  const dispatch = useDispatch();
  const { localeDate } = useDateFormat();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const { data } = useSelector(state => state.app.getTab(tabId));
  const classes = useStyles();

  const columns = [
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

export default ContractIndex;