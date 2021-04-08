import React, { useState } from 'react';
import { Col, Row, Button, ButtonGroup, Form, Nav, Tab, InputGroup } from 'bootstrap-4-react';
import Axios from 'axios';
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { addCollectionRow, changeCollectionData, changeData, deleteCollectionRow } from '../../redux/actions/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faPlusCircle, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import CompanySelect from './CompanySelect';
import 'react-dadata/dist/react-dadata.css';
import AddressComponent from './AddressComponent';
import Passport from './Passport';
import EditCollectionTable from './EditCollectionTable';

const StyledOverflowDiv = styled.div`
  && {
    overflow-x: auto;
  }    
`;

const StyledTH = styled.th`
  && {
   padding: 0.2rem;
  }  
`;

const StyledInputGroup = styled(InputGroup)`
  && {
   width: ${props => props.w + 'px'};
  }  
`;

const StyledFormInput = styled(Form.Input)`
    background: white!important;  
`;

const StyledHiddenTR = styled.tr`
    animation: 1s ${fadeIn} ease-out;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const TrashTD = styled.td`
    opacity: 0;  
    &:hover {
      opacity: 1;
    }
`;

const ClientEdit = () => {

  const dispatch = useDispatch();
  const { activeTab: tabIndex } = useSelector(state => state.app);
  const data = useSelector(state => state.app.panes[tabIndex].data);
  const [showCompanySelect, setShowCompanySelect] = useState(undefined);

  console.log(data);

  const inputOnChange = async (e) => {
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

  const collectionInputOnChange = (e) => {
    const [collection, index, name] = e.target.name.split('.');
    dispatch(changeCollectionData(tabIndex, collection, index, name, e.target.value));
  }

  const handleAddRow = (collection) => {
    dispatch(addCollectionRow(tabIndex, collection, { ...data.schema[collection], client_id: data.id }))
  }

  const handleDeleteRow = (collection, index) => {
    dispatch(deleteCollectionRow(tabIndex, collection, index));
  }

  const closeCompanySelect = () => {
    setShowCompanySelect(undefined);
  }

  const handleCompanySelect = (target, value) => {
    const [collection, index, name] = target.split('.');
    if (index) {
      dispatch(changeCollectionData(tabIndex, collection, index, name, value));
    } else {
      dispatch(changeData(tabIndex, target, value));
    }
    closeCompanySelect();
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

  const childrenColumns = [
    { header: 'ФИО', key: 'ФИО', type: 'text', width: '300px' },
    { header: 'Пол', key: 'Пол', type: 'select', width: '100px', options: [{ key: 'муж.', view: 'муж.' }, { key: 'жен.', view: 'жен.' }] },
    { header: 'Дата рождения', key: 'ДатаРождения', type: 'date', width: '150px' },
  ];

  return (
    <Form className="p-2" onSubmit={handleSubmit}>
      <ButtonGroup className="mb-1">
        <Button className="btn btn-secondary mr-2" type="submit">Записать</Button>
        <Button className="btn btn-secondary" onClick={handlePrint}>Печать</Button>
      </ButtonGroup>
      <Nav tabs role="tablist">
        <Nav.ItemLink active href="#main" id="main-tab" data-toggle="tab">
          Основное
        </Nav.ItemLink>
        <Nav.ItemLink href="#children" id="children-tab" data-toggle="tab">
          Дети
        </Nav.ItemLink>
        <Nav.ItemLink href="#bankAccounts" id="bank_accounts-tab" data-toggle="tab">
          Банковские счета
        </Nav.ItemLink>
        <Nav.ItemLink href="#creditors" id="creditors-tab" data-toggle="tab">
          Кредиторы
        </Nav.ItemLink>
        <Nav.ItemLink href="#executiveDocuments" id="executive-documents-tab" data-toggle="tab">
          Исполнительные документы
        </Nav.ItemLink>
        <Nav.ItemLink href="#taxes" id="taxes-tab" data-toggle="tab">
          Обязательные платежи
        </Nav.ItemLink>
      </Nav>
      <Tab.Content pt="1">
        <Tab.Pane id="main" show active>
          <Row>
            <Col col="2">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Код </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="id" readOnly type="text" value={data.id || ''} onChange={inputOnChange} />
              </InputGroup>
            </Col>
            <Col col="10">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Наименование </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="Наименование" type="text" value={data.Наименование} onChange={inputOnChange} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col col="4">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Фамилия </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="Фамилия" type="text" value={data.Фамилия} onChange={inputOnChange} />
              </InputGroup>
            </Col>
            <Col col="4">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Имя </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="Имя" type="text" value={data.Имя} onChange={inputOnChange} />
              </InputGroup>
            </Col>
            <Col col="4">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Отчество </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="Отчество" type="text" value={data.Отчество} onChange={inputOnChange} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Пол </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.CustomSelect name="Пол" value={data.Пол} onChange={inputOnChange}>
                  <option value="муж.">муж.</option>
                  <option value="жен.">жен.</option>
                </Form.CustomSelect>
              </InputGroup>
            </Col>
            <Col >
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Дата рождения </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="ДатаРождения" type="date" value={data.ДатаРождения} onChange={inputOnChange} />
              </InputGroup>
            </Col>
            <Col >
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Телефон </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="Телефон" type="text" value={data.Телефон} onChange={inputOnChange} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col col="6">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> ИНН </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="ИНН" type="text" value={data.ИНН} onChange={inputOnChange} />
              </InputGroup>
            </Col>
            <Col col="6">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> СНИЛС </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="СНИЛС" type="text" value={data.СНИЛС} onChange={inputOnChange} />
              </InputGroup>
            </Col>
          </Row>
          <Row style={{ paddingLeft: '13px' }}>
            <Passport data={data.Паспорт} />
          </Row>
          <Row className="mb-2" style={{ paddingLeft: '14px' }}>
            <AddressComponent data={data.Адрес} />
          </Row>
          <Row>
            <Col col="6">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Место рождения </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="МестоРождения" type="text" value={data.МестоРождения} onChange={inputOnChange} />
              </InputGroup>
            </Col>
            <Col col="6">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Налоговая </InputGroup.Text>
                </InputGroup.Prepend>
                <StyledFormInput name="Налоговая" readOnly type="text" value={data.Налоговая ? data.Налоговая.Наименование : ""} onChange={inputOnChange} />
                <InputGroup.Append>
                  <InputGroup.Text onClick={() => setShowCompanySelect('Налоговая')}><FontAwesomeIcon icon={faPen} /></InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col col="6">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Занятость </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.CustomSelect name="Занятость" value={data.Занятость} onChange={inputOnChange}>
                  <option value="Работает">Работает</option>
                  <option value="Безработный">Безработный</option>
                  <option value="Пенсионер">Пенсионер</option>
                  <option value="Работающий пенсионер">Работающий пенсионер</option>
                </Form.CustomSelect>
              </InputGroup>
            </Col>
            <Col col="6">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Доход за прошлый год </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="ДоходПрошлогоГода" type="number" step="0.01" value={data.ДоходПрошлогоГода} onChange={inputOnChange} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col >
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Место работы </InputGroup.Text>
                </InputGroup.Prepend>
                <StyledFormInput name="МестоРаботы" readOnly type="text" value={data.МестоРаботы ? data.МестоРаботы.Наименование : ""} onChange={inputOnChange} />
                <InputGroup.Append>
                  <InputGroup.Text onClick={() => setShowCompanySelect('МестоРаботы')}><FontAwesomeIcon icon={faPen} /></InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <Col >
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Должность </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="Должность" type="text" value={data.Должность} onChange={inputOnChange} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col >
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> СРО </InputGroup.Text>
                </InputGroup.Prepend>
                <StyledFormInput name="СРО" readOnly type="text" value={data.СРО ? data.СРО.Наименование : ""} onChange={inputOnChange} />
                <InputGroup.Append>
                  <InputGroup.Text onClick={() => setShowCompanySelect('СРО')}><FontAwesomeIcon icon={faPen} /></InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
            <Col >
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Арбитражный суд </InputGroup.Text>
                </InputGroup.Prepend>
                <StyledFormInput name="АрбитражныйСуд" readOnly type="text" value={data.АрбитражныйСуд ? data.АрбитражныйСуд.Наименование : ""} onChange={inputOnChange} />
                <InputGroup.Append>
                  <InputGroup.Text onClick={() => setShowCompanySelect('АрбитражныйСуд')}><FontAwesomeIcon icon={faPen} /></InputGroup.Text>
                </InputGroup.Append>
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col >
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Госуслуги </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="Госуслуги" type="text" value={data.Госуслуги} onChange={inputOnChange} />
              </InputGroup>
            </Col>
            <Col >
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Дата подачи заявления </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="ДатаПодачиЗаявления" type="date" value={data.ДатаПодачиЗаявления} onChange={inputOnChange} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> Комментарий </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="Комментарий" type="text" value={data.Комментарий} onChange={inputOnChange} />
              </InputGroup>
            </Col>
          </Row>
        </Tab.Pane>
        <Tab.Pane id="children" >
          <StyledOverflowDiv>
            <EditCollectionTable columns={childrenColumns} collection="Дети" />
          </StyledOverflowDiv>
        </Tab.Pane>
        <Tab.Pane id="bankAccounts" >
          <StyledOverflowDiv>
            <table className="table">
              <thead>
                <tr className="h-6">
                  <StyledTH rowSpan={2}>Вид счета</StyledTH>
                  <StyledTH rowSpan={2}>Валюта счета</StyledTH>
                  <StyledTH rowSpan={2}>Номер счета</StyledTH>
                  <StyledTH rowSpan={2}>Банк</StyledTH>
                  <StyledTH rowSpan={2}>Остаток</StyledTH>
                  <StyledTH rowSpan={2}>Дата открытия</StyledTH>
                  <StyledTH colSpan={2}>Выписка</StyledTH>
                  <StyledTH ><FontAwesomeIcon icon={faTrashAlt} /></StyledTH>
                </tr>
                <tr>
                  <StyledTH>с</StyledTH>
                  <StyledTH>по</StyledTH>
                </tr>
              </thead>
              <tbody>
                {data.БанковскиеСчета.map((row, i) => {
                  if (row.delete) return false;
                  return (
                    <tr key={i}>
                      <td className="p-1">
                        <StyledInputGroup w={150}>
                          <Form.CustomSelect className="border-0" name={`БанковскиеСчета.${i}.ВидСчета`} value={data.БанковскиеСчета[i].ВидСчета} onChange={collectionInputOnChange}>
                            <option value="текущий">текущий</option>
                            <option value="вклад">вклад</option>
                          </Form.CustomSelect>
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={150}>
                          <Form.CustomSelect className="border-0" name={`БанковскиеСчета.${i}.ВалютаСчета`} value={data.БанковскиеСчета[i].ВалютаСчета} onChange={collectionInputOnChange}>
                            <option value="руб.">руб.</option>
                          </Form.CustomSelect>
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={200}>
                          <Form.Input className="border-0" name={`БанковскиеСчета.${i}.НомерСчета`} type="text" value={data.БанковскиеСчета[i].НомерСчета} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={300}>
                          <StyledFormInput className="border-0" readOnly name={`БанковскиеСчета.${i}.Банк`} type="text" value={data.БанковскиеСчета[i].Банк ? data.БанковскиеСчета[i].Банк.Наименование : ""} onChange={collectionInputOnChange} />
                          <InputGroup.Append>
                            <InputGroup.Text onClick={() => setShowCompanySelect(`БанковскиеСчета.${i}.Банк`)}><FontAwesomeIcon icon={faPen} /></InputGroup.Text>
                          </InputGroup.Append>
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={150}>
                          <Form.Input className="border-0" name={`БанковскиеСчета.${i}.Остаток`} type="number" step="0.01" value={data.БанковскиеСчета[i].Остаток} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={180}>
                          <Form.Input className="border-0" name={`БанковскиеСчета.${i}.ДатаОткрытия`} type="date" value={data.БанковскиеСчета[i].ДатаОткрытия} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={180}>
                          <Form.Input className="border-0" name={`БанковскиеСчета.${i}.ВыпискаДатаНачала`} type="date" value={data.БанковскиеСчета[i].ВыпискаДатаНачала} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={180}>
                          <Form.Input className="border-0" name={`БанковскиеСчета.${i}.ВыпискаДатаОкончания`} type="date" value={data.БанковскиеСчета[i].ВыпискаДатаОкончания} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <TrashTD><FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteRow('БанковскиеСчета', i)} /></TrashTD>
                    </tr>)
                })}
                <StyledHiddenTR >
                  <td colSpan="6"><FontAwesomeIcon className="text-success" size="lg" icon={faPlusCircle} onClick={() => handleAddRow('БанковскиеСчета')} /> <hr style={{ display: 'inline' }} /> </td>
                </StyledHiddenTR>
              </tbody>
            </table>
          </StyledOverflowDiv>
        </Tab.Pane>
        <Tab.Pane id="creditors" >
          <StyledOverflowDiv>
            <table className="table">
              <thead>
                <tr className="h-6">
                  <StyledTH >Содержание обязательства</StyledTH>
                  <StyledTH >Кредитор</StyledTH>
                  <StyledTH >Основание возникновения</StyledTH>
                  <StyledTH >Сумма всего</StyledTH>
                  <StyledTH >в т.ч. задолженность</StyledTH>
                  <StyledTH >в т.ч. штрафы, пени</StyledTH>
                  <StyledTH ><FontAwesomeIcon icon={faTrashAlt} /></StyledTH>
                </tr>
              </thead>
              <tbody>
                {data.Кредиторы.map((row, i) => {
                  if (row.delete) return false;
                  return (
                    <tr key={i}>
                      <td className="p-1">
                        <StyledInputGroup w={150}>
                          <Form.CustomSelect className="border-0" name={`Кредиторы.${i}.СодержаниеОбязательства`} value={data.Кредиторы[i].СодержаниеОбязательства} onChange={collectionInputOnChange}>
                            <option value="кредит">кредит</option>
                            <option value="заем">заем</option>
                            <option value="кредитная карта">кредитная карта</option>
                          </Form.CustomSelect>
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={300}>
                          <StyledFormInput className="border-0" readOnly name={`Кредиторы.${i}.Кредитор`} type="text" value={data.Кредиторы[i].Кредитор ? data.Кредиторы[i].Кредитор.Наименование : ""} onChange={collectionInputOnChange} />
                          <InputGroup.Append>
                            <InputGroup.Text onClick={() => setShowCompanySelect(`Кредиторы.${i}.Кредитор`)}><FontAwesomeIcon icon={faPen} /></InputGroup.Text>
                          </InputGroup.Append>
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={300}>
                          <Form.Input className="border-0" name={`Кредиторы.${i}.ОснованиеВозникновения`} type="text" value={data.Кредиторы[i].ОснованиеВозникновения} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={150}>
                          <Form.Input className="border-0" name={`Кредиторы.${i}.СуммаВсего`} type="number" step="0.01" value={data.Кредиторы[i].СуммаВсего} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={150}>
                          <Form.Input className="border-0" name={`Кредиторы.${i}.СуммаЗадолженность`} type="number" step="0.01" value={data.Кредиторы[i].СуммаЗадолженность} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={150}>
                          <Form.Input className="border-0" name={`Кредиторы.${i}.ШтрафыПени`} type="number" step="0.01" value={data.Кредиторы[i].ШтрафыПени} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <TrashTD><FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteRow('Кредиторы', i)} /></TrashTD>
                    </tr>)
                })}
                <StyledHiddenTR >
                  <td colSpan="6"><FontAwesomeIcon className="text-success" size="lg" icon={faPlusCircle} onClick={() => handleAddRow('Кредиторы')} /> <hr style={{ display: 'inline' }} /> </td>
                </StyledHiddenTR>
              </tbody>
            </table>
          </StyledOverflowDiv>
        </Tab.Pane>
        <Tab.Pane id="executiveDocuments" >
          <StyledOverflowDiv>
            <table className="table">
              <thead>
                <tr className="h-6">
                  <StyledTH >Вид документа</StyledTH>
                  <StyledTH >Дата</StyledTH>
                  <StyledTH >Номер</StyledTH>
                  <StyledTH >Исполнитель</StyledTH>
                  <StyledTH >Содержание</StyledTH>
                  <StyledTH ><FontAwesomeIcon icon={faTrashAlt} /></StyledTH>
                </tr>
              </thead>
              <tbody>
                {data.ИсполнительныеДокументы.map((row, i) => {
                  if (row.delete) return false;
                  return (
                    <tr key={i}>
                      <td className="p-1">
                        <StyledInputGroup w={150}>
                          <Form.CustomSelect className="border-0" name={`ИсполнительныеДокументы.${i}.ВидДокумента`} value={data.ИсполнительныеДокументы[i].ВидДокумента} onChange={collectionInputOnChange}>
                            <option value="постановление">постановление</option>
                            <option value="судебный приказ">судебный приказ</option>
                            <option value="кредитная карта">исполнительный лист</option>
                          </Form.CustomSelect>
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={180}>
                          <Form.Input className="border-0" name={`ИсполнительныеДокументы.${i}.Дата`} type="date" value={data.ИсполнительныеДокументы[i].Дата} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={100}>
                          <Form.Input className="border-0" name={`ИсполнительныеДокументы.${i}.Номер`} type="text" value={data.ИсполнительныеДокументы[i].Номер} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={250}>
                          <Form.Input className="border-0" name={`ИсполнительныеДокументы.${i}.Исполнитель`} type="text" value={data.ИсполнительныеДокументы[i].Исполнитель} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={300}>
                          <Form.Input className="border-0" name={`ИсполнительныеДокументы.${i}.Содержание`} type="text" value={data.ИсполнительныеДокументы[i].Содержание} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <TrashTD><FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteRow('ИсполнительныеДокументы', i)} /></TrashTD>
                    </tr>)
                })}
                <StyledHiddenTR >
                  <td colSpan="6"><FontAwesomeIcon className="text-success" size="lg" icon={faPlusCircle} onClick={() => handleAddRow('ИсполнительныеДокументы')} /> <hr style={{ display: 'inline' }} /> </td>
                </StyledHiddenTR>
              </tbody>
            </table>
          </StyledOverflowDiv>
        </Tab.Pane>
        <Tab.Pane id="taxes" >
          <StyledOverflowDiv>
            <table className="table">
              <thead>
                <tr className="h-6">
                  <StyledTH >Наименование налога (сбора) </StyledTH>
                  <StyledTH >Недоимка</StyledTH>
                  <StyledTH >Штрафы, пени</StyledTH>
                  <StyledTH ><FontAwesomeIcon icon={faTrashAlt} /></StyledTH>
                </tr>
              </thead>
              <tbody>
                {data.ОбязательныеПлатежи.map((row, i) => {
                  if (row.delete) return false;
                  return (
                    <tr key={i}>
                      <td className="p-1">
                        <StyledInputGroup w={300}>
                          <Form.CustomSelect className="border-0" name={`ОбязательныеПлатежи.${i}.НаименованиеНалогаСбора`} value={data.ОбязательныеПлатежи[i].НаименованиеНалогаСбора} onChange={collectionInputOnChange}>
                            <option value="постановление">транспортный налог</option>
                            <option value="судебный приказ">земельный налог</option>
                            <option value="кредитная карта">налог на имущество</option>
                          </Form.CustomSelect>
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={150}>
                          <Form.Input className="border-0" name={`ОбязательныеПлатежи.${i}.Недоимка`} type="number" step="0.01" value={data.ОбязательныеПлатежи[i].Недоимка} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <td className="p-1">
                        <StyledInputGroup w={150}>
                          <Form.Input className="border-0" name={`ОбязательныеПлатежи.${i}.ШтрафыПени`} type="number" step="0.01" value={data.ОбязательныеПлатежи[i].ШтрафыПени} onChange={collectionInputOnChange} />
                        </StyledInputGroup>
                      </td>
                      <TrashTD><FontAwesomeIcon icon={faTrashAlt} onClick={() => handleDeleteRow('ОбязательныеПлатежи', i)} /></TrashTD>
                    </tr>)
                })}
                <StyledHiddenTR >
                  <td colSpan="6"><FontAwesomeIcon className="text-success" size="lg" icon={faPlusCircle} onClick={() => handleAddRow('ОбязательныеПлатежи')} /> <hr style={{ display: 'inline' }} /> </td>
                </StyledHiddenTR>
              </tbody>
            </table>
          </StyledOverflowDiv>
        </Tab.Pane>
      </Tab.Content>
      {showCompanySelect && <CompanySelect show={showCompanySelect} close={closeCompanySelect} handleSelect={handleCompanySelect} />}
    </Form>
  )
}

export default ClientEdit;