import React, { useEffect, useState } from 'react'
import './CardComponent.css'
import { fetchDeleteLike, fetchSaveLike } from '../functions/LikeApi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';
import { ModalForm } from './forms/ModalForm';
import { Share } from '../pages/Share';
import { Qualification } from '../pages/Qualification';
import { Reserva } from './Reserva';
export const CardComponent = ({ id, title, text, imageUrl, stock, precio, isLike, onLikeToggle, qualification }) => {
  const { user, upDateUserLikes } = useAuth();
  const likeVacio = "src/assets/me-gusta-32.png";
  const likeLleno = "src/assets/me-gusta-38.png";
  const [like, setLike] = useState(isLike);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenReserva, setIsOpenReserva] = useState(false);

  const openQualifier = () => {
    if(user){
      setIsOpen(true);
    }else{
      navigate('/Login');
    }
    

  };
  const openModal = () => {
    setIsModalOpen(true);

  };
  const closeModal = () => setIsModalOpen(false);
  const closeQualifier = () => setIsOpen(false);
  const closeModalReerva = () => setIsOpenReserva(false);

  const handleLike = () => {
    onLikeToggle(id);
    like ? setLike(false) : setLike(true);
    if (like) {
      disLike();
    } else {
      pushLike();
    }
  }
  const pushLike = async () => {
    if (user) {
      try {
        const response = await fetchSaveLike(user.id, id);
        // Actualiza el likeList del usuario
        const updatedLikes = [...user.likeList, { id: response.id, productId: id, userId: user.id, date: new Date() }];
        upDateUserLikes(updatedLikes);
      } catch (error) {
        console.log('error: ', error);
      }
    } else {
      navigate('/Login');
    }
  };
  const disLike = async () => {
    if (user) {
      try {
        const response = await fetchDeleteLike(user.id, id);
        // Actualiza el likeList del usuario removiendo el producto
        const updatedLikes = user.likeList.filter(like => like.productId !== id);
        upDateUserLikes(updatedLikes);
      } catch (error) {
        console.log('error', error);
      }
    }
  };
  const openProduct = () => {
    if (user) {
      setIsOpenReserva(true);
      console.log("vamos..");
    } else {
      navigate('/Login');
    }

  }

  return (
    <div className="card" >
      <div className="start-container">
        <img src="src/assets/estrella.png" alt="icon" className="card-icon" onClick={openQualifier} />
        <span className="icon-number">{qualification}</span>
      </div>
      <ModalForm isOpen={isOpen} onClose={closeQualifier}>
        <Qualification idProduct={id} title={title} description={text} img={imageUrl} user={user}></Qualification>
      </ModalForm>
      <div className="icon-container">
        <img src={like ? likeLleno : likeVacio} alt="icon" className="card-icon" onClick={handleLike} />
        <img src="src/assets/compartir-64.png" alt="alter" className="card-icon" onClick={openModal} />
      </div>
      <ModalForm isOpen={isModalOpen} onClose={closeModal}>
        <Share title={title} description={text} img={imageUrl} url={'http://localhost:5173/Productos'}></Share>
      </ModalForm>

      <img src={imageUrl} className="card-img-top" alt="..."></img>
      <div className="card-body">

        <h4 className="card-title">{title}</h4>
        <h6 >Precio: {precio} COP</h6>
        <p className="card-text"> {text}.</p>
        <button className="btn btn-primary" type='submit' onClick={openProduct}>{stock} Disponible</button>
        <ModalForm isOpen={isOpenReserva} onClose={closeModalReerva}>
         <Reserva title={title} stock={stock} precio={precio} urlImg={imageUrl}></Reserva>
        </ModalForm>
      </div>
    </div>
  )
}
