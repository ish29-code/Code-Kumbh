import Transport from "../models/TransportModel.js";

// ✅ Get Transport Availability
export const getTransportZones = async (req, res) => {
  try {
    const transportData = await Transport.find();
    res.json(transportData);
  } catch (error) {
    res.status(500).json({ message: "❌ Error fetching transport zones", error });
  }
};
