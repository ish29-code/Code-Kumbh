import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import UserRoutes from './routes/UserRoutes.js';
import RouteRoutes from './routes/RouteRoutes.js';
import TransportRoutes from './routes/TransportRoutes.js';
import TrafficRoutes from './routes/TrafficRoutes.js';
import SafteyRoutes from './routes/SafteyRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', UserRoutes);
app.use("/api/routes",RouteRoutes );
app.use("/api/traffic", TrafficRoutes);
app.use("/api/transport", TransportRoutes);
app.use("/api", SafteyRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


