import React, { useEffect, useState } from 'react'
import { fetchDeleteCategory, fetchGetAll, fetchSaveCategory } from '../../functions/CategoryApi';

export const AddCategory = ({onSave}) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [categorias, setCategorias] = useState([]);
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
            Swal.fire("¡Categoria guardada!");
            console.log('response category:', response);
            onSave(false);
        } catch (error) {
            console.log('error category: ', error);
        }
    }
    const handleList = async () => {
        try {
            const data = await fetchGetAll();
            setCategorias(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };
    const handleDelete = async (categoryId) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");

        if (confirmDelete) {
            try {
                const response = await fetchDeleteCategory(categoryId);
                console.log(response);
                if(response.status===200){
                    console.log('si', response);
                }else if(response.errorCode && response.errorCode===9){
                    console.log('NO', response);
                }

            } catch (error) {
                console.log('ERROR', error);     
            }
           
        }
    };
    useEffect(() => {
        handleList();
    }, []);
    
    return (
        <div>
            <form className='form-producto' >
                <div className='mb-3'>
                    <h3 style={{color:'white'}}>Gestionar Categorias</h3>
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
            <hr />
            <div>
            <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Acciones</th>
                            
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {categorias.length > 0 ? (
                            categorias.map((categoria) => (
                                <tr key={categoria.id}>
                                    <th scope="row">{categoria.id}</th>
                                    <td>{categoria.name}</td>
                                    <td>{categoria.description}</td>
                                    <td className="actions-container">
                                    <button className="btn btn-danger" onClick={() => handleDelete(categoria.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No hay categorias disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
