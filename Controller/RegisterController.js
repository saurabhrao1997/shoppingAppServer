
const User = require("../Modal/UserModal")
const {compairPassword,hassPassword} =require("../Helper/HasPaword")
const {setToken,verifyToken} = require("../Helper/jwtVerification")
const ErrorHandler = require("../utils/Errorhandler")
const CatchAsyncError = require("../Middleware/CatchAsyncError")
const {uploadCloudinary} = require("../utils/Cloudnary")
const nodemailer = require('nodemailer');
const fs = require("fs")
const createRegistration = 
CatchAsyncError(
    async(req,res,next)=>{
        const {Name,Mobile, email,password,confirmPassword} = req.body
    
          const user = await  User.findOne({email:email})
         console.log("asjkjgkj",user)
          if(user) return next( new ErrorHandler(  "user is already registered!",409))
        //   res.status(409).json({message:"user is already registered!"})
            const token = await setToken(req.body) 
            let newUser = new User({
                ...req.body,
                password:await hassPassword(req.body.password),
                confirmPassword:req.body.password,
                token:token
    
            })
        let aa =  await  newUser.save()
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            host:"smtp.gmail.com",
            port:587,
            secure:false,
            auth: {
              user: 'saurabhwarhade77@gmail.com',
              pass: 'xscn iohr fzji vkuz'
            }
          });
          
          var mailOptions = {
            from: {
              name:"shopping app Project",       // emailer name
              address:'saurabhwarhade77@gmail.com'    // who will send email
            },
            to: `${email}`,
            // to : ["saurabhwarhade28@gmail.com","pawan@gmail.com"]    list email
            subject: 'welcome on shopping app',
            // html:"<b>OTP for user reset password. Use it and change your password.</b>",
            text: `welcome to shopping app your successfully done ,thanks for visiting our app`
          };
        //   user.otp =  genrateOtp;
        //   await user.save()
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log("welcome message successfully send on your email id")
            //   res.status(200).json({data:true,message:"token send on your email, please check it"})
            }
          });




           res.status(200).json({message:"success",data:aa}) 
            
       
    }
)

const getAllUsers = 
// CatchAsyncError(
    async(req,res,next)=>{
        
            const alluser = await User.find({})
            if(alluser.length == 0) return next( new ErrorHandler(  "No user found",409))
            //  res.status(409).json({message:"no user found",data:alluser}) 
                res.status(200).json({message:"success",data:alluser}) 
    }
// )

const getUser = 
 CatchAsyncError(
    async(req,res,next) =>{

            let getusr = await User.findOne({_id:req.query.id})
            if(!getusr) return  next( new ErrorHandler(  "No user found",409))
            // res.status(409).json({message:"no user found",data:getusr}) 
           res.status(200).json({data:getusr})  
    }
)

const updateUser = 
 CatchAsyncError(
    async(req,res,next) =>{
            let getusr = await User.findOneAndUpdate( {_id:req.body.id},{$set:{"Name":req.body.Name,"email":req.body.email}},{ returnNewDocument: true })
            if(!getusr) return next( new ErrorHandler(  "No user found",409))
            //  res.status(409).json({message:"no user found",data:getusr}) 
           res.status(200).json({message:"user successfully updated", data:getusr})
    }
)

const profileImage = CatchAsyncError(
    async(req,res,next)=>{
      const  {id,image} = req.body;
      console.log("file",req.file)

       
    let imageUrl =  await  uploadCloudinary(req.file.path)
    fs.unlinkSync(req.file.path)

      const newUser =  await User.findOneAndUpdate({_id:id},{$set:{image:{url:imageUrl?.url,public_id:imageUrl?.public_id}}})

       res.status(200).json({message:"success",data:newUser})
    }
)

module.exports = {createRegistration,getAllUsers,getUser,updateUser,profileImage}