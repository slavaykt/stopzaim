import React, { useContext, useState, Children } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Draggable from 'react-draggable';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  noFocus: {
    '&:focus ': {
      outline: 'none'
    },
  },
  title: {
    cursor: 'move'
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
}));

const PaperComponent = (props) => {
  return (
    <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
      <Paper {...props} />
    </Draggable>
  );
}

const DialogWrapper = ({ title, children, buttons, handleClose, disableBackdropClick = true, closeIcon = false, size = "sm" }) => {

  const classes = useStyles();

  return (
    <Dialog
      open={true}
      onClose={handleClose}
      disableBackdropClick={disableBackdropClick}
      PaperComponent={PaperComponent}
      maxWidth={size}
      fullWidth
    >
      <DialogTitle
        id="draggable-dialog-title"
        className={classes.title}>
        {title}
        {closeIcon &&
          <IconButton className={classes.closeButton} onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        }
      </DialogTitle>
      <DialogContent>
        {children}
      </DialogContent>
      <DialogActions>
        {buttons.map((button, i) =>
          <Button
            key={i}
            onClick={button.handler}
            color={button.color}
            className={classes.noFocus}>
            {button.label}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DialogWrapper;