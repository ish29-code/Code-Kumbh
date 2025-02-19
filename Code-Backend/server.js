import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import UserRoutes from './routes/UserRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', UserRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


