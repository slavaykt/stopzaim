import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCollectionRow, changeCollectionData, changeData, deleteCollectionRow, insertCollectionRow } from '../../redux/actions/actions';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { TabContext } from '../context';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import ContentEditable from './ContentEditable';
import SelectTable from './SelectTable';
import { useWindowSize } from '../../hooks/window.size.hook';
import axios from 'axios';
import ExtendableButton from './ExtendableButton';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    height: props => props.collectionTableSize.height,
    width: '100%',
  },
  table: {
  },
  activeRow: {
    backgroundColor: '#d9e1ff!important;'
  },
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  tableCell: {
    padding: 10
  },
  noFocus: {
    '&:focus ': {
      outline: 'none'
    },
  },
  activeRow: {
    backgroundColor: '#d9e1ff!important;'
  },
  tableInput: {
    '&:before ': {
      borderBottomStyle: 'none'
    },
    fontSize: theme.font.size,
  },
}));

const EditCollectionTable = ({ columns, collection }) => {

  const dispatch = useDispatch();
  const { tabId } = useContext(TabContext);
  const [activeRow, setActiveRow] = useState(null);
  const { data: allData } = useSelector(state => state.app.getTab(tabId));
  const data = useSelector(state => state.app.getTab(tabId).data[collection]);
  const schema = useSelector(state => state.app.getTab(tabId).data.schema[collection]);
  const { collectionTableSize } = useWindowSize();
  const classes = useStyles({ collectionTableSize });
  const bottomRef = useRef(null);

  useEffect(()=>{
    scrollToBottom();
  });

  const handleChange = (rowIndex, onChangeHandler, isRelationship = false) => (e) => {
    const payload = isRelationship
      ? { id: e.target.value }
      : e.target.type === 'number'
        ? Number(e.target.value)
        : e.target.value;
    dispatch(changeCollectionData(tabId, collection, rowIndex, e.target.name, payload));
    if (onChangeHandler) {
      onChangeHandler(allData, rowIndex, e.target.value);
    }
  }

  const scrollToBottom = () => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth", block: 'center' });
    }
  }

  const handleAddRow = () => {
    dispatch(addCollectionRow(tabId, collection, { ...schema }));
    setActiveRow(data.length - 1);
  }

  const handleDeleteRow = () => {

    console.log('activeRow', activeRow);
    console.log('data.length-1', data.length - 1);
    dispatch(deleteCollectionRow(tabId, collection, activeRow));
    if (activeRow === data.length) {
      setActiveRow(activeRow - 1)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      if (activeRow > 0) {
        setActiveRow(activeRow - 1)
      }
    } else if (e.key === 'ArrowDown') {
      if (activeRow < data.length - 1) {
        setActiveRow(activeRow + 1)
      }
    }
  }

  const handleCopy = () => {
    dispatch(insertCollectionRow(tabId, collection, { ...data[activeRow], id: null }, activeRow));
    setActiveRow(activeRow + 1);
  }

  const handleDefault = async () => {
    axios.get('/api/attachment/sections')
      .then(response => {
        dispatch(changeData(tabId, collection, response.data.data.map(row => (
          {
            id: null,
            Раздел: row.id,
            Наименование: row.ТекстПриложения
          }
        ))));
      })
      .catch(error => console.log(error));
  }

  const SelectTableOnSubmit = (node, rowIndex) => (row) => {
    dispatch(changeCollectionData(tabId, collection, rowIndex, node.key, { ...row }));
    if (node.onChangeHandler) {
      node.onChangeHandler(allData, { ...row });
    }
  }

  const renderTableRow = (row, rowIndex, isLastRow) => {
    if (row.delete) return false;
    return (
      <TableRow
        key={rowIndex}
        onClick={() => setActiveRow(rowIndex)}
        className={rowIndex === activeRow ? classes.activeRow : ''}
        tabIndex={-1}>
        {
          columns.map((column, colIndex) =>
            <TableCell className={classes.tableCell} key={colIndex}>
              {(column.type === 'text' || column.type === 'date' || column.type === 'number') &&
                <FormControl fullWidth >
                  <Input
                    name={column.key}
                    className={classes.tableInput}
                    fullWidth
                    type={column.type}
                    value={row[column.key]}
                    onChange={handleChange(rowIndex, column.onChangeHandler)}
                  />
                </FormControl>
              }
              {column.type === 'select' &&
                <FormControl fullWidth>
                  <Select
                    value={row[column.key]}
                    className={classes.tableInput}
                    name={column.key}
                    labelId={"select" + rowIndex + colIndex}
                    onChange={handleChange(rowIndex, column.onChangeHandler)}
                  >
                    {
                      column.getOptions(allData).map((option, i) =>
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
              {column.type === 'relationship' &&
                <SelectTable
                  node={column}
                  nodeIndex={`${rowIndex}-${colIndex}`}
                  onSubmit={SelectTableOnSubmit(column, rowIndex)}
                  collection={collection}
                  value={row[column.key]} />
              }
              {
                column.type === 'textarea' &&
                <ContentEditable
                  collection={collection}
                  rowIndex={rowIndex}
                  name={column.key}
                  value={row[column.key]} />

              }
            </TableCell>
          )
        }
      </TableRow>

    )
  }
  return (
    <>
      <Grid item xs={12}>
        <div className={classes.buttonGroup}>
          <ExtendableButton
            variant="contained"
            startIcon={<AddCircleIcon color="primary" />}
            onClick={handleAddRow}
          >
            <Typography variant="body2">Добавить строку</Typography>
          </ExtendableButton>
          <ExtendableButton
            variant="contained"
            startIcon={<DeleteIcon color="primary" />}
            onClick={handleDeleteRow}
          >
            <Typography variant="body2">Удалить строку</Typography>
          </ExtendableButton>
          <ExtendableButton
            variant="contained"
            startIcon={<FileCopyIcon color="primary" />}
            onClick={handleCopy}
          >
            <Typography variant="body2">Скопировать строку</Typography>
          </ExtendableButton>
          {collection === 'Приложения' &&
            <ExtendableButton
              variant="contained"
              startIcon={<FormatListBulletedIcon color="primary" />}
              onClick={handleDefault}
            >
              <Typography variant="body2">Заполнить по умолчанию</Typography>
            </ExtendableButton>
          }
        </div>
      </Grid>
      <Grid item xs={12}>
        <TableContainer className={classes.container}>
          <Table
            size="medium"
            stickyHeader
            className={classes.table}
            onKeyDown={handleKeyDown}
          >
            <TableHead>
              <TableRow>
                {columns.map((column, colIndex) => (
                  <TableCell
                    key={colIndex}
                    style={{ minWidth: column.width }}
                  >
                    {column.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row, rowIndex) => renderTableRow(row, rowIndex, rowIndex === data.length - 1))}
            </TableBody>
          </Table>
          <div ref={bottomRef} />
        </TableContainer>
      </Grid>
    </>
  );
}

export default EditCollectionTable;