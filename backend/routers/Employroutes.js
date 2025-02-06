import express from 'express';
// Adjust the path to where you saved the schema
import cloudinaryFileUploader from '../middleware/fileUploader.js';
import  { getEmploy, createemploye} from '../controllers/EmployController.js';


const router = express.Router();

// {name, email, phone, department, profileImage, salary, createAt, updateAt}
router.post("/", cloudinaryFileUploader.single("profileImage"), createemploye)
router.get("/",  getEmploy)

export default router;
