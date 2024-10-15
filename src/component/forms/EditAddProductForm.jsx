import React, { useState, useEffect } from 'react'
import './AddProductForm.css'
import { fetchSaveProduct, fetchUpdateProduct } from '../../functions/productoApi';
import { fetchUploadImg } from '../../functions/AwsApi';
import { fetchGetAll } from '../../functions/CategoryApi';

export const EditAddProductForm = ({ onSave, title, id, initialProduct, successful }) => {
    const [user, setUser] = useState(initialProduct?.name || '');
    const [description, setDescription] = useState(initialProduct?.description || '');
    const [price, setPrice] = useState(initialProduct?.price || 0);
    const [stock, setStock] = useState(initialProduct?.stock || 0);
    const [category, setCategory] = useState(initialProduct?.stock || '');
    const [img, setImg] = useState(initialProduct?.img || '');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [upButton, setUpButton] = useState(false);
    const [nameExist, setNameExits] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const producto = {
        name: null,
        description: null,
        price: null,
        category: null,
        stock: null,
        imagePath: null
    };
    const loadProduct = async () => {
        if (title === 'Editar') {
            setUser(initialProduct.name);
            setDescription(initialProduct.description);
            setPrice(initialProduct.price);
            setCategory(initialProduct.category)
            setStock(initialProduct.stock);
            setImg(initialProduct.imagePath);

        }
    }
    useEffect(() => {
        title === 'Editar' ? '' : loadProduct();
    }, []);
    const handleSubmit = async (event) => {
        event.preventDefault();
        producto.name = user;
        producto.description = description;
        producto.price = price;
        producto.category = category;
        producto.stock = stock;
        producto.imagePath = img;
        console.log('producto: ', producto);
        if (title === "Editar") {
            try {
                const response = await fetchUpdateProduct(producto, id);
                setMensaje('Se actualizo exitosamente');
                successful(true);
            } catch (error) {
                if ((error.message === 'Nombre ya existe')) {
                    setMensaje(`"Nombre ` + producto.name + ` ya existe"`);
                    setNameExits(true);
                    console.log(producto.name, error.message)
                    throw new Error("mantener");
                }
            }
        } else {
            try {
                const response = await fetchSaveProduct(producto);
                setMensaje('Se guardo exitosamente');
                successful(true);
            } catch (error) {
                if ((error.message === 'Nombre ya existe')) {
                    setMensaje(`"Nombre ` + producto.name + ` ya existe"`);
                    setNameExits(true);
                    console.log(producto.name, error.message)
                    throw new Error("mantener");
                }
            }
        }


        onSave(false);
        setUser('');
        setDescription('');
        setStock('');
        setPrice('');
    }
    const handleUpload = (valor) => {
        setImg(valor);

        console.log('imagen', valor);
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
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (nameExist) {
            const timer = setTimeout(() => {
                setNameExits(false);  // El mensaje desaparecerá después de 3 segundos
            }, 3000);
            return () => clearTimeout(timer);  // Limpia el temporizador cuando el componente se desmonta o el estado cambia
        }
    }, [nameExist]);
    useEffect(() => {
        // Llamada a la API para obtener las categorías
        const fetchCategories = async () => {
            try {
                const response = await fetchGetAll(); // Cambia la URL según tu API
                
                setCategories(response); // Guarda los datos en el estado
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);
    return (
        <div className='container-form'>
            {nameExist ? (
                <div className='name-message'>
                    <p>{mensaje}</p>
                </div>
            ) : ''}
            <h4>{title} Producto {id}</h4>
            {!user || !description || !price || !stock || !img ? <small className="text-danger">(*) Todos los campos son obligatorios</small> : ''}


            <form className='form-producto' >
                <div className='mb-3'>
                    <label htmlFor="userName" className='user-name'>{!user ? <small className="text-danger">*</small> : ''} Nombre del Producto</label>
                    <input type="text"
                        className={`form-control ${isSubmitted && !user ? 'is-invalid' : ''}`}
                        value={user || ''}
                        onChange={(e) => setUser(e.target.value)}
                    />

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
                    <label htmlFor="category" className='category'>Categoria
                        {!category ? <small className="text-danger">*</small> : ''}
                    </label>
                    <select
                        className={`form-control ${isSubmitted && !category ? 'is-invalid' : ''}`}
                        value={category || ""}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="">Seleccione una Categoria</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
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

                        onChange={(e) => handleUpload(e.target.files[0])}
                        required
                    />

                    <div id="attachHelper" className="form-text" aria-disabled='false'>maximo 350x350 px.</div>

                    <button type="submit" className="btn btn-primary" onClick={handleUploadImg}
                        disabled={upButton}
                    >
                        Subir archivo
                    </button>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!user && !description && !price && !stock && title === 'Editar' ? '' : !img && !upButton}
                >
                    {title === 'Editar' ? 'Actualizar' : 'Guardar'}
                </button>

            </form>

        </div>
    )
}
