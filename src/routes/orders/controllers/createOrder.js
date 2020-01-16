import OrderService from "../services/orderService";
const { validationResult } = require("express-validator");
import sendOrderDetails from "../../../utilities/producer";
var path = require("path");
export default async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  res.json(await OrderService.createOrder(req.body));
  await sendOrderDetails(JSON.stringify(req.body));
  res.end();
};
