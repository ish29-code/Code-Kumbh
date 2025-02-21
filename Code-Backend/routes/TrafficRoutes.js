import express from "express";
import { getMinimalTrafficRoute } from "../controllers/TrafficControllers.js";

const TrafficRoutes = express.Router();
TrafficRoutes.get("/traffic", getMinimalTrafficRoute);

export default TrafficRoutes;
