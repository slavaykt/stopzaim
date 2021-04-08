import React from 'react';
import { ButtonGroup, Button, ListGroup } from 'bootstrap-4-react';
import { useDispatch, useSelector } from 'react-redux';
import { addPane } from '../../redux/actions/actions';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog, faIndustry, faMale, faUserFriends } from '@fortawesome/free-solid-svg-icons';

const StyledLink = styled(ListGroup.Link)`
  && {
    background-color: GhostWhite;
    border: none;
  }   
`;

const SideMenu = () => {

  const dispatch = useDispatch();
  const { panes, activeTab } = useSelector(state => state.app);
  const handleClick = (option) => (e) => {
    e.preventDefault();
    switch (option) {
      case 'Клиенты':
        dispatch(addPane('tab', 'Клиенты', '/api/clients', 'ClientIndex'));
        break;
      case 'Компании':
        dispatch(addPane('tab', 'Компании', '/api/companies', 'CompanyIndex'));
        break;
      case 'Настройка приложений':
        dispatch(addPane('tab', 'Настройка приложений', '/api/attachment/sections', 'ClientAttachmentSectionSetup'));
        break;
      default:
        break;
    }
  }
  return (
    <ListGroup>
      <StyledLink href="#" onClick={handleClick('Клиенты')}><FontAwesomeIcon icon={faUserFriends} />&nbsp;Клиенты</StyledLink>
      <StyledLink href="#" onClick={handleClick('Компании')}><FontAwesomeIcon icon={faIndustry} />&nbsp;Компании</StyledLink>
      <StyledLink href="#" onClick={handleClick('Настройка приложений')}><FontAwesomeIcon icon={faCog} />&nbsp;Настройка приложений</StyledLink>
      <StyledLink href="#" onClick={handleClick('Настройки')}><FontAwesomeIcon icon={faCog} />&nbsp;Настройки</StyledLink>
    </ListGroup>
  )
}

export default SideMenu;