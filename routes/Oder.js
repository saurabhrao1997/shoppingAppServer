var express = require('express');
const {createOrder,getOrder} = require('../Controller/OrderController');
var router = express.Router();

/* GET users listing. */
router.route("/createorder").post(createOrder)
router.route("/getorder").get(getOrder)


module.exports = router