

const Review = require("../Modal/ReviewModal")

const Product = require("../Modal/ProductModal")
const User = require("../Modal/UserModal")
const Oder = require("../Modal/OderModal")
const ErrorHandler = require("../utils/Errorhandler")
const CatchAsyncError = require("../Middleware/CatchAsyncError")




const createOrder = CatchAsyncError(async(req,res,next)=>{ 

    const newOrder = await new Oder({
        ...req.body,
    })
  let result = await newOrder.save()
  res.status(200).json({message:"success",result:result})     
})
const getOrder = CatchAsyncError(async(req,res,next)=>{
     
  const newOder  = await Oder.find({})
  if(!newOder) return next(new ErrorHandler("no product  data available",204))
  res.status(200).json({message:"success",data:newOder})     

})



// const updateReview  = CatchAsyncError(async(req,res,next)=>{
//     let {id} = req.query
//     const newReview  = await Review.find({_id:id})
//     if(!newReview) return next(new ErrorHandler("no product available",204))
       
//         let updateReview = await findByIdAndUpdate({_id:id},{$set:req.body})


//         res.status(200).json({message:"success",data:updateReview})    
// })
// const deleteReview = CatchAsyncError(async(req,res,next)=>{
//   let {id} = req.query
//   const newReview  = await Review.findOne({_id:id})
//   if(!newReview) return next(new ErrorHandler("no product available",204))

//          let result = await Review.findByIdAndDelete({_id:id})

//       res.status(200).json({message:"success",result:newReview})    
// })



module.exports ={createOrder,getOrder}