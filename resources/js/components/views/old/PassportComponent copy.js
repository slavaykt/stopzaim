import React, { useContext, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDateFormat } from '../../hooks/date.format.hook';
import { useDispatch } from 'react-redux';
import { changeData } from '../../redux/actions/actions';
import { TabContext } from '../context';
import DialogWrapper from './DialogWrapper';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  linkLabel: {
    display: 'inline-block',
    minWidth: 100
  }
}));

const PassportDialog = (props) => {

  const dispatch = useDispatch();
  const { tabIndex } = useContext(TabContext);
  const [data, setData] = useState(props.data);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    dispatch(changeData(tabIndex, 'Паспорт', { ...data }));
    props.handleClose();
  }

  return (
    <DialogWrapper
      title="Паспорт РФ"
      handleClose={props.handleClose}
      handleSubmit={handleSubmit}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            label="серия"
            margin="dense"
            name="Серия"
            type="text"
            fullWidth
            value={data.Серия}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="номер"
            margin="dense"
            name="Номер"
            type="text"
            fullWidth
            value={data.Номер}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="кем выдан"
            margin="dense"
            name="КемВыдано"
            type="text"
            fullWidth
            value={data.КемВыдано}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="дата выдачи"
            margin="dense"
            name="ДатаВыдачи"
            type="date"
            fullWidth
            value={data.ДатаВыдачи}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="код подразделения"
            margin="dense"
            name="КодПодразделения"
            type="text"
            fullWidth
            value={data.КодПодразделения}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </DialogWrapper>
  );
}

const PassportComponent = ({data}) => {

  const [open, setOpen] = useState(false);
  const { localeDate } = useDateFormat();
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Typography className={classes.root}>
        <span className={classes.linkLabel}>Паспорт РФ</span>
        <Link href="#" onClick={handleClickOpen}>
          {`серия ${data.Серия} номер ${data.Номер} выдан ${data.КемВыдано} ${localeDate(data.ДатаВыдачи)} код подразделения ${data.КодПодразделения}`}
        </Link>
      </Typography>
      {open && <PassportDialog data={data} handleClose={handleClose} />}
    </>
  );
}

export default PassportComponent;