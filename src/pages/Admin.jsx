import React, { useState, useEffect } from 'react'
import './Admin.css'
import { AddProductForm } from '../component/forms/AddProductForm'
import { ListProducts } from '../component/List/ListProducts';
export const Admin = () => {
  const [date, setDate] = useState('');

  // Función para formatear la fecha y hora sin segundos
  const formatDate = () => {
    const now = new Date();
    return now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Función para alternar la visibilidad del formulario
  const toggleFormulario = () => {
    setMostrarFormulario(!mostrarFormulario);
  };
  useEffect(() => {
    setDate(formatDate()); // Inicializar la fecha y hora

    const timer = setInterval(() => {
      setDate(formatDate()); // Actualizar cada minuto
    }, 60000);

    // Limpia el intervalo cuando el componente se desmonte
    return () => clearInterval(timer);
  }, []);

  return (
    <div className='container-admin'>
      <div className='container-l'>
        <h5 >Funciones Administrativas </h5>
        <h5 id='date'>{date}</h5>
      </div>
      <div>
      {<button className="btn btn-primary" onClick={toggleFormulario}>Agregar Producto</button> }
     
        {mostrarFormulario &&<AddProductForm/>}
        <ListProducts />
      </div>
    </div>

  )
}
