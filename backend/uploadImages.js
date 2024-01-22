import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
dotenv.config();

// Configure Cloudinary with your API credentials
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SECRET_KEY,
   });

// Function to upload images to Cloudinary
const uploadImagesToCloudinary = async (imagePaths) => {
  const uploadedImageUrls = [];

  try {
    for (const imagePath of imagePaths) {
      const result = await cloudinary.uploader.upload(imagePath, {
        folder: "products", 
        transformation: [
          { width: 648, height: 564, crop: "fill" }, // Resize and crop to the specified dimensions
        ],
      });

      // Push the public URL of the uploaded image to the array
      uploadedImageUrls.push(result.secure_url);
    }

    return uploadedImageUrls;
  } catch (error) {
    console.error("Error uploading images to Cloudinary:", error);
    return [];
  }
};

const imagePaths = [
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-16.png', 
    
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-15.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-18.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-14.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-13.png',
    'https://beautico-nextjs.vercel.app/assets/img/inner-page/shop-details-tab-img1.png',
    'https://beautico-nextjs.vercel.app/assets/img/inner-page/shop-details-tab-img4.png',
    'https://beautico-nextjs.vercel.app/assets/img/inner-page/shop-details-tab-img3.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-1.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-2.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-3.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-9.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-4.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-5.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-6.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-7.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-8.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-11.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/suggest-slider-img-1.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-10.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-4.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-7.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-5.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-6.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-21.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-9.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-11.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-10.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/product-img-12.png',
    'https://beautico-nextjs.vercel.app/assets/img/home1/sp-product-img-02.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-14.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-13.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-15.png',
    'https://beautico-nextjs.vercel.app/assets/img/home2/product-img-16.png',
  ];

uploadImagesToCloudinary(imagePaths)
  .then((imageUrls) => {
    console.log("Uploaded image URLs:", imageUrls);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
