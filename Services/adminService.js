const prisma = require("../models/prisma");

const adminService = {};
adminService.createProduct = (bookName, author, price, stock, categoryId) => {
  return prisma.product.create({
    data: {
      bookName,
      author,
      price,
      stock,
      categoryId,
    },
  });
};
adminService.findBookNameAndAuthor = (bookName, author) => {
  return prisma.product.findFirst({
    where: { bookName, author },
  });
};
adminService.findProductById = (id) => {
  return prisma.product.findUnique({
    where: { id },
  });
};
adminService.updateProduct = (id, data) => {
  return prisma.product.update({
    where: { id },
    data: data,
  });
};


////////////////////////////////Category/////////////////////////////
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

///////////////////////////////Product/////////////////////////

module.exports = adminService;
