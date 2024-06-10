const express = require("express");
const authenticate = require("../middlewares/authenticate");
const adminController = require("../Controllers/adminController");
const adminRouter = express.Router();

adminRouter.post("/product", authenticate, adminController.createProduct);
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
adminRouter.get("/product", authenticate, adminController.getAllProduct);
adminRouter.delete("/product/:id", authenticate, adminController.deleteProduct);
adminRouter.post("/category", authenticate, adminController.createCategory);
adminRouter.get("/category", authenticate, adminController.getCategory);
adminRouter.delete("/category", authenticate, adminController.deleteCategory);

module.exports = adminRouter;
