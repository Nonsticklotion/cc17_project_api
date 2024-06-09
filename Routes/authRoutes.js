const express = require("express");
const authController = require("../Controllers/authController");
const validator = require("../middlewares/validator");
const authenticate = require("../middlewares/authenticate");
const authRouter = express.Router();

authRouter.post("/register", validator.register, authController.register);
authRouter.post("/login", validator.loginValidator, authController.login);
authRouter.get("/me", authenticate, authController.getMe);
module.exports = authRouter;
