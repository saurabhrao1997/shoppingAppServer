const {v2 } = require("cloudinary")
const fs = require("fs")


v2.config({ 
    cloud_name: 'dyxjwfgra', 
    api_key: '121512395199285', 
    api_secret: '85srLbdMpDD_stX3DxfYox-1AgI' // Click 'View Credentials' below to copy your API secret
});

const uploadCloudinary = async (urlPath,folder,id)=>{
     try {
      if(!urlPath) return null

const uploadResult = await v2.uploader
       .upload(
           urlPath, {
               public_id: id,
               resource_type:"auto",
               folder:folder
           }
       )
       console.log("profile image upload successfully",uploadResult)
       return {url: uploadResult?.url ,public_id:uploadResult?.public_id}

        
     } catch (error) {
         fs.unlinkSync(urlPath)
         return null
     }
}
const deleteCloudinary = async (public_id,folder,id)=>{
    try {
     if(!public_id) return null

const uploadResult = await v2.uploader
      .destroy(
        public_id, {
              public_id: public_id,
              resource_type:"image",
              folder:folder
          }
      )
      console.log("profile image delete successfully",uploadResult)
      return uploadResult

       
    } catch (error) {
        console.log("error",error)
        // fs.unlinkSync(public_id)
        return null
    }
}
module.exports = {uploadCloudinary,deleteCloudinary}

// (async function() {

//     // Configuration
  
    
//     // Upload an image
//      const uploadResult = await cloudinary.uploader
//        .upload(
//            'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
//                public_id: 'shoes',
//            }
//        )
//        .catch((error) => {
//            console.log(error);
//        });
    
//     console.log(uploadResult);
    
//     // Optimize delivery by resizing and applying auto-format and auto-quality
//     const optimizeUrl = cloudinary.url('shoes', {
//         fetch_format: 'auto',
//         quality: 'auto'
//     });
    
//     console.log(optimizeUrl);
    
//     // Transform the image: auto-crop to square aspect_ratio
//     const autoCropUrl = cloudinary.url('shoes', {
//         crop: 'auto',
//         gravity: 'auto',
//         width: 500,
//         height: 500,
//     });
    
//     console.log(autoCropUrl);    
// })();