import React, { useState } from 'react';
import { Col, Row, Button, ButtonGroup, Form, Nav, Tab, InputGroup } from 'bootstrap-4-react';
import Axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addModal, changeData } from '../../redux/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import 'react-dadata/dist/react-dadata.css';
import views from '../views/views';
import EditCollectionTable from './EditCollectionTable';

const StyledOverflowDiv = styled.div`
  && {
    overflow-x: auto;
  }    
`;

const StyledFormInput = styled(Form.Input)`
    background: white!important;  
`;

const EditForm = ({ layout }) => {

  const dispatch = useDispatch();
  const { activeTab: tabIndex } = useSelector(state => state.app);
  const data = useSelector(state => state.app.panes[tabIndex].data);
  const [activeTab, setActiveTab] = useState(0);

  console.log(data);
  // console.log(layout);

  const inputOnChange = (e) => {
    if (e.target.type === 'number') {
      const validate = /^\d+(\.\d{1,2})?$/;
      if (validate.test(e.target.value)) {
        // const formattedValue = new Intl.NumberFormat("ru-RU", {maximumFractionDigits : 2}).format(e.target.value)
        dispatch(changeData(tabIndex, e.target.name, e.target.value));
      }
    } else {
      dispatch(changeData(tabIndex, e.target.name, e.target.value));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.id) {

      Axios.put('api/clients/' + String(data.id), data)
        .then(response => {
          if (response.status === 200) {
            console.log(response.data);
          }
        });
    } else {
      Axios.post('api/clients', data)
        .then(response => {
          if (response.status === 201) {
            console.log('request', response.data);
            dispatch(changeData(tabIndex, 'id', response.data.id));
          }
        });
    }
  }

  const handlePrint = () => {
    window.open("/print/clients/" + data.id + "/application", '_blank');
  }


  const renderNode = (node, nodeIndex) => {
    return (
      <React.Fragment key={nodeIndex}>
        {
          node.type === 'tabPanel' &&
          <>
            <Nav tabs role="tablist">
              {node.children.map((tab, tabIndex) =>
                <Nav.ItemLink
                  key={tabIndex}
                  active={tabIndex === activeTab}
                  href="#"
                  onClick={() => setActiveTab(tabIndex)}>
                  {tab.header}
                </Nav.ItemLink>
              )}
            </Nav>
            <Tab.Content pt="1">
              <Tab.Pane show active>
                {node.children[activeTab].children &&
                  node.children[activeTab].children.map((childNode, childNodeIndex) => renderNode(childNode, childNodeIndex))}
              </Tab.Pane>
            </Tab.Content>
          </>
        }
        {
          node.type === 'row' &&
          <Row key={nodeIndex}>
            {node.children &&
              node.children.map((childNode, childNodeIndex) => renderNode(childNode, childNodeIndex))}
          </Row>
        }
        {
          node.type === 'col' &&
          <Col key={nodeIndex} col={String(node.size)}>
            {node.children &&
              node.children.map((childNode, childNodeIndex) => renderNode(childNode, childNodeIndex))}
          </Col>
        }
        {
          node.type === 'input' &&
          <InputGroup mb="2">
            <InputGroup.Prepend>
              <InputGroup.Text
                className="border-0 bg-white">
                {node.label}
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.Input
              name={node.key}
              readOnly={!!node.readOnly}
              type={node.inputType}
              value={data[node.key] || ''}
              onChange={inputOnChange} />
          </InputGroup>
        }
        {
          node.type === 'select' &&
          <InputGroup mb="2">
            <InputGroup.Prepend>
              <InputGroup.Text
                className="border-0 bg-white">
                {node.label}
              </InputGroup.Text>
            </InputGroup.Prepend>
            <Form.CustomSelect
              name={node.key}
              value={data[node.key] || ''}
              onChange={inputOnChange}>
              {node.options.map((option, i) =>
                <option
                  key={i}
                  value={option}>
                  {option}
                </option>
              )}
            </Form.CustomSelect>
          </InputGroup>
        }
        {
          node.type === 'modalComponent' &&
          renderModalComponent(node.componentName, data[node.key] || {})
        }
        {
          node.type === 'inputLink' &&
          <InputGroup mb="2">
            <InputGroup.Prepend>
              <InputGroup.Text
                className="border-0 bg-white">
                {node.label}
              </InputGroup.Text>
            </InputGroup.Prepend>
            <StyledFormInput
              name={node.key}
              readOnly
              id={'input'+nodeIndex}
              type="text"
              value={data[node.key] ? data[node.key].Наименование : ""}
              onChange={inputOnChange} />
            <InputGroup.Append>
              <InputGroup.Text
                onClick={() => handleLinkSelect(node.url, node.componentName, node.key)}>
                <FontAwesomeIcon icon={faPen} />
              </InputGroup.Text>
            </InputGroup.Append>
          </InputGroup>
        }
        {
          node.type === 'tableComponent' &&
          <StyledOverflowDiv>
            <EditCollectionTable
              columns={node.columns}
              collection={node.collection} />
          </StyledOverflowDiv>
        }
      </React.Fragment>
    )

  }

  const renderModalComponent = (componentName, modalData) => {
    const Component = views[componentName];
    return (
      <div className="p-2">
        <Component data={modalData} />
      </div>
    )
  }

  const handleLinkSelect = (url, componentName, target) => {
    dispatch(addModal(url, componentName, { tabIndex, target }));
  }

  return (
    <Form className="p-2" onSubmit={handleSubmit}>
      <ButtonGroup className="mb-1">
        <Button className="btn btn-secondary mr-2" type="submit">Записать</Button>
        <Button className="btn btn-secondary" onClick={handlePrint}>Печать</Button>
      </ButtonGroup>
      {layout.map((node, nodeIndex) => renderNode(node, nodeIndex))}
    </Form>
  )
}

export default EditForm;