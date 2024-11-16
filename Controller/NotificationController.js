

const Review = require("../Modal/ReviewModal")

const Product = require("../Modal/ProductModal")
const User = require("../Modal/UserModal")
const Notification = require("../Modal/NotificationModal")
const ErrorHandler = require("../utils/Errorhandler")
const CatchAsyncError = require("../Middleware/CatchAsyncError")




const createNotification = CatchAsyncError(async(req,res,next)=>{ 

    const newReview = await new Review({
        ...req.body,
    })
  let result = await newReview.save()
  res.status(200).json({message:"success",result:result})     
})


const getAllNotification = CatchAsyncError(async(req,res,next)=>{ 
     
   let newNotifications = await Notification.find({userId:req.query.userId})

    if(!newNotifications) return next(new ErrorHandler("no notification  data available",204))
   
  res.status(200).json({message:"success",result:newNotifications})     
})



module.exports ={createNotification,getAllNotification}