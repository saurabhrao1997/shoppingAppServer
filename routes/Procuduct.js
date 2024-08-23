var express = require('express');
const {createProduct,getAllProduct,getProduct,updateProduct,deleteProduct,searchProduct} = require('../Controller/ProductController');
var router = express.Router();
// var productImageUpload = require("../Middleware/productImagemuterMiddleware")
const isAdmin =require("../Middleware/IsAdmin")
const multer = require('multer')
const fs = require("fs")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
      
        cb(null, 'productImage')
    },
    filename: (req, file, cb) => {
        console.log("file",file)
      
        cb(null, file.fieldname + '-' + Date.now() + "." + "jpeg")
    }
});
 
var productImageUpload = multer({ storage: storage })

  
 
/* GET users listing. */
router.route("/createproduct").post( isAdmin(),productImageUpload.array("productimage",12),createProduct)
router.route("/getproduct").get(getProduct)   
router.route("/getallproduct").get(getAllProduct)
router.route("/updateproduct").put(isAdmin(),updateProduct)
router.route("/deleteproduct").delete(isAdmin(),deleteProduct)
router.route("/searchproduct").get(searchProduct)

// router.route("/profileimage").put(upload.single('image'),profileImage)

module.exports = router