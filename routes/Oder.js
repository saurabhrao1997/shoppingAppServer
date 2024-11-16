var express = require('express');
const {createOrder,getOrder,getPayPalAccessTokenApi} = require('../Controller/OrderController');
var router = express.Router();

/* GET users listing. */
router.route("/createorder").post(createOrder)
router.route("/allOrders").get(getOrder)
router.route("/getpaypalToken").get(getPayPalAccessTokenApi)

module.exports = router