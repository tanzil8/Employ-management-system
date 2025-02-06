import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDNARY_NAME,       // Corrected the environment variable name
  api_key: process.env.CLOUDNARY_API_KEY,      // Corrected the key name
  api_secret: process.env.CLOUDNARY_API_KEY_SECRET // Corrected the key name
});

// Set up Cloudinary storage with multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads", // Specify the folder where files will be stored
    format: async (req, file) => 'png', // Optionally, set the format for uploads (e.g., PNG)
    public_id: (req, file) => file.originalname.split(".")[0]+'' // Use the original file name without the extension
  }
});

// Initialize multer with the Cloudinary storage configuration
const cloudinaryFileUploader = multer({ storage: storage });

export default cloudinaryFileUploader;
