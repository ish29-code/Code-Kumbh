import mongoose from "mongoose";

const RouteSchema = new mongoose.Schema({
  name: String,
  startLocation: String,
  endLocation: String,
  safetyRating: Number, // 1-10 scale
  transportAvailability: String, // Green, Yellow, Red
  trafficLevel: String, // High, Medium, Low
});

export default mongoose.model("Route", RouteSchema);
