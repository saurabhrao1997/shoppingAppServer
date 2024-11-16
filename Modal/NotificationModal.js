const mongoose = require("mongoose")

const notificationSchema = mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true }, // You can replace this with an ObjectId if you have user models
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    read: { type: Boolean, default: false }

})

const Notification = mongoose.model("Notification",notificationSchema)
module.exports =Notification