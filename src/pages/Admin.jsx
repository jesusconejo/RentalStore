import React, { useState, useEffect } from 'react';
import './Admin.css';
import { EditAddProductForm } from '../component/forms/EditAddProductForm';
import { ListProducts } from '../component/List/ListProducts';
import { ModalForm } from '../component/forms/ModalForm';

export const Admin = () => {
  const [date, setDate] = useState('');
  const [isDesktop, setIsDesktop] = useState(true);
  
  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    setDate(formatDate()); // Inicializar la fecha y hora
    const timer = setInterval(() => {
      setDate(formatDate()); // Actualizar cada minuto
    }, 60000);

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 900); // Cambia 1024 por el ancho mínimo que consideres para una pantalla de escritorio
    };

    handleResize(); // Verifica el tamaño inicial
    window.addEventListener('resize', handleResize); // Agrega el listener para cambios en el tamaño de la ventana

    return () => window.removeEventListener('resize', handleResize); // Limpia el listener al desmontar
  }, []);

  return (
    <div className='container-admin'>
      {!isDesktop && (
        <div className='warning-message'>
          Esta página debe ser gestionada en una pantalla de escritorio.
        </div>
      )}
      <div className='container-l'>
        <h5>Funciones Administrativas</h5>
        <h5 id='date'>{date}</h5>
      </div>
      <div>
        <button className="btn btn-primary mb-3" onClick={openModal}>Agregar Producto</button>
        <ModalForm isOpen={isModalOpen} onClose={closeModal}>
          <EditAddProductForm onSave={setIsModalOpen} title={"Crear"} />
        </ModalForm>
        <ListProducts />
      </div>
    </div>
  );
}
