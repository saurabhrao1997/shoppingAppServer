const Product = require("../Modal/ProductModal")
const User = require("../Modal/UserModal")
const ErrorHandler = require("../utils/Errorhandler")
const CatchAsyncError = require("../Middleware/CatchAsyncError")
const {uploadCloudinary,deleteCloudinary} = require("../utils/Cloudnary")
const fs = require("fs")


const createProduct = CatchAsyncError(async(req,res,next)=>{

    //  console.log("user",req.body,req.user,req.files)
       

    // const  {id,image} = req.body;
   
   let aa = await  req.files.map( async (file)=>{
             return    await  uploadCloudinary(file.path,"productImage/",)
          })

        

    // Wait for all files to be uploaded
    const uploadResults = await Promise.all(aa);
    console.log("file inside", uploadResults)
    // Delete the files from the temp folder
    req.files.forEach(file => fs.unlinkSync(file.path));


  // let imageUrl =  await  cloudinary(req.file.path)
  // fs.unlinkSync(req.file.path)


    const newProduct = await new Product({
        ...req.body,
      productimage:uploadResults

    })
  let result = await newProduct.save()
  res.status(200).json({message:"success",data:newProduct,result:result})     
})
const getAllProduct = CatchAsyncError(async(req,res,next)=>{
     
  const newProduct  = await Product.find({})
  if(!newProduct) return next(new ErrorHandler("no product  data available",204))
  res.status(200).json({message:"success",data:newProduct})     

})

const getProduct = CatchAsyncError(async(req,res,next)=>{
     let {id} = req.query
    const newProduct  = await Product.find({_id:id})
    if(!newProduct) return next(new ErrorHandler("no product available",204))
    res.status(200).json({message:"success",data:newProduct})     
  })

const updateProduct  = CatchAsyncError(async(req,res,next)=>{
    let {id} = req.query
    const newProduct  = await Product.find({_id:id})
    if(!newProduct) return next(new ErrorHandler("no product available",204))
       
        let updateProduct = await findByIdAndUpdate({_id:id},{$set:req.body})


        res.status(200).json({message:"success",data:updateProduct})    
})
const deleteProduct  = CatchAsyncError(async(req,res,next)=>{
  let {id} = req.query
  const newProduct  = await Product.findOne({_id:id})
  if(!newProduct) return next(new ErrorHandler("no product available",204))

  let aa=  newProduct.productimage.map(async(obj)=>{
        obj?.public_id
      return await  deleteCloudinary( obj?.public_id,"productImage/")
    })

     
      // let updateProduct = await findByIdAndUpdate({_id:id},{$set:req.body})
      const uploadResults = await Promise.all(aa);
      console.log("image delete form",uploadResults)
         let result = await Product.findByIdAndDelete({_id:id})

      res.status(200).json({message:"success",data:uploadResults,result:result})    
})



module.exports ={createProduct,getAllProduct,getProduct,updateProduct,deleteProduct}