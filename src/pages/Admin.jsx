import React, { useState, useEffect } from 'react';
import './Admin.css';
import { EditAddProductForm } from '../component/forms/EditAddProductForm';
import { ListProducts } from '../component/List/ListProducts';
import { ModalForm } from '../component/forms/ModalForm';
import { ListUsers } from '../component/List/ListUsers';
import { AddCategory } from '../component/forms/AddCategory';

export const Admin = () => {
  const [date, setDate] = useState('');
  const [isDesktop, setIsDesktop] = useState(true);
  const [successfuly, setSuccessfuly] = useState(true);
  const [role, setRole] = useState('');
  const parsedUserData = JSON.parse(localStorage.getItem('user'));

  /*if (parsedUserData) {*/

  /*}*/

  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const openModalCategory = () => setIsCategoryOpen(true);
  const closeModalCategory = () => setIsCategoryOpen(false);

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

  useEffect(() => {
    if (successfuly) {
      const timer = setTimeout(() => {

      }, 3000);
      return () => clearTimeout(timer);  // Limpia el temporizador cuando el componente se desmonta o el estado cambia
    }
  }, [successfuly]);
  useEffect(() => {
    if (parsedUserData) {
      setRole(parsedUserData.rol);
    }

  }, []);
  return (
    <div className='container-admin'>
      {!isDesktop && (
        <div className='warning-message'>
          Esta página debe ser gestionada en una pantalla de escritorio.
        </div>
      )}
      {!successfuly && (
        <div className='name-message'>
          Se cargo correctamente
        </div>
      )}
      <div className='container-l'>
        <h5>Funciones Administrativas</h5>
        <h5 id='date'>{date}</h5>
      </div>

      <div className='container-list'>
        <label id='productos'>GESTION DE PRODUCTOS</label>
        <div id='botones'>
          <button className="btn btn-primary mb-3" id='agregar' onClick={openModalCategory}>Agregar Categoria</button>
          <button className="btn btn-primary mb-3" id='agregar' onClick={openModal}>Agregar Producto</button>
        </div>
        <ModalForm isOpen={isCategoryOpen} onClose={closeModalCategory}>
          <AddCategory onSave={setIsCategoryOpen}/>
        </ModalForm>
        <ModalForm isOpen={isModalOpen} onClose={closeModal}>
          <EditAddProductForm onSave={setIsModalOpen} title={"Crear"} successful={setSuccessfuly} />
        </ModalForm>

        <ListProducts />
        <label id='productos'>GESTION DE USUARIOS REGISTRADOS</label>
        <ListUsers />

      </div>
    </div>
  );
}
