import OrderService from "../services/orderService";
import { validationResult } from "express-validator";
var path = require('path');
import logger from "../../../utilities/Logger"

var fileName = path.basename(__filename);
export default async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    res.json(await OrderService.viewOrder(req.params.orderId))
    res.end()
};
