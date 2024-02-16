import React from 'react';

function InputTxt({ placeholder = '', id = '', name='', onEnter = () => {}}) {

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && id == 'lot') {
      onEnter();
    }
  };
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border border-gray-800 rounded p-2"
      id={id}
      name={name}
      onKeyDown={handleKeyPress}
    />
  );
}

export default InputTxt;
