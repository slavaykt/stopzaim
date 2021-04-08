import { ClickAwayListener, MenuItem, MenuList, Popover, Typography } from '@material-ui/core';
import React, { useState } from 'react';
import ExtendableButton from './ExtendableButton';

const DropDownButton = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOptionClick = (handler) => {
    handler();
    handleClose();
  }

  const open = Boolean(anchorEl);

  return (
    <>
      <ExtendableButton
        variant="contained"
        startIcon={props.icon}
        onClick={handleClick}
      >
        <Typography variant="body2">{props.buttonLabel}</Typography>
      </ExtendableButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <MenuList autoFocusItem={open} id="menu-list-grow">
            {props.options.map((option, i) =>
              <MenuItem key={i} onClick={() => handleOptionClick(option.handler)}>{option.label}</MenuItem>
            )}
          </MenuList>
        </ClickAwayListener>
      </Popover>
    </>
  );
}

export default DropDownButton;