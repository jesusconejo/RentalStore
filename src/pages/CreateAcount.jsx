import React, { useState } from 'react'
import './LoginAcount.css'
import { NavLink } from 'react-router-dom'
export const CreateAcount = () => {
    const [showPassword, setShowPassword] = useState(false);

    // Función para manejar el cambio del checkbox
    const handleCheckboxChange = () => {
        setShowPassword(!showPassword); // Alternar entre mostrar y ocultar la contraseña
    };
    return (
        <div className='container-login'>
            <h4>Crear Cuenta</h4>
            <hr />
            <form className='formLogin'>
            <div className='mb-3'>
                    <label htmlFor="userName" className='user-name'>Nombre</label>
                    <input type="text" className="form-control" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="userName" className='user-name'>Apellido</label>
                    <input type="text" className="form-control" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="userName" className='user-name'>Usuario</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Direccion de Correo</label>
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

                <button type="submit" className="btn btn-primary">Enviar</button>

            </form>
            <NavLink to='/Login' className='nav-link-login' >Ya tengo cuenta</NavLink>
        </div>
    )
}
