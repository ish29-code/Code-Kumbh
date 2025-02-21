import mongoose from "mongoose";

const TransportSchema = new mongoose.Schema({
  location: String,
  level: { type: String, enum: ["Green", "Yellow", "Red"] },
});

export default mongoose.model("Transport", TransportSchema);
