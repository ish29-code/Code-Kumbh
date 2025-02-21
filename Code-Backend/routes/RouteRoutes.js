import express from "express";
import {getZonesOnRoute  } from "../controllers/RouteControllers.js";
const RouteRoutes = express.Router();

RouteRoutes.get("/routes", getZonesOnRoute);

export default RouteRoutes;
