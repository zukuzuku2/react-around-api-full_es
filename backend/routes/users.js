const router = require("express").Router();
const {
  createUserController,
  loginUserController,
  getUserController,
  getUserByIdController,
  updateMeController,
  updateAvatarController,
  getUserMeController,
} = require("../controllers/users");
const { auth } = require("../middleware/auth");

router.get("/users", auth, getUserController);
// router.get("/users/:id", auth, getUserByIdController);
router.patch("/users/me", auth, updateMeController);
router.patch("/users/me/avatar", auth, updateAvatarController);
router.post("/signin", loginUserController);
router.post("/signup", createUserController);
router.get("/users/me", auth, getUserMeController);

module.exports = router;
