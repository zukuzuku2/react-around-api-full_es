const Card = require('../models/card');

const getCardsController = (req, res, next) => {
  Card.find({})
    .orFail()
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(() => {
      const err = new Error('No se encontraron Tarjetas');
      err.statusCode = 404;
      next(err);
    });
};
const postCardsController = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch(() => {
      const err = new Error('Error en la insercion de los datos');
      err.statusCode = 400;
      next(err);
    });
};
const deleteCardController = (req, res, next) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch(() => {
      const err = new Error('Elemento no encontrado');
      err.statusCode = 404;
      next(err);
    });
};

const addLikeCardController = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => {
      const err = new Error('Elemento no encontrado');
      err.statusCode = 404;
      next(err);
    });
};
const deleteLikeCardController = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch(() => {
      const err = new Error('Elemento no encontrado');
      err.statusCode = 404;
      next(err);
    });
};
module.exports = {
  getCardsController,
  postCardsController,
  deleteCardController,
  addLikeCardController,
  deleteLikeCardController,
};
