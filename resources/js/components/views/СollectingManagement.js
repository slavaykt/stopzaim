import React, { useContext, useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import LinearProgress from '@material-ui/core/LinearProgress';
import { useSelector } from 'react-redux';
import { TabContext } from '../context';
import { Save as SaveIcon, ExpandLess, ExpandMore } from '@material-ui/icons';
import axios from 'axios';
import { List, ListItem, ListItemText, ListItemIcon, Checkbox, Collapse, FormControlLabel, makeStyles, Switch, Typography, AppBar } from '@material-ui/core';
import ExtendableButton from './ExtendableButton';
import Transition from 'react-transition-group/Transition';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  appbar: {
    padding: theme.spacing(2),
  },
  nested: {
    paddingLeft: theme.spacing(6),
  },
  checked: {
    paddingLeft: theme.spacing(6),
    textDecoration: 'line-through',
    color: 'grey',
  },
}));

const duration = 500;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0, display: 'none' },
  entered: { opacity: 1, display: 'block' },
  exited: { opacity: 0, display: 'none' },
};

function ListItem_({ item, handleCheck, showChecked }) {
  const [open, setOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <ListItem button divider onClick={() => setOpen(!open)}>
        {open ? <ExpandLess /> : <ExpandMore />}
        <ListItemText primary={item.Клиент} />
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {item.children.map((el, i) => {
          const label = el.Тип === 'Справка о задолженности'
            ?
            `${el.Тип} ${el.Кредитор.Наименование} по ${el.ОснованиеВозникновения}`
            :
            el.Тип;
          return (
            <Transition in={showChecked ? true : !el.Наличие} timeout={duration}>
              {(state) => (
                <div style={{
                  ...defaultStyle,
                  ...transitionStyles[state]
                }}>
                  <ListItem key={i} divider className={!!el.Наличие ? classes.checked : classes.nested}>
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        color="primary"
                        checked={!!el.Наличие}
                        tabIndex={-1}
                        onClick={() => handleCheck(item.Клиент, el.id)}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={label} />
                  </ListItem>
                </div>
              )}
            </Transition>
          )
        })}
      </Collapse>
    </>
  )
}

function СollectingManagement() {
  const { tabId } = useContext(TabContext);
  const { api } = useSelector(state => state.app.getTab(tabId));
  const [{ data: fetchedData, loading, error: fetchError }, refetch] = useAxios(api);
  const [data, setData] = useState(null);
  const [showChecked, setShowChecked] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    if (fetchedData) {
      const groupedData = fetchedData.reduce((result, item) => {
        let newResult = [...result];
        let clientIndex = result.findIndex(el => el.Клиент === item.Клиент.Наименование);
        if (clientIndex >= 0) {
          newResult[clientIndex].children = newResult[clientIndex].children.concat(item);
        } else {
          newResult = newResult.concat({ Клиент: item.Клиент.Наименование, children: [item] });
        }
        return newResult;
      }, []);
      setData(groupedData.sort((a, b) => {
        if (a.Клиент < b.Клиент) return -1;
        if (a.Клиент > b.Клиент) return 1;
      }));
    }
  }, [fetchedData])

  console.log(data);

  const handleCheck = (client, id) => {
    const newData = data.map(item =>
      item.Клиент === client
        ?
        {
          ...item, children: item.children.map(el =>
            el.id === id
              ?
              { ...el, Наличие: !el.Наличие, modified: true }
              :
              el
          )
        }
        :
        item
    );
    setData(newData);
  }

  const handleSubmit = async () => {
    const res = await axios.post(api, data);
    if (res.status === 200) {
      console.log('успешно записано!');
    }
  }

  if (!data) {
    return <LinearProgress />
  }

  return (
    <>
      <AppBar color="inherit" position="sticky" className={classes.appbar}>
        <h3>Контроль сбора документов</h3>
        <div className={classes.buttonGroup}>
          <ExtendableButton
            variant="contained"
            startIcon={<SaveIcon color="primary" />}
            onClick={() => handleSubmit()}
          >
            <Typography variant="body2">Записать</Typography>
          </ExtendableButton>
          <FormControlLabel
            control={
              <Switch
                checked={showChecked}
                color="primary"
                onChange={() => setShowChecked(!showChecked)} />
            }
            label="Показать отмеченные"
          />
        </div>
      </AppBar>

      <List>
        {data.map((item, i) =>
          <ListItem_
            key={i}
            item={item}
            handleCheck={handleCheck}
            showChecked={showChecked} />
        )}
      </List>
    </>
  );
}

export default СollectingManagement;