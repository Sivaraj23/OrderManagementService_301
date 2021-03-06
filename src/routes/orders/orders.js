var express = require("express");
import createOrder from "./controllers/createOrder";
import cancelOrder from "./controllers/cancelOrder";
import updateOrder from "./controllers/updateOrder";
import viewOrder from "./controllers/viewOrder";
import getAllOrders from "./controllers/getAllOrders";
import getAllOrdersByResIds from "./controllers/getAllOrdersByResIds";
import ValidationService from "./services/validationService";
import getTotalAmountOnGivenDate from "./controllers/getTotalAmountOnGivenDate";
import OrderService from "./services/orderService";
var auth = require("../../config/auth");
var router = express.Router();

router
  .route("/createOrder")
  .post(
    auth.gitHubAuthVerify,
    ValidationService.validateOrderCreation,
    createOrder
  ) //only authenticated user can create order
  .get(OrderService.getNotSupported)
  .put(OrderService.putNotSupported)
  .patch(OrderService.postNotSupported);

router
  .route("/updateOrder")
  .get(OrderService.getNotSupported)
  .post(OrderService.postNotSupported)
  .put(
    auth.gitHubAuthVerify,
    ValidationService.validateOrderUpdate,
    updateOrder
  )
  .patch(OrderService.postNotSupported);

router
  .route("/cancelOrder")
  .get(OrderService.getNotSupported)
  .put(OrderService.putNotSupported)
  .post(OrderService.postNotSupported)
  .patch(
    auth.gitHubAuthVerify,
    ValidationService.validateOrderCancel,
    cancelOrder
  );

router
  .route("/getAllOrders/:userId")
  .get(getAllOrders)
  .put(OrderService.putNotSupported)
  .post(OrderService.postNotSupported)
  .patch(OrderService.postNotSupported);

router
  .route("/getAllOrdersByResIds")
  .post(getAllOrdersByResIds)
  .get(OrderService.getNotSupported)
  .put(OrderService.putNotSupported)
  .patch(OrderService.postNotSupported);

router
  .route("/getTotalAmountOnGivenDate")
  .post(getTotalAmountOnGivenDate)
  .get(OrderService.getNotSupported)
  .put(OrderService.putNotSupported)
  .patch(OrderService.postNotSupported);

router
  .route("/viewOrder/:orderId")
  .get(viewOrder)
  .put(OrderService.putNotSupported)
  .post(OrderService.postNotSupported)
  .patch(OrderService.postNotSupported);

module.exports = router;
