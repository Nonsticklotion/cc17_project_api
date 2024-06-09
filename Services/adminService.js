const prisma = require("../models/prisma");

const adminService = {};
adminService.createProduct = (bookName, author, price, categoryid) => {
  return prisma.product.create({
    data: {
      bookName,
      author,
      price,
      categoryid,
    },
  });
};

adminService.findCategory = (category) => {
  return prisma.category.findUnique({ where: { category } });
};
adminService.createCategory = (category) => {
  return prisma.category.create({ data: { category } });
};
adminService.getAllCategory = () => {
  return prisma.category.findMany();
};
module.exports = adminService;
