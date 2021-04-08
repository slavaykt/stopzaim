import { Col, Row, Button, InputGroup, Form } from 'bootstrap-4-react';
import { Modal } from 'react-bootstrap';
import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useAddress } from '../../hooks/address.hook';
import { changeData } from '../../redux/actions/actions';

const StyledSuggestionLink = styled.a`
  && {
    display: block;
    color: black;
    padding: 12px 16px;
    text-decoration: none;
    &:hover {
      background-color: WhiteSmoke;
      text-decoration: none;
      color: black;
    }
    &:focus {
      background-color: WhiteSmoke;
      text-decoration: none;
      color: black;
    }

  }
`

const StyledInputWrapper = styled.div`
  &&{
    position: relative;
    width: 100%;
  }
`;

const Suggestions = styled.div`
  && {
    position: absolute;
    z-index: 1;
    background-color: white;
    display: none;
    color: red;
    border: 1px solid silver;
    margin-top: 2px;
    width: 100%
  }   
  ${StyledInputWrapper}:focus-within & {
    display: block;
  }
  &:target {
    display: none;
  } 
`;

const StyledInputGroup = styled(InputGroup)`
    && {
      flex-wrap: nowrap;
    }  
`;

const StyledInputPrepend = styled(InputGroup.Prepend)`
    && {
      width:35%;
    }  
`;

