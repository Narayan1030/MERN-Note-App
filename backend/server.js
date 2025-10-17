import Dotenv from "dotenv";
import express from "express";
Dotenv.config();

import cors from "cors"
import noteRoutes from './routes/noteRoutes.js';
// import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";

const PORT = process.env.PORT || 3000;
const app = express();

// Middlewares
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173','http://localhost:5174']
}))

// Routes
app.use('/api/notes', noteRoutes);

// Connect DB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is listening at port:", PORT);
  });
});
