const BASE_URL = 'http://localhost:8080/api-like/';

export const fetchSaveLike = async (idUser, idProduct) => {
    // console.log("API: ", user)
     try {
         const response = await fetch(BASE_URL + 'save?idUser='+idUser+'&idProduct='+idProduct, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             }
             
         });
        // console.log('response:', response)
         if (!response.ok) {
             if (response.status === 400) {     
                 const data = await response.json();
                // console.log('data: ',data);        
                 return data;
                
             }
            throw new Error(response.status);
         }
 
         const data = await response.json();
         return data;
     } catch (error) {       
         throw error;
        
     }
 };

 export const fetchDeleteLike = async (idUser, idProduct) => {
    try {
        const response = await fetch(BASE_URL + 'delete?idUser=' + idUser+'&idProduct='+idProduct, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            // Si la respuesta no es OK, intenta parsear el error si tiene contenido
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson ? await response.json() : { message: 'Error al eliminar el like' };
            return data;
        }

        // Si la respuesta es OK, no necesariamente tiene que tener contenido
        const isJson = response.headers.get('content-type')?.includes('application/json');
        const data = isJson ? await response.json() : { message: 'like eliminado correctamente' };

        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const fetchCountLikeByProduct = async (idProduct) => {
    try {
        const response = await fetch(BASE_URL + 'getCountAllByProduct?idProduct='+idProduct);
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