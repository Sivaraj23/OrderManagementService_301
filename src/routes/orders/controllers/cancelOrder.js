
import OrderService from "../services/orderService";
import { validationResult } from "express-validator";
import logger from "../../../utilities/Logger"
var path = require('path');
var fileName = path.basename(__filename);
export default async (req, res) => {


    logger.info(fileName+"->Cancelling the order")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    res.json(await OrderService.cancelOrder(req.body))
    res.end()

};
