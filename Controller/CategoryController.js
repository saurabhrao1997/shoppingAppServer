const Product = require("../Modal/ProductModal")
const Category = require("../Modal/CategoryModal")
const User = require("../Modal/UserModal")
const ErrorHandler = require("../utils/Errorhandler")
const CatchAsyncError = require("../Middleware/CatchAsyncError")
const cloudinary = require("../utils/Cloudnary")
const fs = require("fs")


const createCategory = CatchAsyncError(async(req,res,next)=>{
    const {label,value} = req.body

           if(!label && !value) return next(new ErrorHandler("label and value both are required field",400))
           let aa = Category.findOne({value:value})
        if(aa.value) return next(new ErrorHandler("category all ready is there no need to again create",400))
    const newCategory = await new Category({
        label:label,
        value:value
    })

    const result = await newCategory.save()

    res.status(200).json({message:"success",data:result})
       
})
const getAllCategory = CatchAsyncError(async(req,res,next)=>{
     
  const newCategory  = await Category.find({})
  if(!newCategory) return next(new ErrorHandler("no category  data available",204))
  res.status(200).json({message:"success",data:newCategory})     

})

const getCategory = CatchAsyncError(async(req,res,next)=>{
     let {category} = req.query
    const newCategory  = await Product.findOne({value:category})
    if(!newCategory) return next(new ErrorHandler("no category available",204))
    res.status(200).json({message:"success",data:newCategory})     
  })

const updateCategory  = CatchAsyncError(async(req,res,next)=>{
    let {category} = req.query
    const newCategory  = await Product.findOne({value:value})
    if(!newCategory) return next(new ErrorHandler("no category available",204))
       
        let updateCategory = await findOneAndUpdate({value:value},{$set:req.body})


        res.status(200).json({message:"success",data:updateCategory})    
})


const deleteCategory  = CatchAsyncError(async(req,res,next)=>{
    let {category} = req.query
    const newCategory  = await Product.findOne({value:category})
    if(!newCategory) return next(new ErrorHandler("no category available",204))
       
        let deleteCategory = await findOneAndDelete({value:category})


        res.status(200).json({message:"success",data:deleteCategory})    
})



module.exports ={createCategory,getAllCategory,getCategory,updateCategory,deleteCategory}