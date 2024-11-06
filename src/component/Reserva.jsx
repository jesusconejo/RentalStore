import React, { useState } from 'react'
import { ModalForm } from './forms/ModalForm'
import { Politicas } from '../pages/Politicas'
import { Calendario } from './Calendario'
import dayjs from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import './Reserva.css'

dayjs.extend(isoWeek);
export const Reserva = ({ title, stock, precio, urlImg }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inicio, setInicio] = useState('');
    const [fin, setFin] = useState('');
    const handlePolicy = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => setIsModalOpen(false);
    const handleDate = (date) => {
        setInicio(date); // Fecha de inicio
        const dayjsDate = dayjs(date, "DD/MM/YYYY"); // Convertir a objeto Day.js
        const endDate = dayjsDate.add(8, 'day').format("DD/MM/YYYY"); // Sumar 8 días
        setFin(endDate); // Fecha de fin
    };
    return (
        <>  <h2 id='title'>Reserva  {title} para tu michi</h2>
            <hr id='linea-h' />
            <div className='container' id='contenedor'>
                <div className='row'>
                    <div className="col-12 col-md-3">
                        <img src={urlImg} alt="" />
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="politicas">
                            <img src="/src/assets/privacy-policy.png" alt="policy" id="policy" onClick={handlePolicy} />
                            <p>Políticas</p>
                        </div>
                        <ModalForm isOpen={isModalOpen} onClose={closeModal}>
                            <Politicas />
                        </ModalForm>
                        <div id='fecha'>
                            <label htmlFor="">Seleciona el dia</label>
                            <Calendario onDate={handleDate}></Calendario>
                        </div>

                    </div>
                    <div className="col-12 col-md-3">
                        <div id='datos-reserva'>
                            <h4 id='title-reserva'>Datos de Reserva </h4>
                            <label htmlFor="" >Traje: {title}</label>
                            <label htmlFor="">Fecha Entrega: {inicio} </label>
                            <label htmlFor="">Fecha Devolución: {fin}</label>
                            <label htmlFor="">Costo: {precio} COP</label>
                        </div>
                    </div>
                </div>
            </div>
            <hr id='linea-h' />
            <button className='btn btn-primary' >Reservar</button>


        </>
    )
}
