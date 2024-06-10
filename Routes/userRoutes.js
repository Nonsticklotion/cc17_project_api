const express = require("express");
const authenticate = require("../middlewares/authenticate");
const userController = require("../Controllers/userController");
const userRouter = express.Router();

userRouter.patch("/address", authenticate, userController.updateAddress);
userRouter.post("/order", authenticate, userController.createOrder);
userRouter.delete(
  "/order/:orderId",
  authenticate,
  userController.deleteOrderAndAssociations
);
userRouter.post("/review", authenticate, userController.createReview);
userRouter.delete(
  "/review/:productId",
  authenticate,
  userController.deleteReview
);
module.exports = userRouter;
