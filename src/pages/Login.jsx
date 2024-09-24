import React, { useState } from 'react'
import './LoginAcount.css'
import { NavLink } from 'react-router-dom'
export const Login = () => {
    
    const [showUser, setShowUser] = useState(true);
    const handleUser = () => {
        setShowUser(!showUser);
    }
    // Función para manejar el cambio del checkbox
    const [showPassword, setShowPassword] = useState(false);
    const handleCheckboxChange = () => {
        setShowPassword(!showPassword); // Alternar entre mostrar y ocultar la contraseña
    };
    return (
        <div className='container-login'>
            <h4>Ingresar a su cuenta</h4>
            <hr />
            <div className="form-check form-switch">
                <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckChecked"
                    onChange={handleUser}
                    checked={showUser} />
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">{showUser ? "Ingresa con Correo" : "Ingresa con Usuario"}</label>
            </div>
            <form className='formLogin'>

                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">{showUser ? "Dirección de Correo" : "Nombre de Usuario"}</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">Esta información es privada y así la mantenemos.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                    <input type={showPassword ? "text" : "password"} className="form-control" id="exampleInputPassword1" />
                </div>
                <div className="mb-3 form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="exampleCheck1"
                        onChange={handleCheckboxChange} // Manejar el cambio de estado
                        checked={showPassword} // Controlar el estado del checkbox
                    />
                    <label className="form-check-label" htmlFor="exampleCheck1">Ver contraseña</label>

                </div>

                <NavLink to='/Admin' type="submit" className="btn btn-primary">Enviar</NavLink>

            </form>
            <NavLink to='/createAcount' className='nav-link-login' >No tengo cuenta</NavLink>
        </div>
    )
}
