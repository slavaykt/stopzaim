import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, deleteRow } from '../../redux/actions/actions';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@material-ui/core';
import { AddCircle as AddCircleIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { TabContext } from '../context';
import { useDateFormat } from '../../hooks/date.format.hook';
import ConfirmableButton from './ConfirmableButton';
import DropDownButton from './DropDownButton';
import _ from 'lodash';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },

  listItem: props => ({
    marginLeft: props.level * 18,
    color: '#3f51b5'
  }),
  activeRow: {
    backgroundColor: '#d9e1ff!important;'
  },
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      cursor: 'pointer'
    },
    userSelect: 'none'
  },
}))(TableRow);

const Row = ({ row, rowIndex, isActive, setActive }) => {
  const dispatch = useDispatch();
  const { localeDate } = useDateFormat();
  const { tabId, editInfo } = useContext(TabContext);
  const { columns } = useContext(TabContext);
  const classes = useStyles();

  const handleDoubleClick = () => {
    const { tabNamePrepend, api, component } = editInfo[row.ВидДокумента];
    const tabName = tabNamePrepend + ' №' + row.Номер + ' от ' + localeDate(row.Дата);
    dispatch(addTab(tabName, api + '/' + String(row.id), component, tabId));
  }

  return (
    <StyledTableRow
      className={isActive ? classes.activeRow : ''}
      onClick={() => setActive(rowIndex)}
      onDoubleClick={() => handleDoubleClick()}
      tabIndex={-1}>
      {
        columns.map((column, colIndex) =>
          <TableCell key={colIndex}>
            {column.function
              ?
              column.function(_.get(row, column.key))
              :
              _.get(row, column.key)
            }
          </TableCell>
        )
      }
    </StyledTableRow>
  )
}

const DocumentsIndexTable = () => {

  const dispatch = useDispatch();
  const { tabId, columns, editInfo } = useContext(TabContext);
  const { data, api } = useSelector(state => state.app.getTab(tabId));
  const [activeRows, setActiveRows] = useState([]);
  const [ctrlDown, setCtrlDown] = useState(false);
  const classes = useStyles();

  const sortedData = data.sort((prev, next) => {
    const prevDate = new Date(prev.Дата).getTime();
    const nextDate = new Date(next.Дата).getTime();
    return prevDate - nextDate;
  });

  const displayData = sortedData.reduce((res,el)=>{
    if (res.length<20) {
      return res.concat(el);
    } else {
      return res;
    }
  },[]);

  const handleKeyDown = (e) => {
    if (e.key === 'Control') {
      setCtrlDown(true);
    }
    if (activeRows.length === 1) {
      const activeRow = activeRows[0];
      if (e.key === 'ArrowUp') {
        if (activeRow > 0) {
          setActiveRows([activeRow - 1]);
        }
      } else if (e.key === 'ArrowDown') {
        if (activeRow < data.length - 1) {
          setActiveRows([activeRow + 1]);
        }
      }
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Control') {
      setCtrlDown(false);
    }
  }

  const handleActiveRow = (rowIndex) => {
    if (!activeRows.includes(rowIndex)) {
      if (ctrlDown) {
        setActiveRows([...activeRows, rowIndex])
      } else {
        setActiveRows([rowIndex])
      }
    }
  }

  const handleDelete = () => {
    const ids = data.reduce((result, el, i) => {
      return activeRows.includes(i) ? result.concat({ type: el.ВидДокумента, id: el.id }) : result
    }, []);
    Object.keys(editInfo).map(key => {
      const info = editInfo[key];
      const idsByType = ids.filter(el => el.type === key).map(el => el.id);
      if (idsByType.length) {
        dispatch(deleteRow(tabId, info.api, api, idsByType));
      }
    });
  }

  const handleAdd = (info) => {
    const { newTabName, api, component } = info;
    dispatch(addTab(newTabName, api + '/create', component, tabId));
  }

  return (
    <>
      <div className={classes.buttonGroup}>
        <DropDownButton
          icon={<AddCircleIcon color="primary" />}
          buttonLabel="Создать"
          options={
            Object.keys(editInfo).map(key => (
              { label: key, handler: () => handleAdd(editInfo[key]) }
            ))
          } />
        <ConfirmableButton
          title="Вы уверены?"
          handler={handleDelete}
          icon={<DeleteIcon color="primary" />}
          buttonLabel="Удалить" />
      </div>
      <TableContainer className={classes.container}>
        <Table
          size="medium"
          stickyHeader
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
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
            {
              displayData.map((row, rowIndex) =>
                <Row
                  row={row}
                  key={rowIndex}
                  rowIndex={rowIndex}
                  isActive={activeRows.includes(rowIndex)}
                  setActive={handleActiveRow}
                  level={0} />
              )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default DocumentsIndexTable;