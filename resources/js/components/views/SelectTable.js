import React, { useContext, useEffect, useState, Fragment } from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Create from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { changeCollectionData, changeData } from '../../redux/actions/actions';
import { TabContext } from '../context';
import DialogWrapper from './DialogWrapper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFolderOpen } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
  linkLabel: {
    display: 'inline-block',
    minWidth: 100
  },
  noFocus: {
    '&:focus ': {
      outline: 'none'
    },
  },
  formControl: {
    paddingTop: props => props.collection ? '0px' : '5px',
  },
  tableRow: {
    '&:hover': {
      cursor: 'pointer',
      backgroundColor: '#d9e1ff'
    },
    userSelect: 'none'
  },
  tableCell: {
    paddingLeft: props => String(props.level * 2) + 'rem!important',
  },
  tableInput: {
    '&:before ': {
      borderBottomStyle: props => props.collection ? 'none' : 'solid'
    },
    fontSize: theme.font.size
  },
}));

const FolderRow = ({ row, level, handleSubmit, data }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles({ level });

  const handleClick = (e) => {
    e.stopPropagation();
    setOpen(!open);
  }

  return (
    < >
      <TableRow
        className={classes.tableRow}
        tabIndex={-1}>
        <TableCell className={classes.tableCell}>
          <IconButton
            size="small"
            color="primary"
            className={classes.noFocus}
            onClick={handleClick}>
            <FontAwesomeIcon icon={open ? faFolderOpen : faFolder} />
          </IconButton>
            &nbsp;
            {row.Наименование}
        </TableCell>
      </TableRow>

      {
        open &&
        data.filter(el => el.parent_id === row.id).map(row =>
          <Fragment key={row.id}>
            {row.isGroup
              ?
              <FolderRow
                handleSubmit={handleSubmit}
                data={data}
                row={row}
                level={level + 1} />
              :
              <Row
                handleSubmit={handleSubmit}
                row={row}
                level={level + 1} />
            }
          </Fragment>
        )
      }

    </>
  )
}

const Row = ({ row, level, handleSubmit }) => {
  const classes = useStyles({ level });

  return (
    <TableRow
      className={classes.tableRow}
      onClick={() => handleSubmit(row)}
      tabIndex={-1}>
      <TableCell className={classes.tableCell}>
        <ArrowRightIcon fontSize="small" />
                  &nbsp;
                  {row.Наименование}
      </TableCell>
    </TableRow>
  )
}

const SelectTable = ({ node, nodeIndex, onSubmit, value, collection }) => {

  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const classes = useStyles({ collection });

  useEffect(() => {
    if (open) {
      Axios.get(node.api)
        .then(response => {
          setData(response.data)
        })
        .catch(error => console.log(error));
    }
  }, [open]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false)
  };

  const handleSubmit = (row) => {
    onSubmit(row);
    handleClose()
  }

  return (
    <>
      <FormControl className={classes.formControl} fullWidth>
        {node.label &&
          <InputLabel htmlFor={"input" + nodeIndex}>{node.label}</InputLabel>
        }
        <Input
          id={"input" + nodeIndex}
          type="text"
          readOnly
          classes={{
            root: classes.tableInput,
          }}
          value={value ? value.Наименование : ""}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                edge="end"
                className={classes.noFocus}
                onClick={handleClickOpen}>
                {<Create />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      {!!(open && data.length) &&
        <DialogWrapper
          title="Выберите компанию"
          handleClose={handleClose}
          disableBackdropClick={false}
          closeIcon={true}
          buttons={[]}
        >
          <TableContainer >
            <Table
              size="medium"
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    Наименование
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  data.map(row => {
                    if (row.parent_id !== null) return;
                    return (
                      <Fragment key={row.id}>
                        {row.isGroup
                          ?
                          <FolderRow
                            handleSubmit={handleSubmit}
                            data={data}
                            row={row}
                            level={0} />
                          :
                          <Row
                            handleSubmit={handleSubmit}
                            row={row}
                            level={0} />
                        }
                      </Fragment>
                    )
                  })
                }
              </TableBody>
            </Table>
          </TableContainer>
        </DialogWrapper>
      }
    </>
  );
}

export default SelectTable;