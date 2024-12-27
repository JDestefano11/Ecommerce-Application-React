import express from 'express';
import dotenv from 'dotenv';
import cookieparser from 'cookie-parser';

import authRoutes from './routes/auth.route.js';
import productRoutes from './routes/product.route.js';
import cartRoutes from './routes/cart.route.js';
import couponRoutes from './routes/coupon.route.js';

import { connectDB } from './lib/db.js';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieparser());

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/cart", cartRoutes)
app.use("/api/coupon", couponRoutes)



app.listen(5000, () => {
    console.log("Server is running on port 5000");

    connectDB();
})


