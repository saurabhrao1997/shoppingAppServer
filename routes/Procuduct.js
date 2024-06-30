var express = require('express');
const {createProduct,getAllProduct,getProduct,updateProduct,deleteProduct} = require('../Controller/ProductController');
var router = express.Router();
// var productImageUpload = require("../Middleware/productImagemuterMiddleware")

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
router.route("/createproduct").post(productImageUpload.array("productimage",12),createProduct)
router.route("/getproduct").get(getProduct)   
router.route("/getallproduct").get(getAllProduct)
router.route("/updateproduct").put(updateProduct)
router.route("/deleteproduct").delete(deleteProduct)
// router.route("/profileimage").put(upload.single('image'),profileImage)

module.exports = router