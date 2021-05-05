import Axios from 'axios';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addCollectionRow, changeCollectionData, changeData, deleteCollectionRow, loadData } from '../../redux/actions/actions';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useWindowSize } from '../../hooks/window.size.hook';
import { TabContext } from '../context';
import SaveIcon from '@material-ui/icons/Save';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ContentEditable from './ContentEditable';
import useAxios from 'axios-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';
import ExtendableButton from './ExtendableButton';
import ConfirmableButton from './ConfirmableButton';
import { AddCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  container: {
    height: '90%',
  },
  activeRow: {
    backgroundColor: '#d9e1ff!important;'
  },
  tableCell: {
    padding: 0
  },
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

const EditableTable = ({ columns }) => {

  const dispatch = useDispatch();
  const { tabId } = useContext(TabContext);
  const { data: dataObject, api } = useSelector(state => state.app.getTab(tabId));
  const data = dataObject && dataObject.data;
  const def = dataObject && dataObject.default;
  const schema = dataObject && dataObject.schema;
  const [activeRow, setActiveRow] = useState(null);
  const classes = useStyles();
  const tblRef = useRef(null);
  const tbodyRef = useRef(null);
  const windowSize = useWindowSize();
  const [{ data: fetchedData, loading, error }, refetch] = useAxios(api, { useCache: false });
  const [saving, setSaving] = useState(false);

  console.log(dataObject);

  useEffect(() => {
    if (fetchedData) {
      dispatch(loadData(tabId, { data: fetchedData.data.sort((prev, next) => prev.Порядок - next.Порядок), default: fetchedData.default, schema: fetchedData.schema }));
    }
  }, [fetchedData]);

  const handleAddRow = () => {
    const maxOrder = data.reduce((prev, el) => Math.max(prev, el.Порядок), 0);
    dispatch(addCollectionRow(tabId, "data", { ...schema, Порядок: maxOrder + 1 }));
    setActiveRow(data.length - 1);
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

  const handleDefault = () => {
    const newData = data.filter(row => row.id).map(row => {
      if (row.id) {
        return { ...row, delete: true }
      }
    });
    dispatch(changeData(tabId, 'data', newData));
    def.map(row => {
      dispatch(addCollectionRow(tabId, 'data', { ...row, id: null }))
    })
  }

  const handleDeleteRow = () => {
    dispatch(deleteCollectionRow(tabId, 'data', activeRow));
  }

  const handleUp = () => {
    if (!activeRow) return;
    if (activeRow > 0) {
      dispatch(changeCollectionData(tabId, 'data', activeRow, 'Порядок', data[activeRow].Порядок - 1));
      dispatch(changeCollectionData(tabId, 'data', activeRow - 1, 'Порядок', data[activeRow - 1].Порядок + 1));
      setActiveRow(activeRow - 1);
    }
  }

  const handleDown = () => {
    if (!activeRow) return;
    if (activeRow < data.length - 1) {
      dispatch(changeCollectionData(tabId, 'data', activeRow, 'Порядок', data[activeRow].Порядок + 1));
      dispatch(changeCollectionData(tabId, 'data', activeRow + 1, 'Порядок', data[activeRow + 1].Порядок - 1));
      setActiveRow(activeRow + 1);
      const activeRowOffset = tbodyRef.current.childNodes[activeRow + 1].offsetTop;
      const containerHeight = parseInt(window.getComputedStyle(tblRef.current).height);
      const scrollTop = tblRef.current.scrollTop;
      if (activeRowOffset - scrollTop + 200 > containerHeight) {
        tblRef.current.scrollBy(0, 200)
      }
    }
  }

  const handleSubmit = async () => {
    setSaving(true);
    const response = await Axios.post('api/attachment/sections', { data });
    if (response.status === 201) {
      console.log('request', response.data);
    };
    setSaving(false);
  }

  if (!data) {
    return (
      <LinearProgress />
    )
  }

  return (
    <>
      {saving && <LinearProgress />}
      <div className={classes.buttonGroup}>
        <ExtendableButton
          variant="contained"
          startIcon={<AddCircle color="primary" />}
          onClick={handleAddRow}>
          <Typography variant="body2">Добавить</Typography>
        </ExtendableButton>
        <ExtendableButton
          variant="contained"
          startIcon={<SaveIcon color="primary" />}
          onClick={handleSubmit}
        >
          <Typography variant="body2">Сохранить</Typography>
        </ExtendableButton>
        <ConfirmableButton
          title="Все данные будут удалены. Продолжить?"
          handler={handleDefault}
          icon={<FormatListBulletedIcon color="primary" />}
          buttonLabel="Заполнить по умолчанию" />
        <ExtendableButton
          variant="contained"
          startIcon={<KeyboardArrowUpIcon color="primary" />}
          onClick={handleUp}
        >
          <Typography variant="body2">Передвинуть вверх</Typography>
        </ExtendableButton>
        <ExtendableButton
          variant="contained"
          startIcon={<KeyboardArrowDownIcon color="primary" />}
          onClick={handleDown}
        >
          <Typography variant="body2">Передвинуть вниз</Typography>
        </ExtendableButton>
        <ConfirmableButton
          title="Вы уверены?"
          handler={handleDeleteRow}
          icon={<DeleteIcon color="primary" />}
          buttonLabel="Удалить" />
      </div>
      <TableContainer ref={tblRef} className={classes.container}>
        <Table
          size="medium"
          stickyHeader
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
          <TableBody ref={tbodyRef}>
            {data.map((row, rowIndex) => {
              if (row.delete) return false;
              return (
                <TableRow
                  key={rowIndex}
                  onClick={() => setActiveRow(rowIndex)}
                  className={rowIndex === activeRow ? classes.activeRow : ''}
                  tabIndex={-1}>
                  {columns.map((column, columnIndex) =>
                    <TableCell className={classes.tableCell} key={columnIndex}>
                      <ContentEditable
                        collection="data"
                        name={column.key}
                        rowIndex={rowIndex}
                        value={row[column.key]} />
                    </TableCell>
                  )}
                </TableRow>
              )
            }
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default EditableTable;