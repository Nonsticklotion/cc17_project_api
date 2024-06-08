const jwt = require("jsonwebtoken");

const jwtService = {};

jwtService.sign = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "7d" });
};

jwtService.verify = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = jwtService;