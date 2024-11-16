

const Review = require("../Modal/ReviewModal")
const Notification = require("../Modal/NotificationModal")
const Product = require("../Modal/ProductModal")
const User = require("../Modal/UserModal")
const Oder = require("../Modal/OderModal")
const ErrorHandler = require("../utils/Errorhandler")
const CatchAsyncError = require("../Middleware/CatchAsyncError")
const nodemailer = require('nodemailer');
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
  const user = await User.findOne({_id:req.body.user})
  console.log("oders",user,req.body.paymentResult.emailAddress,req.body)
  const newOrder = await new Oder({
        ...req.body,
    })

    // let genrateOtp =   Math.floor((Math.random()*1000000)+1)
  
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
        name:"shoppingApp Project",       // emailer name
        address:'saurabhwarhade77@gmail.com'    // who will send email
      },
      to: `${req.body.paymentResult.emailAddress}`, // to whom sent mail
      // to : ["saurabhwarhade28@gmail.com","pawan@gmail.com"]    list email
      subject: 'your order is place for dispatched',
      html:`<pre>Dear ${user?.Name},

Thank you for your recent purchase with us!

We are pleased to confirm that your order has been successfully processed. Your order details are as follows:

Order Number: ${req?.body?.orderId}
Order Date: ${req?.body?.paidAt}
Items Ordered: ${req?.body?.oderItems?.map((obj)=> obj?.name)[0]}

Your order is expected to be delivered within the next 2 to 3 business days. You will receive an update with tracking information once your package is shipped.

If you have any questions or need further assistance, please feel free to contact our customer support team at 07232123456.

Thank you for choosing ShoppingApp. We appreciate your business and look forward to serving you again!

Warm regards,
ShoppingApp Team

Feel free to replace the placeholders (e.g., [Customer Name], [Order Number]) with actual values from your order data. This template is designed to be professional and informative. Let me know if you need any adjustments!
</pre>`,
      // text: `Hi name , you have oder ${ req.body.oderItems?.length } items and it shipping to the address ${req.body.shippingAddress.address} ${req.body.shippingAddress.city} ${req.body.shippingAddress.country} ${req.body.shippingAddress.postalCode}. your order will `
    };
  
    let result = await newOrder.save()

let newNotification = await new Notification({
  userId: req.body.user, // You can replace this with an ObjectId if you have user models
  message:`oder is create for product are ${req.body.orderItems.map((obj)=>obj.name)[0]}` ,
  createdAt:req.body.paidAt,
  read:false
})

    let notificationResult = await newNotification.save()
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
       
        res.status(200).json({message:"success",result:{result,notificationResult}})     
      }
    });








 

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