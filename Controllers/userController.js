const userService = require("../Services/user-service");
const createError = require("../utils/createError");

const userController = {};

userController.updateAddress = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, address } = req.body;
    const userId = req.user.id; // Assuming the user ID is available in the request object

    const userInfo = {
      firstName,
      lastName,
      phone: +phone,
      address,
    };

    const result = await userService.updateUserInfo(userInfo, userId);
    console.log(result);
    if (result) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
};

userController.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id; // Assuming the user ID is available in the request object
    const { orderData, orderItemsData } = req.body;

    const result = await userService.createOrder(userId, orderData, orderItemsData);
    
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    // Handling error, e.g., if order items creation fails, we might need to rollback the created order
    console.error("Error in creating order: ", err);
    res.status(500).json({ success: false, message: 'Failed to create order' });
  }
};


module.exports = userController;
