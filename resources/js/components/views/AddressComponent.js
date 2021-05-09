import React, { useContext, useState } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import { useAddress } from '../../hooks/address.hook';
import { changeCollectionData, changeData } from '../../redux/actions/actions';
import DialogWrapper from './DialogWrapper';
import { TabContext } from '../context';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';

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

const AddressAutoComplete = (props) => {
  const [inputValue, setInputValue] = useState(props.value ? props.value.viewName : "");
  const { addressSuggestions, loading } = useAddress(inputValue, props.type, props.locations);
  const classes = useStyles();


  const onChange = (e, newValue) => {

    if (props.type === 'house') {
      if (newValue.data.block) {
        props.handleChange('дом', { viewName: newValue.data.house, searchName: newValue.data.house });
        props.handleChange('корпус', newValue.data.block);
      } else {
        const [house, block] = newValue.searchName.split('/');
        props.handleChange('дом', { viewName: house, searchName: newValue.searchName });
        props.handleChange('корпус', block || '');
      }
      props.handleChange('индекс', newValue.data.postal_code || '');
    } else {
      if (newValue === null) { //поле полностью очищено
        props.handleChange(props.valueKey, { viewName: "", searchName: "" })
      } else {
        props.handleChange(props.valueKey, { viewName: newValue.viewName, searchName: newValue.searchName })
      }

    }
  }

  const onInputChange = (e, newInputValue) => {
    setInputValue(newInputValue)
  }

  const defaultProps = {
    options: addressSuggestions,
    getOptionLabel: (option) => option.viewName,
  };

  return (
    <Autocomplete
      {...defaultProps}
      value={props.value}
      onChange={onChange}
      freeSolo
      inputValue={inputValue}
      onInputChange={onInputChange}
      noOptionsText="нет совпадений"
      getOptionSelected={(option, value) => option.searchName === value.searchName}
      renderInput={(params) =>
        <TextField
          {...params}
          label={props.label}
          margin="dense"
          className={classes.textField}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {loading ? <CircularProgress color="primary" size={20} /> : null}
              </>
            ),
          }}
        />
      }
    />
  )
}

const AddressComponent = (props) => {

  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { tabId } = useContext(TabContext);
  const [data, setData] = useState(props.data);

  const handleSubmit = (e) => {
    if (props.collection) {
      dispatch(changeCollectionData(tabId,props.collection,props.index,'Адрес', { ...data }))
      console.log(data);
    } else {
      dispatch(changeData(tabId, 'Адрес', { ...data })); 
    }  
    handleClose();
  }

  const handleChange = (valueKey, newValue) => {
    setData(data => {
      return (
        { ...data, [valueKey]: newValue }
      )
    })
  }

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const fields = [
    { autoComplete: false, key: 'индекс', label: 'Индекс', size: 4 },
    { autoComplete: true, type: 'region', key: 'регион', label: 'Регион', size: 12 },
    { autoComplete: true, type: 'area', key: 'район', label: 'Район', size: 12 },
    { autoComplete: true, type: 'city', key: 'город', label: 'Город', size: 12 },
    { autoComplete: true, type: 'settlement', key: 'населенныйПункт', label: 'Населенный пункт', size: 12 },
    { autoComplete: true, type: 'street', key: 'улица', label: 'Улица', size: 12 },
    { autoComplete: true, type: 'house', key: 'дом', label: 'Дом', size: 4 },
    { autoComplete: false, key: 'корпус', label: 'Корпус', size: 4 },
    { autoComplete: false, key: 'квартира', label: 'Квартира', size: 4 },
  ];

  const getAddressString = () => {
    let addressString = "";
    if (data.индекс) {
      addressString += data.индекс + ", ";
    }
    if (data.регион.viewName) {
      addressString += data.регион.viewName + ", ";
    }
    if (data.район.viewName) {
      addressString += data.район.viewName + ", ";
    }
    if (data.город.viewName) {
      addressString += data.город.viewName + ", ";
    }
    if (data.населенныйПункт.viewName) {
      addressString += data.населенныйПункт.viewName + ", ";
    }
    if (data.улица.viewName) {
      addressString += data.улица.viewName + ", ";
    }
    if (data.дом.viewName) {
      addressString += 'дом ' + data.дом.viewName + ", ";
    }
    if (data.корпус) {
      addressString += 'корп. ' + data.корпус + ", ";
    }
    if (data.квартира) {
      addressString += 'кв. ' + data.квартира + ", ";
    }
    return addressString.substring(0, addressString.length - 2) || 'заполнить';
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Typography className={classes.root}>
        <span className={classes.linkLabel}>Адрес</span>
        <Link href="#" onClick={handleClickOpen}>
          {getAddressString()}
        </Link>
      </Typography>
      {open &&
        <DialogWrapper
          title="Введите адрес"
          handleClose={handleClose}
          buttons={[
            { label: 'Отмена', handler: handleClose, color: 'default' },
            { label: 'Ок', handler: handleSubmit, color: 'primary' },
          ]}
        >
          <form>
            <Grid container spacing={1}>
              {fields.map((field, fieldIndex, arr) => {
                if (field.autoComplete) {
                  const locations = arr.reduce((result, el, i) => {
                    if (el.autoComplete && i < fieldIndex) {
                      return [{ ...result[0], [el.type]: data[el.key].searchName }]
                    } else {
                      return result
                    }
                  }, [{}]);
                  return (
                    <Grid item xs={field.size} key={fieldIndex}>
                      <AddressAutoComplete
                        type={field.type}
                        valueKey={field.key}
                        label={field.label}
                        value={data[field.key].viewName ? data[field.key] : null}
                        handleChange={handleChange}
                        locations={locations}
                      />
                    </Grid>
                  )
                } else {
                  return (
                    <Grid item xs={field.size} key={fieldIndex}>
                      <TextField
                        label={field.label}
                        name={field.key}
                        margin="dense"
                        className={classes.textField}
                        value={data[field.key]}
                        onChange={onChange}
                      />
                    </Grid>
                  )
                }
              }
              )}
            </Grid>
          </form>
        </DialogWrapper>
      }
    </>
  );
}

export default AddressComponent;