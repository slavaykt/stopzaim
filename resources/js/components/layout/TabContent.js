import React from 'react';
import views from '../views/views';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { useWindowSize } from '../../hooks/window.size.hook';
import { TabContext } from '../context';

const useStyles = makeStyles((theme) => ({
  root: {
    flexWrap: 'wrap',
    '& > *': {
      overflow: 'auto',
      padding: theme.spacing(2),
      margin: theme.spacing(1),
      width: props => props.tabContentSize.width,
      height: props => props.tabContentSize.height
    },
    display: props => props.isActive ? 'flex' : 'none',
  },
}));

const MemoPaper = React.memo(({ tab }) => {
  const Component = views[tab.componentName];
  return (
    <TabContext.Provider value={{ tabId: tab.id }}>
      <Paper
        elevation={6}
      >
        <Component />
      </Paper>
    </TabContext.Provider>
  )
}, (prevProps, nextProps) => {
  return !nextProps.isActive
});

const Tab = ({ tab, isActive }) => {
  const { tabContentSize } = useWindowSize();
  const classes = useStyles({ isActive, tabContentSize });

  return (
    <div className={classes.root}>
      <MemoPaper isActive={isActive} tab={tab} />
    </div>
  )
}

const TabContent = () => {

  const { tabs, activeTab } = useSelector(state => state.app);

  if (activeTab < 0) {
    return false;
  }

  return (
    <>
      {
        tabs.map((tab) =>
          <Tab
            tab={tab}
            key={tab.id}
            isActive={tab.id === activeTab} />
        )
      }
    </>
  )
}


export default TabContent;