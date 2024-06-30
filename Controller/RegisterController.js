
const User = require("../Modal/UserModal")
const {compairPassword,hassPassword} =require("../Helper/HasPaword")
const {setToken,verifyToken} = require("../Helper/jwtVerification")
const ErrorHandler = require("../utils/Errorhandler")
const CatchAsyncError = require("../Middleware/CatchAsyncError")
const cloudinary = require("../utils/Cloudnary")
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

       
    let imageUrl =  await  cloudinary(req.file.path)
    fs.unlinkSync(req.file.path)

      const newUser =  await User.findOneAndUpdate({_id:id},{$set:{image:imageUrl}})

       res.status(200).json({message:"success",data:newUser})
    }
)

module.exports = {createRegistration,getAllUsers,getUser,updateUser,profileImage}