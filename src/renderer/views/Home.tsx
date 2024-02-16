import React, { useState, useEffect } from 'react';
import 'tailwindcss/tailwind.css';
import Table from '../components/Table';
import InputTxt from '../components/InputTxt';
import DeleteModal from '../components/DeleteModal';

function Home() {
  interface Lot {
    lot: string;
    zona: string;
    data: string;
  }

  const [lots, setLots] = useState<Lot[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  //Getting the data from the database
  useEffect(() => {
    const runQuery = async () => {
      try {
        const result = await window.electron.db.getAll('lots');
        setLots(result as unknown as Lot[]);
      } catch (error) {
        console.error('Error getting lots:', error);
      }
    };

    runQuery();
  }, []);

  const storeLot = async (lot) => {
    try {
      const result = await window.electron.db.store(lot);
      console.log(result);
    } catch (error) {
      console.error('Error storing lot:', error);
    }
  };

  const now = new Date().toLocaleString();

  const handleClick = () => {
    const newZona = document.querySelector('#zona') as HTMLInputElement;
    const newLot = document.querySelector('#lot') as HTMLInputElement;

    if (
      newZona.value !== '' &&
      newLot.value !== '' &&
      !lots.some((item) => item.lot === newLot.value)
    ) {
      const lot = {
        lot: newLot.value,
        zona: newZona.value,
        data: now,
      };
      storeLot(lot);
      const newlots = [
        ...lots,
        { lot: newLot.value, data: now, zona: newZona.value },
      ];
      setLots(newlots);
      newLot.value = '';
    } else {
      // Muestra el mensaje de error si el lote está vacío o ya existe
      document.getElementById('error')!.classList.remove('hidden');
      setTimeout(() => {
        document.getElementById('error')!.classList.add('hidden');
      }, 3000);
    }
  };

  const destroyAll = async () => {
    try {
      const result = await window.electron.db.destroyAll();
      console.log(result);
      setLots([]);
    } catch (error) {
      console.error('Error removing all lots:', error);
    }

    closeModal();
  };

  return (
    <main className="container max-w-8xl mx-auto">
      <div className="flex justify-between my-5">
        <button
          className="bg-red-500 rounded text-gray-100 px-5 py-2 "
          onClick={openModal}
        >
          Esborrar tots els registres
        </button>
        <div className="[&>*]:mx-2">
          <label htmlFor="name">Zona</label>
          <InputTxt
            placeholder="Introdueix La zona"
            id="zona"
            onEnter={handleClick}
            name="lot"
          />
        </div>
        <div className="[&>*]:mx-2">
          <InputTxt
            placeholder="Introdueix el lot"
            id="lot"
            onEnter={handleClick}
          />
          <button
            className="bg-gray-800 rounded text-gray-100 px-5 py-2"
            onClick={handleClick}
          >
            Afegir
          </button>
        </div>
      </div>
      <div className="flex justify-center my-5 gap-2 hidden" id="error">
        <small className="bg-red-500 text-gray-100 p-5 rounded">
          No es pot afegir un lot buit o ja existent!
        </small>
      </div>
      <Table array={lots} setLots={setLots} />
      {isModalOpen && (
        <DeleteModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          handleConfirm={() => destroyAll()}
        />
      )}
    </main>
  );
}

export default Home;
