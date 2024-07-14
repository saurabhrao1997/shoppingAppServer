var express = require('express');
const {createCategory,getAllCategory,getCategory,updateCategory,deleteCategory}= require('../Controller/CategoryController');
var router = express.Router();
const isAdmin =require("../Middleware/IsAdmin")
/* GET users listing. */
router.route("/category").get( getAllCategory)
router.route("/createcategory").post( isAdmin(),createCategory)
router.route("/getcategory").post(getCategory)
router.route("/updatecategory").post( isAdmin(),updateCategory)
router.route("/deletecategory").post(isAdmin(),deleteCategory)
module.exports = router;




