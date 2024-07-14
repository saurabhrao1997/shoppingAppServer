const mongoose = require("mongoose")

const reviewSchema = mongoose.Schema({
    name:{
        type:String
    },
    review:{
        type:String
    }
})

let review = mongoose.model("review",reviewSchema)

module.exports =review;