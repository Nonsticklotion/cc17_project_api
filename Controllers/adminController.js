const adminService = require("../Services/adminService");
const createError = require("../utils/createError");

const adminController = {};

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
    const result = await adminService.deleteCategory(findCategory.id);
    res.status(200).json({ message: "delete success", data: result });
  } catch (err) {
    next(err);
  }
};

adminController.createProduct = async (req, res, next) => {
  try {
    const { bookName, author, price, stock, category } = req.body;
    if (!bookName || !author || !price || !stock || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const findBookNameAndAuthor = await adminService.findBookNameAndAuthor(
      bookName,
      author
    );
    if (findBookNameAndAuthor) {
      createError({
        message: "Product with the same name and author already exists",
        statusCode: 400,
      });
    }
    const findCategory = await adminService.findCategory(category);
    if (!findCategory) {
      createError({
        message: "no caategory in database",
        statusCode: 400,
      });
    }
    const result = await adminService.createProduct(
      bookName,
      author,
      price,
      stock,
      findCategory.id
    );
    res.status(201).json({ message: "create success", data: result });
  } catch (err) {
    next(err);
  }
};

adminController.updateProductDetails = async (req, res, next) => {
  try {
    const { id, stock, price } = req.body;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    const data = {};
    if (stock != null) {
      data.stock = stock;
    }
    if (price != null) {
      data.price = price;
    }

    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ error: "At least one field (stock or price) is required" });
    }

    const result = await adminService.updateProduct(id, data);
    res
      .status(200)
      .json({ message: "Product updated successfully", data: result });
  } catch (err) {
    next(err);
  }
};

adminController.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await adminService.deleteProduct(+id);
    res.status(200).json({ message: "finish delete", data: result });
  } catch (err) {
    next(err);
  }
};
module.exports = adminController;
