import React, { useEffect, useState } from 'react';
import './InfoUser.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../component/AuthProvider';
import { fetchGetProductsByIds } from '../functions/productoApi';
import { CardComponent } from '../component/CardComponent';
import { ModalForm } from '../component/forms/ModalForm';
import { Politicas } from './Politicas';

export const InfoUser = () => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClick = () => {
        navigate('/Admin');
    };
    const handlePolicy = () => {
        setIsModalOpen(true);
    };

    const productList = async () => {
        const productIds = user.likeList.map((like) => like.productId);
        try {
            const response = await fetchGetProductsByIds(productIds);
            setProducts(response);
        } catch (error) {
            console.log('Error al obtener productos', error);
        }
    };
    const closeModal = () => setIsModalOpen(false);
    const handleLikeToggle = (productId) => {
        // Aquí puedes actualizar la lista de productos o realizar una llamada a la API
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts); // Actualiza los productos sin recargar la página
    };

    useEffect(() => {
        productList();
    }, []);

    return (
        <div className="info-container">
            <div id="hello">
                <h2 id="presentacion">Hola {user.userName}</h2>
                {user.rol === 'admin' && (
                    <div className="policy-c">
                    <img src="/src/assets/full-stack.png" alt="admin" id="admin" onClick={handleClick} />
                    <span className="tooltip-text">web Master</span>
                    </div>
                )}
                <div className="policy-c">
                    <img src="/src/assets/privacy-policy.png" alt="policy" id="policy" onClick={handlePolicy} />
                    <span className="tooltip-text">Políticas</span>
                </div>
                <ModalForm isOpen={isModalOpen} onClose={closeModal}>
                    <Politicas />
                </ModalForm>
            </div>

            <h5>Estas activo desde {user.created}</h5>
            <hr />
            <form>
                <h3 id="sub-title">Datos Personales</h3>
                <div className="mb-3">
                    <label id="tag-user">Nombre: </label>
                    <label id="info-user">{user.name}</label>
                </div>
                <div className="mb-3">
                    <label id="tag-user">Apellido: </label>
                    <label id="info-user">{user.lastName}</label>
                </div>
                <div className="mb-3">
                    <label id="tag-user">Dirección de Correo: </label>
                    <label id="info-user">{user.email}</label>
                </div>
            </form>
            <hr />

            <h3 id="sub-title">Lista de Favoritos</h3>
            <div className="card-grid">
                {products.length > 0 ? (
                    products.map((product) => (
                        <CardComponent
                            key={product.id}
                            id={product.id}
                            title={product.name}
                            text={product.description}
                            imageUrl={product.imagePath}
                            stock={product.stock}
                            precio={product.price}
                            isLike={true}
                            onLikeToggle={handleLikeToggle} // Pasamos el callback al componente hijo
                        />
                    ))
                ) : (
                    <div id="nop">
                        <p>No tiene ningun producto favorito</p>
                    </div>
                )}
            </div>
            <hr />
            <h3 id="sub-title">Historico de Rentas</h3>
        </div>
    );
};
