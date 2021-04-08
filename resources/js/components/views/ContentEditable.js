import React, { useRef, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { TabContext } from '../context';
import { changeCollectionData, changeData, changeTableData } from '../../redux/actions/actions';

const StyledDiv = styled.div`
  height: 100%;
  &:focus {
    outline: none !important;
    box-shadow: 0 0 0 0.2rem rgb(63 81 181 / 80%);
  } 
`;

const StyledSpan = styled.div`
    && {
      background-color: ${props => props.highlight ? "Khaki" : "inherit"};
      display: inline;
    } 
`;

const ContentEditable = ({ collection, rowIndex, name, value }) => {
  const ref = useRef(null);
  const { tabId } = useContext(TabContext);
  const dispatch = useDispatch();
  // const [textContent, setTextContent] = useState([]);

  // const getTextContent = () => {
  //   const reg = RegExp('\{.+?\}|^.+?(?=\{)|(?<=\}).+?(?=\{)|(?<=\}).+?$', 'g');
  //   const isBraced = RegExp('^\{.+\}$');
  //   const result = [...String(value).matchAll(reg)].map(el => ({ val: el[0], highlight: isBraced.test(el[0]) }));
  //   if (result.length) {
  //     return result
  //   } else {
  //     return [{ val: value }]
  //   }
  // }

  // useEffect(() => {
  //   const reg = RegExp('\{.+?\}|^.+?(?=\{)|(?<=\}).+?(?=\{)|(?<=\}).+?$', 'g');
  //   const isBraced = RegExp('^\{.+\}$');
  //   const result = [...String(value).matchAll(reg)].map(el => ({ val: el[0], highlight: isBraced.test(el[0]) }));
  //   setTextContent(result.length ? result : [{ val: value, highlight: false }]);
  // }, [value]);

  // const textContent = getTextContent();

  // console.log(textContent);

  const onBlurHandler = () => {
    // console.log(tabIndex, collection, rowIndex, name, ref.current.textContent);
    if (collection) {
      dispatch(changeCollectionData(tabId, collection, rowIndex, name, ref.current.textContent));
    } else {
      dispatch(changeData(tabId, name, ref.current.textContent));
    }
  }

  return (
    <StyledDiv
      contentEditable
      suppressContentEditableWarning={true}
      ref={ref}
      className="py-1 px-2"
      onBlur={onBlurHandler}>
        {value}
    </StyledDiv>
  )

}

export default ContentEditable;