import { faFolder, faFolderOpen, faMinus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeCollectionData, changeData, closeModal } from '../../redux/actions/actions';

const StyledRow = styled.tr`
    &:hover {
      background: palegoldenrod;
      cursor: pointer;
    }
`;

function CompanySelect({ modalIndex }) {

  const dispatch = useDispatch();
  const { modals } = useSelector(state => state.app);
  const { source: { tabIndex, target, collection, rowIndex }, data: initialData } = modals[modalIndex];
  const [data, setData] = useState(initialData);

  // useEffect(() => {
  //   Axios.get('/api/companies')
  //     .then(response => setData(response.data.sort((prev, next) => next.isGroup - prev.isGroup)));
  // }, []);

  const createOrder = (parent_id, level) => {
    let order = [];
    data.map(row => {
      if (row.parent_id === parent_id) {
        const { id, parent_id, isGroup, isExpanded } = row;
        order.push({ id, parent_id, isGroup, isExpanded, level });
        if (row.isExpanded) {
          const subOrder = createOrder(id, level + 1);
          order = order.concat(subOrder);
        }
      }
    })
    return order;
  }

  const order = createOrder(null, 0);

  const handleFolderClick = (id) => {
    const newData = [...data];
    const row = newData.find(row => row.id === id);
    row.isExpanded = !row.isExpanded;
    setData(newData);
  }

  const handleSelect = (value) => {
    if (collection) {
      dispatch(changeCollectionData(tabIndex, collection, rowIndex, target, { ...value }));
    } else {
      dispatch(changeData(tabIndex, target, { ...value }));
    }
    handleClose();
  }

  const handleClose = () => {
    dispatch(closeModal());
  }

  return (
    <Modal size="lg" show={true} onHide={() => handleClose()}>
      <Modal.Header closeButton>
        <Modal.Title>Выбор контрагента:</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Наименование</th>
            </tr>
          </thead>
          <tbody>
            {order.map((row, i) => {
              const dataRow = data.find(item => item.id === row.id);
              const offset = { paddingLeft: `${row.level * 2}rem` };
              return (
                row.isGroup
                  ?
                  <StyledRow key={i}>
                    <td style={offset} onClick={() => handleFolderClick(row.id)}>
                      <FontAwesomeIcon className="text-warning mr-2" size="lg" icon={row.isExpanded ? faFolderOpen : faFolder} />
                      {dataRow.Наименование}
                    </td>
                  </StyledRow>
                  :
                  <StyledRow key={i}>
                    <td style={offset} onClick={() => handleSelect(dataRow)} >
                      <FontAwesomeIcon className="mr-2" size="sm" icon={faMinus} />
                      {dataRow.Наименование}
                    </td>
                  </StyledRow>
              )
            }

            )}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default CompanySelect;