

const Review = require("../Modal/ReviewModal")

const Product = require("../Modal/ProductModal")
const User = require("../Modal/UserModal")
const Oder = require("../Modal/OderModal")
const ErrorHandler = require("../utils/Errorhandler")
const CatchAsyncError = require("../Middleware/CatchAsyncError")

const axios = require('axios');

async function getPayPalAccessToken() {
  
  const clientID = process.env.PAYPAL_CLIENT_ID;
  const secret = process.env.PAYPAL_SECRET;
  const auth = Buffer.from(`${clientID}:${secret}`).toString('base64');

  const response = await axios.post(
    'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    'grant_type=client_credentials',
    {
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
  );
  console.log("sakjkfksj",response)

  return response.data.access_token;
}

const getPayPalAccessTokenApi = CatchAsyncError(async(req,res,next)=>{
     
 let token = await getPayPalAccessToken()
  if(!token) return next(new ErrorHandler("no Token available",204))
  res.status(200).json({message:"success",data:token})     

})

const createOrder = CatchAsyncError(async(req,res,next)=>{ 
  console.log("oders",req.body)
  const newOrder = await new Oder({
        ...req.body,
    })
  let result = await newOrder.save()
  res.status(200).json({message:"success",result:result})     
})



const getOrder = CatchAsyncError(async(req,res,next)=>{
     
  const newOder  = await Oder.find().populate("orderItems.product")
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



module.exports ={createOrder,getOrder,getPayPalAccessTokenApi}