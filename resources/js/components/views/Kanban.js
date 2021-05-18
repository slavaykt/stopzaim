import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import useAxios from 'axios-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { changeData, changeKanbanStage, loadData } from '../../redux/actions/actions';
import { TabContext } from '../context';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Fragment } from 'react';

const useStyles = makeStyles((theme) => ({

}));

function Kanban(props) {
  const dispatch = useDispatch();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const { data, sourceTabId, api } = useSelector(state => state.app.getTab(tabId));
  const [{ data: fetchedData, loading, error: fetchError }, refetch] = useAxios(api, { useCache: false });
  const [saving, setSaving] = useState(false);
  const classes = useStyles();

  useEffect(() => {
    if (fetchedData) {
      dispatch(loadData(tabId, fetchedData));
    }
  }, [fetchedData]);

  const stages = [
    { id: 'lead', value: 'потенциальный клиент' },
    { id: 'preparation', value: 'подготовка документов' },
    { id: 'applied', value: 'заявление подано' },
    { id: 'restructure', value: 'реструктуризация долгов' },
    { id: 'sale', value: 'реализация имущества' },
    { id: 'suspended', value: 'банкротство приостановлено' },
    { id: 'finished', value: 'банкротство окончено' },
  ];

  const onDragEnd = result => {
    const { source, combine, destination } = result;
    console.log(source, destination);
    const newStage = stages.find(el => el.id === destination.droppableId);
    if (newStage) {
      //dispatch(changeKanbanStage(tabId, source.index, 'Этап', newStage.value))
    }
  };

  

  if (!data || loading) return <LinearProgress />

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {stages.map(stage =>
        <Droppable droppableId={stage.id} key={stage.id}>
          {(provided) => (
            <Fragment >
              <Typography variant="body2">
                {stage.value}
              </Typography>
              <List ref={provided.innerRef} {...provided.droppableProps}>
                {data.filter(el => el.Этап === stage.value).map((item, i) =>
                  <Draggable key={item.id} draggableId={String(item.id)} index={i}>
                    {(provided, snapshot) => (
                      <ListItem
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <ListItemText primary={item.Наименование} />
                      </ListItem>
                    )}
                  </Draggable>
                )}
                {provided.placeholder}
              </List>
            </Fragment>
          )}
        </Droppable>
      )}
    </DragDropContext>
  );
}

export default Kanban;