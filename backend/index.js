import express from "express";
import 'dotenv/config';
import mongoose from "mongoose";
import employRoute from "./routers/Employroutes.js";
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Use Express built-in middleware for parsing JSON
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB is connected"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Simple route to check the server
app.get('/', (req, res) => {
  res.send("Hello, world!");
});

// API routes for employees
app.use("/api/employ", employRoute);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log("Shutting down...");
  await mongoose.connection.close(); // Close MongoDB connection gracefully
  process.exit(0); // Exit process with success
});
