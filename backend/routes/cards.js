const router = require('express').Router();
const {
  getCardsController,
  postCardsController,
  deleteCardController,
  addLikeCardController,
  deleteLikeCardController,
} = require('../controllers/cards');

router.get('/cards', getCardsController);
router.post('/cards', postCardsController);
router.delete('/cards/:cardId', deleteCardController);
router.put('/cards/:cardId/likes', addLikeCardController);
router.delete('/cards/:cardId/likes', deleteLikeCardController);

module.exports = router;
