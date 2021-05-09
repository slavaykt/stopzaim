import { Typography } from '@material-ui/core';
import { Cancel, CheckCircle } from '@material-ui/icons';
import React from 'react';
import ExtendableButton from './ExtendableButton';

function RegisterButtons({tabId}) {
  const { data } = useSelector(state => state.app.getTab(tabId));

  const handleRegister = async (isRegister) => {
    if (isRegister) {
      if (!data.Клиент) {
        dispatch(setError(tabId, 'не заполнено поле Клиент!'));
        return
      }
    }
    await handleSubmit(false)
    const method = isRegister ? 'updateOrCreate' : 'delete';
    await contractRegisterHandler(method, [data], 'edit');
    dispatch(refetchTab(sourceTab));
    refetch();
  }
  
  return (
    <>
      <ExtendableButton
        variant="contained"
        startIcon={<CheckCircle color="primary" />}
        onClick={() => handleRegister(1)}
      >
        <Typography variant="body2">Провести</Typography>
      </ExtendableButton>
      {data &&
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

export default RegisterButtons;