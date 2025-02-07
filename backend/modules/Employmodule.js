import mongoose from "mongoose";

const Schema = mongoose.Schema;

const EmploySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    phone: {
      type: Number, // Changed from Number to String for phone number
   
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    profileImage: {
      type: String,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds `createdAt` and `updatedAt` fields
  }
);

// Export the model directly
const EmployesModule = mongoose.model("employes", EmploySchema);
export default EmployesModule;
