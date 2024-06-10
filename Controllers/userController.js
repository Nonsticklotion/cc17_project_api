const userService = require("../Services/user-service");
const createError = require("../utils/createError");

const userController = {};

userController.updateAddress = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, address } = req.body;
    const userId = req.user.id; // Assuming the user ID is available in the request object

    const userInfo = {
      firstName,
      lastName,
      phone: +phone,
      address,
    };

    const result = await userService.updateUserInfo(userInfo, userId);
    console.log(result);
    if (result) {
      res.status(200).json({ success: true, data: result });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    next(err);
  }
};

userController.createOrder = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { totalPrice, orderItemsData } = req.body;

    const newPayment = await userService.createPayment();
    if (!newPayment) {
      createError({
        message: "something wrong with payment",
        statusCode: 400,
      });
    }
    const newShipment = await userService.createShipment();
    if (!newShipment) {
      await userService.deletePayment(newPayment.id);
      createError({
        message: "something wrong with shipment",
        statusCode: 400,
      });
    }

    const data = {
      totalPrice,
      paymentId: newPayment.id,
      shipmentId: newShipment.id,
      userId,
    };

    const newOrder = await userService.createOrder(data);
    const orderItems = orderItemsData.map((item) => ({
      ...item,
      orderId: newOrder.id,
    }));
    await userService.createOrderItems(orderItems);

    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    next(err);
  }
};

userController.deleteOrderAndAssociations = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    // Find the order with its associated paymentId and shipmentId
    const order = await userService.findOrderfromId(parseInt(orderId));

    if (!order) {
      createError({
        message: `Order with id ${orderId} not found`,
        statusCode: 400,
      });
    }

    const deleteOrderItem = await userService.deleteOrderItems(order.id);
    if (!deleteOrderItem) {
      createError({ message: `delete orderitem problem`, statusCode: 400 });
    }

    const deleteOrder = await userService.deleteOrder(order.id);
    if (!deleteOrder) {
      createError({ message: `deleteOrder problem`, statusCode: 400 });
    }

    const deletePayment = await userService.deletePayment(order.paymentId);
    if (!deletePayment) {
      createError({ message: `deletePayment problem`, statusCode: 400 });
    }

    const deleteShipment = await userService.deleteShipment(order.shipmentId);
    if (!deleteShipment) {
      createError({ message: `deleteShipment problem`, statusCode: 400 });
    }

    // await prisma.$transaction([
    //   prisma.orderItem.deleteMany({ where: { orderId: order.id } }),
    //   prisma.order.delete({ where: { id: order.id } }),
    //   prisma.payment.delete({ where: { id: order.paymentId } }),
    //   prisma.shipment.delete({ where: { id: order.shipmentId } })
    // ]);

    res.status(200).json({ message: "order has been delete" });
  } catch (err) {
    next(err);
  }
};


module.exports = userController;
