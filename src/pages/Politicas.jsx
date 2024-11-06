import React from 'react'
import './Politicas.css'
export const Politicas = () => {
    const email = 'info@shizuka-store.com';
    return (
        <>
            <div className='policy-container'>
                <h1>Políticas de Uso</h1>
                <h3>1. Introducción</h3>
                <p className='text-policy'>Bienvenido a Shizuka Store, una plataforma dedicada a la renta de disfraces para gatos. Al acceder y utilizar nuestros servicios, aceptas cumplir con las siguientes políticas de uso, que tienen como objetivo asegurar una experiencia agradable y segura para todos nuestros clientes y sus mascotas.</p>
                <div className='policy'>
                    <h3>2. Uso de los Disfraces</h3>
                    <ul>
                        <li> Los disfraces son exclusivamente para gatos. No nos hacemos responsables por el uso inapropiado de los disfraces en otras mascotas o personas.</li>
                        <li>Los disfraces deben ser manipulados con cuidado. Si notas que un disfraz tiene partes dañadas o inseguras para tu gato, por favor, contáctanos inmediatamente para hacer un cambio o una devolución.</li>
                        <li>Se recomienda que los disfraces sean utilizados bajo supervisión constante. No dejes a tu gato solo con el disfraz puesto para evitar accidentes.</li>
                    </ul>
                    <h3>3. Condiciones de Renta</h3>
                    <ul>
                        <li> Los disfraces se rentan por un período determinado, especificado en cada pedido. La devolución debe realizarse en el plazo acordado. Si el disfraz no es devuelto a tiempo, se aplicarán cargos adicionales.</li>
                        <li>El cliente es responsable de devolver el disfraz en buenas condiciones. Los daños que excedan el desgaste normal pueden resultar en cargos por reparación o reemplazo.</li>
                        <li>En caso de pérdida del disfraz, el cliente deberá pagar el valor total del mismo.</li>
                    </ul>
                    <h3>4. Higiene y Cuidado</h3>
                    <ul>
                        <li>Todos nuestros disfraces son cuidadosamente limpiados y desinfectados antes y después de cada renta. Recomendamos a los clientes que verifiquen la talla adecuada para su gato y sigan nuestras instrucciones para asegurar la comodidad de su mascota. </li>
                        <li>No lavar ni alterar los disfraces por cuenta propia. En caso de que el disfraz necesite limpieza durante el período de renta, contáctanos para asesorarte.</li>                       
                    </ul>
                    <h3>5. Seguridad y Bienestar del Gato</h3>
                    <ul>
                        <li>El bienestar del gato es nuestra prioridad máxima. Si en cualquier momento el gato muestra signos de incomodidad o estrés mientras lleva puesto el disfraz, se debe retirar inmediatamente.</li>
                        <li>No se permite el uso de disfraces en gatos menores de 3 meses, enfermos o que tengan alergias conocidas a ciertos materiales.</li>                        
                    </ul>
                    <h3>6. Devoluciones y Reembolsos</h3>
                    <ul>
                        <li>Las cancelaciones de pedidos pueden hacerse hasta 24 horas antes de la fecha de renta para obtener un reembolso completo. Después de ese tiempo, solo se reembolsará el 50% del valor de la renta. </li>
                        <li>Los disfraces devueltos con daños severos o manchas que no puedan limpiarse adecuadamente no califican para reembolso.</li>                        
                    </ul>
                    <h3>7. Política de Privacidad</h3>
                    <ul>
                        <li>Al utilizar nuestro servicio, el cliente acepta proporcionar información personal (como nombre, dirección, etc.) que será usada únicamente para procesar y entregar los pedidos.</li>
                        <li>La información personal será tratada con la máxima confidencialidad y no será compartida con terceros sin el consentimiento expreso del cliente.</li>
                    </ul>
                    <h3>8. Modificaciones a las Políticas</h3>
                   
                        <p className='text-policy'>Nos reservamos el derecho de actualizar estas políticas en cualquier momento. Cualquier cambio será notificado a través de nuestro sitio web y entrará en vigencia una vez publicado.</p>
                   
                    <h3>9. Contacto</h3>
                    <p className='text-policy'>Si tienes preguntas o inquietudes sobre nuestras políticas de uso, puedes contactarnos en {email} o a través de nuestras redes sociales.</p>
                </div>

            </div>
        </>
    )
}
