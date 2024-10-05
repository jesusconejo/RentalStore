import React, { useEffect, useState } from 'react';
import { CardComponent } from '../component/CardComponent';
import { fetchListProduct } from '../functions/productoApi';
import './Productos.css';

export const Productos = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);  // Estado para la página actual
  const itemsPerPage = 10;  // Productos por página

  // Función para mezclar los productos de forma aleatoria
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleList = async () => {
    try {
      const data = await fetchListProduct();
      const shuffledData = shuffleArray(data);  // Mezclar los productos de manera aleatoria
      setProducts(shuffledData);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    handleList();
  }, []);

  // Obtener los productos para la página actual
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className='container-producto'>
      <h4 className='subTitle'>Sugerencias para tu michi</h4>
      <div className='card-grid'>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => (
            <CardComponent 
              key={product.id}  // Agregar una clave única
              title={product.name} 
              text={product.description} 
              imageUrl={product.imagePath} 
              stock={product.stock} 
              precio={product.price} 
            />
          ))
        ) : (
          <p>No hay productos disponibles</p>
        )}
      </div>
      
      {/* Paginación */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}
      </div>
      
      <hr />
      <h4 className='subTitle'>¡De Temporada!</h4>
      <h2>Lorem ipsum dolor sit amet consectetur...</h2>
      <h1>Cards de Productos</h1>
    </div>
  );
};
