import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useState, Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTab, addRow, changeFolder, deleteRow, loadData } from '../../redux/actions/actions';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, TextField, Dialog, DialogContent, DialogTitle, IconButton, List, ListItem, ListItemIcon, ListItemText, Collapse } from '@material-ui/core';
import { AddCircle as AddCircleIcon, CreateNewFolder as NewFolderIcon, Folder as FolderIcon, ArrowRight as ArrowRightIcon, ArrowForward as ArrowForwardIcon, Delete as DeleteIcon } from '@material-ui/icons';
import { TabContext } from '../context';
import DialogWrapper from './DialogWrapper';
import ExtendableButton from './ExtendableButton';
import ConfirmableButton from './ConfirmableButton';
import useAxios from 'axios-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    height: '90%',
  },
  listItem: props => ({
    marginLeft: props.level * 18,
    color: '#3f51b5'
  }),
  activeRow: {
    backgroundColor: '#d9e1ff!important;'
  },
  tableCell: props => ({
    paddingLeft: String(props.level * 2) + 'rem!important'
  }),
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  noFocus: {
    '&:focus ': {
      outline: 'none'
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

const MoveToFolderIcon = ({ color }) => {
  return (
    <>
      <ArrowForwardIcon color={color} />
      <FolderIcon color={color} />
    </>
  )
}

const Row = ({ row, level, activeRowsIds, setActive }) => {
  const dispatch = useDispatch();
  const { tabId } = useContext(TabContext);
  const { columns, editInfo } = useContext(TabContext);
  const classes = useStyles({ level });

  const handleDoubleClick = (id, name) => {
    dispatch(addTab(name, editInfo.api + '/' + String(id), editInfo.component, tabId));
  }

  return (
    <StyledTableRow
      className={activeRowsIds.includes(row.id) ? classes.activeRow : ''}
      onClick={() => setActive(row.id)}
      onDoubleClick={() => handleDoubleClick(row.id, row.Наименование)}
      tabIndex={-1}>
      {
        columns.map((column, colIndex) =>
          <Fragment key={colIndex}>
            {
              column.primary
                ?
                <TableCell className={classes.tableCell} key={colIndex}>
                  <ArrowRightIcon fontSize="small" />
                  &nbsp;
                  {row[column.key]}
                </TableCell>
                :
                <TableCell key={colIndex}>
                  {column.function
                    ? column.function(row[column.key])
                    :
                    row[column.key]
                  }
                </TableCell>
            }
          </Fragment>
        )
      }
    </StyledTableRow>
  )
}

const FolderRow = ({ row, level, activeRowsIds, setActive }) => {
  const dispatch = useDispatch();
  const { tabId } = useContext(TabContext);
  const { data } = useSelector(state => state.app.getTab(tabId));
  const { columns } = useContext(TabContext);
  const [open, setOpen] = useState(false);
  const classes = useStyles({ level });

  const handleDoubleClick = (id, name) => {
    // dispatch(addTab('tab', name, editInfo.api + '/' + String(id), editInfo.component));
  }

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  }

  return (
    <Fragment >
      <StyledTableRow
        className={activeRowsIds.includes(row.id) ? classes.activeRow : ''}
        onClick={() => setActive(row.id)}
        onDoubleClick={() => handleDoubleClick(row.id, row.Наименование)}
        tabIndex={-1}>
        {
          columns.map((column, colIndex) =>
            <Fragment key={colIndex}>
              {
                column.primary
                  ?
                  <TableCell className={classes.tableCell}>
                    <IconButton className={classes.noFocus} size="small" color="primary" onClick={handleClick}>
                      <FontAwesomeIcon icon={open ? faFolderOpen : faFolder} />
                    </IconButton>
                    &nbsp;
                    {row[column.key]}
                  </TableCell>
                  :
                  <TableCell />
              }
            </Fragment>

          )
        }
      </StyledTableRow>

      {
        open &&
        data.filter(el => el.parent_id === row.id).map(row =>
          <Fragment key={row.id}>
            {row.isGroup
              ?
              <FolderRow
                row={row}
                activeRowsIds={activeRowsIds}
                setActive={setActive}
                level={level + 1} />
              :
              <Row
                row={row}
                activeRowsIds={activeRowsIds}
                setActive={setActive}
                level={level + 1} />
            }
          </Fragment>
        )
      }

    </Fragment>
  )
}

const FolderListItem = ({ item, level, handleSubmit }) => {
  const { tabId } = useContext(TabContext);
  const { data } = useSelector(state => state.app.getTab(tabId));
  const [open, setOpen] = useState(false);
  const classes = useStyles({ level });

  return (
    <>
      <ListItem button>
        <ListItemIcon className={classes.listItem} onClick={() => setOpen(!open)}>
          {open ? <FontAwesomeIcon icon={faFolderOpen} /> : <FontAwesomeIcon icon={faFolder} />}
        </ListItemIcon>
        <ListItemText onClick={() => handleSubmit(item.id)} primary={item.Наименование} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {data.filter(el => el.isGroup && el.parent_id === item.id)
            .map(item =>
              <FolderListItem
                item={item}
                handleSubmit={handleSubmit}
                level={level + 1}
                key={item.id} />
            )}
        </List>
      </Collapse>
    </>
  )
}

const NewFolderDialog = ({ parent_id, api }) => {
  const dispatch = useDispatch();
  const { tabId } = useContext(TabContext);
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const classes = useStyles();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    setFolderName(e.target.value)
  }

  const handleSubmit = () => {
    dispatch(addRow(tabId, api, { isGroup: 1, parent_id: parent_id, Наименование: folderName }));
    setOpen(false);
    setFolderName("")
  }

  return (
    <>
      <ExtendableButton
        variant="contained"
        startIcon={<NewFolderIcon color="primary" />}
        onClick={handleClickOpen}>
        <Typography variant="body2">Создать группу</Typography>
      </ExtendableButton>
      {open &&
        <DialogWrapper
          title="Новая группа"
          handleClose={handleClose}
          buttons={[
            { label: 'Отмена', handler: handleClose, color: 'default' },
            { label: 'Ок', handler: handleSubmit, color: 'primary' },
          ]}
        >
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Наименование"
            value={folderName}
            onChange={handleChange}
            type="text"
            fullWidth
          />
        </DialogWrapper>
      }
    </>

  )
}

