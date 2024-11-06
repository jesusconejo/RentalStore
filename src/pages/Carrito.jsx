import React from 'react'

export const Carrito = () => {
    const [reservation, setReservation] = useState([]);
    return (
        <>
            <h3>Carrito de Comrras</h3>
            <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Precio</th>
                            <th scope="col">a</th>
                            
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {categorias.length > 0 ? (
                            categorias.map((categoria) => (
                                <tr key={categoria.id}>
                                    <th scope="row">{categoria.id}</th>
                                    <td>{categoria.name}</td>
                                    <td>{categoria.description}</td>
                                    <td className="actions-container">
                                    <button className="btn btn-danger" onClick={() => handleDelete(categoria.id)}>_X_</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center">No ha cargado productos</td>
                            </tr>
                        )}
                    </tbody>
                </table>
        </>
    )
}
