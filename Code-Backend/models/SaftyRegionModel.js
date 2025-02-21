import mongoose from "mongoose";

const SafetyRegionSchema = new mongoose.Schema({
  safety: {
    type: String,
    enum: ["safe", "moderate", "unsafe"],
    required: true,
  },
  coordinates: [
    {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  ],
});

const SafetyRegion = mongoose.model("SafetyRegion", SafetyRegionSchema);
export default SafetyRegion; // ✅ Export using ES module syntax

