import { Typography } from '@material-ui/core';
import { Cancel, CheckCircle, Delete, ExitToApp, Refresh, Save } from '@material-ui/icons';
import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeData, closeTab, deleteRecord, refetchTab, setError } from '../../redux/actions/actions';
import ConfirmableButton from './ConfirmableButton';
import ExtendableButton from './ExtendableButton';

function StandardEditButtons({ tabId, refetchHandler, setSaving, api, displayRegister, requiredToRegister, registerHandler }) {

  const dispatch = useDispatch();
  const { data, sourceTabId } = useSelector(state => state.app.getTab(tabId));
  const sourceTab = useSelector(state => state.app.getTab(sourceTabId));

  const handleSubmit = async (isRefetch) => {
    setSaving(true);
    const res = data.id ? await axios.put(api + '/' + String(data.id), data) : await axios.post(api, data);
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
        refetchHandler();
      }
      setSaving(false);
    }
  }

  const handleDelete = async () => {
    setSaving(true);
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
    await registerHandler(method, [data], 'edit');
    dispatch(refetchTab(sourceTab));
    refetchHandler();
    setSaving(false);
  }

  return (
    <>
      {data &&
        <ExtendableButton
          variant="contained"
          startIcon={<Save color="primary" />}
          onClick={data.registered ? () => handleRegister(1) : () => handleSubmit(true)}
        >
          <Typography variant="body2">Записать</Typography>
        </ExtendableButton>
      }
      <ConfirmableButton
        title="Вы уверены?"
        handler={handleDelete}
        icon={<Delete color="primary" />}
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
    </>
  );
}

export default StandardEditButtons;