const AddressComponent = (props) => {

  const dispatch = useDispatch();
  const { activeTab: tabIndex } = useSelector(state => state.app);
  const [data, setData] = useState(props.data);
  const [showModal, setShowModal] = useState(false);
  const [suggestions, setSuggestions] = useState({ region: [], area: [], city: [], settlement: [], street: [], house: [] });
  const { AddressSuggestions } = useAddress();
  const refs = {
    регион: useRef(null),
    район: useRef(null),
    город: useRef(null),
    населенныйПункт: useRef(null),
    улица: useRef(null),
    дом: useRef(null),
  };

  const getAddressSuggestions = async (queryString, type, locations) => {
    const response = await AddressSuggestions(queryString, type, locations);
    setSuggestions(
      {
        ...suggestions, [type]: response.suggestions.map(item => {
          return { viewName: item.value, searchName: item.data[type], zip: item.data.postal_code }
        })
      }
    )
  }

  const inputOnChange = (e) => {
    if (['корпус', 'квартира', 'индекс'].includes(e.target.name)) {
      setData({ ...data, [e.target.name]: e.target.value });
    } else {
      setData({ ...data, [e.target.name]: { viewName: e.target.value, searchName: "" } });
    }
    if (e.target.name === 'регион') {
      getAddressSuggestions(e.target.value, 'region', []);
    } else if (e.target.name === 'район') {
      getAddressSuggestions(e.target.value, 'area', [{ 'region': data.регион.searchName }]);
    } else if (e.target.name === 'город') {
      getAddressSuggestions(e.target.value, 'city', [{ 'region': data.регион.searchName, 'area': data.район.searchName }]);
    } else if (e.target.name === 'населенныйПункт') {
      getAddressSuggestions(e.target.value, 'settlement', [{ 'region': data.регион.searchName, 'area': data.район.searchName, 'city': data.город.searchName }]);
    } else if (e.target.name === 'улица') {
      getAddressSuggestions(e.target.value, 'street', [{ 'region': data.регион.searchName, 'area': data.район.searchName, 'city': data.город.searchName, 'settlement': data.населенныйПункт.searchName }]);
    } else if (e.target.name === 'дом') {
      getAddressSuggestions(e.target.value, 'house', [{ 'region': data.регион.searchName, 'area': data.район.searchName, 'city': data.город.searchName, 'settlement': data.населенныйПункт.searchName, 'street': data.улица.searchName }]);
    }
  }

  const handleSubmit = (e) => {
    dispatch(changeData(tabIndex, 'Адрес', { ...data }));
    setShowModal(false);
  }

  const getAddressString = () => {
    let addressString = "";
    if (data.индекс) {
      addressString += data.индекс + ", ";
    }
    if (data.регион.viewName) {
      addressString += data.регион.viewName + ", ";
    }
    if (data.район.viewName) {
      addressString += data.район.viewName + ", ";
    }
    if (data.город.viewName) {
      addressString += data.город.viewName + ", ";
    }
    if (data.населенныйПункт.viewName) {
      addressString += data.населенныйПункт.viewName + ", ";
    }
    if (data.улица.viewName) {
      addressString += data.улица.viewName + ", ";
    }
    if (data.дом.viewName) {
      addressString += 'дом ' + data.дом.viewName + ", ";
    }
    if (data.корпус) {
      addressString += 'корп. ' + data.корпус + ", ";
    }
    if (data.квартира) {
      addressString += 'кв. ' + data.квартира + ", ";
    }
    return addressString.substring(0, addressString.length - 2) || 'заполнить';
  }

  const handleSuggestionClick = (suggestion) => (e) => {
    if (e.target.name === 'дом') {
      const [house, building] = suggestion.searchName.split('/');
      setData({ ...data, дом: { viewName: house, searchName: suggestion.searchName }, корпус: building ? building : "", индекс: suggestion.zip });
    } else {
      setData({ ...data, [e.target.name]: suggestion });
    }
  }

  const handleKeyDown = (e) => {

    if (!e.target.href) {
      if (e.key === 'ArrowDown') {
        refs[e.target.name].current.querySelector('a').focus();
      }
    } else {
      if (e.key === 'ArrowDown') {
        if (e.target.nextElementSibling) {
          e.target.nextElementSibling.focus();
        }
      } else if (e.key === 'ArrowUp') {
        if (e.target.previousElementSibling) {
          e.target.previousElementSibling.focus();
        }
      }
    }

  }

  return (
    <>
      <>
        Адрес &nbsp;
        <a href="#" onClick={() => setShowModal(true)}>
          {getAddressString()}
        </a>
      </>
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Адрес</Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <Row mb="2">
            <Col>
              <StyledInputGroup>
                <StyledInputPrepend>
                  <InputGroup.Text className="border-0 bg-white"> Регион </InputGroup.Text>
                </StyledInputPrepend>
                <StyledInputWrapper >
                  <Form.Input name="регион" type="text" value={data.регион.viewName} onChange={inputOnChange} onKeyDown={handleKeyDown} autoComplete="off" />
                  <Suggestions id="region" ref={refs.регион} onKeyDown={handleKeyDown}>
                    {suggestions.region.map((region, i) =>
                      <StyledSuggestionLink key={i} href="#region" name="регион" onClick={handleSuggestionClick({ ...region })}>
                        {region.viewName}
                      </StyledSuggestionLink>)}
                  </Suggestions>
                </StyledInputWrapper>
              </StyledInputGroup>
            </Col>
          </Row>
          <Row mb="2">
            <Col>
              <StyledInputGroup>
                <StyledInputPrepend>
                  <InputGroup.Text className="border-0 bg-white"> Район </InputGroup.Text>
                </StyledInputPrepend>
                <StyledInputWrapper >
                  <Form.Input name="район" type="text" value={data.район.viewName} onChange={inputOnChange} onKeyDown={handleKeyDown} autoComplete="off" />
                  <Suggestions id="area" ref={refs.район} onKeyDown={handleKeyDown}>
                    {suggestions.area.map((area, i) =>
                      <StyledSuggestionLink key={i} href="#area" name="район" onClick={handleSuggestionClick({ ...area })}>
                        {area.viewName}
                      </StyledSuggestionLink>)}
                  </Suggestions>
                </StyledInputWrapper>
              </StyledInputGroup>
            </Col>
          </Row>
          <Row mb="2">
            <Col>
              <StyledInputGroup>
                <StyledInputPrepend>
                  <InputGroup.Text className="border-0 bg-white"> Город </InputGroup.Text>
                </StyledInputPrepend>
                <StyledInputWrapper >
                  <Form.Input name="город" type="text" value={data.город.viewName} onChange={inputOnChange} onKeyDown={handleKeyDown} autoComplete="off" />
                  <Suggestions id="city" ref={refs.город} onKeyDown={handleKeyDown}>
                    {suggestions.city.map((city, i) =>
                      <StyledSuggestionLink key={i} href="#city" name="город" onClick={handleSuggestionClick({ ...city })}>
                        {city.viewName}
                      </StyledSuggestionLink>)}
                  </Suggestions>
                </StyledInputWrapper>
              </StyledInputGroup>
            </Col>
          </Row>
          <Row mb="2">
            <Col>
              <StyledInputGroup>
                <StyledInputPrepend>
                  <InputGroup.Text className="border-0 bg-white"> Населенный пункт </InputGroup.Text>
                </StyledInputPrepend>
                <StyledInputWrapper >
                  <Form.Input name="населенныйПункт" type="text" value={data.населенныйПункт.viewName} onChange={inputOnChange} onKeyDown={handleKeyDown} autoComplete="off" />
                  <Suggestions id="settlement" ref={refs.населенныйПункт} onKeyDown={handleKeyDown}>
                    {suggestions.settlement.map((settlement, i) =>
                      <StyledSuggestionLink key={i} href="#settlement" name="населенныйПункт" onClick={handleSuggestionClick({ ...settlement })}>
                        {settlement.viewName}
                      </StyledSuggestionLink>)}
                  </Suggestions>
                </StyledInputWrapper>
              </StyledInputGroup>
            </Col>
          </Row>
          <Row mb="2">
            <Col>
              <StyledInputGroup>
                <StyledInputPrepend>
                  <InputGroup.Text className="border-0 bg-white"> Улица </InputGroup.Text>
                </StyledInputPrepend>
                <StyledInputWrapper >
                  <Form.Input name="улица" type="text" value={data.улица.viewName} onChange={inputOnChange} onKeyDown={handleKeyDown} autoComplete="off" />
                  <Suggestions id="street" ref={refs.улица} onKeyDown={handleKeyDown}>
                    {suggestions.street.map((street, i) =>
                      <StyledSuggestionLink key={i} href="#street" name="улица" onClick={handleSuggestionClick({ ...street })}>
                        {street.viewName}
                      </StyledSuggestionLink>)}
                  </Suggestions>
                </StyledInputWrapper>
              </StyledInputGroup>
            </Col>
          </Row>
          <Row mb="2">
            <Col >
              <StyledInputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Дом </InputGroup.Text>
                </InputGroup.Prepend>
                <StyledInputWrapper >
                  <Form.Input name="дом" type="text" value={data.дом.viewName} onChange={inputOnChange} onKeyDown={handleKeyDown} autoComplete="off" />
                  <Suggestions id="house" ref={refs.дом} onKeyDown={handleKeyDown}>
                    {suggestions.house.map((house, i) =>
                      <StyledSuggestionLink key={i} href="#house" name="дом" onClick={handleSuggestionClick({ ...house })}>
                        {house.viewName}
                      </StyledSuggestionLink>)}
                  </Suggestions>
                </StyledInputWrapper>
              </StyledInputGroup>
            </Col>
            <Col >
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Корпус </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="корпус" type="text" value={data.корпус} onChange={inputOnChange} autoComplete="off" />
              </InputGroup>
            </Col>
            <Col >
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Квартира </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="квартира" type="text" value={data.квартира} onChange={inputOnChange} autoComplete="off" />
              </InputGroup>
            </Col>
          </Row>
          <Row mb="2">
            <Col col="6">
              <StyledInputGroup>
                <StyledInputPrepend>
                  <InputGroup.Text className="border-0 bg-white"> Индекс </InputGroup.Text>
                </StyledInputPrepend>
                <Form.Input name="индекс" type="text" value={data.индекс} onChange={inputOnChange} autoComplete="off" />
              </StyledInputGroup>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button secondary onClick={() => setShowModal(false)}>Закрыть</Button>
          <Button success onClick={handleSubmit}>Сохранить</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddressComponent;