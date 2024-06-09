const userService = require("../Services/user-service");

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

module.exports = userController;
