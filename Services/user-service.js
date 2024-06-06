const prisma = require("../models/prisma");

const userService = {};

userService.findUserByEmail = (email) => {
  return prisma.user.findFirst({
    where: { email },
  });
};

userService.createUser = (data) => {
  return prisma.user.create({ data });
};

module.exports = userService;
