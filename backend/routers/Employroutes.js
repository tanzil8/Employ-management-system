import express from 'express';
// Adjust the path to where you saved the schema
import cloudinaryFileUploader from '../middleware/fileUploader.js';
import  { getEmploy, createemploye, getEmployById, getEmployDelete, updateEmployById, } from '../controllers/EmployController.js';


const router = express.Router();

// {name, email, phone, department, profileImage, salary, createAt, updateAt}
router.post("/", cloudinaryFileUploader.single("profileImage"), createemploye)
router.put("/:id", cloudinaryFileUploader.single("profileImage"), updateEmployById)
router.get("/",  getEmploy)
router.get("/:id",  getEmployById)
router.delete("/:id",  getEmployDelete)

export default router;
