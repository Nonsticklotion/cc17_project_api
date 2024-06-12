const adminService = require("../Services/adminService");
const uploadService = require("../Services/uploadService");
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
    if (!req.file) {
      throw createError(400, "Product picture is required");
    }

    const productPicUrl = await uploadService.upload(req.file.path);
    console.log(req.file.path);
    console.log(productPicUrl);
    const result = await adminService.createProduct(
      bookName,
      author,
      +price,
      +stock,
      productPicUrl,
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
    const { productId } = req.params;
    const result = await adminService.deleteProduct(+productId);
    res.status(200).json({ message: "finish delete", data: result });
  } catch (err) {
    next(err);
  }
};
adminController.getAllProduct = async (req, res, next) => {
  try {
    const result = await adminService.getAllProduct();
    res.status(200).json({ message: "get all product", data: result });
  } catch (err) {
    next(err);
  }
};
adminController.selectProductFromCategory = async (req, res, next) => {
  try {
    const { category } = req.params;
    const findedCategory = await userService.findCategoryIdfromCategory(
      category
    );
    if (!findedCategory) {
      createError({
        message: "Can not find this category",
        statusCode: 400,
      });
    }
    const findedProduct = await userService.getProductFromCategoryId(
      findedCategory.id
    );
    if (!findedProduct) {
      createError({
        message: "Can not find this category",
        statusCode: 400,
      });
    }
    res.status(200).json({ data: findedProduct });
  } catch (err) {
    next(err);
  }
};

adminController.getOneProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await adminService.getProductFromProductId(
      parseInt(productId)
    );
    if (!product) {
      createError({
        message: "cant find product",
        statusCode: 400,
      });
    }
    res.status(200).json({ data: product });
  } catch (err) {
    next(err);
  }
};

adminController.updatePayment = async (req, res, next) => {
  try {
    const { orderId, status } = req.body;
    const order = await adminService.getOrderFromId(orderId);
    if (!order) {
      createError({ message: "no order", statusCode: 400 });
    }
    const newPaymentStatus = await adminService.updatePaymentStatus(
      order.paymentId,
      status
    );
    res.status(200).json({
      message: `Finished updating payment status to ${status}`,
      data: newPaymentStatus,
    });
  } catch (err) {
    next(err);
  }
};

adminController.updateShipment = async (req, res, next) => {
  try {
    const { orderId } = req.body;
    const order = await adminService.getOrderFromId(orderId);
    if (!order) {
      throw createError(404, `Order with id ${orderId} not found`);
    }
    const newShipmentStatus = await adminService.updateShipmentStatus(
      order.shipmentId
    );
    res.status(200).json({
      message: `Finished updating shipment status to sent`,
      data: newShipmentStatus,
    });
  } catch (err) {
    next(err);
  }
};

adminController.getAllOrder = async (req, res, next) => {
  try {
    const allOrder = await adminService.getAllOrder();
    if (!allOrder) {
      createError({ message: "no order where is order ?", codeStatus: 400 });
    }
    res.status(200).json({ data: allOrder });
  } catch (err) {
    next(err);
  }
};

adminController.getOrderandAddressFromOrderId = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const orderWithAddress = await adminService.getUserAddressFromOrder(
      +orderId
    );
    res.status(200).json({ orderWithAddress });
  } catch (err) {
    next(err);
  }
};
adminController.getAllOrderItem = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const allOrderItem = await adminService.getAllOrderItemById(orderId);
    if (!allOrderItem || allOrderItem.length === 0) {
      createError({
        message: "where is allOrderItem ? I cant see it in database ",
      });
    }
    res.status(200).json({ data: allOrderItem });
  } catch (err) {
    next(err);
  }
};
module.exports = adminController;
