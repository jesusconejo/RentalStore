import React, { useState, useEffect } from 'react';
import './BuyCar.css';
import { userBuyCar } from './BuyCarProvider';


export const BuyCar = ({ productos = [], subTotal, impuesto, total }) => {
    const [products, setProducts] = useState([]);
    const [productosIs, setProductosIs] = useState(true);
    const { buyCar, saveBuyCar } = userBuyCar();
    useEffect(() => {
        // Solo actualiza `products` si `productos` realmente ha cambiado
        if (productos !== products) {
            setProducts(productos);
        }
    }, [productosIs]); // Ejecuta solo cuando `productos` cambia

    return (
        <div className='container' id='main'>
            <h3 id='title'>Carrito de Compra</h3>


            <div className='container mb-3' id='productos'>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                           {/* <th scope="col">a</th>*/}

                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {buyCar.buyCar.products.length > 0 ? (
                            buyCar.buyCar.products.map((producto) => (
                                <tr key={producto.id}>
                                    <th scope="row">{producto.id}</th>
                                    <td>{producto.name}</td>
                                    <td>{producto.price} $</td>
                                   { /*<td className="actions-container">
                                        <button className="btn btn-danger" onClick={() => handleDelete(producto.id)}>X</button>
                                    </td>*/}
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No ha cargado productos</td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className='container mb-3' id='calculate'>
                    <div id='fila'>
                        <label id='clave'>Subtotal:</label> <label id='valor'>{buyCar.buyCar.subTotal} $</label>
                    </div>
                    <div id='fila'>
                        <label id='clave'>Impuesto:</label> <label id='valor'>{buyCar.buyCar.tax} %</label>
                    </div>
                    <div id='fila'>
                        <label id='clave'>Total:</label> <label id='valor'>{parseFloat(buyCar.buyCar.total.toFixed(2))} $</label>
                    </div>



                </div>
            </div>




            <button className='btn btn-primary'>Pagar</button>
        </div>
    );
};
