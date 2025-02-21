import express from "express";
import { getTransportZones } from "../controllers/TransportControllers.js";

const TransportRoutes = express.Router();
TransportRoutes.get("/transport", getTransportZones);

export default TransportRoutes;
