const API_URL = 'http://localhost:8080/api-reservation/';

export const fetchSaveReservation = async (reserve) => {
    try {
        const response = await fetch(API_URL + 'reserve', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reserve), 
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