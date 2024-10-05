import React, { useState } from 'react';
import './FlashEffect.css'; // Importa tu archivo CSS

const FlashEffect = () => {
  const [flashStyle, setFlashStyle] = useState({});

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setFlashStyle({
      left: `${touch.clientX}px`,
      top: `${touch.clientY}px`,
      opacity: 1,
    });

    // Desvanece el destello después de un corto tiempo
    setTimeout(() => {
      setFlashStyle({ ...flashStyle, opacity: 0 });
    }, 300); // Duración de la animación (300ms)
  };

  return (
    <div className="flash-container" onTouchStart={handleTouchStart}>
      <div className="flash" style={flashStyle}></div>
      {/* Aquí puedes añadir otros elementos o componentes */}
    </div>
  );
};

export default FlashEffect;
