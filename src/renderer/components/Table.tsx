import React from 'react';
import { IoTrashBin } from 'react-icons/io5';

function Table({ array }) {
  return (
    <table className="table-auto w-full my-5 ">
      <thead>
        <tr>
          <th className="px-4 py-2">Lot</th>
          <th className="px-4 py-2">Zona</th>
          <th className="px-4 py-2">Data</th>
        </tr>
      </thead>
      <tbody id="table">
        {array.map((element, index) => (
          <tr key={index} >
            <td className="border px-4 py-2">{element.lot}</td>
            <td className="border px-4 py-2">{element.zona}</td>
            <td className="border px-4 py-2">{element.data}</td>
            <td className="w-1/12 bg-red-500 text-gray-200 ">
              <a href="#" className="flex justify-center h-full">
                <IoTrashBin />
              </a>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
