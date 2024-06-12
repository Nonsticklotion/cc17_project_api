const createError = require("../utils/createError");

exports.validateUpdatePic = (req, res, next) => {
  if (!req.file) {
    return next(createError("Payment picture is required", 400));
  }
  next();
};