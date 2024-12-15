import express from 'express';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';

import { connectDB } from './lib/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authRoutes)



app.listen(5000, () => {
    console.log("Server is running on port 5000");

    connectDB();
})


