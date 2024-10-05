import React, { useState, useEffect } from 'react'
import './AddProductForm.css'
import { fetchSaveProduct, fetchUpdateProduct } from '../../functions/productoApi';
import { fetchUploadImg } from '../../functions/AwsApi';
export const EditAddProductForm = ({ onSave, title, id, initialProduct }) => {
    const [user, setUser] = useState(initialProduct?.name || '');
    const [description, setDescription] = useState(initialProduct?.description || '');
    const [price, setPrice] = useState(initialProduct?.price || 0);
    const [stock, setStock] = useState(initialProduct?.stock || 0);
    const [img, setImg] = useState(initialProduct?.img || '');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [upButton, setUpButton] = useState(false);
    const producto = {
        name: null,
        description: null,
        price: null,
        stock: null,
        imagePath: null
    };
    const loadProduct = async () => {
        if (title === 'Editar') {
            setUser(initialProduct.name);
            setDescription(initialProduct.description);
            setPrice(initialProduct.price);
            setStock(initialProduct.stock);
            setImg(initialProduct.imagePath);

        }
    }
    useEffect(() => {
        loadProduct();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();

        producto.name = user;
        producto.description = description;
        producto.price = price;
        producto.stock = stock;
        producto.imagePath = img;

        //TODO hacer una condicion si titulo es Editar que consuma un Update en vez de un save
        if (title === "Editar") {
            const response = await fetchUpdateProduct(producto, id);
            console.log('Response: ', response);
        } else {
            const response = await fetchSaveProduct(producto);
            console.log('Response: ', response);
        }
        //console.log(producto);

        onSave(false);
        setUser('');
        setDescription('');
        setStock('');
        setPrice('');
    }
    const handleUploadImg = async (event) => {
        event.preventDefault();
        
        if (img) {
            console.log('Archivo seleccionado:', img);
            const response = await fetchUploadImg(img);  // Aquí se pasa el archivo
            if (response) {
                setImg(response);  // Si la respuesta contiene la URL, guárdala
                console.log('URL de la imagen en AWS:', response);
                setUpButton(true);
            } else {
                console.log('Error al subir la imagen');
                setUpButton(false);
            }
        } else {
            console.log('Por favor selecciona un archivo');
            setUpButton(false);
        }

    }


    return (
        <div className='container-form'>
            <h4>{title} Producto {id}</h4>
            {!user || !description || !price || !stock || !img ? <small className="text-danger">(*) Todos los campos son obligatorios</small> : ''}

            <hr className='hr-line' />
            <form className='form-producto' >
                <div className='mb-3'>
                    <label htmlFor="userName" className='user-name'>{!user ? <small className="text-danger">*</small> : ''} Nombre del Producto</label>
                    <input type="text" className={`form-control ${isSubmitted && !user ? 'is-invalid' : ''}`} value={user || ''} onChange={(e) => setUser(e.target.value)} />

                </div>
                <div className='mb-3'>
                    <label htmlFor="descripcion" className='decription' >{!description ? <small className="text-danger">*</small> : ''} Descripcion</label>
                    <input type="text" className={`form-control ${isSubmitted && !description ? 'is-invalid' : ''}`} value={description || ''} onChange={(e) => setDescription(e.target.value)} />

                </div>
                <div className='mb-3'>
                    <label htmlFor="stock" className='stock'> {!stock ? <small className="text-danger">{`*>0`}</small> : ''} Stock</label>
                    <input type="number" className={`form-control ${isSubmitted && !stock ? 'is-invalid' : ''}`} value={stock || 0} onChange={(e) => setStock(e.target.value)} />

                </div>
                <div className='mb-3'>
                    <label htmlFor="price" className='price'>Precio</label>
                    <input type="number" className={`form-control ${isSubmitted && !price ? 'is-invalid' : ''}`} value={price || 0} onChange={(e) => setPrice(e.target.value)} />

                </div>
                <hr className='hr-line' />
                <div className="mb-3">
                    <label htmlFor="fileInput" className="form-label" >
                        <img src="/src/assets/attach.png" alt="img clip" id='img-clip' />
                        Subir Imagen</label>
                    <input
                        type="file"
                        className='form-control'
                        id='fileInput'
                      
                        onChange={(e) => setImg(e.target.files[0])}
                        required
                    />

                    <div id="attachHelper" className="form-text" aria-disabled='false'>maximo 350x350 px.</div>

                    <button type="submit" className="btn btn-primary" onClick={handleUploadImg}
                        disabled={upButton}
                    >
                        Subir archivo
                    </button>
                </div>
                <hr className='hr-line' />
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!user || !description || !price || !stock || !img}
                >
                    {title === 'Editar' ? 'Actualizar' : 'Guardar'}
                </button>

            </form>

        </div>
    )
}
