import React, { useEffect, useState } from 'react';
import { fetchListUser, fetchUpdateRol } from '../../functions/UserApi';
import './ListProducts.css'

export const ListUsers = () => {
    const [users, setUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const rolesOptions = ['admin', 'customer', 'manager', 'employee', 'user']; // Define los roles disponibles

    const handleList = async () => {
        try {
            const data = await fetchListUser();
            setUsers(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
        }
    };

    const closeModal = () => setIsModalOpen(false);
    const closeViewModal = () => setIsViewModalOpen(false);

    useEffect(() => {
        handleList();
    }, []);

    const handleSave = async (userId, newRole) => {
        try {
            const response = await fetchUpdateRol(userId, newRole);
            console.log('response handleRoleChange: ', response);
            // Después de guardar, actualizamos la lista
            handleList();
        } catch (error) {
            console.log('error: ', error)
        }
    }

    const handleRoleChange = (userId, newRole) => {
        setUsers((prevUsers) => 
            prevUsers.map((user) => 
                user.id === userId ? { ...user, rol: newRole } : user
            )
        );
    };

    return (
        <div className='container-lista'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Dirección de Correo</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Creado</th>
                        <th scope="col">Modificado</th>
                        <th scope="col">Acciones
                            <button className="btn-update" onClick={handleList}>
                                <img src="src/assets/actualizar.png" alt="Cerrar" className="close-icon" />
                            </button>
                        </th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {users.length > 0 ? (
                        users.map((user) => (
                            <tr key={user.id}>
                                <th scope="row">{user.id}</th>
                                <td>{user.name}</td>
                                <td>{user.lastName}</td>
                                <td>{user.userName}</td>
                                <td>{user.email}</td>
                                <td>
                                    <select 
                                        value={user.rol} 
                                        onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                    >
                                        {rolesOptions.map((role) => (
                                            <option key={role} value={role}>
                                                {role}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>{user.created}</td>
                                <td>{user.modified}</td>
                                <td className="actions-container">
                                    <button className="btn btn-primary"
                                        onClick={() => handleSave(user.id, user.rol)}>
                                        Guardar
                                    </button>
                                    <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>Eliminar</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="text-center">No hay usuarios disponibles</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
