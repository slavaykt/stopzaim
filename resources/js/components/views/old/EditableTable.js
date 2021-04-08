import { faGripLines, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import React, { useContext, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { addCollectionRow, addPane, addRow, changeCollectionData, changeData, changeFolder, deleteCollectionRow, deleteRow, reorderTable, toggleFolder } from '../../redux/actions/actions';
import styled from 'styled-components';
import { Button, ButtonGroup, Modal, Form, Container, InputGroup } from 'bootstrap-4-react';
import { useWindowSize } from '../../hooks/window.size.hook';
import { TabContext } from '../context';

const StyledRow = styled.tr`
    background: ${props => props.isDragging ? "WhiteSmoke" : props.combineTargetFor && props.isGroup ? "silver" : "white"};  
`;

const StyledCell = styled.td`
`;

const StyledTrashIcon = styled(FontAwesomeIcon)`
    visibility:hidden!important;
    ${StyledCell}:hover & {
      visibility: visible!important;
      cursor: pointer;
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
const EditableTable = ({ columns }) => {

  const dispatch = useDispatch();
  const { tabIndex } = useContext(TabContext);
  const { data, default: def } = useSelector(state => state.app.panes[tabIndex].data);
  const tblRef = useRef(null);
  const windowSize = useWindowSize();

  let scrollWidth = 8;
  if (tblRef.current) {
    const tblCs = window.getComputedStyle(tblRef.current, null);
    scrollWidth = parseInt(windowSize.width, 10) - 270 - parseInt(tblCs.width, 10);
  }

  data.sort((prev, next) => prev.Порядок - next.Порядок);

  const onDragEnd = result => {
    const { source, destination } = result;
    if (!destination) return;
    dispatch(reorderTable(tabIndex, data[source.index].Порядок, data[destination.index].Порядок));
  };

  const handleDefault = () => {
    const newData = data.map(row => {
      if (row.id) {
        return { ...row, delete: true }
      }
    });
    dispatch(changeData(tabIndex, 'data', newData));
    def.map(row => {
      dispatch(addCollectionRow(tabIndex, 'data', { ...row, id: null }))
    })
  }

  const collectionInputOnChange = (e) => {
    const [collection, index, name] = e.target.name.split('.');
    dispatch(changeCollectionData(tabIndex, collection, index, name, e.target.value));
  }

  const handleDeleteRow = (collection, index) => {
    dispatch(deleteCollectionRow(tabIndex, collection, index));
  }

  const handleSubmit = () => {
    Axios.post('api/attachment/sections', { data })
      .then(response => {
        if (response.status === 201) {
          console.log('request', response.data);
          // dispatch(changeData(tabIndex, 'id', response.data.id));
        }
      });
  }

  return (
    <>
      <ButtonGroupWrapper fluid className="sticky-top bg-white" >
        <ButtonGroup className="mb-2" >
          <Button className="btn btn-secondary mr-2" onClick={handleDefault}>Заполнить по умолчанию</Button>
          <Button className="btn btn-secondary mr-2" onClick={handleSubmit}>Сохранить</Button>
        </ButtonGroup>
      </ButtonGroupWrapper>
      <TblHeader scrollWidth={scrollWidth}>
        <table className="table tbl-header">
          <colgroup>
            <col width="50px" />
            {columns.map((column, i) => <col key={i} width={column.width} />)}
            <col width="50px" />
          </colgroup>
          <thead className="border-0">
            <tr >
              <th></th>
              {columns.map((column, i) => <th key={i} >{column.header}</th>)}
              <th ><FontAwesomeIcon icon={faTrashAlt} /></th>
            </tr>
          </thead>
        </table>
      </TblHeader>
      <TblContent height={(windowSize.height - 300) || ''}>
        <table ref={tblRef} className="table">
          <colgroup>
            <col width="50px" />
            {columns.map((column, i) => <col key={i} width={column.width} />)}
            <col width="50px" />
          </colgroup>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="rows">
              {(provided) => (
                <tbody ref={provided.innerRef} {...provided.droppableProps}>
                  {data.map((row, rowIndex) => {
                    if (row.delete) return;
                    return (
                      <Draggable key={rowIndex} draggableId={String(rowIndex)} index={rowIndex}>
                        {(provided, snapshot) => (
                          <StyledRow
                            key={rowIndex}
                            isDragging={snapshot.isDragging}
                            combineTargetFor={snapshot.combineTargetFor}
                            style={{ color: snapshot.isDragging ? 'red' : 'white' }}
                            ref={provided.innerRef}
                            {...provided.draggableProps}>
                            <td className="p-0" {...provided.dragHandleProps}> <FontAwesomeIcon icon={faGripLines} /></td>
                            {columns.map((column, columnIndex) =>
                              <td key={columnIndex} className="p-0">
                                <textarea
                                  rows={5}
                                  name={`data.${rowIndex}.${column.key}`}
                                  className="border-0 bg-white w-100 overflow-hidden"
                                  value={row[column.key]}
                                  onChange={collectionInputOnChange}>
                                </textarea>
                              </td>
                            )}
                            <StyledCell> <StyledTrashIcon icon={faTrashAlt} onClick={() => handleDeleteRow('data', rowIndex)} /> </StyledCell>
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
    </>
  );
}

export default EditableTable;