import express from "express";
import mongoose from "mongoose";
import TopicRoutes from "./Topic/routes.js";
import cors from "cors";   // Import CORS package
import "dotenv/config";

const CONNECTION_STRING = "mongodb://127.0.0.1:27017/Chatterbox";

// Connect to MongoDB
mongoose.connect(CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected successfully.");
}).catch(err => {
  console.error("MongoDB connection error:", err);
});

const app = express();

// Apply CORS middleware to enable CORS for all routes
app.use(cors());

// Initialize TopicRoutes
TopicRoutes(app);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});