import React from 'react'
import { NavLink } from 'react-router-dom'
import './AddProductForm.css'
export const AddProductForm = () => {
    return (
        <div className='container-login'>
            <h4>Crear Producto</h4>
            <hr />
            <form className='formLogin'>
                <div className='mb-3'>
                    <label htmlFor="userName" className='user-name'>Nombre del Producto</label>
                    <input type="text" className="form-control" />
                </div>
                <div className='mb-3'>
                    <label htmlFor="descripcion" className='decription'>Descripcion</label>
                    <input type="text" className="form-control" />
                    <div id="emailHelp" className="form-text">Es una breve descripción.</div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="price" className='price'>Precio</label>
                    <input type="number" className="form-control" />
                </div>
                <hr className='hr-line'/>
                <div className="mb-3">
                    <label htmlFor="fileInput" className="form-label" >
                        <img src="/src/assets/attach.png" alt="img clip" id='img-clip' />
                        Subir Imagen</label>
                    <input
                        type="file"
                        className='form-control'
                        id='fileInput'
                    />
                    <div id="emailHelp" className="form-text" aria-disabled='false'>maximo 350x350.</div>
                   
                    <button type="submit" className="btn btn-primary">
                        Subir archivo
                    </button>
                </div>
                <hr className='hr-line'/>



                <button type="submit" className="btn btn-primary">Guardar</button>

            </form>
           
        </div>
    )
}
