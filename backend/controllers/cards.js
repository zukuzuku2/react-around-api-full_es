const Card = require('../models/card');

const getCardsController = (req, res) => {
  Card.find({})
    .orFail()
    .then((cards) => res.status(200).send({ data: cards }))
    .catch(
      (err) => {
        if (err.statusCode === 404) {
          res.status(404).send({ message: err.message });
        } else{
          res.status(500).send({ message: err.message || 'error interno del servidor'});
        }
      });
};
const postCardsController = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Card.create({ name, link, owner: _id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message || 'error interno del servidor' });
      }
    });
};
const deleteCardController = (req, res) => {
  Card.findByIdAndRemove(req.params.cardId)
    .then((card) => res.send({ data: card }))
    .catch((err) => {if (err.name === 'ValidationError') {
      res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
    } else {
      res.status(500).send({ message: err.message || 'error interno del servidor' });
    }});
};

const addLikeCardController = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message || 'error interno del servidor' });
      }
    });
};
const deleteLikeCardController = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(VALIDATION_ERROR_CODE).send({ message: err.message });
      } else {
        res.status(500).send({ message: err.message || 'error interno del servidor' });
      }
    });
};
module.exports = {
  getCardsController,
  postCardsController,
  deleteCardController,
  addLikeCardController,
  deleteLikeCardController,
};
