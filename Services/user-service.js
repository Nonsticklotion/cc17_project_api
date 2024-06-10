const prisma = require("../models/prisma");

const userService = {};

userService.findUserByEmail = (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

userService.createUser = (data) => {
  return prisma.user.create({ data });
};

userService.findUserById = (userId) => {
  return prisma.user.findFirst({
    where: { id: userId },
  });
};

userService.getUserInfo = (userId) => {
  return prisma.user.findUnique({ where: { id: userId } });
};
userService.updateUserInfo = (userInfo, userId) => {
  return prisma.user.update({
    where: { id: userId },
    data: userInfo,
  });
};

////////////////////////Order OrderItem Payment Shipment////////////////////

userService.findOrderfromUserId = (userId) => {
  return prisma.order.findMany({ where: { userId } });
};

userService.findOrderItemfromOrderId = (orderId) => {
  return prisma.orderItem.findMany({ where: { orderId } });
};

userService.findOrderfromId = (orderId) => {
  return prisma.order.findUnique({
    where: { id: orderId },
    include: { payment: true, shipment: true, orderItems: true },
  });
};

userService.createOrder = async (data) => {
  return prisma.order.create({ data });
};

userService.createPayment = () => {
  return prisma.payment.create({ data: { status: "PENDING" } });
};

userService.updatePayment = (paymentPic, paymentId) => {
  return prisma.payment.update({ where: { id: paymentId }, paymentPic });
};

userService.deletePayment = (paymentId) => {
  return prisma.payment.delete({
    where: { id: paymentId },
  });
};

userService.createShipment = () => {
  return prisma.shipment.create({ data: { status: "PREPARING" } });
};

userService.updateShipment = (shipmentId, shipmentData) => {
  return prisma.shipment.update({
    where: { id: shipmentId },
    data: shipmentData,
  });
};
userService.deleteShipment = (shipmentId) => {
  return prisma.shipment.delete({
    where: { id: shipmentId },
  });
};
userService.createOrderItems = (orderItems) => {
  return prisma.orderItem.createMany({
    data: orderItems,
  });
};
userService.deleteOrderItems = (orderId) => {
  return prisma.orderItem.deleteMany({
    where: { orderId: orderId },
  });
};
userService.deleteOrder = (orderId) => {
  return prisma.order.delete({
    where: { id: orderId },
  });
};

userService.findPaymentById = (paymentId) => {
  return prisma.payment.findUnique({
    where: { id: paymentId },
  });
};

////////////////////Review///////////////////////////////

userService.getAllReviewFromProductId = (productId) => {
  return prisma.review.findMany({ where: { productId } });
};
userService.updateReview = (reviewId, reviewData) => {
  return prisma.review.update({
    where: { id: reviewId },
    data: reviewData,
  });
};

// userService.deleteReview = (reviewId) => {
//   return prisma.review.delete({
//     where: { id: reviewId },
//   });
// };

userService.addReview = (reviewData) => {
  return prisma.review.create({
    data: reviewData,
  });
};

userService.deleteReview = (userId, productId) => {
  return prisma.review.delete({
    where: {
      userId: userId,
      productId: productId,
    },
  });
};

userService.findReviewFromUserId = (userId) => {
  return prisma.review.findMany({ where: { userId } });
};

module.exports = userService;
