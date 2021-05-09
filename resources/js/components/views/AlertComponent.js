import React, { useEffect } from 'react';
import MuiAlert from '@material-ui/lab/Alert';
import { Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../../redux/actions/actions';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function AlertComponent({ tabId }) {

  const dispatch = useDispatch();
  const { error } = useSelector(state => state.app.getTab(tabId));

  const handleClearError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(setError(tabId, ""));
  };

  return (
    <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClearError}>
      <Alert onClose={handleClearError} severity="error">
        {error}
      </Alert>
    </Snackbar>
  );
}

export default AlertComponent;