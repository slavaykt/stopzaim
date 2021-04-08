import React, { useContext, useState } from 'react';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { changeData, closeTab, deleteRecord, refetchTab } from '../../redux/actions/actions';
import views from '../views/views';
import { TextField, Grid, InputLabel, FormControl, Typography, Select, Tabs, MenuItem, FormControlLabel, Checkbox, Tab, Snackbar } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Save as SaveIcon, ExitToApp as ExitToAppIcon, Cancel as CancelIcon, CheckCircle as CheckCircleIcon, Delete as DeleteIcon, Print as PrintIcon } from '@material-ui/icons';
import { TabContext } from '../context';
import EditCollectionTable from './EditCollectionTable';
import SelectTable from './SelectTable';
import EditCollectionAccordion from './EditCollectionAccordion';
import ConfirmableButton from './ConfirmableButton';
import ExtendableButton from './ExtendableButton';
import DropDownButton from './DropDownButton';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  formControl: {
    marginTop: 5
  },
  smallFont: {
    fontSize: theme.font.size,
  },
  textField: {
    "& .MuiFormLabel-root": {
      fontSize: theme.font.size,
    },
    "& .MuiInputBase-root": {
      fontSize: theme.font.size,
    }
  },
  noFocus: {
    '&:focus ': {
      outline: 'none'
    },
  },
}));

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const EditForm = ({ layout, api, registerHandler, unRegisterHandler, printOptions }) => {

  const dispatch = useDispatch();
  const { tabId, sourceTabId } = useContext(TabContext);
  const sourceTab = useSelector(state => state.app.getTab(sourceTabId));
  const { data } = useSelector(state => state.app.getTab(tabId));
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState('');
  const classes = useStyles();

  const SelectTableOnSubmit = (node) => (row) => {
    dispatch(changeData(tabId, node.key, { ...row }));
    if (node.onChangeHandler) {
      node.onChangeHandler({ ...row });
    }
  }

  const renderNode = (node, nodeIndex) => {
    if (node.hideHandler && node.hideHandler()) return false;
    return (
      <Grid key={nodeIndex} item xs={node.size}>
        {
          node.type === 'tabPanel' &&
          <>
            <Tabs
              value={activeTab}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              onChange={(e, tabIndex) => setActiveTab(tabIndex)}
            >
              {node.children.map((tab, tabIndex) =>
                <Tab
                  key={tabIndex}
                  label={tab.header}
                  className={classes.noFocus} />
              )}
            </Tabs>
            <Grid container spacing={1}>
              {node.children[activeTab].children &&
                node.children[activeTab].children.map((childNode, childNodeIndex) => renderNode(childNode, childNodeIndex))}
            </Grid>
          </>
        }
        {
          node.type === 'input' &&
          <TextField
            label={node.label}
            margin="dense"
            name={node.key}
            type={node.inputType}
            size="small"
            fullWidth
            value={data[node.key] || ''}
            onChange={handleChange(node.onChangeHandler)}
            className={classes.textField}
          />
        }
        {
          node.type === 'boolean' &&
          <FormControlLabel
            control={<Checkbox checked={!!data[node.key]} color="primary" onChange={handleChange(node.onChangeHandler, node.hideHandler)} name={node.key} />}
            label={node.label}
          />
        }
        {
          node.type === 'select' &&
          <FormControl
            fullWidth
            className={classes.formControl}
          >
            <InputLabel
              id={"select" + nodeIndex}
            >
              {node.label}
            </InputLabel>
            <Select
              value={data[node.key]}
              name={node.key}
              className={classes.smallFont}
              labelId={"select" + nodeIndex}
              onChange={handleChange(node.onChangeHandler, node.hideHandler)}
            >
              {
                node.getOptions().map((option, i) =>
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
          node.type === 'modalComponent' &&
          renderModalComponent(node.componentName, data[node.key] || {})
        }
        {
          node.type === 'relationship' &&
          <SelectTable
            node={node}
            nodeIndex={nodeIndex}
            onSubmit={SelectTableOnSubmit(node)}
            value={data[node.key]} />
        }
        {
          node.type === 'tableComponent' &&
          <EditCollectionTable
            columns={node.columns}
            collection={node.collection} />
        }
        {
          node.type === 'tableComponentAccordion' &&
          <EditCollectionAccordion
            header={node.header}
            fields={node.fields}
            collection={node.collection} />
        }
      </Grid>
    )

  }

  const renderModalComponent = (componentName, modalData) => {
    const Component = views[componentName];
    return (
      <div className="py-1">
        <Component data={modalData} />
      </div>
    )
  }

  const handleChange = (onChangeHandler) => (e) => {
    if (e.target.type === 'number') {
      if (e.target.value === "") {
        dispatch(changeData(tabId, e.target.name, 0));
        return
      }
      const validate = /^\d+(\.\d{1,2})?$/;
      if (validate.test(e.target.value)) {
        dispatch(changeData(tabId, e.target.name, e.target.value));
      }
    } else if (e.target.type === 'checkbox') {
      dispatch(changeData(tabId, e.target.name, e.target.checked));
    } else {
      dispatch(changeData(tabId, e.target.name, e.target.value));
    }
    if (onChangeHandler) {
      onChangeHandler(e.target.value);
    }
  }

  const handleSubmit = (register) => async (e) => {
    e.preventDefault();
    const res = data.id ? await Axios.put(api + '/' + String(data.id), data) : await Axios.post(api, data);
    if (res.status === 200 || res.status === 201) {
      const resData = await res.data;
      if (resData.Комментарий === 'Номер не уникальный') {
        setError('Номер не уникальный!');
      } else {
        if (!data.id) {
          dispatch(changeData(tabId, 'id', resData.id));
          if (resData.Номер) {
            dispatch(changeData(tabId, 'Номер', resData.Номер));
          }
        }
        if (register) {
          await registerHandler();
        }
        dispatch(refetchTab(sourceTab));
      }
    }
  }

  const handleDelete = () => {
    dispatch(deleteRecord(tabId, api, data.id));
    dispatch(refetchTab(sourceTab));
    if (unRegisterHandler) {
      handleUnRegister();
    }
  }

  const handleUnRegister = async () => {
    await unRegisterHandler();
    dispatch(refetchTab(sourceTab));
  }

  const handleCloseTab = () => {
    dispatch(closeTab(tabId));
  }

  const handlePrint = (url) => {
    window.open(url, '_blank');
  }

  const handleClearError = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setError('');
  };

  return (
    <form >
      <div className={classes.buttonGroup}>
        <ExtendableButton
          variant="contained"
          startIcon={<SaveIcon color="primary" />}
          onClick={handleSubmit(false)}
        >
          <Typography variant="body2">Записать</Typography>
        </ExtendableButton>
        {registerHandler &&
          <ExtendableButton
            variant="contained"
            startIcon={<CheckCircleIcon color="primary" />}
            onClick={handleSubmit(true)}
          >
            <Typography variant="body2">Провести</Typography>
          </ExtendableButton>
        }
        {unRegisterHandler &&
          <ExtendableButton
            variant="contained"
            startIcon={<CancelIcon color={data.registered ? 'primary' : 'disabled'} />}
            disabled={!data.registered}
            onClick={handleUnRegister}
          >
            <Typography variant="body2">Отменить проведение</Typography>
          </ExtendableButton>
        }
        {!!printOptions.length &&
          <DropDownButton
            icon={<PrintIcon color="primary" />}
            buttonLabel="Печать"
            options={
              printOptions.map(option => (
                { label: option.label, handler: () => handlePrint(option.url) }
              ))
            } />
        }
        <ConfirmableButton
          title="Вы уверены?"
          handler={handleDelete}
          icon={<DeleteIcon color="primary" />}
          buttonLabel="Удалить" />
        <ExtendableButton
          variant="contained"
          startIcon={<ExitToAppIcon color="primary" />}
          onClick={handleCloseTab}
        >
          <Typography variant="body2">Закрыть</Typography>
        </ExtendableButton>
      </div>
      <Grid container spacing={1}>
        {layout.map((node, nodeIndex) => renderNode(node, nodeIndex))}
      </Grid>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={handleClearError}>
        <Alert onClose={handleClearError} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </form>
  )
}

export default EditForm;