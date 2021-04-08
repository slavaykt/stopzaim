import React from 'react';
import { Form, InputGroup } from 'bootstrap-4-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';
import { faPen } from '@fortawesome/free-solid-svg-icons';

const StyledFormInput = styled(Form.Input)`
    background: white!important;  
`;

const InputStack = ({ prepend, _name, type, value, onChange, isControlled, hasAppend, handleAppend }) => {

  return (
    <InputGroup mb="2">
      <InputGroup.Prepend>
        <InputGroup.Text className="border-0 bg-white">
          {prepend}
        </InputGroup.Text>
      </InputGroup.Prepend>
      {isControlled
        ?
        <StyledFormInput
          name={_name}
          readOnly={hasAppend}
          type={type}
          step="0.01"
          value={value}
          onChange={onChange} />
        :
        <StyledFormInput
          name={_name}
          readOnly={hasAppend}
          type={type}
          step="0.01"
          defaultValue={value}
          onChange={onChange} />
      }
      {hasAppend &&
        <InputGroup.Append>
          <InputGroup.Text onClick={()=>handleAppend()}><FontAwesomeIcon icon={faPen} /></InputGroup.Text>
        </InputGroup.Append>}
    </InputGroup>
  )
}

export default InputStack;