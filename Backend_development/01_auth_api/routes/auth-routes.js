const express = require("express");

const authController = require("../controllers/auth-controllers");
const router = express.Router();
// const { validateBody } = require("../../utils/validateBody");
// const { schemas } = require("../../models/user");
const { authenticate } = require("../middlewares");

router.post(
  "/auth/sign-in",
  // validateBody(schemas.userRegisterSchema),
  authController.signIn
);

router.post(
  "/auth/sign-up",
  // validateBody(schemas.userLoginSchema),
  authController.signUp
);

router.get("/me", authenticate, authController.getCurrent);

// router.post("/logout", authenticate, authController.logout);

// router.patch(
//   "/:contactId/subscription",
//   authenticate,
//   validateBody(schemas.subscriptionUpdateSchema),
//   authController.subscriptionUpdate
// );

module.exports = router;
