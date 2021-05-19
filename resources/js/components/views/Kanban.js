import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import useAxios from 'axios-hooks';
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { addTab, changeKanbanStage, loadData } from '../../redux/actions/actions';
import { TabContext } from '../context';
import { Save } from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import { useWindowSize } from '../../hooks/window.size.hook';
import axios from 'axios';
import ExtendableButton from './ExtendableButton';

const useStyles = makeStyles((theme) => ({
  buttonGroup: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

function Kanban(props) {
  const dispatch = useDispatch();
  const tabContext = useContext(TabContext);
  const { tabId } = tabContext;
  const { data, sourceTabId, api } = useSelector(state => state.app.getTab(tabId));
  const [{ data: fetchedData, loading, error: fetchError }, refetch] = useAxios(api, { useCache: false });
  const [saving, setSaving] = useState(false);
  const classes = useStyles();

  const { tabContentSize } = useWindowSize();

  useEffect(() => {
    if (fetchedData) {
      dispatch(loadData(tabId, fetchedData));
    }
  }, [fetchedData]);

  const stages = data
    ?
    [
      { id: 'nostage', label: 'не распределены', value: '', color:"#929191", data: data.filter(el => el.Этап === '') },
      { id: 'lead', label: 'потенциальный клиент', value: 'потенциальный клиент', color:"#3f51b5", data: data.filter(el => el.Этап === 'потенциальный клиент') },
      { id: 'preparation', label: 'подготовка документов', value: 'подготовка документов', color:"#af9e0b", data: data.filter(el => el.Этап === 'подготовка документов') },
      { id: 'applied', label: 'заявление подано', value: 'заявление подано', color:"#439ce3", data: data.filter(el => el.Этап === 'заявление подано') },
      { id: 'restructure', label: 'реструктуризация долгов', value: 'реструктуризация долгов', color:"#795548", data: data.filter(el => el.Этап === 'реструктуризация долгов') },
      { id: 'sale', label: 'реализация имущества', value: 'реализация имущества', color:"#9c27b0", data: data.filter(el => el.Этап === 'реализация имущества') },
      { id: 'suspended', label: 'банкротство приостановлено', value: 'банкротство приостановлено', color:"#f3296e", data: data.filter(el => el.Этап === 'банкротство приостановлено') },
      { id: 'finished', label: 'банкротство завершено', value: 'банкротство окончено', color:"#17b766", data: data.filter(el => el.Этап === 'банкротство окончено') },
    ]
    :
    [];

  const onDragEnd = result => {
    const { source, combine, destination } = result;
    console.log(source, destination);
    const sourceStage = stages.find(el => el.id === source.droppableId);
    const destinationStage = stages.find(el => el.id === destination.droppableId);
    if (sourceStage && destinationStage) {
      dispatch(changeKanbanStage(tabId, sourceStage.data[source.index].id, 'Этап', destinationStage.value))
    }
  };

  const handleSubmit = async () => {
    const response = await axios.put('api/kanban', { ...data });
  }

  const handleDoubleClick = (id, name) => {
    dispatch(addTab(name, 'api/clients/' + String(id), 'ClientEdit', tabId));
  }

  if (!data || loading) return <LinearProgress />

  return (
    <>
      <div className={classes.buttonGroup}>
        <ExtendableButton
          variant="contained"
          startIcon={<Save style={{ color: green[800] }} />}
          onClick={handleSubmit}
        >
          <Typography variant="body2">Записать</Typography>
        </ExtendableButton>
      </div>
      <div style={{ display: "flex", justifyContent: "center", height: "100%" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {stages.map(stage =>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "left"
              }}
              key={stage.id}
            >
              <div style={{ margin: 4, width: 150 }}>
                <div style={{ height: 45, background: "#d9e1ff" }}>
                  <Typography variant="subtitle2" align="center">
                    {stage.label}
                  </Typography>
                </div>
                <Droppable droppableId={stage.id}>
                  {(provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={{
                        background: snapshot.isDraggingOver
                          ? "#a0a9eb"
                          : "#d9e1ff",
                        padding: 4,
                        width: '100%',
                        height: tabContentSize.height-170,
                        overflow: 'auto'
                      }}
                    >
                      {stage.data.map((item, i) =>
                        <Draggable key={item.id} draggableId={String(item.id)} index={i}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={{
                                userSelect: "none",
                                padding: 10,
                                margin: "0 0 8px 0",
                                minHeight: "30px",
                                fontSize: 12,
                                backgroundColor: snapshot.isDragging
                                  ? "#ff9800"
                                  : stage.color,
                                color: "white",
                                ...provided.draggableProps.style
                              }}
                              onDoubleClick={() => handleDoubleClick(item.id, item.Наименование)}
                            >
                              {item.Наименование}
                            </div>
                          )}
                        </Draggable>
                      )}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>

            </div>
          )}
        </DragDropContext>
      </div>
    </>
  );
}

export default Kanban;