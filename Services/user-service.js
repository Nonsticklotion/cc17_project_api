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

userService.updateUserInfo = (userInfo, userId) => {
  return prisma.user.update({ where: { id: userId }, data: userInfo });
};

userService.findOrderfromUserId = (userId) => {
  return prisma.order.findMany({ where: { userId } });
};

userService.findOrderItemfromOrderId = (orderId) => {
  return prisma.orderItem.findMany({ where: { orderId } });
};

userService.createOrder = (data) => {
  return prisma.order.create({ data });
};

userService.updatePayment = (paymentPic, paymentId) => {
  return prisma.payment.update({ where: { id: paymentId }, paymentPic });
};

userService.createShipment = (shipmentData) => {
  return prisma.shipment.create({ data: shipmentData });
};

userService.updateShipment = (shipmentId, shipmentData) => {
  return prisma.shipment.update({
    where: { id: shipmentId },
    data: shipmentData,
  });
};

userService.findPaymentById = (paymentId) => {
  return prisma.payment.findUnique({
    where: { id: paymentId },
  });
};
userService.addReview = (reviewData) => {
  return prisma.review.create({ data: reviewData });
};


userService.updateReview = (reviewId, reviewData) => {
  return prisma.review.update({
    where: { id: reviewId },
    data: reviewData,
  });
};


userService.deleteReview = (reviewId) => {
  return prisma.review.delete({
    where: { id: reviewId },
  });
};


userService.addRating = (ratingData) => {
  return prisma.rating.create({ data: ratingData });
};


userService.updateRating = (ratingId, ratingData) => {
  return prisma.rating.update({
    where: { id: ratingId },
    data: ratingData,
  });
};


userService.deleteRating = (ratingId) => {
  return prisma.rating.delete({
    where: { id: ratingId },
  });
};

module.exports = userService;
