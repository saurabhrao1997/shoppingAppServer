
const User = require("../Modal/UserModal")
const {compairPassword,hassPassword} =require("../Helper/HasPaword")
const {setToken,verifyToken} = require("../Helper/jwtVerification")
const ErrorHandler = require("../utils/Errorhandler")
const CatchAsyncError = require("../Middleware/CatchAsyncError")
const nodemailer = require('nodemailer');

const login = 
 CatchAsyncError( 
  async(req,res,next)=>{
    const { email,password} = req.body
    console.log("email password",email,password)


    if(!email || !password ) return next(new ErrorHandler("Email and password required field",400)) 
    
      const user = await  User.findOne({email:email})
      console.log("user",user)

      if(!user) return nodemailerext(new ErrorHandler("user is not present",409))
      let valid = await compairPassword(password,user.password)
        if(!valid) return  next(new ErrorHandler("password is not match",409))
     return  res.status(200).json({message:"success",data:user}) 
        
   
}
)

const verifyEmail =
 CatchAsyncError(
   async(req,res,next)=>{
  const { email} = req.body
  console.log("email password",email)
  
  const user = await  User.findOne({email:email})
  console.log("user",user)

  if(!user) return next(new ErrorHandler("user is not present",409))

  
   
  let genrateOtp =   Math.floor((Math.random()*1000000)+1)
  
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
    name:"Template Project",       // emailer name
    address:'saurabhwarhade77@gmail.com'    // who will send email
  },
  to: `${email}`,
  // to : ["saurabhwarhade28@gmail.com","pawan@gmail.com"]    list email
  subject: 'Reset password OTP',
  // html:"<b>OTP for user reset password. Use it and change your password.</b>",
  text: `  OTP for user reset password. Use it and change your password. ${genrateOtp}`
};
user.otp =  genrateOtp;
await user.save()
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
   
    res.status(200).json({data:true,message:"token send on your email, please check it"})
  }
});
        
  

   
      
 
}
)

const verifyOTP =
 CatchAsyncError(
   async(req,res,next)=>{
  const { otp,email} = req.body
  const user = await  User.findOne({email:email})
  if(!user) return next(new ErrorHandler("user is not present",409))

    if(user.otp  == otp){
        return  res.status(200).json({data:true,message:"Email is verified"})
    }else{
      return res.status(400).json({data:false,message:"OTP is invalid or expire"})
    }
  }
  )


const resetPassword = 
CatchAsyncError(
   async(req,res,next)=>{
  const { email,password,otp} = req.body
  console.log("email password",email,password)
  let Password = await hassPassword(req.body.password)
  const user = await  User.findOne({email:email})
  if(!user) return next(new ErrorHandler("user is not present",409))
  let token = await setToken({id:user._id,email:user?.email})

  let newUserPassword = await User.findOneAndUpdate({email:email},{$set:{"password":Password,"confirmPassword":Password,token:token}})
     
  return  res.status(200).json({message:"success",data: true, user:   newUserPassword}) 
}
)


module.exports = {login,resetPassword,verifyEmail,verifyOTP}