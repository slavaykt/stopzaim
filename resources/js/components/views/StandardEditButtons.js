import { Typography } from '@material-ui/core';
import { Cancel, CheckCircle, Delete, DeleteForever, ExitToApp, Refresh, Save } from '@material-ui/icons';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeData, closeTab, deleteRecord, refetchTab, setError } from '../../redux/actions/actions';
import { green, red } from '@material-ui/core/colors';
import ConfirmableButton from './ConfirmableButton';
import ExtendableButton from './ExtendableButton';
import DialogWrapper from "./DialogWrapper";
import TableSimple from '../TableSimple';

function StandardEditButtons({ tabId, refetchHandler, setSaving, api, displayRegister, requiredToRegister, registerHandler, deleteTitle = "Вы уверены?" }) {

  const dispatch = useDispatch();
  const { data, sourceTabId } = useSelector(state => state.app.getTab(tabId));
  const sourceTab = useSelector(state => state.app.getTab(sourceTabId));
  const [deleteErrors, setDeleteErrors] = useState([]);

  const dataToSubmit = () => {
    return Object.keys(data).reduce((result, key) => {
      let newValue;
      if (key === "Адрес" || key === 'Паспорт') {
        newValue = data[key];
      } else {
        if (Array.isArray(data[key])) {
          newValue = data[key].map(row => {
            return Object.keys(row).reduce((result, key) => {
              if (key === "Адрес" || key === 'Паспорт') {
                return { ...result, [key]: row[key] }
              } else {
                return { ...result, [key]: typeof row[key] === 'object' && row[key] ? row[key].id : row[key] }
              }
            }, {});
          });
        } else {
          if (typeof data[key] === 'object') {
            newValue = data[key] ? data[key].id : data[key];
          } else {
            newValue = data[key];
          }
        }
      }
      return { ...result, [key]: newValue };
    }, {});
  }

  const handleSubmit = async (isRefetch) => {
    setSaving(true);
    const res = data.id ? await axios.put(api + '/' + String(data.id), dataToSubmit()) : await axios.post(api, dataToSubmit());
    if (res.status === 200 || res.status === 201) {
      const resData = await res.data;
      if (!data.id) {
        dispatch(changeData(tabId, 'id', resData.id));
        if (resData.Номер) {
          dispatch(changeData(tabId, 'Номер', resData.Номер));
        }
      }
      if (isRefetch) {
        dispatch(refetchTab(sourceTab));
      }
      setSaving(false);
    }
  }

  const handleDelete = async () => {
    setSaving(true);
    const response = await axios.delete(api + '/' + data.id)
    if (response.status === 200) {
      const resData = await response.data;
      if (resData.length > 0) {
        setDeleteErrors(resData);
      } else {
        dispatch(closeTab(tabId));
      }
    }
    dispatch(deleteRecord(tabId, api, data.id));
    dispatch(refetchTab(sourceTab));
    setSaving(false);
  }

  const handleCloseTab = () => {
    dispatch(closeTab(tabId));
  }

  const handleRegister = async (isRegister) => {
    setSaving(true);
    if (isRegister) {
      let errorText = "";
      requiredToRegister.map(required => {
        if (!data[required]) {
          errorText += `не заполнено поле ${required}! `;
        }
      })
      if (errorText) {
        dispatch(setError(tabId, errorText));
        return
      }
    }
    await handleSubmit(false)
    const method = isRegister ? 'updateOrCreate' : 'delete';
    const status = await registerHandler(method, [data], 'edit');
    if (status === 201) {
      dispatch(refetchTab(sourceTab));
      dispatch(changeData(tabId, 'registered', isRegister));
    }
    setSaving(false);
  }

  const handleCloseDialog = () => {
    setDeleteErrors([]);
  };

  const deleteErrorsColumns = [
    { label: 'Объект', key: 'object' },
    { label: 'Табличная часть', key: 'collection' },
    { label: 'Свойство', key: 'property' },
  ];

  return (
    <>
      {data &&
        <ExtendableButton
          variant="contained"
          startIcon={<Save style={{ color: green[800] }} />}
          onClick={data.registered ? () => handleRegister(1) : () => handleSubmit(true)}
        >
          <Typography variant="body2">Записать</Typography>
        </ExtendableButton>
      }
      <ConfirmableButton
        title={deleteTitle}
        handler={handleDelete}
        icon={<DeleteForever style={{ color: red[800] }} />}
        buttonLabel="Удалить" />
      <ExtendableButton
        variant="contained"
        startIcon={<ExitToApp color="primary" />}
        onClick={handleCloseTab}
      >
        <Typography variant="body2">Закрыть</Typography>
      </ExtendableButton>
      <ExtendableButton
        variant="contained"
        startIcon={<Refresh color="primary" />}
        onClick={refetchHandler}
      >
        <Typography variant="body2">Обновить</Typography>
      </ExtendableButton>
      {displayRegister &&
        <ExtendableButton
          variant="contained"
          startIcon={<CheckCircle color="primary" />}
          onClick={() => handleRegister(1)}
        >
          <Typography variant="body2">Провести</Typography>
        </ExtendableButton>
      }
      {(displayRegister && data) &&
        <ExtendableButton
          variant="contained"
          startIcon={<Cancel color={data.registered ? 'primary' : 'disabled'} />}
          disabled={!data.registered}
          onClick={() => handleRegister(0)}
        >
          <Typography variant="body2">Отменить проведение</Typography>
        </ExtendableButton>
      }
      {!!deleteErrors.length &&
        <DialogWrapper
          title="Удаление невозможно, имеются ссылки"
          handleClose={handleCloseDialog}
          size="md"
          closeIcon
          buttons={[
            { label: 'ОК', handler: handleCloseDialog, color: 'primary' },
          ]}
        >
          <TableSimple
            columns={deleteErrorsColumns}
            rows={deleteErrors}
          />
        </DialogWrapper>
      }
    </>
  );
}

export default StandardEditButtons;