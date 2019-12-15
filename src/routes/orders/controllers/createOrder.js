import OrderService from "../services/orderService"
const { validationResult } = require('express-validator');
var path = require('path');
export default async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    res.json(await OrderService.createOrder(req.body))
    res.end()

};
