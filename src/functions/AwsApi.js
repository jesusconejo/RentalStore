
const API_URL = 'http://localhost:8080/api-images/';

export const fetchUploadImg = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(API_URL+'upload', {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error al subir la imagen');
        }

        const data = await response.text();
        console.log('Imagen subida con éxito:', data);
        return data;  // Esto contiene la URL de la imagen o cualquier respuesta del servidor
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
};