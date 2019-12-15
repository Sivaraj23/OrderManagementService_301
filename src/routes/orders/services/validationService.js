const { check } = require('express-validator');
var path = require('path');
var fileName = path.basename(__filename);
import logger from "../../../utilities/Logger"

const ValidationService = {

    validateOrderCreation: [
        check("user").not().isEmpty(),
        check('user').isLength({ min: 24, max: 24 }),
        check("restaurant")
            .not()
            .isEmpty(),
        check('restaurant').isLength({ min: 24, max: 24 }),
        check("orderItems.*.foodItem")
            .not()
            .isEmpty(),
        check("orderItems.*.foodItem").isLength({ min: 24, max: 24 }),
        check("orderItems.*.quantity")
            .not()
            .isEmpty()
    ],
    validateOrderCancel: [
        check("userId").not().isEmpty(),
        check('userId').isLength({ min: 24, max: 24 }),
        check("orderId")
            .not()
            .isEmpty(),
        check("orderId").not().isEmpty()
    ],
    validateOrderUpdate: [
        check("user").not().isEmpty(),
        check('user').isLength({ min: 24, max: 24 }),
        check("restaurant")
            .not()
            .isEmpty(),
        check('restaurant').isLength({ min: 24, max: 24 }),
        check("orderItems.*.foodItem")
            .not()
            .isEmpty(),
        check("orderItems.*.foodItem").isLength({ min: 24, max: 24 }),
        check("orderItems.*.quantity")
            .not()
            .isEmpty(),
        check("orderId").not().isEmpty()
    ],
    validateGetAllOrders: {
        //    query("userId").not().isEmpty()
    }


}

export default ValidationService;