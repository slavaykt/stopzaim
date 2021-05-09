import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeData } from '../../redux/actions/actions';
import views from '../views/views';
import { TextField, Grid, InputLabel, FormControl, Select, Tabs, MenuItem, FormControlLabel, Checkbox, Tab } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TabContext } from '../context';
import EditCollectionTable from './EditCollectionTable';
import SelectTable from './SelectTable';
import EditCollectionAccordion from './EditCollectionAccordion';
import AlertComponent from './AlertComponent';

const useStyles = makeStyles((theme) => ({
  root: {
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

function EditForm({ layout }) {

  const dispatch = useDispatch();
  const { tabId } = useContext(TabContext);
  const { data } = useSelector(state => state.app.getTab(tabId));
  const [activeTab, setActiveTab] = useState(0);
  const classes = useStyles();

  const SelectTableOnSubmit = (node) => (row) => {
    dispatch(changeData(tabId, node.key, { ...row }));
    if (node.onChangeHandler) {
      node.onChangeHandler(data, { ...row });
    }
  }

  const renderNode = (node, nodeIndex) => {
    if (node.hideHandler && node.hideHandler(data)) return false;
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
          node.type === 'date' &&
          <TextField
            label={node.label}
            margin="dense"
            name={node.key}
            type={node.inputType}
            size="small"
            fullWidth
            value={data[node.key] || ''}
            onChange={handleChange(node.onChangeHandler)}
            InputLabelProps={
              { shrink: true }
            }
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
      onChangeHandler(data, e.target.value);
    }
  }

  return (
    <form >
      <Grid container spacing={1}>
        {layout.map((node, nodeIndex) => renderNode(node, nodeIndex))}
      </Grid>
      <AlertComponent tabId={tabId} />
    </form>
  )
}

export default EditForm;