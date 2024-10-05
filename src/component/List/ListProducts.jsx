import React, { useState, useEffect } from 'react';
import './ListProducts.css';
import { fetchDeleteProduct, fetchListProduct } from '../../functions/productoApi';
import { ModalForm } from '../forms/ModalForm';
import { EditAddProductForm } from '../forms/EditAddProductForm';
import { CardComponent } from '../CardComponent';

export const ListProducts = ({ initialProducts = [] }) => {
    const [products, setProducts] = useState(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [productoId, setProductoId] = useState('');
    const [producto, setProducto] = useState({
        name: '',
        description: '',
        price: '',
        stock: '',
        imagePath: ''
    });

    const openModal = (productoId, nameProduct, descriptionProduct, imgUrl, priceProduct, stockProduct) => {
        setIsModalOpen(true);
        setProductoId(productoId);

        // Actualizamos el estado de producto con los valores de la fila seleccionada
        setProducto({
            name: nameProduct,
            description: descriptionProduct,
            price: priceProduct,
            stock: stockProduct,
            imagePath: imgUrl
        });
    };
    const openModalCard = (productoId, nameProduct, descriptionProduct, imgUrl, priceProduct, stockProduct) => {
        setIsViewModalOpen(true);
        setProductoId(productoId);

        setProducto({
            name: nameProduct,
            description: descriptionProduct,
            price: priceProduct,
            stock: stockProduct,
            imagePath: imgUrl
        });
    };

    const closeModal = () => setIsModalOpen(false);
    const closeViewModal = () => setIsViewModalOpen(false);

    const handleList = async () => {
        try {
            const data = await fetchListProduct();
            setProducts(data);
        } catch (error) {
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        handleList();
    }, []);

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar este producto?");
       
        if (confirmDelete) {
            const response = await fetchDeleteProduct(productId);
            if (response && response.message === 'Producto eliminado correctamente') {
                const updatedProducts = products.filter(product => product.id !== productId);
                setProducts(updatedProducts);
            }
        }
    };

    return (
        <div className='container-lista'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Acciones

                            <button className="btn-update"
                                onClick={handleList}>
                                <img src="src/assets/actualizar.png" alt="Cerrar" className="close-icon" />
                            </button>

                        </th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product.id}>
                                <th scope="row">{product.id}</th>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>{product.price}</td>
                                <td>{product.stock}</td>
                                <td className="actions-container">
                                    <button className="btn btn-primary"
                                        onClick={() => openModal(product.id, product.name, product.description, product.imagePath, product.price, product.stock)}>
                                        Editar
                                    </button>
                                    <ModalForm isOpen={isModalOpen} onClose={closeModal}>

                                        <EditAddProductForm onSave={setIsModalOpen} title={"Editar"} id={productoId} initialProduct={producto} />
                                    </ModalForm>
                                    <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Eliminar</button>
                                    <button className="btn btn-info"
                                        onClick={() => openModalCard(product.id, product.name, product.description, product.imagePath, product.price, product.stock)}>
                                        Ver
                                    </button>
                                    <ModalForm isOpen={isViewModalOpen} onClose={closeViewModal}>
                                        <CardComponent title={producto.name} text={producto.description} imageUrl={producto.imagePath} stock={producto.stock} precio={producto.price} />
                                    </ModalForm>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No hay productos disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
