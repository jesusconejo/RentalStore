import React, { useEffect, useState } from 'react'
import './InfoUser.css'
import eventEmitter from '../functions/EventEmitter';
import { useLocation } from 'react-router-dom';
import { fetchGetUser } from '../functions/UserApi';
export const InfoUser = () => {
    const location = useLocation();
    const { state } = location; 
    const id = state?.id;
    const [isLogin, setIsLogin] = useState(true);
    const [userName, setUserName] = useState('');
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [created, setCreated] = useState('');
    const [email, setEmail] = useState('');
   

    const handleGeUser = async (id) => {
        try {
            const data = await fetchGetUser(id);
           // console.log('user', data);
            setUserName(data.userName);
            setEmail(data.email);
            setName(data.name);
            setLastName(data.lastName);
            setCreated(data.created);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        handleGeUser(id);
    }, []);
    return (
        <>
            <div className='info-container'>
                <h2 id='presentacion'>Hola {userName}</h2>
                <h5>Estas activo desde {created}</h5>
                <hr />
                <form >
                    <h3 id='sub-title'>Datos Personales</h3>
                    <div className='mb-3'>
                        <label htmlFor="" id='tag-user'>Nombre: </label>
                        <label htmlFor="" id='info-user'> {name}</label>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="" id='tag-user'>Apellido: </label>
                        <label htmlFor="" id='info-user'>{lastName}</label>
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="" id='tag-user'>Dirección de Correo: </label>
                        <label htmlFor="" id='info-user'>{email}</label>
                    </div>


                </form>
                <hr />
                <h3 id='sub-title'>Historico de compras</h3>
            </div>
        </>
    )
}
