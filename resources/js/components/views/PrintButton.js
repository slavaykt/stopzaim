import { Print } from '@material-ui/icons';
import React from 'react';
import DropDownButton from './DropDownButton';

function PrintButton({options}) {

  const handlePrint = (url) => {
    window.open(url, '_blank');
  }
  
  return (
    <DropDownButton
      icon={<Print color="primary" />}
      buttonLabel="Печать"
      options={
        options.map(option => (
          { label: option.label, handler: () => handlePrint(option.url) }
        ))
      } />
  );
}

export default PrintButton;