import React, { useRef, useEffect, useState } from 'react';
import './Inicio.css'
import { CursorLightEffect } from '../component/CursorLightEffect';
import FlashEffect from '../component/FlashEffect';
export const Inicio = () => {
    const videoRef = useRef(null);
    const [playCount, setPlayCount] = useState(0);

    useEffect(() => {
        const video = videoRef.current;

        const handleVideoEnded = () => {
            if (playCount < 2) {  // Se reproduce dos veces más después de la primera.
                setPlayCount(prevCount => prevCount + 1);
                video.play(); // Vuelve a reproducir el video
            } else {
                video.removeEventListener('ended', handleVideoEnded);
            }
        };

        if (video) {
            video.addEventListener('ended', handleVideoEnded);
            // Asegurarse de que el video se reproduce la primera vez
            video.play().catch(error => {
                console.error("Error al reproducir el video:", error);
            });
        }

        return () => {
            if (video) {
                video.removeEventListener('ended', handleVideoEnded);
            }
        };
    }, [playCount]);

    return (
        <>
           <CursorLightEffect/>
            <div className="video-container">
                <video className="bg-video" ref={videoRef} playsInline autoPlay muted controls>
                    <source src="src/assets/SexyCat.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
              
            </div>
         
                
           
        </>
    );
};