const MoveToFolderDialog = ({ rowIds, api }) => {
  const dispatch = useDispatch();
  const { tabId, editInfo } = useContext(TabContext);
  const { data } = useSelector(state => state.app.getTab(tabId));;
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  const handleClickOpen = () => {
    if (rowIds.length) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (parent_id) => {
    dispatch(changeFolder(tabId, api, rowIds, parent_id));
    setOpen(false);
  }

  return (
    <>
      <ExtendableButton
        variant="contained"
        onClick={handleClickOpen}
        startIcon={<MoveToFolderIcon color="primary" />}>
        <Typography variant="body2">Переместить в группу</Typography>
      </ExtendableButton>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Выберите группу</DialogTitle>
        <DialogContent>
          <List component="div" >
            <ListItem button>
              <ListItemIcon className={classes.listItem}>
                <FontAwesomeIcon icon={faFolderOpen} />
              </ListItemIcon>
              <ListItemText onClick={() => handleSubmit(null)} primary="Без групп" />
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" >
                {data && data.filter(item => item.isGroup && item.parent_id === null)
                  .map(item =>
                    <FolderListItem
                      item={item}
                      level={1}
                      handleSubmit={handleSubmit}
                      key={item.id} />
                  )}
              </List>
            </Collapse>
          </List>
        </DialogContent>
      </Dialog>
    </>

  )
}

const IndexTable = () => {

  const dispatch = useDispatch();
  const { tabId, columns, editInfo } = useContext(TabContext);
  const { data, api } = useSelector(state => state.app.getTab(tabId));
  const [activeRowsIds, setActiveRowsIds] = useState([]);
  const [ctrlDown, setCtrlDown] = useState(false);
  const classes = useStyles();
  const [{ data: fetchedData, loading, error }, refetch] = useAxios(api);

  useEffect(() => {
    if (fetchedData) {
      dispatch(loadData(tabId, fetchedData));
    }
  }, [fetchedData]);

  const handleCreate = () => {
    dispatch(addTab(editInfo.newTabName, api + '/create', editInfo.component, tabId));
  }

  const getParentId = () => {
    if (activeRowsIds.length !== 1) return null;
    const activeRowData = data.find(el => el.id === activeRowsIds[0]);
    return activeRowData ? (activeRowData.isGroup ? activeRowData.id : activeRowData.parent_id) : null;
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Control') {
      setCtrlDown(true);
    }
    if (activeRowsIds.length === 1) {
      const activeRow = data.find(el => el.id === activeRowsIds[0]);
      const scope = data.filter(el => el.parent_id === activeRow.parent_id);
      const activeRowIndex = scope.findIndex(el => el.id === activeRow.id);
      if (e.key === 'ArrowUp') {
        if (activeRowIndex > 0) {
          setActiveRowsIds([scope[activeRowIndex - 1].id])
        }
      } else if (e.key === 'ArrowDown') {
        if (activeRowIndex < scope.length - 1) {
          setActiveRowsIds([scope[activeRowIndex + 1].id])
        }
      }
    }
  }

  const handleKeyUp = (e) => {
    if (e.key === 'Control') {
      setCtrlDown(false);
    }
  }

  const handleActiveRow = (rowId) => {
    if (!activeRowsIds.includes(rowId)) {
      if (ctrlDown) {
        setActiveRowsIds([...activeRowsIds, rowId])
      } else {
        setActiveRowsIds([rowId])
      }
    }
  }

  const handleDelete = () => {
    const ids = activeRowsIds.concat(data.filter(row => activeRowsIds.includes(row.parent_id)));
    dispatch(deleteRow(tabId, api, ids));
  }

  return (
    <>
      <div className={classes.buttonGroup}>
        <ExtendableButton
          variant="contained"
          startIcon={<AddCircleIcon color="primary" />}
          onClick={handleCreate}>
          <Typography variant="body2">Создать</Typography>
        </ExtendableButton>
        <NewFolderDialog parent_id={getParentId()} api={api} />
        <ConfirmableButton
          title="Вы уверены?"
          handler={handleDelete}
          icon={<DeleteIcon color="primary" />}
          buttonLabel="Удалить" />
        <MoveToFolderDialog rowIds={activeRowsIds} api={api} />
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
              !data
                ?
                <tr>
                  <td colSpan={columns.length}>
                    <LinearProgress />
                  </td>
                </tr>
                :
                data.map(row => {
                  if (row.parent_id !== null) return;
                  return (
                    <Fragment key={row.id}>
                      {row.isGroup
                        ?
                        <FolderRow
                          row={row}
                          activeRowsIds={activeRowsIds}
                          setActive={handleActiveRow}
                          level={0} />
                        :
                        <Row
                          row={row}
                          activeRowsIds={activeRowsIds}
                          setActive={handleActiveRow}
                          level={0} />
                      }
                    </Fragment>
                  )
                }
                )
            }
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default IndexTable;