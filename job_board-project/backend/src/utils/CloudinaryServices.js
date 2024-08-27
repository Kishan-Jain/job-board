import { v2 as cloudinary } from "cloudinary";

// Upload an image
export const uploadToCloudinary = async function(fileLocation) {
    const uploadResult = await cloudinary.uploader
    .upload(
      fileLocation, 
    )
    .catch((error) => {
      console.log(error);
    });
  
  console.log(uploadResult);
      
}



