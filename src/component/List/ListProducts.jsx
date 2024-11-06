import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { fetchDeleteProduct, fetchListProduct } from '../../functions/productoApi';
import { ModalForm } from '../forms/ModalForm';
import { CardComponent } from '../CardComponent';
import { EditProductForm } from '../forms/EditProductForm';

export const ListProducts = ({ initialProducts = [] }) => {
    const [products, setProducts] = useState(initialProducts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [productoId, setProductoId] = useState('');
    const [popMessage, setPopMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [producto, setProducto] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        stock: '',
        imagePath: ''
    });

    const openModal = (productoId, nameProduct, descriptionProduct, imgUrl, priceProduct, category, stockProduct) => {
        setIsModalOpen(true);
        setProductoId(productoId);

        setProducto({
            name: nameProduct,
            description: descriptionProduct,
            price: priceProduct,
            category: category,
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

    useEffect(() => {
        if (popMessage) {
            const timer = setTimeout(() => {
                setPopMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [popMessage]);

    const handleDelete = async (productId) => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: '¡No podrás revertir esta acción!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminarlo',
            cancelButtonText: 'No, cancelar',
            reverseButtons: true,
            customClass: {
                confirmButton: 'btn btn-success',
                cancelButton: 'btn btn-danger'
            },
            buttonsStyling: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                const response = await fetchDeleteProduct(productId);
                if (response && response.message === 'Producto eliminado correctamente') {
                    const updatedProducts = products.filter(product => product.id !== productId);
                    setProducts(updatedProducts);
                    setMessage('Producto eliminado correctamente');
                    setPopMessage(true);
                    
                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'El producto ha sido eliminado.',
                        icon: 'success',
                        customClass: {
                            confirmButton: 'btn btn-success'
                        },
                        buttonsStyling: false
                    });
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire({
                    title: 'Cancelado',
                    text: 'El producto no fue eliminado.',
                    icon: 'error',
                    customClass: {
                        confirmButton: 'btn btn-danger'
                    },
                    buttonsStyling: false
                });
            }
        });
    };

    return (
        <>
            {popMessage && (
                <div className='error-message'>
                    <p>{message}</p>
                </div>
            )}

            <div className='container-lista'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Descripción</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Categoria</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Acciones
                                <button className="btn-update" onClick={handleList}>
                                    <img src="src/assets/actualizar.png" alt="Actualizar" className="close-icon" />
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
                                    <td>{product.category}</td>
                                    <td>{product.stock}</td>
                                    <td className="actions-container">
                                        <button className="btn btn-primary" onClick={() => openModal(product.id, product.name, product.description, product.imagePath, product.price, product.category, product.stock)}>
                                            Editar
                                        </button>
                                        <ModalForm isOpen={isModalOpen} onClose={closeModal}>
                                            <EditProductForm onSave={setIsModalOpen} title="Editar" id={productoId} initialProduct={producto} />
                                        </ModalForm>
                                        <button className="btn btn-danger" onClick={() => handleDelete(product.id)}>Eliminar</button>
                                        <button className="btn btn-info" onClick={() => openModalCard(product.id, product.name, product.description, product.imagePath, product.price, product.stock)}>
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
                                <td colSpan="7" className="text-center">No hay productos disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};
