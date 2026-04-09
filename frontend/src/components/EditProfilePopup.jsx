import React, { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import btnClose from "../images/closeIcon.svg";
import PopupWithForm from "./PopupWithForm";

export function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser.name);
  const [description, setDescription] = useState(currentUser.about);

  function handleNameChange(e) {
    setName(e.target.value);
  }
  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    onUpdateUser({ name, about: description });
  }

  return (
    <>
      <PopupWithForm name={`profile`} title={`Editar perfil`} isOpen={isOpen}>
        <form
          className="form"
          noValidate
          name={`profile`}
          onSubmit={handleSubmit}
        >
          <img
            src={btnClose}
            alt="Boton para cerrar el modal o popup"
            className="form__close"
            id="form-close-refres-profile"
            onClick={onClose}
          />
          <h5 className="form__title">Editar perfil</h5>
          <div className="form__user-info">
            <input
              type="text"
              placeholder="Inserte su Nombre"
              className="form__input"
              id="form-name"
              minLength="2"
              maxLength="40"
              required
              value={name}
              onChange={handleNameChange}
            />
            <span className="form-name-error form__input-error">
              Este campo es obligatorio
            </span>
            <input
              type="text"
              placeholder="Inserte su Skill"
              className="form__input"
              id="form-skills"
              minLength="2"
              maxLength="200"
              required
              value={description}
              onChange={handleDescriptionChange}
            />
            <span className="form-skills-error form__input-error">
              Este campo es obligatorio
            </span>
          </div>
          <button className="form__submit form-profile" type="submit">
            <p className="form__submit-text">Guardar</p>
          </button>
        </form>
      </PopupWithForm>
    </>
  );
}
