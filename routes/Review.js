var express = require('express');
const {createReview,getAllReview,updateReview,deleteReview}= require('../Controller/ReviewController');
var router = express.Router();

/* GET users listing. */
router.route("/getallreview").get( getAllReview)
router.route("/createreview").post( createReview)

router.route("/updatereview").put(updateReview)
router.route("/deletereview").delete(deleteReview)
 

module.exports = router