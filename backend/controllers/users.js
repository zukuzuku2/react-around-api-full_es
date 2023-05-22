const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { NODE_ENV, JWT_SECRET } = process.env;

const createUserController = (req, res, next) => {
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
    .catch(() => {
      const err = new Error("Error de Validacion");
      err.statusCode = 400;
      next(err);
    });
};

const loginUserController = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === "production" ? JWT_SECRET : "dev-secret",
        {
          expiresIn: "7d",
        }
      );
      res.send({ token });
    })
    .catch(() => {
      const err = new Error("No autorizado");
      err.statusCode = 401;
      next(err);
    });
};

const getUserController = (req, res, next) => {
  User.find({})
    .orFail()
    .then((users) => res.send({ data: users }))
    .catch(() => {
      const err = new Error("Usuario no encontrado");
      err.statusCode = 404;
      next(err);
    });
};

const getUserByIdController = (req, res, next) => {
  User.findById(req.params.id)
    .orFail()
    .then((user) => {
      if (!user) {
        const err = new Error("ID de usuario no encontrado");
        err.statusCode = 404;
        next(err);
        return;
      }
      res.send({ user: user });
    })
    .catch(() => {
      const err = new Error("ID de usuario no valido");
      err.statusCode = 400;
      next(err);
    });
};

const updateMeController = (req, res, next) => {
  const { name, about, avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { name, about, avatar })
    .then((user) => {
      if (!user) {
        const err = new Error("ID de usuario no encontrado");
        err.statusCode = 404;
        next(err);
        return;
      }
      res.send({ user: user });
    })
    .catch(() => {
      const err = new Error("ID de usuario no valido");
      err.statusCode = 400;
      next(err);
    });
};

const updateAvatarController = (req, res, next) => {
  const { avatar } = req.body;
  const { _id } = req.user;
  User.findByIdAndUpdate(_id, { avatar })
    .then((user) => {
      if (!user) {
        const err = new Error("ID de usuario no encontrado");
        err.statusCode = 404;
        next(err);
        return;
      }
      res.send({ user: user });
    })
    .catch(() => {
      const err = new Error("ID de usuario no valido");
      err.statusCode = 400;
      next(err);
    });
};

const getUserMeController = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      if (!user) {
        const err = new Error("ID de usuario no encontrado");
        err.statusCode = 404;
        next(err);
        return;
      }
      res.send({ user: user });
    })
    .catch(() => {
      const err = new Error("ID de usuario no valido");
      err.statusCode = 400;
      next(err);
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
