var express = require('express');
const {login,resetPassword, verifyEmail,verifyOTP} = require('../Controller/LoginControler');
var router = express.Router();

/* GET users listing. */
router.route("/login").post(login)
router.route("/resetpassword").post(resetPassword)
router.route("/verifyemail").post(verifyEmail)
router.route("/otp").post(verifyOTP)
 

module.exports = router