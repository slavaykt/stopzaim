import { Nav } from 'bootstrap-4-react/lib/components';
import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { closePane, setActiveTab } from '../../redux/actions/actions';

const StyledNavLink = styled(Nav.ItemLink)`
  && {
    background-color: ${props => props.isactive ? "#f7c892" :"white"};
    color: black;
    border: 1px solid silver;
  }   
`;

const StyledCloseIcon = styled.span`
  visibility:hidden!important;
  transition: visibility 0.25s;
  ${StyledNavLink}:hover & {
    visibility: visible!important;
  }
`;

const Tabs = () => {

  const { panes, activeTab } = useSelector(state => state.app);
  const dispatch = useDispatch();
  const handleClick = (index) => (e) => {
    e.preventDefault();
    dispatch(setActiveTab(index));
  }

  const handleCloseTab = (index) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(closePane(index));
  }

  return (
    <>
    <Nav pills>
      {panes.map((pane, i) =>
        <StyledNavLink
          isactive={Number(activeTab === i)}
          className="mr-1"
          style={{padding: '6px'}}
          href="#" 
          key={i}
          onClick={handleClick(i)}> 
          <span>{pane.name}</span>
          &nbsp;
          <StyledCloseIcon onClick={handleCloseTab(i)}>&times;</StyledCloseIcon>
        </StyledNavLink>
      )}
    </Nav>
    <div id="tabContentAnchor"></div>
    </>
  )
}

export default Tabs;