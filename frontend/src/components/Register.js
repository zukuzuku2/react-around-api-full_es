import { React, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import * as auth from "../utils/auth";
import FormValidator from "./FormValidator";

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
  const [errors, setErrors] = useState({});

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
    <FormValidator errors={errors} setErrors={setErrors}>
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
        <span
          className={`form-name-error form__input-error form__input-error_active`}
        >
          {errors.email}
        </span>
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
        <span
          className={`form-name-error form__input-error form__input-error_active`}
        >
          {errors.password}
        </span>
        <button className="sign-up__button" type="submit">
          <p className="sign-up__button-text">Regístrate</p>
        </button>
        <Link to="/signin" className="sign-up__text">
          ¿Ya eres miembro? Inicia sesión aquí
        </Link>
      </form>
      className={`login__input ${errors.username ? "login__input_error" : ""}`}
    </FormValidator>
  );
}

export default Register;
