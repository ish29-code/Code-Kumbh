


import express from "express";
import SaftyRegionModel from "../models/SaftyRegionModel.js";

const SafteyRoutes = express.Router();

// Get all safety regions
SafteyRoutes.get("/regions", async (req, res) => {
  try {
    const regions = await SaftyRegionModel.find({});
    res.json({ regions });
  } catch (error) {
    console.error("Error fetching safety regions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default SafteyRoutes; // ✅ Export using ES modules
