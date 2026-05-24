const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");

const { register, login, changePassword } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);

module.exports = router;