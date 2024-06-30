const mongoose = require("mongoose")

const categorySchama = mongoose.Schema({
    label:{
        type:String,
        required:true
    },
    value:{
        type:String,
        required:true

    },

})

const Category = mongoose.model("Category",categorySchama)
module.exports =Category