

const isAdmin = ()=>{
    return  async(req,res,next)=>{
       const user = await req.user

       
       if(user.role == "ADMIN"){
        next()
       }else{
        return res.status(403).json({mesage: "you don't have permission"})

       }

    }
       
}
module.exports = isAdmin;