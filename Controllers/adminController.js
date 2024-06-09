const adminService = require("../Services/adminService");
const createError = require("../utils/createError");

const adminController = {};

adminController.createProduct = async (req, res, next) => {
  try {
    const { bookName, author, price, categoryid } = req.body;
    if (!bookName || !author || !price || !categoryid) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const result = await adminService.createProduct(
      bookName,
      author,
      price,
      categoryid
    );
    res.status(201).json({ message: "create success", data: result });
  } catch (err) {
    next(err);
  }
};

adminController.createCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    const existsCategory = await adminService.findCategory(category);
    if (existsCategory) {
      createError({
        message: "This category is already create",
        codeStatus: 400,
      });
    }
    const result = await adminService.createCategory(category);
    res.status(200).json({ message: "success create category", data: result });
  } catch (err) {
    next(err);
  }
};

adminController.getCategory = async (req, res, next) => {
  try {
    const result = await adminService.getAllCategory();
    res.status(200).json({ result });
  } catch (err) {
    next(err);
  }
};

adminController.deleteCategory = async (req, res, next) => {
  try {
    const { category } = req.query;
    const findCategory = await adminService.findCategory(category);
    if (!findCategory) {
      createError({
        message: "no caategory in database",
        statusCode: 400,
      });
    }
    console.log(findCategory);
    const result = await adminService.deleteCategory(findCategory.id);
    res.status(200).json({ message: "delete success", data: result });
  } catch (err) {
    next(err);
  }
};
module.exports = adminController;
