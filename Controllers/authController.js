const authController = {};

authController.register = (req, res, next) => {
  const { email, password, confirmPassword } = req.body;
  console.log(req.body);
  res.status(200).json({ message: "test test" });
};

module.exports = authController;
