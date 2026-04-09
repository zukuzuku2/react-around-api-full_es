import React from "react";
import deleteButton from "../images/delete.svg";
import heart from "../images/heart.svg";
import blackHeart from "../images/blackHeart.png";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = React.useContext(CurrentUserContext);
  function handleClick() {
    onCardClick(card);
  }
  function handleLikeClick() {
    onCardLike(card);
  }
  function handleDeleteClick() {
    onCardDelete(card._id);
  }
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <article className="cards">
        <button className="cards__delete" name="eliminar">
          <img
            src={isOwn ? deleteButton : ""}
            alt={isOwn ? "imagen de cesto de basura para eliminar cards" : ""}
            className={isOwn ? "cards__delete-image" : ""}
            onClick={handleDeleteClick}
          />
        </button>
        <img
          src={card.link}
          alt="Imagen del Lago Louise"
          className="cards__image"
          onClick={handleClick}
        />
        <div className="cards__info-container">
          <h4 className="cards__title">{card.name}</h4>
          <div className="cards__like-container">
            <button className="cards__like" type="button" name="Like">
              <img
                onClick={handleLikeClick}
                src={isLiked ? blackHeart : heart}
                alt="Imagen de reaccion de me gusta de la cards"
                className="cards__like-image"
              />
            </button>
            <h5 className="cards__counters">{card.likes.length}</h5>
          </div>
        </div>
      </article>
    </CurrentUserContext.Provider>
  );
}

export default Card;
