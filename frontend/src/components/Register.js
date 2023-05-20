import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import * as auth from "../utils/auth";

function Register({
  onSuccesPopupOpen,
  handleStateErrorInfo,
  handleStateSuccessInfo,
}) {
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    auth
      .signup(values)
      .then((res) => {
        onSuccesPopupOpen();
        handleStateSuccessInfo();
        history.push("/signin");
      })
      .catch((err) => {
        onSuccesPopupOpen();
        handleStateErrorInfo();
      });
  };

  return (
    <>
      <form
        className="sign-up"
        noValidate
        name="sign-up"
        onSubmit={handleSubmit}
      >
        <h1 className="sign-up__title">Regístrate</h1>
        <input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          className="sign-up__input"
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
          className="sign-up__input"
          minLength="2"
          maxLength="50"
          required
          value={values.password}
          onChange={handleChange}
        />
        <button className="sign-up__button" type="submit">
          <p className="sign-up__button-text">Regístrate</p>
        </button>
        <Link to="/signin" className="sign-up__text">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </form>
    </>
  );
}

export default Register;
