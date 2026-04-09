function PopupWithForm(props) {
  return (
    <>
      <div
        className={`popup popup_${props.name} ${props.isOpen ? "show" : ""}`}
      >
        {props.children}
        <div className="overlay"></div>
      </div>
    </>
  );
}
export default PopupWithForm;
