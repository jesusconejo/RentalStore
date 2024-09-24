import React from 'react'
import './CardComponent.css'
export const CardComponent = ({ title, text, imageUrl }) => {
  return (
    <div className="card" >
      <img src={imageUrl} className="card-img-top" alt="..."></img>
      <div className="card-body">

        <h5 className="card-title">{title}</h5>

        <p className="card-text"> {text}.</p>
        <button className="btn-success" type='submit'>Disponible</button>

      </div>
    </div>
  )
}
