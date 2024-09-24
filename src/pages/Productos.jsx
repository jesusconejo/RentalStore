import React from 'react'
import './Productos.css'
import { CardComponent } from '../component/CardComponent'

export const Productos = () => {
  const cardData = [
    { title: "Rana", text: "Este es un texto sobre la ranaaaaaaaaaaaaaaaaaaaa.", imageUrl: "src/assets/cards/cat_1.jpg" },
    { title: "Pirata", text: "Este es un texto sobre el gato.", imageUrl: "src/assets/cards/cat_2.jpg" },
    { title: "Murcielago", text: "Este es un texto sobre el perro.", imageUrl: "src/assets/cards/cat_3.jpg" },
    { title: "Gato con Botas", text: "Este es un texto sobre el perro.", imageUrl: "src/assets/cards/cat_4.jpg" },
    { title: "Pirata 2", text: "Este es un texto sobre el perro.", imageUrl: "src/assets/cards/cat_5.jpg" }
  ];
 
  return (
   
    <div className='container' >
     
      <h4 className='subTitle'>Sugerencias para tu michi</h4>
      <div className='card-grid'>
      {cardData.map((card, index) => (
          <CardComponent key={index} title={card.title} text={card.text} imageUrl={card.imageUrl} />
        ))}
      </div>
      <hr />
      
      <h4 className='subTitle'> ¡ De Temporada!</h4>
      <div className='card-grid'>
      <CardComponent title="Ejemplo 1" text="Texto de ejemplo 1" imageUrl="src/assets/cards/cat_1.jpg" />
        <CardComponent title="Ejemplo 2" text="Texto de ejemplo 2" imageUrl="src/assets/cards/cat_2.jpg" />
        <CardComponent title="Ejemplo 3" text="Texto de ejemplo 3" imageUrl="src/assets/cards/cat_3.jpg" />
      </div>
      <h2>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum voluptatum recusandae, non omnis dolorum a dignissimos soluta quos quam dolorem maxime beatae facilis obcaecati, consequuntur accusamus necessitatibus nisi perferendis et.</h2>
      <h1> Cards de Productos</h1>



    </div>
  )
}
