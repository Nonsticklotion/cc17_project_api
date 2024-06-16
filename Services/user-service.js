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
userService.getOrder = (userId) => {
  return prisma.order.findMany({
    where: { userId: userId },
    include: {
      user: {
        select: {
          address: true,
        },
      },
      payment: {
        select: {
          status: true,
          paymentPic: true,
        },
      },
      shipment: {
        select: {
          status: true,
        },
      },
    },
  });
};


userService.createOrder = (data) => {
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

userService.decreaseProductStock = (productId, amount) => {
  return prisma.product.update({
    where: { id: productId },
    data: {
      stock: {
        decrement: amount,
      },
    },
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

userService.updatePaymentPicById = (paymentId, paymentPic) => {
  return prisma.payment.update({
    where: { id: paymentId },
    data: { paymentPic: paymentPic },
  });
};
////////////////////Review///////////////////////////////

userService.getAllReviewFromProductId = async (productId) => {
  return prisma.review.findMany({
    where: { productId },
    include: {
      user: {
        select: {
          email: true,
        },
      },
    },
  });
};
userService.updateReview = (reviewId, reviewData) => {
  return prisma.review.update({
    where: { id: reviewId },
    data: reviewData,
  });
};
userService.addReview = (reviewData) => {
  return prisma.review.create({
    data: reviewData,
  });
};

userService.deleteReview = async (userId, productId) => {
  const review = await prisma.review.findFirst({
    where: {
      userId: userId,
      productId: productId,
    },
  });

  if (!review) {
    throw new Error("Review not found");
  }

  return prisma.review.delete({
    where: {
      id: review.id,
    },
  });
};

userService.findReviewFromUserId = (userId) => {
  return prisma.review.findMany({ where: { userId } });
};

/////////////////////////Product/////////////////////

userService.getProductFromProductId = (productId) => {
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

userService.getProductFromCategoryId = (categoryId) => {
  return prisma.product.findMany({
    where: { categoryId },
  });
};

userService.findCategoryIdfromCategory = (categoryName) => {
  return prisma.category.findFirst({
    where: { category: categoryName },
  });
};

userService.getAllProduct = () => {
  return prisma.product.findMany();
};
module.exports = userService;
