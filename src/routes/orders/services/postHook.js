import Order from "../../../models/Orders";
var path = require("path");
var fileName = path.basename(__filename);
import logger from "../../../utilities/Logger";

export default async function(next) {
  var orderId = this.orderId;
  var obj = await Order.aggregate([
    { $match: { orderId: this.orderId } },
    { $unwind: "$orderItems" },
    {
      $lookup: {
        from: "fooditems",
        localField: "orderItems.foodItem",
        foreignField: "_id",
        as: "orderItem"
      }
    },
    { $project: { "orderItems.quantity": 1, "orderItem.price": 1 } },
    {
      $group: {
        _id: "$_id",
        list: {
          $push: { quantity: "$orderItems.quantity", price: "$orderItem.price" }
        }
      }
    }
  ]);

  var total = 0;
  console.log(JSON.stringify(obj[0].list));
  obj[0].list.forEach(data => {
    total = total + data.quantity * data.price[0];
  });

  var isNotAlreadySaved = await Order.findOne({ orderId });

  if (isNotAlreadySaved.totalPrice == undefined) {
    isNotAlreadySaved.totalPrice = total;
    console.log("Addding total");
    isNotAlreadySaved.save();
  }
}
