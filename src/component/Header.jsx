import { NavBar } from "./NavBar"
import './Header.css'
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthProvider";
export const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const textAvatar = (name, lastName) => {
    if (!name) return ''; // Si el texto es nulo o vacío, retorna una cadena vací
    const firts = name.charAt(0).toUpperCase(); // Extrae la primera letra y la convierte a mayúscula
    const second = lastName.charAt(0).toUpperCase();
    return firts + second;
  };
  const close = () => {
    Swal.fire("¡Sesión Cerrada Correcatmente!");
    logout();
    navigate('/Inicio');
  }


  return (
    <div className="header-container">
      <div className="top-section">
        <div className="container-left">
          <NavLink to='/Inicio'>
            <img src="src/assets/cat.png" alt="cat" className="logo" />
          </NavLink>
          <h1 className="titulo">Shizuka Store</h1>
        </div>
        <div className="container-right">
          {user ?
            <div className="container-user">
              <NavLink
                to="/InfoUser"
               
                className="nav-link-custom">{textAvatar(user.name, user.lastName)}
              </NavLink>
              <button className="btn btn-primary" onClick={close}>Cerrar Sesión</button>
              <button className="cart-button" >
                <img className="cart-icon"
                  src="src/assets/cesta.png" alt="cesta" />
              </button>
            </div>
            :
            <form className="d-flex" role="search">

              <NavLink to='/CreateAcount' className="custom-btn" type="submit" >Crear Cuenta</NavLink>
              <NavLink to='/Login' className="custom-btn" type="submit" >Iniciar Sesión</NavLink>
            </form>
          }

        </div>

      </div>
      <NavBar isLogin={user} nameUser={user ? `${user.name} ${user.lastName}` : ''} />
    </div>
  );
}

