import React, { useContext, useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { TabContext } from '../context';
import { addCollectionRow, changeCollectionData } from '../../redux/actions/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const CustomButton = withStyles((theme) => ({
  root: {
    paddingRight: 8,
    '& p': {
      transition: theme.transitions.create(["display"], {
        duration: theme.transitions.duration.complex,
      }),
      display: 'none'
    },
    '&:hover p': {
      display: 'inline'
    },
    '&:focus ': {
      outline: 'none'
    },
  },
}))(Button);

const Row = ({ data, row, rowIndex, columns, fields, collection }) => {
  const [open, setOpen] = useState(false);
  const { tabIndex } = useContext(TabContext);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleChange = (rowIndex, onChangeHandler) => (e) => {
    dispatch(changeCollectionData(tabIndex, collection, rowIndex, e.target.name, e.target.value));
    if (onChangeHandler) {
      onChangeHandler(rowIndex, e.target.value);
    }
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        {columns.map((column, colIndex) =>
          <TableCell key={colIndex}>{row[column.key]}</TableCell>
        )}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={columns.length + 1}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Grid container spacing={1}>
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
                        onChange={handleChange(rowIndex, field.onChangeHandler)}
                        value={row[field.key] || ''}
                      />
                    }
                    {
                      field.type === 'boolean' &&
                      <FormControlLabel
                        control={<Checkbox checked={!!row[field.key]} color="primary" onChange={handleChange} name={field.key} />}
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
                          onChange={handleChange}
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
                  </Grid>
                )}
              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const EditCollectionTableCollapsible = ({ collection, columns, fields }) => {
  const dispatch = useDispatch();
  const { tabIndex } = useContext(TabContext);
  const [activeRow, setActiveRow] = useState(null);
  const data = useSelector(state => state.app.tabs[tabIndex].data[collection]);
  const schema = useSelector(state => state.app.tabs[tabIndex].data.schema[collection]);
  // const { collectionTableSize } = useWindowSize();
  // const classes = useStyles({ collectionTableSize });
  const classes = useStyles();

  const handleAddRow = () => {
    dispatch(addCollectionRow(tabIndex, collection, { ...schema }));
  }

  return (
    <>
      <Grid item xs={12}>
        <div className={classes.buttonGroup}>
          <CustomButton
            variant="contained"
            startIcon={<AddCircleIcon color="primary" />}
            onClick={handleAddRow}
          >
            <Typography variant="body2">Добавить строку</Typography>
          </CustomButton>
        </div>
      </Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                {columns.map((column, colIndex) =>
                  <TableCell key={colIndex}>{column.header}</TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => (
                <Row key={rowIndex} data={data} row={row} collection={collection} rowIndex={rowIndex} columns={columns} fields={fields} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </>
  );
}

export default EditCollectionTableCollapsible;