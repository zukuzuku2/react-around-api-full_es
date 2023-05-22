import React, { useContext, useEffect, useRef } from "react";
import editButton from "../images/change_image_profile.png";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
  const currentUser = useContext(CurrentUserContext);
  const imgProfile = useRef();

  useEffect(() => {
    function changeImageProfile() {
      imgProfile.current.src = currentUser.avatar;
    }
    changeImageProfile();
  }, [currentUser.avatar]);

  return (
    <>
      <main className="content">
        <section className="profile" id="profile">
          <img
            ref={imgProfile}
            alt="Imagen de perfil de usuario"
            className="profile__image"
            id="profile__image"
            onClick={props.onEditAvatarClick}
          />
          <div className="profile__info">
            <div className="profile__edit-container">
              <h2 className="profile__name" id="profile__name">
                {currentUser.name}
              </h2>
              <div className="profile__edit" onClick={props.onEditProfileClick}>
                <img
                  src={editButton}
                  alt="Boton para editar los datos del prefil social"
                  className="profile__edit-button"
                />
              </div>
            </div>
            <h3 className="profile__skills" id="profile__skills">
              {currentUser.about}
            </h3>
          </div>
          <div className="button" onClick={props.onAddPlaceClick}>
            <div className="button__plus"></div>
          </div>
        </section>
        <section className="elements">
          {props.cards.map((card) => {
            return (
              <Card
                key={card._id}
                onCardClick={props.onCardClick}
                card={card}
                onCardLike={props.onCardLike}
                onCardDelete={props.onCardDelete}
              />
            );
          })}
        </section>
      </main>
    </>
  );
}

export default Main;
