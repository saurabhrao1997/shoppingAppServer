const mongoose = require("mongoose")


const productSchema = mongoose.Schema({
    productimage:[{
       url: {type:String},
       public_id: {type:String}
        // required:true
    }],
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,ref:"Category",
    },
    price:{
        type:String,
        required:true,
    },
    rating:{
        type:String,
        // required:true,
    },
    review:[{name:{type:String,},review:{type:String} }],
    offer:{
        type:String,
        // required:true,
    },
    discount:{
        type:String,
        // required:true,
    },
    available:{
        type:Boolean
    },
    quantity:{
        type:Number,
        default:1

    },

    customer:[{type:mongoose.Schema.Types.ObjectId,ref:"userData"}]

})

const productOfShoppingApp = mongoose.model("productOfShoppingApp",productSchema)

module.exports = productOfShoppingApp