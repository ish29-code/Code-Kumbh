import mongoose from "mongoose";
import dotenv from "dotenv";
import SaftyRegionModel from "../models/SaftyRegionModel.js"; // Ensure correct path

// Load environment variables
dotenv.config();

const mongoURI = process.env.Mongo_URI;
if (!mongoURI) {
  console.error("❌ MONGO_URI is not defined in .env file");
  process.exit(1); // Stop execution
}

// Connect to MongoDB
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1); // Stop execution if connection fails
  });

// Dummy Data
const safetyRegions = [
  {
    safety: "safe",
    coordinates: [
      { lat: 28.7041, lng: 77.1025 },
      { lat: 28.7050, lng: 77.1030 },
    ],
  },
  {
    safety: "moderate",
    coordinates: [
      { lat: 19.0760, lng: 72.8777 },
      { lat: 19.0770, lng: 72.8785 },
    ],
  },
  {
    safety: "unsafe",
    coordinates: [
      { lat: 12.9716, lng: 77.5946 },
      { lat: 12.9725, lng: 77.5955 },
    ],
  },
];

// Insert Data
const insertData = async () => {
  try {
    await SaftyRegionModel.deleteMany();
    await SaftyRegionModel.insertMany(safetyRegions);
    console.log("✅ Dummy safety regions inserted successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error inserting dummy data:", error);
    mongoose.connection.close();
  }
};

// Run function
insertData();
