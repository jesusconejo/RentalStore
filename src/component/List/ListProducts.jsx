import React from 'react'
import './ListProducts.css'
export const ListProducts = () => {
    return (
        <div className='container-lista'>
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">id</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripción</th>
                        <th scope="col">Precio</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td className="actions-container">
                            <button className="btn btn-primary">Editar</button>
                            <button className="btn btn-danger">Eliminar</button>
                            <button className="btn btn-info">Ver</button>
                        </td>


                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td className="actions-container">
                            <button className="btn btn-primary">Editar</button>
                            <button className="btn btn-danger">Eliminar</button>
                            <button className="btn btn-info">Ver</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td className="actions-container">
                            <button className="btn btn-primary">Editar</button>
                            <button className="btn btn-danger">Eliminar</button>
                            <button className="btn btn-info">Ver</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td className="actions-container">
                            <button className="btn btn-primary">Editar</button>
                            <button className="btn btn-danger">Eliminar</button>
                            <button className="btn btn-info">Ver</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td className="actions-container">
                            <button className="btn btn-primary">Editar</button>
                            <button className="btn btn-danger">Eliminar</button>
                            <button className="btn btn-info">Ver</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td className="actions-container">
                            <button className="btn btn-primary">Editar</button>
                            <button className="btn btn-danger">Eliminar</button>
                            <button className="btn btn-info">Ver</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td className="actions-container">
                            <button className="btn btn-primary">Editar</button>
                            <button className="btn btn-danger">Eliminar</button>
                            <button className="btn btn-info">Ver</button>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                        <td className="actions-container">
                            <button className="btn btn-primary">Editar</button>
                            <button className="btn btn-danger">Eliminar</button>
                            <button className="btn btn-info">Ver</button>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>
    )
}
