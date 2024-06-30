const mongoose = require("mongoose");




const connection = async()=>{
    try {
      let aa = await  mongoose.connect("mongodb+srv://saurabhwarhade28:gu9ShzGztvVkQNs6@merndevelopmentproject.abihkuk.mongodb.net/?retryWrites=true&w=majority&appName=MERNdevelopmentProject",{dbName:"shopingApp"}).then(()=>{
           console.log("mongoDb connected successfully")
        })
      
        
    } catch (error) {
        console.log(" error",error)
    }
}






module.exports = connection






  