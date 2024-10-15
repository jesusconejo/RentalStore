// api.js
const API_URL = 'http://localhost:8080/api-product/';

export const fetchListProduct = async () => {
    try {
        const response = await fetch(API_URL + 'list');
        if (!response.ok) {
          
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const fetchSaveProduct = async (producto) => {
    //console.log("API: ", producto)
    try {
        const response = await fetch(API_URL + 'save', {
            method: 'POST', // Cambiamos el método a POST
            headers: {
                'Content-Type': 'application/json', // Especificamos que el cuerpo de la solicitud es JSON
            },
            body: JSON.stringify(producto), // Convertimos el objeto producto a JSON
        });

        if (!response.ok) {
            if (response.status === 400) {               
                throw new Error('Nombre ya existe');
               
            }
           throw new Error(response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {       
        throw error;
       
    }
};
export const fetchDeleteProduct = async (id) => {
    try {
        const response = await fetch(API_URL + 'delete?id=' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Si la respuesta no es OK, intenta parsear el error si tiene contenido
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : { message: 'Error al eliminar el producto' };
            return data;
        }

        // Si la respuesta es OK, no necesariamente tiene que tener contenido
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : { message: 'Producto eliminado correctamente' };

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchUpdateProduct = async (producto, id) => {
    try {
        const response = await fetch(API_URL + 'update?id=' + id, {
            method: 'PUT', // Cambiamos el método a POST
            headers: {
                'Content-Type': 'application/json', // Especificamos que el cuerpo de la solicitud es JSON
            },
            body: JSON.stringify(producto), // Convertimos el objeto producto a JSON
        });

        if (!response.ok) {
            if (response.status === 400) {               
                throw new Error('Nombre ya existe');
               
            }
           throw new Error(response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};


export const fetchListPorductByCategory = async (category) => {
    try {
        const response = await fetch(API_URL + 'getListCategory?category=' + category, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Lanza el error para manejarlo en el componente
    }
};

export const fetchPorductByName = async (name) => {
    try {
        const response = await fetch(API_URL + 'getByName?name=' + name, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Si no es una respuesta exitosa (200-299)
        if (!response.ok) {
            if (response.status === 404) {
                console.log('Producto no encontrado', response);
                return response;  // Retorna null para indicar que el producto no existe
            }
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
       
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;  // Lanza el error para manejarlo en el componente
    }
};
