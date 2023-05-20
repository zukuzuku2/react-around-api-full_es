import btnClose from "../images/closeIcon.svg";

export default function ImagePopup(props) {
  return (
    <>
      <div className={`popup popup_image ${props.isOpen ? "show" : ""}`}>
        <article className="popup__container">
          <img
            src={btnClose}
            alt="Boton para cerrar el modal o popup"
            className="popup__close"
            onClick={props.onClose}
          />
          <img
            alt="imagen de un lugar de estados unidos"
            src={props.card.link}
            className="popup__image"
          />
          <h4 className="popup__text">{props.card.name}</h4>
        </article>
        <div className="overlay"></div>
      </div>
    </>
  );
}
