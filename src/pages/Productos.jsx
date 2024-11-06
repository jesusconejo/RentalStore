import React, { useEffect, useState } from 'react';
import { CardComponent } from '../component/CardComponent';
import { fetchListPorductByCategory, fetchListProduct } from '../functions/productoApi';
import './Productos.css';
import { fetchGetAll } from '../functions/CategoryApi';
import { Calendario } from '../component/Calendario';

export const Productos = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsFilter, setProductsFilter] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  // Estado para el término de búsqueda
  const [suggestions, setSuggestions] = useState([]);  // Estado para las sugerencias
  const [currentPage, setCurrentPage] = useState(1);  // Estado para la página actual
  const itemsPerPage = 10;  // Productos por página
  const [category, setCategory] = useState('');
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const parsedUserData = JSON.parse(localStorage.getItem('user'));
  const [productoId, setProductoId] = useState('');
  const [isLike, setIsLike] = useState(false);
  const [likeList, setLikeList] = useState([]);
  const [producto, setProducto] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    imagePath: ''
  });

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
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  const handleLike = () => {
    if (parsedUserData) {
      setLikeList(parsedUserData.likeList);
      // console.log('handleLike', likeList);
    }
  }
  const handleList = async () => {
    try {
      const data = await fetchListProduct();
     // console.log('productos: ', data);
      const response = await fetchGetAll();
      const shuffledData = shuffleArray(data);  // Mezclar los productos de manera aleatoria
      setProducts(shuffledData);
      setCategories(response);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    handleList();
    handleLike();
  }, []);

  // Filtrar productos en base al término de búsqueda
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener los productos para la página actual
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  // Función para cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleCategoryChange = async (value) => {
    setCategory(value);
    try {
      const data = await fetchListPorductByCategory(value);
      setProductsFilter(data);
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };
  const handleLikeToggle = () => {
   
  };
  // Función para manejar el cambio de búsqueda
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      // Generar las sugerencias basadas en la entrada del usuario
      const suggestionList = products
        .filter((product) => product.name.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 5);  // Limitar a 5 sugerencias

      setSuggestions(suggestionList);
    } else {
      setSuggestions([]);  // Limpiar sugerencias si no hay búsqueda
    }
  };

  // Función para manejar el autocompletado al hacer clic en una sugerencia
  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion.name);  // Autocompletar el campo de búsqueda
    setSuggestions([]);  // Limpiar sugerencias
  };

  return (
    <div className='container-producto'>
     
      <div className='container-category'>
        <h4 className='subTitle'>Sugerencias para tu michi</h4>
        <div className='container-search'>
          <input
            type="text"
            className='input-buscar'
            placeholder='Buscar productos...'
            value={searchTerm}
            onChange={handleSearchChange}  // Actualizar el término de búsqueda
          />

          {suggestions.length > 0 && (
            <ul className="suggestions-list">
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}  // Autocompletar al hacer clic
                  className="suggestion-item"
                >
                  {suggestion.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <button className="btn-nav" type="submit">Buscar</button>
      </div>

      <div className='card-grid'>
        {currentProducts.length > 0 ? (
          currentProducts.map((product) => {
            //{console.log('dentro del map',product.id, likeList[0].productId)}
            // Verificar si el producto actual está en la lista de "likeList"
            const like = likeList.find((likeItem) => likeItem.productId === product.id);

            return (
              <CardComponent
                key={product.id}  // Agregar una clave única
                id={product.id}
                title={product.name}
                text={product.description}
                imageUrl={product.imagePath}
                stock={product.stock}
                precio={product.price}
                isLike={like ? true : false} // Si se encuentra en la lista, "like" será true
                onLikeToggle={handleLikeToggle} 
                qualification={product.favorite}
              />
            );
          })
        ) : (
          <div id='nop'>
            <p >No hay productos disponibles</p>
          </div>
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
      <div className='container-category'>
        <h4 className='subTitle'>Categorias</h4>
        <div>
          <label htmlFor="category" className='category'></label>
          <select
            className='form-control'
            value={category || ""}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">Seleccione una Categoria</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='card-grid'>
        {productsFilter.length > 0 ? (

          productsFilter.map((product) => {
            const like = likeList.find((likeItem) => likeItem.productId === product.id);
            return (
              <CardComponent
                key={product.id}  // Agregar una clave única
                id={product.id}
                title={product.name}
                text={product.description}
                imageUrl={product.imagePath}
                stock={product.stock}
                precio={product.price}
                isLike={like ? true : false}
                qualification={product.favorite}
              />
            );
          })
        ) : (
          <div id='nop'>
            <p >No hay productos de la categoria selecionada</p>
          </div>
        )}
      </div>
    </div>
  );
};
