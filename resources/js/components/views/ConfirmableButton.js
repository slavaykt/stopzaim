import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import DialogWrapper from "./DialogWrapper";
import ExtendableButton from "./ExtendableButton";

const ConfirmableButton = (props) => {

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    props.handler();
    handleClose();
  }

  return (
    <>
      <ExtendableButton
        variant="contained"
        startIcon={props.icon}
        onClick={handleClickOpen}>
        <Typography variant="body2">{props.buttonLabel}</Typography>
      </ExtendableButton>
      {open &&
        <DialogWrapper
          title={props.title}
          handleClose={handleClose}
          buttons={[
            { label: 'Нет', handler: handleClose, color: 'default' },
            { label: 'Да', handler: handleConfirm, color: 'primary' },
          ]}
        />
      }
    </>

  )
}

export default ConfirmableButton;