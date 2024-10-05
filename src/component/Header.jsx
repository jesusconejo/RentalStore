import { NavBar } from "./NavBar"
import './Header.css'
import { NavLink, useNavigate } from "react-router-dom";
export const Header = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/Login'); 
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

          <form className="d-flex" role="search">

            <NavLink to='/CreateAcount' className="custom-btn" type="submit" >Crear Cuenta</NavLink>
            <NavLink to='/Login' className="custom-btn" type="submit" >Iniciar Sesión</NavLink>
          </form>
        </div>
        
      </div>
      <NavBar />
    </div>
  );
}

