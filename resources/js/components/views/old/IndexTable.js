import { faBars, faFolder, faFolderOpen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import React, { useRef, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addPane, addRow, changeFolder, deleteRow, toggleFolder } from '../../redux/actions/actions';
import styled from 'styled-components';
import { Modal, Form, Container } from 'bootstrap-4-react';
import InputStack from './InputStack';
import { useWindowSize } from '../../hooks/window.size.hook';
import { useDateFormat } from '../../hooks/date.format.hook';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { StickyFooter } from 'bootstrap-4-react/lib/components';

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
    position: 'sticky',
    top: 0,
    backgroundColor: 'white'
  },
}));

const StyledRow = styled.tr`
    background: ${props => props.isDragging ? "WhiteSmoke" : props.combineTargetFor && props.isGroup ? "silver" : "white"};  
    &:hover {
      background: WhiteSmoke;
      cursor: pointer;
    }
`;

const StyledCell = styled.td`
    padding-left: ${props => String(props.level * 2) + 'rem!important'}
`;

const StyledTrashIcon = styled(FontAwesomeIcon)`
    visibility:hidden!important;
    ${StyledRow}:hover & {
      visibility: visible!important;
    }
`;

const ButtonGroupWrapper = styled(Container)`
  & {
    position: sticky;
    top: 0px!important;
    padding: 8px 0 8px 0!important;
  }
`
const TblHeader = styled.div`
  & {
    padding-right: ${props => String(props.scrollWidth) + 'px'};
    overflow: auto;
  }
  & > table {
    table-layout: fixed;
  }
`
const TblContent = styled.div`
  & {
    overflow:auto;
    height: ${props => String(props.height) + 'px'};
  }
  & > table {
    table-layout: fixed;
  }
`
const IndexTable = ({ columns, editInfo }) => {

  const dispatch = useDispatch();
  const { activeTab: tabIndex } = useSelector(state => state.app);
  const data = useSelector(state => state.app.panes[tabIndex].data);
  const [newGroup, setNewGroup] = useState({ isGroup: 1, parent_id: null, Наименование: "" });
  const tblRef = useRef(null);
  const windowSize = useWindowSize();

  const classes = useStyles();

  let scrollWidth = 8;
  if (tblRef.current) {
    const tblCs = window.getComputedStyle(tblRef.current, null);
    scrollWidth = parseInt(windowSize.width, 10) - 270 - parseInt(tblCs.width, 10);
  }

  const createOrder = (parent_id, level) => {
    data.map(row => {
      if (row.parent_id === parent_id) {
        const { id, parent_id, isGroup, isExpanded } = row;
        order.push({ id, parent_id, isGroup, isExpanded, level });
        if (row.isExpanded) {
          createOrder(id, level + 1);
        }
      }
    })
  }
  const order = [];
  createOrder(null, 0);

  const handleClick = (id, name) => (e) => {
    dispatch(addPane('tab', name, editInfo.api + '/' + String(id), editInfo.component));
  }

  const handleDelete = (id) => (e) => {
    e.stopPropagation();
    const row_ids = [id].concat(getRowIdsToDelete(id));
    dispatch(deleteRow(tabIndex, row_ids));
  }

  const handleFolderClick = (id) => {
    dispatch(toggleFolder(tabIndex, id))
  }

  const handleCreate = () => {
    dispatch(addPane('tab', editInfo.newTabName, editInfo.api + '.create', editInfo.component));
  }

  const handleCreateGroup = () => {
    dispatch(addRow(tabIndex, newGroup));
  }

  const getRowIdsToDelete = (parent_id) => {
    const result = [];
    data.map(row => {
      if (row.parent_id === parent_id) {
        result.push(row.id);
        if (row.isGroup) {
          Array.prototype.push.apply(result, getRowIdsToDelete(row.id));
        }
      }
    });
    return result;
  }

  const onDragEnd = result => {
    const { source, combine, destination } = result;
    if (!combine && !destination) return;
    const start = data.find(row => row.id === order[source.index].id);
    const finish = combine
      ? data.find(row => row.id === Number(combine.draggableId))
      : data.find(row => row.id === order[destination.index].id);
    const parent_id = finish.isGroup ? finish.id : finish.parent_id;
    console.log(parent_id);
    Axios.put('api/clients/' + String(start.id), { parent_id })
      .then(response => {
        if (response.status === 200) {
          console.log(response.data);
          dispatch(changeFolder(tabIndex, start.id, parent_id));
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  const createGroupOnChange = (e) => {
    setNewGroup({ ...newGroup, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary.light"
          onClick={handleCreate}>
          Создать
        </Button>
        <Button
          variant="contained"
          color="primary"
          data-toggle="modal"
          data-target="#exampleModal">
          Создать группу
        </Button>
      </div>

      <TblHeader scrollWidth={scrollWidth}>
        <table className="table tbl-header">
          <colgroup>
            {columns.map((column, i) => <col key={i} width={column.width} />)}
            <col width="50px" />
          </colgroup>
          <thead className="border-0">
            <tr >
              {columns.map((column, i) => <th key={i} >{column.header}</th>)}
              <th ><FontAwesomeIcon icon={faTrashAlt} /></th>
            </tr>
          </thead>
        </table>
      </TblHeader>
      <TblContent height={(windowSize.height - 270) || ''} className="tbl-content">
        <table ref={tblRef} className="table">
          <colgroup>
            {columns.map((column, i) => <col key={i} width={column.width} />)}
            <col width="50px" />
          </colgroup>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="rows" isCombineEnabled>
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {order.map((row, i) => {
                    const dataRow = data.find(item => item.id === row.id);
                    return (
                      <Draggable key={row.id} draggableId={String(row.id)} index={i}>
                        {(provided, snapshot) => (
                          row.isGroup
                            ?
                            <StyledRow
                              key={i}
                              ref={provided.innerRef}
                              isDragging={snapshot.isDragging}
                              combineTargetFor={snapshot.combineTargetFor}
                              isGroup
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              {columns.map((column, i) => {
                                if (column.primary) {
                                  return (
                                    <StyledCell
                                      level={row.level}
                                      key={i}
                                      onClick={() => handleFolderClick(row.id)}>
                                      <FontAwesomeIcon className="text-warning mr-2" size="lg" icon={row.isExpanded ? faFolderOpen : faFolder} />
                                      {dataRow.Наименование}
                                    </StyledCell>)
                                } else {
                                  return <td key={i}></td>
                                }
                              }
                              )}
                              <td> <StyledTrashIcon icon={faTrashAlt} onClick={handleDelete(row.id)} /> </td>
                            </StyledRow>
                            :
                            <StyledRow
                              key={i}
                              isDragging={snapshot.isDragging}
                              combineTargetFor={snapshot.combineTargetFor}
                              onClick={handleClick(row.id, dataRow.Наименование)}
                              style={{ color: snapshot.isDragging ? 'red' : 'white' }}
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}>
                              {columns.map((column, i) => {
                                if (column.primary) {
                                  return (
                                    <StyledCell
                                      key={i}
                                      level={row.level}>
                                      <FontAwesomeIcon className="mr-2 " size="xs" icon={faBars} />
                                      {dataRow.Наименование}
                                    </StyledCell>)
                                } else {
                                  if (column.function) {
                                    return <td key={i}>{column.function(dataRow[column.key])}</td>
                                  } else {
                                    return <td key={i}>{dataRow[column.key]}</td>
                                  }
                                }
                              }
                              )}
                              <td> <StyledTrashIcon icon={faTrashAlt} onClick={handleDelete(row.id)} /> </td>
                            </StyledRow>
                        )}
                      </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </tbody>
              )}

            </Droppable>
          </DragDropContext>
        </table>
      </TblContent>
      <Modal id="exampleModal" fade>
        <Modal.Dialog>
          <Modal.Content>
            <Modal.Header>
              <Modal.Title>Новая группа</Modal.Title>
              <Modal.Close>
                <span aria-hidden="true">&times;</span>
              </Modal.Close>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <InputStack prepend="Наименование" _name="Наименование" type="text" value={newGroup.Наименование} onChange={createGroupOnChange} />
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button secondary data-dismiss="modal">Закрыть</Button>
              <Button success data-dismiss="modal" onClick={handleCreateGroup}>ОК</Button>
            </Modal.Footer>
          </Modal.Content>
        </Modal.Dialog>
      </Modal>
    </>
  );
}

export default IndexTable;