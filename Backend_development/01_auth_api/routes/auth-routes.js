const express = require("express");

const authController = require("../controllers/auth-controllers");
const router = express.Router();
const { authenticate, validateEmailAndPassword } = require("../middlewares");

router.post("/auth/sign-in", authController.login);
router.post("/auth/sign-up", validateEmailAndPassword, authController.register);
router.get("/me", authenticate, authController.getUserFromToken);

module.exports = router;
