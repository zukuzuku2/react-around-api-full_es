const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const createUserController = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        about,
        avatar,
        email,
        password: hash,
      });
    })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      } else {
        res
          .status(500)
          .send({ message: err.message || "error interno del servidor" });
      }
    });
};

const loginUserController = (req, res) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    });
};

const getUserController = (req, res) => {
  User.find({})
    .orFail()
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res
          .status(500)
          .send({ message: err.message || "error interno del servidor" });
      }
    });
};

//Preguntar acerca del punto 6 del proyecto
const getUserByIdController = (req, res) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "ID de usuario no encontrado" });
        return;
      }
      res.send({ user: user });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        console.log("Llego a getUserByIdController");

        res.status(400).send({ message: "ID de usuario no valido" });
        return;
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res
          .status(500)
          .send({ message: err.message || "error interno del servidor" });
      }
    });
};

const updateMeController = (req, res) => {
  const { name, about, avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about, avatar })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "ID de usuario no encontrado" });
        return;
      }
      res.send({ user: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      } else {
        res
          .status(500)
          .send({ message: err.message || "error interno del servidor" });
      }
    });
};

const updateAvatarController = (req, res) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar })
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "ID de usuario no encontrado" });
        return;
      }
      res.send({ user: user });
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      } else {
        res
          .status(500)
          .send({ message: err.message || "error interno del servidor" });
      }
    });
};

const getUserMeController = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: "ID de usuario no encontrado" });
        return;
      }
      res.send({ user: user });
    })
    .catch((err) => {
      console.log(err.name);
      if (err.name === "CastError") {
        console.log("Llego a getUserMeController");

        res.status(400).send({ message: "ID de usuario no valido" });
        return;
      } else if (err.statusCode === 404) {
        res.status(404).send({ message: err.message });
      } else {
        res
          .status(500)
          .send({ message: err.message || "error interno del servidor" });
      }
    });
};

module.exports = {
  createUserController,
  loginUserController,
  getUserController,
  getUserByIdController,
  updateMeController,
  updateAvatarController,
  getUserMeController,
};
