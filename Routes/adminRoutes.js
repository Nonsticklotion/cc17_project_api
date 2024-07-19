const express = require("express");
const authenticate = require("../middlewares/authenticate");
const adminController = require("../Controllers/adminController");
const upload = require("../middlewares/upload");
const { validateUpdatePic } = require("../middlewares/validateUpload");
const adminRouter = express.Router();

adminRouter.post(
  "/product",
  authenticate,
  upload.single("productPic"),
  validateUpdatePic,
  adminController.createProduct
);
adminRouter.patch(
  "/product",
  authenticate,
  adminController.updateProductDetails
);
adminRouter.patch(
  "/order/payment",
  authenticate,
  adminController.updatePayment
);
adminRouter.patch(
  "/order/shipment",
  authenticate,
  adminController.updateShipment
);
adminRouter.get("/order", authenticate, adminController.getAllOrder);
adminRouter.get(
  "/orderItem/:orderId",
  authenticate,
  adminController.getAllOrderItem
);
adminRouter.get(
  "/order/:orderId",
  authenticate,
  adminController.getOrderandAddressFromOrderId
);
adminRouter.get("/product", adminController.getAllProduct);
adminRouter.get("/product/:productId", adminController.getOneProduct);
adminRouter.get(
  "/product/:category",
  authenticate,
  adminController.selectProductFromCategory
);
adminRouter.delete(
  "/product/:productId",
  authenticate,
  adminController.deleteProduct
);
adminRouter.post("/category", authenticate, adminController.createCategory);
adminRouter.get("/category",  adminController.getCategory);
adminRouter.delete("/category", authenticate, adminController.deleteCategory);

module.exports = adminRouter;
