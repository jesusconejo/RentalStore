import React, { useEffect, useState } from 'react'
import './LoginAcount.css'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { fetchSaveUser } from '../functions/UserApi';
export const CreateAcount = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);
    const [validPassword, setValidPassword] = useState(false);
    const [popMessage, setPopMessage] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate(); 
    const userObject ={  
        name:'',
        lastName:'',     
        userName:null,
        email:null,
        password:''
    }
    // Función para manejar el cambio del checkbox
    const handleCheckboxChange = () => {
        setShowPassword(!showPassword); // Alternar entre mostrar y ocultar la contraseña
    };
    const validatePassword = (pwd) => {
        const minLength = 8;
        const hasUpperCase = /[A-Z]/.test(pwd);
        const hasLowerCase = /[a-z]/.test(pwd);
        const hasNumbers = /\d/.test(pwd);
        const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);

        return (
            pwd.length >= minLength &&
            hasUpperCase &&
            hasLowerCase &&
            hasNumbers &&
            hasSpecialChars
        );
    };
    const handlePasswordChange = (value) => {
        setPassword(value);
       // console.log('password 1:', value, 'password2: ', password2, validatePassword(password))
        if (!validatePassword(value)) {
            setErrorMessage('requisitos');
            setValidPassword(false);
            return;
        }
        if (password && value !== password2) {
            setValidPassword(false);
            setErrorMessage("coinciden");
            console.log('handlePasswordChange')
        } else {
            setErrorMessage(null);
            setValidPassword(true);
        }
    };

    const handlePassword2Change = (value) => {
        setPassword2(value);
        // console.log('password 1:', password, 'password2: ', value);
        if (!validatePassword(value)) {
            setErrorMessage('requisitos');
            setValidPassword(false);
            return;
        }
        if (value !== password) {
            setValidPassword(false);
            setErrorMessage("coinciden");
            console.log('handlePassword2Change')
        } else {
            setErrorMessage(null);
            setValidPassword(true);
        }
    };
    const registrar = async(event) =>{
        event.preventDefault(); 
        userObject.name=name;
        userObject.lastName=lastName;
        userObject.email= email;
        userObject.userName=user;
        userObject.password=password;
        try {
            const response = await fetchSaveUser(userObject);
            //console.log('responseCreate:', response);
            if(response.errorResponseDTO!==null){
                //console.log(response.errorResponseDTO.error,response.errorResponseDTO.message );
                Swal.fire({
                    icon: "error",
                    title: "Uups...",
                    text: 'Ya existe un '+ (response.errorResponseDTO.error==='userName'?'Usuario':'Correo')+' '+response.errorResponseDTO.message 
                  });
               // setMessage('Ya existe un '+ (response.errorResponseDTO.error==='userName'?'Usuario':'Correo')+' '+response.errorResponseDTO.message );
                //setPopMessage(true);
                return;
            }
            Swal.fire("¡Cuenta creada correctamente!");
            //console.log("exitoso");
            setName('');
            setLastName('');
            setEmail('');
            setUser('');
            navigate('/Login');
            //setMessage('Creado Exitosamente')
        } catch (error) {
            console.log('error', error);
        }
    }
    useEffect(() => {
        if (popMessage) {
            const timer = setTimeout(() => {
                setPopMessage(false);  // El mensaje desaparecerá después de 3 segundos
            }, 3000);
            return () => clearTimeout(timer);  // Limpia el temporizador cuando el componente se desmonta o el estado cambia
        }
    }, [popMessage]);
    return (
        <>
             {popMessage?(
                <div className='error-message'>
                    <p>{message}</p>
                </div>
            ):''}
            {errorMessage !== null ? (errorMessage === 'requisitos' ? (
                <div className='error-message'>
                    <h5 id='pass'>La contraseña no cumple los requisitos:</h5>
                    <p>-. minino 8 caractaeres</p>
                    <p>-. 1 minuscula (a)</p>
                    <p>-. 1 mayuscula (A)</p>
                    <p>-. 1 numero (1234567890)</p>
                    <p>-. 1 caracter especial (!@#$%^&*(),.?":{ }|)</p>
                </div>
            ) : (
                <div className='error-message'>
                    <h5 id='pass'>Las contraseñas no coinciden</h5>
                </div>
            )) : ''}

            <div className='container-login'>

                <h4>Crear Cuenta</h4>
                {!name || !lastName || !user || !email || !password || !password2 || !validPassword ? <small className="text-danger">(*) Todos los campos son obligatorios</small> : ''}
                <hr />
                <form className='formLogin'>
                    <div className='mb-3'>
                        <label htmlFor="name" className='form-label'>{!name ? <small className="text-danger">*</small> : ''}  Nombre</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="LastName" className='form-label'>{!lastName ? <small className="text-danger">*</small> : ''} Apellido</label>
                        <input type="text" className="form-control" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor="userName" className='form-label'>{!user ? <small className="text-danger">*</small> : ''} Usuario</label>
                        <input type="text" className="form-control" value={user} onChange={(e) => setUser(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">{!email ? <small className="text-danger">*</small> : ''} Direccion de Correo</label>
                        <input type="email"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                        />
                        <div id="emailHelp" className="form-text">Esta información es privada y así la mantenemos.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">{!password ? <small className="text-danger">*</small> : ''} Contraseña</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="exampleInputPassword1"
                           
                            onChange={(e) => handlePasswordChange(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">{!password2 ? <small className="text-danger">*</small> : ''} Repetir Contraseña</label>
                        <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="exampleInputPassword2"

                            onChange={(e) => handlePassword2Change(e.target.value)} />
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

                    <button type="submit" className="btn btn-primary" onClick={registrar}
                        disabled={!name || !lastName || !user || !email || !password || !password2 || !validPassword}
                    >Enviar</button>

                </form>
                <NavLink to='/Login' className='nav-link-login' >Ya tengo cuenta</NavLink>
            </div>
        </>)
}
