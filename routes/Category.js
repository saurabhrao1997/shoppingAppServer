var express = require('express');
const {createCategory,getAllCategory,getCategory,updateCategory,deleteCategory}= require('../Controller/CategoryController');
var router = express.Router();

/* GET users listing. */
router.route("/category").get(getAllCategory)
router.route("/createcategory").post(createCategory)
router.route("/getcategory").post(getCategory)
router.route("/updatecategory").post(updateCategory)
router.route("/deletecategory").post(deleteCategory)
 

module.exports = router