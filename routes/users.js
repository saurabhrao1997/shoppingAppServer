var express = require('express');
const {createRegistration,getAllUsers,getUser,updateUser,profileImage} = require('../Controller/RegisterController');
var router = express.Router();
var upload = require("../Middleware/multerMeddleware")
  
 
/* GET users listing. */
router.route("/register").post(createRegistration)
router.route("/getuser").get(getUser)   
router.route("/getalluser").get(getAllUsers)
router.route("/updateuser").put(updateUser)
router.route("/profileimage").put(upload.single('image'),profileImage)

module.exports = router