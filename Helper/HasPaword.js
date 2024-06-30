const bcrypt = require("bcrypt")

const hassPassword = async(password)=>{
     try {
         if(!password) return null
         return await bcrypt.hash(password,10)
     } catch (error) {
        console.log("error",error)
        return null
     }
}


const compairPassword = async(userPass,hasPass)=>{
    try {
        if(!userPass) return null
        return await bcrypt.compare(userPass,hasPass)
    } catch (error) {
       console.log("error",error)
       return null
    }
}


module.exports = {compairPassword,hassPassword}