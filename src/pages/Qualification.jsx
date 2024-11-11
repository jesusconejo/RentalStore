import React, { useEffect, useState } from 'react';
import { fetchQualifier } from '../functions/QualificationApi';


export const Qualification = ({ idProduct, title, description, img , user}) => {
   // const { user } = useAuth();
    const [isQa, setIsQa] = useState(false);
    const [rating, setRating] = useState(1);

    const getQualificationByProductId = (idProduct) => {
       
        const product = user.favoriteList.find(item => item.idProduct === idProduct);
       
       setRating(product ? product.qualification : 1); 
    };
    // Función para manejar el clic en las estrellas
    const handleStarClick = (index) => {
        setRating(index); // Cambia la calificación al número de la estrella seleccionada
    };

    // Renderizar las estrellas
    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <img
                    key={i}
                    src={i <= rating ? '/src/assets/estrella-llena.png' : '/src/assets/estrella-vacia.png'}
                    alt="estrella"
                    id='icon-share'
                    onClick={() => handleStarClick(i)}
                />
            );
        }
        return stars;
    };

    const guardar = async () => {
        console.log('Calificación guardada:', rating);
        try {
            const response = await fetchQualifier(user.id, idProduct, rating);
           // console.log('Q:', response);
            return;
        } catch (error) {
            console.log('error');
            return;
        }
    };
    useEffect(() => {
        if (user.favoriteList && user.favoriteList.length > 0) {
            setIsQa(idProduct === user.favoriteList[0].idProduct);
            getQualificationByProductId(idProduct);
        } else {
            // Manejar el caso cuando no haya productos favoritos
            setIsQa(false); // O cualquier valor por defecto
        }
    }, [idProduct, user.favoriteList]); 
    

    return (
        <div id='container-share'>
            <img src={img} alt="" />
            <div id='info'>
                <h2>Califica nuestro producto {title}</h2>
                <h5>Este artículo incluye: {'   '} {description}</h5>

                <div className='share'>
                    {renderStars()} {/* Renderiza las estrellas */}
                </div>
                <button className='btn btn-primary' 
                onClick={guardar}
                disabled={isQa}
                
                >Guardar</button>
                <p>{isQa?'¡Calificado!':''}</p>
            </div>
        </div>
    );
};

