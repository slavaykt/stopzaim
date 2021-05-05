import React from 'react';
import { Form, InputGroup } from 'bootstrap-4-react';
import { faPen, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addCollectionRow, addModal, changeCollectionData, deleteCollectionRow } from '../../redux/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ContentEditable from './ContentEditable';

const StyledTH = styled.th`
  && {
   padding: 0.5rem 0.5rem 0.5rem 1rem;
  }  
`;

const TrashTD = styled.td` 
    && {
      opacity: 0; 
      padding-left: 1rem;
     } 
    &:hover {
      opacity: 1;
    }
`;

const StyledHiddenTR = styled.tr`
    && {
      opacity: 0; 
    } 
    &:hover {
      opacity: 1;
    }
`;

const EditCollectionTable = ({ columns, collection }) => {

  const dispatch = useDispatch();
  const { activeTab: tabIndex } = useSelector(state => state.app);
  const data = useSelector(state => state.app.panes[tabIndex].data[collection]);
  const schema = useSelector(state => state.app.panes[tabIndex].data.schema[collection]);

  const handleChange = (rowIndex, onChangeHandler) => (e) => {
    dispatch(changeCollectionData(tabIndex, collection, rowIndex, e.target.name, e.target.value));
    if (onChangeHandler) {
      onChangeHandler(rowIndex, e.target.value);
    }
  }

  const handleLinkSelect = (rowIndex, target) => {
    dispatch(addModal('/api/companies', 'CompanySelect', { tabIndex, target, collection, rowIndex }));
  }

  const handleAddRow = () => {
    dispatch(addCollectionRow(tabIndex, collection, { ...schema }))
  }

  console.log('yes');

  const handleDeleteRow = (rowIndex) => {
    dispatch(deleteCollectionRow(tabIndex, collection, rowIndex));
  }


  return (
    <table className="table">
      <colgroup>
        {columns.map((column, colIndex) => <col key={colIndex} width={column.width} />)}
        <col width="50px" />
      </colgroup>
      <thead>
        <tr className="h-6">
          {columns.map((column, i) => <StyledTH key={i}>{column.header}</StyledTH>)}
          <StyledTH ><FontAwesomeIcon icon={faTrashAlt} /></StyledTH>
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => {
          if (row.delete) return false;
          return (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) =>
                <td key={colIndex} className="p-1">
                  {column.type === 'select' &&
                    <InputGroup>
                      <Form.CustomSelect
                        className="border-0"
                        name={column.key}
                        value={data[rowIndex][column.key] || ''}
                        onChange={handleChange(rowIndex, column.onChangeHandler)}>
                        {column.getOptionsFunction
                          ?
                          <>
                            {
                              column.getOptionsFunction().map((option, i) =>
                                <option key={i} value={option.value}>{option.view}</option>
                              )
                            }
                          </>
                          :
                          <>
                            {
                              column.options.map((option, i) =>
                                <option key={i} value={option}>{option}</option>
                              )
                            }
                          </>
                        }

                      </Form.CustomSelect>
                    </InputGroup>
                  }
                  {column.type === 'text' &&
                    <InputGroup>
                      <Form.Input
                        className="border-0"
                        name={column.key}
                        type="text"
                        value={data[rowIndex][column.key]}
                        onChange={handleChange(rowIndex, column.onChangeHandler)} />
                    </InputGroup>
                  }
                  {column.type === 'number' &&
                    <InputGroup>
                      <Form.Input
                        className="border-0"
                        name={column.key}
                        type="number"
                        step={column.step}
                        value={data[rowIndex][column.key]}
                        onChange={handleChange(rowIndex, column.onChangeHandler)} />
                    </InputGroup>
                  }
                  {column.type === 'date' &&
                    <InputGroup>
                      <Form.Input
                        className="border-0"
                        name={column.key}
                        type="date"
                        value={data[rowIndex][column.key]}
                        onChange={handleChange(rowIndex, column.onChangeHandler)} />
                    </InputGroup>
                  }
                  {
                    column.type === 'textarea' &&
                    <ContentEditable
                      tabIndex={tabIndex}
                      collection={collection}
                      rowIndex={rowIndex}
                      name={column.key}
                      value={data[rowIndex][column.key]} />

                  }
                  {column.type === 'relationship' &&
                    <InputGroup>
                      <Form.Input
                        className="border-0 bg-white"
                        readOnly
                        name={column.key}
                        type="text"
                        value={data[rowIndex][column.key] ? data[rowIndex][column.key].Наименование : ""}
                        onChange={handleChange(rowIndex, column.onChangeHandler)} />
                      <InputGroup.Append>
                        <InputGroup.Text onClick={() => handleLinkSelect(rowIndex, column.key)}><FontAwesomeIcon icon={faPen} /></InputGroup.Text>
                      </InputGroup.Append>
                    </InputGroup>
                  }
                </td>
              )}
              <TrashTD><FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteRow(rowIndex)} /></TrashTD>
            </tr>)
        })}
        <StyledHiddenTR >
          <td colSpan={columns.length + 1}><FontAwesomeIcon className="text-success" size="lg" icon={faPlusCircle} onClick={handleAddRow} /> </td>
        </StyledHiddenTR>
      </tbody>
    </table>
  )

}

export default EditCollectionTable