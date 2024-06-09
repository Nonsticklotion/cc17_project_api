const express = require("express");
const authenticate = require("../middlewares/authenticate");
const userController = require("../Controllers/userController");
const userRouter = express.Router();



userRouter.patch('/address',authenticate,userController.updateAddress)
module.exports = userRouter;
