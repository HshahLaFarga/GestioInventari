import React from 'react';

function InputTxt({ placeholder = '', id = '' }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="border border-gray-800 rounded p-2"
      id={id}
    />
  );
}

export default InputTxt;
