const API_URL = 'http://localhost:8080/api-category/';


export const fetchGetAll = async () => {
    try {
        const response = await fetch(API_URL + 'getAll');
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

export const fetchSaveCategory = async (category) => {
    // console.log("API: ", user)
     try {
         const response = await fetch(API_URL + 'add', {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
             },
             body: JSON.stringify(category), 
         });
        // console.log('response:', response)
         if (!response.ok) {
             if (response.status === 409) {     
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
 export const fetchDeleteCategory = async (id) => {
    try {
        const response = await fetch(API_URL + 'delete?id=' + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            
            if (response.status === 409) {     
                const data = await response.json();
               // console.log('data: ',data);        
                return data;
               
            }
           throw new Error(response.status);
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