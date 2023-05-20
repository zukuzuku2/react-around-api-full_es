import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import * as auth from "../utils/auth";

function Login({
  isLoggedIn,
  onSuccesPopupOpen,
  handleStateErrorInfo,
  handleStateSuccessInfo,
}) {
  const history = useHistory();
  const [values, setValues] = useState({
    password: "",
    email: "",
  });
  const [isChangeState, setIsChangeState] = useState(false);

  useEffect(() => {
    if (isChangeState) {
      setValues({
        password: "",
        email: "",
      });
      isLoggedIn();
      handleStateSuccessInfo();
      onSuccesPopupOpen();
      history.push("/main");
    }
  }, [
    history,
    isChangeState,
    isLoggedIn,
    onSuccesPopupOpen,
    handleStateSuccessInfo,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      return;
    }
    auth
      .signin(values)
      .then(() => {
        if (localStorage.getItem("token")) {
          setIsChangeState(true);
        } else {
          handleStateErrorInfo();
          onSuccesPopupOpen(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <form
        className="sign-in"
        noValidate
        name="sign-in"
        onSubmit={handleSubmit}
      >
        <h1 className="sign-in__title">{`Inicia sesión`}</h1>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="sign-in__input"
          minLength="2"
          maxLength="50"
          required
          value={values.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="sign-in__input"
          minLength="2"
          maxLength="50"
          required
          value={values.password}
          onChange={handleChange}
        />
        <button className="sign-in__button" type="submit">
          <p className="sign-in__button-text">Iniciar sesión</p>
        </button>
        <Link to="/signup" className="sign-in__text">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
      </form>
    </>
  );
}

export default Login;
