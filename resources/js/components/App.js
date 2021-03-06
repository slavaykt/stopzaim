import ReactDOM from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { rootReducer } from '../redux/reducers/rootReducer';
import Tabs from './layout/Tabs';
import TabContent from './layout/TabContent';
import React, { useLayoutEffect, useState } from 'react';
import clsx from 'clsx';
import { createMuiTheme, makeStyles, useTheme, ThemeProvider } from '@material-ui/core/styles';
import { Drawer, List, CssBaseline, Divider, IconButton, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, People as PeopleIcon, Business as BusinessIcon, Settings as SettingsIcon, Equalizer as EqualizerIcon, PlaylistAddCheck, List as ListIcon, Dashboard } from '@material-ui/icons';
import { addTab, loadConfig, setDrawerOpen } from '../redux/actions/actions';
import { CoinIcon, ContractIcon } from './Icons';
import 'react-virtualized/styles.css';

const drawerWidth = 240;

const theme = createMuiTheme({
  overrides: {
    MuiFormLabel: {
      root: {
        fontSize: '14px',
      },
    },
    MuiInputBase: {
      input: {
        fontSize: '14px',
      },
    },
    MuiMenuItem: {
      root: {
        fontSize: '14px',
      },
    },
  },
  font: {
    size: 14,
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
  },
  noFocus: {
    '&:focus ': {
      outline: 'none'
    },
  },
}));

const App = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const { drawerOpen } = useSelector(state => state.app);

  useLayoutEffect(() => {
    dispatch(loadConfig());
  }, []);

  const handleDrawerOpen = () => {
    dispatch(setDrawerOpen(true));
  };

  const handleDrawerClose = () => {
    dispatch(setDrawerOpen(false));
  };

  const handleDrawerItemClick = (option) => {
    switch (option) {
      case '??????????????':
        dispatch(addTab('??????????????', 'api/clients', 'ClientIndex'));
        break;
      case '????????????????':
        dispatch(addTab('????????????????', 'api/companies', 'CompanyIndex'));
        break;
      case '??????????':
        dispatch(addTab('??????????', 'api/cash', 'CashIndex'));
        break;
      case '????????????????':
        dispatch(addTab('????????????????', 'api/contracts', 'ContractIndex'));
        break;
      case '??????????????????????????':
        dispatch(addTab('??????????????????????????', null, 'SettlemenTReport'));
        break;
      case '????????????????????????????':
        dispatch(addTab('???????? ????????????????????', 'api/collectingManagement', '??ollectingManagement'));
        break;
      case '????????????':
        dispatch(addTab('????????????', 'api/clients', 'Kanban'));
        break;
      case '??????????????????':
        dispatch(addTab('?????????????????? ????????????????????', 'api/attachment/sections', 'ClientAttachmentSectionSetup'));
        break;
      default:
        break;
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: drawerOpen,
          [classes.drawerClose]: !drawerOpen,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          }),
        }}
      >
        <div className={classes.toolbar}>
          {!drawerOpen
            ?
            <IconButton className={classes.noFocus} onClick={handleDrawerOpen}>
              <ChevronRightIcon />
            </IconButton>
            :
            <IconButton className={classes.noFocus} onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          }
        </div>
        <Divider />
        <List>
          <ListItem button key="??????????????" onClick={() => handleDrawerItemClick("??????????????")}>
            <ListItemIcon ><PeopleIcon color="primary" /></ListItemIcon>
            <ListItemText primary="??????????????" />
          </ListItem>
          <ListItem button key="????????????????" onClick={() => handleDrawerItemClick("????????????????")}>
            <ListItemIcon><BusinessIcon color="primary" /></ListItemIcon>
            <ListItemText primary="????????????????" />
          </ListItem>
          <ListItem button key="??????????" onClick={() => handleDrawerItemClick("??????????")}>
            <ListItemIcon><CoinIcon color="primary" /></ListItemIcon>
            <ListItemText primary="??????????" />
          </ListItem>
          <ListItem button key="????????????????" onClick={() => handleDrawerItemClick("????????????????")}>
            <ListItemIcon><ContractIcon color="primary" /></ListItemIcon>
            <ListItemText primary="????????????????" />
          </ListItem>
          <ListItem button key="??????????????????????????" onClick={() => handleDrawerItemClick("??????????????????????????")}>
            <ListItemIcon><EqualizerIcon color="primary" /></ListItemIcon>
            <ListItemText primary="??????????????????????????" />
          </ListItem>
          <ListItem button key="????????????????????????????" onClick={() => handleDrawerItemClick("????????????????????????????")}>
            <ListItemIcon><PlaylistAddCheck color="primary" /></ListItemIcon>
            <ListItemText primary="???????? ????????????????????" />
          </ListItem>
          <ListItem button key="????????????" onClick={() => handleDrawerItemClick("????????????")}>
            <ListItemIcon><Dashboard color="primary" /></ListItemIcon>
            <ListItemText primary="????????????" />
          </ListItem>
          <ListItem button key="??????????????????" onClick={() => handleDrawerItemClick("??????????????????")}>
            <ListItemIcon><SettingsIcon color="primary" /></ListItemIcon>
            <ListItemText primary="??????????????????" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <Tabs />
        <TabContent />
      </main>
    </div>
  );
}

const store = createStore(rootReducer, compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : compose
));

// const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
  ,
  document.getElementById('root')
);