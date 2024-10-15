import React, { useState } from 'react'
import { fetchSaveCategory } from '../../functions/CategoryApi';

export const AddCategory = ({onSave}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const categoryObject ={
        name: "",
        description: ""
    }
    const handleSave = async(event) => {
        event.preventDefault(); 
        categoryObject.name=name;
        categoryObject.description=description;
        console.log('category object: ', categoryObject);
        try {
            const response = await fetchSaveCategory(categoryObject);
            console.log('response category:', response);
            onSave(false);
        } catch (error) {
            console.log('error category: ', error);
        }
    }
    return (
        <div>
            <form className='form-producto' >
                <div className='mb-3'>
                    <label htmlFor="userName" className='user-name'>{!name ? <small className="text-danger">*</small> : ''} Nombre de la Categoria</label>
                    <input type="text"
                        className={`form-control ${!name ? 'is-invalid' : ''}`}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </div>
                <div className='mb-3'>
                    <label htmlFor="descripcion" className='decription' >{!description ? <small className="text-danger">*</small> : ''} Descripción</label>
                    <input type="text" 
                    className={`form-control ${!description ? 'is-invalid' : ''}`} 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} />

               </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSave}
                    disabled={!name && !description}
                >
                    {'Guardar'}
                </button>

            </form>
        </div>
    )
}
