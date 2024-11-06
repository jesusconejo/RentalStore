import React, { useState, useEffect } from 'react'
import './AddProductForm.css'
import { fetchSaveProduct } from '../../functions/productoApi';
import { fetchUploadImg } from '../../functions/AwsApi';
import { fetchGetAll } from '../../functions/CategoryApi';

export const AddProductForm = ({ onSave, successful }) => {
    const [user, setUser] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [category, setCategory] = useState('');
    const [img, setImg] = useState('');

    const [upButton, setUpButton] = useState(false);
    const [upFile, setUpFile] = useState(false);
    const [isUpLoad, setIsUpLoad] = useState(false);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        producto.name = user;
        producto.description = description;
        producto.price = price;
        producto.category = category;
        producto.stock = stock;
        producto.imagePath = img;
        // console.log('producto: ', producto);

        try {
            const response = await fetchSaveProduct(producto);
            Swal.fire("¡Guardado Correctamente!");
            //setMensaje('Se guardo exitosamente');
            //successful(true);
        } catch (error) {
            if ((error.message === 'Nombre ya existe')) {
                Swal.fire({
                    icon: "error",
                    title: "Uups...",
                    text: `El nombre ${producto.name } ya existe!`,
                    footer: '<a href="#">Porque no intentas otro?</a>'
                  });
               // setMensaje(`"Nombre ` + producto.name + ` ya existe"`);
                //setNameExits(true);
                //   console.log(producto.name, error.message)
                throw new Error("mantener");
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
        setUpFile(true);
        // console.log('imagen', valor);
    }
    const handleUploadImg = async (event) => {
        event.preventDefault();

        if (!img) {
            Swal.fire({
                icon: 'warning',
                title: 'No se ha seleccionado un archivo',
                text: 'Por favor selecciona un archivo antes de subir.',
            });
            setUpButton(false);
            setIsUpLoad(false);
            return;
        }

        let timerInterval;
        Swal.fire({
            title: "Subiendo imagen...",
            html: "Esta ventana se cerrará automáticamente al finalizar la carga.",
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        try {
            const response = await fetchUploadImg(img);  // Aquí se pasa el archivo seleccionado

            if (response) {
                setImg(response);  // Si la respuesta contiene la URL, guárdala
                //console.log('URL de la imagen en AWS:', response);
                setUpButton(true);
                setUpFile(false);
                setIsUpLoad(true);

                Swal.fire({
                    icon: 'success',
                    title: 'Imagen subida correctamente',
                    text: 'La imagen se ha subido exitosamente.',
                    timer: 2000,
                    timerProgressBar: true,
                });
            } else {
                throw new Error('Error al subir la imagen');
            }
        } catch (error) {
            console.error(error);
            setUpButton(false);
            setIsUpLoad(false);

            Swal.fire({
                icon: 'error',
                title: 'Error al subir la imagen',
                text: 'Ocurrió un problema durante la carga. Inténtalo nuevamente.',
            });
        } finally {
            clearInterval(timerInterval);
        }
    };

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
            <h4>Agregar Producto </h4>
            {!user || !description || !price || !stock || !upButton ? <small className="text-danger">(*) Todos los campos son obligatorios</small> : ''}


            <form className='form-producto' >
                <div className='mb-3'>
                    <label htmlFor="userName" className='user-name'>{!user ? <small className="text-danger">*</small> : ''} Nombre del Producto</label>
                    <input type="text"
                        className={`form-control ${!user ? 'is-invalid' : ''}`}
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />

                </div>
                <div className='mb-3'>
                    <label htmlFor="descripcion" className='decription' >{!description ? <small className="text-danger">*</small> : ''} Descripcion</label>
                    <input type="text" className={`form-control ${!description ? 'is-invalid' : ''}`} value={description} onChange={(e) => setDescription(e.target.value)} />

                </div>
                <div className='mb-3'>
                    <label htmlFor="stock" className='stock'> {!stock ? <small className="text-danger">{`*>0`}</small> : ''} Stock</label>
                    <input type="number" className={`form-control ${!stock ? 'is-invalid' : ''}`} value={stock} onChange={(e) => setStock(e.target.value)} />

                </div>
                <div className='mb-3'>
                    <label htmlFor="category" className='category'>Categoria
                        {!category ? <small className="text-danger">*</small> : ''}
                    </label>
                    <select
                        className={`form-control ${!category ? 'is-invalid' : ''}`}
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
                    <input type="number" className={`form-control ${!price ? 'is-invalid' : ''}`} value={price} onChange={(e) => setPrice(e.target.value)} />

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
                        disabled={!upFile}
                    >
                        Subir archivo
                    </button>
                </div>

                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!user || !description || !price || !stock || !isUpLoad || !category}
                >
                    {'Guardar'}
                </button>

            </form>

        </div>
    )
}
