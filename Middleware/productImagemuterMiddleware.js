const multer = require('multer')
const fs = require("fs")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'productImages')
    },
    filename: (req, file, cb) => {
        console.log("file",file)
      
        cb(null, file.fieldname + '-' + Date.now() + "." +file.originalname.split(".")[1])
    }
});
 
var productImageUpload = multer({ storage: storage })


module.exports = productImageUpload