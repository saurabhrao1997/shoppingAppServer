var express = require('express');
const {createNotification,getAllNotification} = require('../Controller/NotificationController');
var router = express.Router();

/* GET notification listing. */
router.route("/notification").get(getAllNotification)

module.exports = router