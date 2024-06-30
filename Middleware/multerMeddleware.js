const multer = require('multer')
const fs = require("fs")

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'profileImg')
    },
    filename: (req, file, cb) => {
      
        cb(null, file.fieldname + '-' + Date.now() + "." +file.originalname.split(".")[1])
    }
});
 
var upload = multer({ storage: storage });


module.exports = upload