import React, { useState } from 'react';
import { IoTrashBin } from 'react-icons/io5';
import DeleteModal from './DeleteModal';

function Table({ array, setLots }) {
  interface Lot {
    id: number;
    lot: string;
    zona: string;
    data: string;
  }

  const [selectedLot, setSelectedLot] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const removeLot = async (id) => {
    console.log(id);
    try {
      const result = await window.electron.db.destroy(id);

      // Actualiza el estado local eliminando el lote correspondiente
      const updatedLots = array.filter((element) => element.id !== id);
      setLots(updatedLots);
    } catch (error) {
      console.error(`Error removing  lot:${id}`, error);
    }

    closeModal();
  };

  const openModal = (lot) => {
    setSelectedLot(lot);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
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
            <tr key={index}>
              <td className="w-1/3 border px-4 py-2">{element.lot}</td>
              <td className="w-1/3 border px-4 py-2">{element.zona}</td>
              <td className="w-1/3 border px-4 py-2">{element.data}</td>
              <td
                className="bg-red-500 text-gray-200 px-4 py-2 cursor-pointer hover:bg-red-700"
                onClick={() => openModal(element)}
              >
                <IoTrashBin />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          handleConfirm={() => removeLot(selectedLot.id)}
          lot={selectedLot}
        />
      )}
    </>
  );
}

export default Table;
