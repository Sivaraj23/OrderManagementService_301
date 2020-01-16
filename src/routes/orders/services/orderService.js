import Order from "../../../models/Orders";
import ORDER_STATUS from "../../../config/contants";
var moment = require("moment");
const OrderService = {
  createOrder: async obj => {
    const { user, restaurant, orderItems } = obj;
    const newOrder = new Order({
      user,
      restaurant,
      orderItems
    });
    return await newOrder.save().then(err => {
      return err;
    });
  },
  viewOrder: async obj => {
    const orderId = obj;
    return await Order.findOne({ orderId });
  },
  cancelOrder: async obj => {
    const { userId, orderId } = obj;
    const orderToCancel = await Order.findOne({
      user: userId,
      orderId: orderId
    });
    if (orderToCancel.orderStatus != ORDER_STATUS.DELIVERED)
      orderToCancel.orderStatus = ORDER_STATUS.CANCELED;
    else throw new Error("Already order is delivered");
    return await orderToCancel.save().then(err => {
      return err;
    });
  },
  updateOrder: async obj => {
    const { orderId, user, restaurant, orderItems } = obj;
    const orderToUpdate = await Order.findOne({ user: user, orderId: orderId });

    if (
      moment(orderToUpdate.lastModifiedTime).diff(
        moment().format(),
        "minutes"
      ) *
        -1 <
      59
    ) {
      orderToUpdate.restaurant = restaurant;
      orderToUpdate.orderItems = orderItems;
      orderToUpdate.lastModifiedTime = moment().format();
      return await orderToUpdate.save().then(err => {
        return err;
      });
    } else {
      return "you cant modify a order after an hour";
    }
  },
  getAllOrders: async (obj, query) => {
    return await Order.find({ user: obj })
      .skip(query.pagesize * (query.pageNumber - 1))
      .limit(Number(query.pagesize));
  },
  getAllOrdersByResIds: async obj => {
    var d = obj.date.split("T")[0];
    return await Order.find({
      restaurant: { $in: obj.list },
      lastModifiedTime: {
        $gte: new Date(d),
        $lt: new Date(moment(d).add(1, "days"))
      }
    })
      .skip(obj.pagesize * (obj.pageNumber - 1))
      .limit(Number(obj.pagesize));
  },
  getTotalAmountOnGivenDate: async obj => {
    var d = obj.date.split("T")[0];
    return await Order.find(
      {
        restaurant: { $in: obj.list },
        lastModifiedTime: {
          $gte: new Date(d),
          $lt: new Date(moment(d).add(1, "days"))
        }
      },
      { totalPrice: 1, _id: 0 }
    );
  },
  getNotSupported: (req, res) => {
    res.statusCode = 403;
    res.end("GET operation not supported on this endpoint");
  },
  postNotSupported: (req, res) => {
    res.statusCode = 403;
    res.end("POST operation not supported on this endpoint");
  },
  putNotSupported: (req, res) => {
    res.statusCode = 403;
    res.end("PUT operation not supported on this endpoint");
  },
  patchNotSupported: (req, res) => {
    res.statusCode = 403;
    res.end("PATCH operation not supported on this endpoint");
  }
};

export default OrderService;
