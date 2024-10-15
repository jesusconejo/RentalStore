import React, { useEffect, useState } from 'react'
import './LoginAcount.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { fetchLogin } from '../functions/UserApi';
import eventEmitter from '../functions/EventEmitter';
import { useAuth } from '../component/AuthProvider';
export const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate(); 
    const [showUser, setShowUser] = useState(true);
    const [popMessage, setPopMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggued, setIsLoggued] = useState(false);
    const userLoginUserName ={
        userName:null,        
        password:null
    }
    const userLoginEmail ={       
        email:null,
        password:null
    }
    const userObject ={  
        id:'',
        name:'',
        lastName:'',     
        userName:null,
        email:null,
        rol:'',
        created:''
    }
   
    const handleUser = () => {
        setShowUser(!showUser);
    }
    // Función para manejar el cambio del checkbox
    const [showPassword, setShowPassword] = useState(false);
    const handleCheckboxChange = () => {
        setShowPassword(!showPassword); // Alternar entre mostrar y ocultar la contraseña
    };
    useEffect(() => {
        if (popMessage) {
            const timer = setTimeout(() => {
                setPopMessage(false);  // El mensaje desaparecerá después de 3 segundos
            }, 3000);
            return () => clearTimeout(timer);  // Limpia el temporizador cuando el componente se desmonta o el estado cambia
        }
    }, [popMessage]);
   
    const handleLogin = async (event) =>{
        event.preventDefault(); 
        if(showUser){
            userLoginEmail.email=email;
            userLoginEmail.password=password;
        }else{
            userLoginUserName.userName=userName;
            userLoginUserName.password=password;
        }
        try {
            const response = await fetchLogin(showUser?userLoginEmail:userLoginUserName);
            console.log('response', response);
            if(response.errorResponseDTO!==null){               
                if(response.errorResponseDTO.errorCode===1){
                    console.log('errorCode', response.errorResponseDTO.errorCode);
                    setMessage(showUser?'Correo ó Clave Invalida':'Usuario o Clave invalida');
                    setPopMessage(true);
                }else if(response.errorResponseDTO.errorCode===4){
                    console.log('errorCode', response.errorResponseDTO.errorCode);
                    setMessage(showUser?'Correo ó Clave Invalida':'Usuario o Clave invalida');
                    setPopMessage(true);
                }
                console.log('error', response.errorResponseDTO);
            }else{
              
            

                setMessage('Bienvenido '+(showUser?email:userName));
                setIsLoggued(true);
              //  eventEmitter.dispatchEvent(new CustomEvent('cambioValor', { detail: response }));
                setPopMessage(true);
                setPassword('');
                {showUser?setEmail(''):setUserName('')}
                login(response); // Guardar los datos de autenticación
                navigate(response.rol==='admin'?'/Admin':'/Productos');
            }


        } catch (error) {
            console.log('error', error);
        }      


    }
   

    return (
        <>
         {popMessage?(
                <div className='error-message'>
                    <p>{message}</p>
                </div>
            ):''}
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
                        <input 
                        type="email" 
                        className="form-control" 
                        value={showUser?email:userName}
                        onChange={(e) => (showUser?setEmail(e.target.value):setUserName(e.target.value))}
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        />
                        <div id="emailHelp" className="form-text">Esta información es privada y así la mantenemos.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Contraseña</label>
                        <input 
                        type={showPassword ? "text" : "password"} 
                        className="form-control" 
                        value={password} onChange={(e) => setPassword(e.target.value)} 
                        id="exampleInputPassword1" 
                        />
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

                    <NavLink to='/Admin' type="submit" className="btn btn-primary" onClick={handleLogin}>Enviar</NavLink>

                </form>
                <NavLink to='/createAcount' className='nav-link-login' >No tengo cuenta</NavLink>
            </div>
        </>
    )
}
