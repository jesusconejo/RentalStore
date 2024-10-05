import React from 'react'
import './CardComponent.css'
export const CardComponent = ({ title, text, imageUrl, stock, precio }) => {
  return (
    <div className="card" >
      <img src={imageUrl} className="card-img-top" alt="..."></img>
      <div className="card-body">

        <h4 className="card-title">{title}</h4>
        <h6 >Precio: {precio} COP</h6>
        <p className="card-text"> {text}.</p>
        <button className="btn-success" type='submit'>{stock} Disponible</button>

      </div>
    </div>
  )
}
