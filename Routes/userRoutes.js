const express = require("express");
const authenticate = require("../middlewares/authenticate");
const userController = require("../Controllers/userController");
const userRouter = express.Router();
const upload = require("../middlewares/upload");
const { validateUpdatePic } = require("../middlewares/validateUpload");

userRouter.get("/address", authenticate, userController.getUserAddress);
userRouter.patch("/address", authenticate, userController.updateAddress);
userRouter.post("/order", authenticate, userController.createOrder);
userRouter.delete(
  "/order/:orderId",
  authenticate,
  userController.deleteOrderAndAssociations
);
userRouter.get("/order", authenticate, userController.getMyOrder);
userRouter.post("/review", authenticate, userController.createReview);
userRouter.delete(
  "/review/:productId",
  authenticate,
  userController.deleteReview
);
userRouter.get(
  "/review/:productId",

  userController.getReviewFromProductId
);

userRouter.patch(
  "/order/paymentpic",
  authenticate,
  upload.single("paymentPic"),
  validateUpdatePic,
  userController.updatePaymentPic
);

userRouter.get("/product/:category", userController.selectProductFromCategory);
module.exports = userRouter;
