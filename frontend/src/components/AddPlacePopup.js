import React, { useState } from "react";
import btnClose from "../images/closeIcon.svg";
import PopupWithForm from "./PopupWithForm";
export function AddPlacePopup({ isOpen, onClose, onSubmit }) {
  const [name, setName] = useState("");
  const [link, setLink] = useState("");

  function handeSubmit(e) {
    e.preventDefault();
    onSubmit({ name, link });
  }

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleLinkChange(e) {
    setLink(e.target.value);
  }

  return (
    <PopupWithForm isOpen={isOpen} name={`add-card`} title={`Nuevo Lugar`}>
      <form className="form" noValidate onSubmit={handeSubmit}>
        <img
          src={btnClose}
          alt="Boton para cerrar el modal o popup"
          className="form__close"
          onClick={onClose}
        />
        <h5 className="form__title">Nuevo lugar</h5>
        <div className="form__user-info">
          <input
            onChange={handleNameChange}
            type="text"
            placeholder="Título"
            className="form__input"
            id="form-title"
            minLength="2"
            maxLength="30"
            required
            value={name}
          />
          <span className="form-title-error form__input-error">
            Este campo es obligatorio
          </span>
          <input
            onChange={handleLinkChange}
            type="url"
            placeholder="Enlace a la imagen"
            className="form__input"
            id="form-link"
            required
            value={link}
          />
          <span className="form-link-error form__input-error">
            Este campo es obligatorio
          </span>
        </div>
        <button className="form__submit form-add-card" type="submit">
          <p className="form__submit-text form__submit-createText">Crear</p>
        </button>
      </form>
    </PopupWithForm>
  );
}
