import { Col, Row, Button, InputGroup, Form } from 'bootstrap-4-react';
import { Modal } from 'react-bootstrap';
import React, { useState } from 'react';
import { useDateFormat } from '../../hooks/date.format.hook';
import { useDispatch, useSelector } from 'react-redux';
import { changeData } from '../../redux/actions/actions';

const Passport = (props) => {

  const dispatch = useDispatch();
  const { activeTab: tabIndex } = useSelector(state => state.app);
  const [data, setData] = useState(props.data);
  const [showModal, setShowModal] = useState(false);
  const { localeDate } = useDateFormat();

  const inputOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    dispatch(changeData(tabIndex, 'Паспорт', { ...data }));
    setShowModal(false);
  }

  return (
    <>
      <>
        Паспорт РФ &nbsp;
        <a href="#" onClick={() => setShowModal(true)}>
          {`серия ${data.Серия} номер ${data.Номер} выдан ${data.КемВыдано} ${localeDate(data.ДатаВыдачи)} код подразделения ${data.КодПодразделения}`}
        </a>
      </>
      <Modal size="lg" show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Паспорт РФ</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col col="6">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> серия </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="Серия" type="text" defaultValue={data.Серия} onChange={inputOnChange} />
              </InputGroup>
            </Col>
            <Col col="6">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> номер </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="Номер" type="text" defaultValue={data.Номер} onChange={inputOnChange} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> кем выдан </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="КемВыдано" type="text" defaultValue={data.КемВыдано} onChange={inputOnChange} />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col col="6">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> дата выдачи </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="ДатаВыдачи" type="date" defaultValue={data.ДатаВыдачи} onChange={inputOnChange} />
              </InputGroup>
            </Col>
            <Col col="6">
              <InputGroup mb="2">
                <InputGroup.Prepend>
                  <InputGroup.Text className="border-0 bg-white"> код подразделения </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Input name="КодПодразделения" type="text" defaultValue={data.КодПодразделения} onChange={inputOnChange} />
              </InputGroup>
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

export default Passport;