const BASE_URL = 'http://localhost:8080/api-favorite/';

export const fetchQualifier = async (idUser, idProduct, quantity) => {
    // console.log("API: ", user)
     try {
         const response = await fetch(BASE_URL + 'qualification?idUser='+idUser+'&idProduct='+idProduct+'&quantity='+quantity, {
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