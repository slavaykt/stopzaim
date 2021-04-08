import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { closeTab, setActiveTab } from '../../redux/actions/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: '#d9e1ff',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: theme.spacing(1),
    minHeight: 48
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const Tabs = () => {
  const classes = useStyles();
  const { tabs, activeTab } = useSelector(state => state.app);
  const dispatch = useDispatch();

  const handleClick = (id) => {
    dispatch(setActiveTab(id));
  }

  const handleCloseTab = (id) => {
    dispatch(closeTab(id));
  }

  return (
    <Paper component="ul" className={classes.root}>
      {tabs.map((tab, tabIndex) =>
        <li key={tabIndex}>
          <Chip
            label={tab.label}
            color={activeTab === tab.id ? 'primary' : 'default'}
            onDelete={() => handleCloseTab(tab.id)}
            onClick={() => handleClick(tab.id)}
            className={classes.chip}
          />
        </li>
      )}
      <div id="tabContentAnchor"></div>
    </Paper>
  );
}

export default Tabs;