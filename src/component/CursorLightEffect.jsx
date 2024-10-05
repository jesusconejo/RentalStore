import React, { useEffect, useState } from 'react';
import './CursorLightEffect.css'; // El archivo CSS con los estilos

export const CursorLightEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX - 50, // Ajusta para centrar la luz en el cursor
        y: event.clientY - 50,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove); // Limpieza al desmontar el componente
    };
  }, []);

  return (
    
     
      <div
        className="cursor-light"
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      ></div>
    
  );
};
