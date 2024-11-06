import React from 'react';
import './Share.css';
import { NavLink } from 'react-router-dom';
export const Share = ({ title, description, img, url }) => {

    const shareProduct = () => {
        const message = `¡Mira este producto increíble! ${url}`;
        const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    };
    const copyLinkToClipboard = () => {
        navigator.clipboard.writeText(url)
            .then(() => {
                alert("Enlace copiado. ¡Péguelo en su biografía de Instagram!");
                window.open('https://www.instagram.com/?hl=es', '_blank');
            })
            .catch(err => {
                console.error("Error al copiar el enlace: ", err);
            });
    };

    const shareOnFacebook = () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        window.open(facebookUrl, '_blank');
    };
    const shareOnX = () => {
        const message = `¡Mira este producto increíble!`;
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(url)}`;
        window.open(twitterUrl, '_blank');
      };

    return (
        <div id='container-share' >
            <img src={img} alt="" />

            <div id='info'>

                <h2>Comparte {title} en las redes sociales</h2>
                <h5>Este articulo incluye: {'   '} {description}</h5>

                <div className='share'>
                    <img src="/src/assets/facebook.png" alt="nat" id='icon-share' onClick={shareOnFacebook} />
                    <img src="/src/assets/instagram.png" alt="nat" id='icon-share' onClick={copyLinkToClipboard} />
                    <img src="/src/assets/twiter.png" alt="nat" id='icon-share' onClick={shareOnX}/>
                    <img src="/src/assets/whatsapp.png" alt="nat" id='icon-share' onClick={shareProduct} />
                </div>
                <NavLink to={url}> link producto</NavLink>
            </div>



        </div>
    )
}
