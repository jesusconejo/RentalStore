const API_URL = 'http://localhost:8080/api-user/';


export const fetchListUser = async () => {
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
export const fetchSaveUser = async (user) => {
   // console.log("API: ", user)
    try {
        const response = await fetch(API_URL + 'save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user), 
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
export const fetchUpdateRol = async (id, rol) => {
    // console.log("API: ", user)
     try {
         const response = await fetch(API_URL + 'updateRol?id='+id+'&rol='+rol, {
             method: 'PATCH',
             headers: {
                 'Content-Type': 'application/json',
             },
           
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
export const fetchGetUser = async (id) => {
    // console.log("API: ", user)
     try {
         const response = await fetch(API_URL + 'getUser?id='+id, {
             method: 'GET',
             headers: {
                 'Content-Type': 'application/json',
             }
            
         });
        // console.log('response:', response)
         if (!response.ok) {
             if (response.status === 404) {     
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
export const fetchLogin = async (user) => {
    //console.log("API: ", user)
    try {
        const response = await fetch(API_URL + 'login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user), 
        });
       // console.log('response:', response)
        if (!response.ok) {
            if (response.status === 401) {     
                const data = await response.json();
               // console.log('data: ',data);        
                return data;
               
            }else if(response.status === 404){
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
