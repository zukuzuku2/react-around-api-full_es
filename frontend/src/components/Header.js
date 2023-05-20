import { Link, useLocation } from "react-router-dom";

function Header({ onClick, ...props }) {
  const location = useLocation();
  return (
    <header className="header">
      <img src={props.image} alt="Banner Header" className="header__pic" />
      <div className="header__text">
        <p className="header__mail">{props.email}</p>
        <Link
          to={location.pathname === "/signin" ? "/signup" : "/signin"}
          className="header__login"
          onClick={onClick}
        >
          {location.pathname === "/signin" ? `Regístrate` : ""}
          {location.pathname === "/signup" ? `Inicia sesión` : ""}
          {location.pathname === "/" ? "Cerrar sesión" : ""}
        </Link>
      </div>
    </header>
  );
}

export default Header;
