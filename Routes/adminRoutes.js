const express = require("express");
const authenticate = require("../middlewares/authenticate");
const adminController = require("../Controllers/adminController");
const adminRouter = express.Router();

adminRouter.post("/", authenticate, adminController.createProduct);
adminRouter.post("/category", authenticate, adminController.createCategory);
adminRouter.get("/category", authenticate, adminController.getCategory);

module.exports = adminRouter;
