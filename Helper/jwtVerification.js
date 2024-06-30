const jwt = require("jsonwebtoken")
const secrete = "kjwvwwhiuwfekkwaKNFKEFKWJEKJEK"


const setToken = async(user)=>{
   try {
    if(!user) return null 
    return jwt.sign({...user},secrete)
   } catch (error) {
    console.log(error)
    return null
   }
}

const verifyToken = async(token)=>{
    try {
        if(!token) return null
        return jwt.verify(token,secrete)
     
    } catch (error) {
     console.log(error)
     return null
    }
 }

 module.exports = {setToken,verifyToken}
