import React from 'react'
import './ModalForm.css'


export const ModalForm = ({ isOpen, onClose, children}) => {
   
    if (!isOpen) return null;
    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-container" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                <img src="src/assets/cerrar.png" alt="Cerrar" className="close-icon" /> 
                </button>
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    );
}
