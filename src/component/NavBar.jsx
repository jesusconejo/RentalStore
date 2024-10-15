import { NavLink } from 'react-router-dom'
import './NavBar.css'
import { useEffect, useState } from 'react';
export const NavBar = ({isLogin, nameUser }) => {
    
   // console.log('Declara: ', nameUser);
    return (
        <>
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid">
                    {isLogin?
                        <NavLink to="/Inicio" className="nav-link-title">¡Hola {nameUser}!</NavLink>
                    :
                        <NavLink to="/Inicio" className="nav-link-title">¡Renta un Disfracez para Tu Gato!</NavLink>
                    }
                    

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/productos" className="nav-link"  >Productos</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to={'/'} className="nav-link" >Nosotros</NavLink>
                            </li>
                            <li className="nav-item">
                                <input type="text" className='input-buscar' />
                            </li>
                            <li className="nav-item">
                                <button className="btn-nav" type="submit"> Buscar</button>
                            </li>                           
                        </ul>

                    </div>
                </div>
            </nav>
        </>
    )
}
