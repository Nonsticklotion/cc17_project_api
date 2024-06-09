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
  return prisma.category.findFirst({ where: { category } });
};
adminService.createCategory = (category) => {
  return prisma.category.create({ data: { category } });
};
adminService.getAllCategory = () => {
  return prisma.category.findMany();
};
adminService.deleteCategory = (categoryId) => {
  return prisma.category.delete({ where: { id: categoryId } });
};
module.exports = adminService;
