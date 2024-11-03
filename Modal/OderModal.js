const mongoose = require("mongoose")

const OrderSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"userData"
    },
    orderItems:[
        {
            name:{type:String},
            qty:{type:Number},
            price:{type:Number},
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"productOfShoppingApp"
            }

        }
    ],
    shippingAddress:{
        address:{type:String,required:true},
        city:{type:String,required:true},
        postalCode:{type:String,required:true},
        country:{type:String,required:true},

    },
    paymentMethod:{
        type:String
    },
    paymentResult:{
        id:{type:String},
        status:{type:String},
        updateTime:{type:String},
        emailAddress:{type:String}
    },
    itemsPrice:{
     type:Number,
     default:0.0
    },
    taxPrice:{
        type:Number,
        default:0.0
    },
    shippingPrice:{
      type:Number,
      default:0.0
    },
    TotalPrice:{
        type:Number,
        default:0.0
      },
      isPaid:{
        type:Boolean,
        default:false
      },
      isPaid:{
        type:Boolean,
        default:false
      },
      paidAt:{
        type:Date,

      },
      isDelivered:{
        type:Boolean,
        default:false
      },
      deliveredAt:{
        type:Date,
      },




    
},{timestamps:true})

let order = mongoose.model("order",OrderSchema)

module.exports =order;