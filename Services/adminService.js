const prisma = require("../models/prisma");

const adminService = {};

////////////////////////////////Product//////////////////////////////
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
adminService.deleteProduct = (productId) => {
  return prisma.product.delete({
    where: { id: productId },
  });
};

adminService.getAllProduct = () => {
  return prisma.product.findMany();
};

adminService.getProductFromProductId = (productId) => {
  return prisma.product.findUnique({
    where: { id: productId },
    include: {
      category: {
        select: {
          category: true,
        },
      },
    },
  });
};
/////////////////////////////////////Order///////////////////////////////////
adminService.updatePaymentStatus = (paymentId, newStatus) => {
  return prisma.payment.update({
    where: { id: paymentId },
    data: { status: newStatus },
  });
};
adminService.updateShipmentStatus = (shipmentId) => {
  return prisma.shipment.update({
    where: { id: shipmentId },
    data: { status: "SENT" },
  });
};
adminService.getOrderFromId = (orderId) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      payment: true,
      shipment: true,
    },
  });
};
adminService.getAllOrder = () => {
  return prisma.order.findMany();
};

adminService.getUserAddressFromOrder = (orderId) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: {
      user: {
        select: {
          address: true,
        },
      },
    },
  });
};
adminService.getAllOrderItemById = (orderId) => {
  return prisma.orderItem.findMany({ where: { orderId: parseInt(orderId) } });
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
