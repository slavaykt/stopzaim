import React, { useContext, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useDispatch, useSelector } from 'react-redux';
import { TabContext } from '../context';
import { addCollectionRow, changeCollectionData, deleteCollectionRow, insertCollectionRow } from '../../redux/actions/actions';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import views from '../views/views';
import ExtendableButton from './ExtendableButton';
import { Delete, FileCopy } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  fields: {
    '& > *': {
      fontSize: theme.font.size,
    },
  },
  accordion: {
    root: {
      backgroundColor: 'yellow',
    },
  },
}));

const Accordion = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
  },
})(MuiAccordion);

const EditCollectionAccordion = ({ collection, header, fields }) => {
  const dispatch = useDispatch();
  const { tabId } = useContext(TabContext);
  const data = useSelector(state => state.app.getTab(tabId).data[collection]);
  const schema = useSelector(state => state.app.getTab(tabId).data.schema[collection]);
  const classes = useStyles();

  const handleAddRow = () => {
    dispatch(addCollectionRow(tabId, collection, { ...schema }));
  }

  const renderModalComponent = (componentName, rowIndex, modalData) => {
    const Component = views[componentName];
    return (
      <div className="py-1">
        <Component data={modalData} collection={collection} index={rowIndex} />
      </div>
    )
  }

  const handleChange = (rowIndex, onChangeHandler) => (e) => {
    console.log(e.target.name, e.target.value);
    dispatch(changeCollectionData(tabId, collection, rowIndex, e.target.name, e.target.value));
    if (onChangeHandler) {
      onChangeHandler(rowIndex, e.target.value);
    }
  }

  const handleDeleteRow = (rowIndex) => {
    dispatch(deleteCollectionRow(tabId, collection, rowIndex));
  }

  const handleCopy = (rowIndex) => {
    dispatch(insertCollectionRow(tabId, collection, { ...data[rowIndex], id: null }, rowIndex));
  }

  return (
    <div className={classes.root}>
      <div className={classes.buttonGroup}>
        <ExtendableButton
          variant="contained"
          startIcon={<AddCircleIcon color="primary" />}
          onClick={handleAddRow}
        >
          <Typography variant="body2">Добавить</Typography>
        </ExtendableButton>
      </div>
      {data.map((row, rowIndex) =>
        <Accordion key={`${collection}+${rowIndex}`} className={classes.accordion}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography className={classes.heading}>{row[header] || 'Новый объект'}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={1} className={classes.fields}>
              {fields.map((field, fieldIndex) =>
                <Grid key={fieldIndex} item xs={field.size}>
                  {
                    field.type === 'input' &&
                    <TextField
                      label={field.label}
                      margin="dense"
                      name={field.key}
                      type={field.inputType}
                      size="small"
                      fullWidth
                      onBlur={handleChange(rowIndex, field.onChangeHandler)}
                      defaultValue={row[field.key] || ''}
                    />
                  }
                  {
                    field.type === 'boolean' &&
                    <FormControlLabel
                      control={<Checkbox checked={!!row[field.key]} color="primary" onChange={handleChange(rowIndex, field.onChangeHandler)} name={field.key} />}
                      label={field.label}
                    />
                  }
                  {
                    field.type === 'select' &&
                    <FormControl
                      fullWidth
                      className={classes.formControl}
                    >
                      <InputLabel
                        id={"select" + fieldIndex}
                      >
                        {field.label}
                      </InputLabel>
                      <Select
                        value={row[field.key]}
                        name={field.key}
                        className={classes.smallFont}
                        labelId={"select" + fieldIndex}
                        onChange={handleChange(rowIndex, field.onChangeHandler)}
                      >
                        {
                          field.getOptions().map((option, i) =>
                            <MenuItem
                              key={i}
                              value={option.value}>
                              {option.view}
                            </MenuItem>
                          )
                        }
                      </Select>
                    </FormControl>
                  }
                  {
                    field.type === 'modalComponent' &&
                    renderModalComponent(field.componentName, rowIndex, row[field.key] || {})
                  }
                </Grid>
              )}
              <Grid item xs={12}>
                <div className={classes.buttonGroup}>
                  <ExtendableButton
                    variant="contained"
                    startIcon={<Delete color="primary" />}
                    onClick={() => handleDeleteRow(rowIndex)}
                  >
                    <Typography variant="body2">Удалить</Typography>
                  </ExtendableButton>
                  <ExtendableButton
                    variant="contained"
                    startIcon={<FileCopy color="primary" />}
                    onClick={() => handleCopy(rowIndex)}
                  >
                    <Typography variant="body2">Скопировать</Typography>
                  </ExtendableButton>
                </div>
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>
      )}

    </div>
  );
}

export default EditCollectionAccordion;