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
      fontSize: theme.font.size
    },
    fontSize: theme.font.size
  },
  linkLabel: {
    display: 'inline-block',
    minWidth: 100
  },
  textField: {
    "& .MuiFormLabel-root": {
      fontSize: theme.font.size,
    },
    "& .MuiInputBase-root": {
      fontSize: theme.font.size,
    }
  },
}));

const PassportComponent = (props) => {

  const dispatch = useDispatch();
  const { tabId } = useContext(TabContext);
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(props.data);
  const { localeDate } = useDateFormat();
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    dispatch(changeData(tabId, 'Паспорт', { ...data }));
    handleClose();
  }

  const fields = [
    { key: 'Серия', label: 'серия', type: 'text', size: 6 },
    { key: 'Номер', label: 'номер', type: 'text', size: 6 },
    { key: 'КемВыдано', label: 'кем выдан', type: 'text', size: 12 },
    { key: 'ДатаВыдачи', label: 'дата выдачи', type: 'date', size: 6 },
    { key: 'КодПодразделения', label: 'код подразделения', type: 'text', size: 6 },
  ];

  return (
    <>
      <Typography className={classes.root}>
        <span className={classes.linkLabel}>Паспорт РФ</span>
        <Link href="#" onClick={handleClickOpen}>
          {`серия ${props.data.Серия} номер ${props.data.Номер} выдан ${props.data.КемВыдано} ${localeDate(props.data.ДатаВыдачи)} код подразделения ${props.data.КодПодразделения}`}
        </Link>
      </Typography>
      {open &&
        <DialogWrapper
          title="Паспорт РФ"
          handleClose={handleClose}
          buttons={[
            { label: 'Отмена', handler: handleClose, color: 'default' },
            { label: 'Ок', handler: handleSubmit, color: 'primary' },
          ]}
        >
          <Grid container spacing={1}>
            {fields.map((field, i) =>
              <Grid key={i} item xs={field.size}>
                <TextField
                  label={field.label}
                  margin="dense"
                  name={field.key}
                  type={field.type}
                  className={classes.textField}
                  fullWidth
                  value={data[field.key]}
                  onChange={handleChange}
                />
              </Grid>
            )}
          </Grid>
        </DialogWrapper>
      }
    </>
  );
}

export default PassportComponent;