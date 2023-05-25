import { React, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import * as auth from "../utils/auth";
import FormValidator from "./FormValidator";

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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isChangeState) {
      setValues({
        password: "",
        email: "",
      });
      isLoggedIn();
      handleStateSuccessInfo();
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
    <FormValidator errors={errors} setErrors={setErrors}>
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
        <span
          className={`form-name-error form__input-error form__input-error_active`}
        >
          {errors.email}
        </span>

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
        <span
          className={`form-name-error form__input-error form__input-error_active`}
        >
          {errors.password}
        </span>

        <button className="sign-in__button" type="submit">
          <p className="sign-in__button-text">Iniciar sesión</p>
        </button>
        <Link to="/signup" className="sign-in__text">
          ¿Aún no eres miembro? Regístrate aquí
        </Link>
      </form>
    </FormValidator>
  );
}

export default Login;
