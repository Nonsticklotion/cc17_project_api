const hashService = require("../Services/hashService");
const userService = require("../Services/user-service");
const createError = require("../utils/createError");
const authController = {};

authController.register = async (req, res, next) => {
  try {
    const data = req.input;
    const existUser = userService.findUserByEmail(data.email);

    if (existUser) {
      createError({
        message: "email has been use",
        statusCode: 400,
      });
    }
    data.password = await hashService(data.password);
    await userService.createUser(data);
    res.status(200).json({ message: "register successful" });
  } catch (err) {
    next(err);
  }
};

authController.login = async (req, res, next) => {
  try {
    const existUser = await userService.findUserByEmailOrMobile(
      req.input.emailOrMobile
    );

    if (!existUser) {
      createError({
        message: "invalid credentials",
        statusCode: 400,
      });
    }

    const isMatch = await hashService.compare(
      req.input.password,
      existUser.password
    );

    if (!isMatch) {
      createError({
        message: "invalid credentials",
        statusCode: 400,
      });
    }

    const accessToken = jwtService.sign({ id: existUser.id });
    res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
};

module.exports = authController;
