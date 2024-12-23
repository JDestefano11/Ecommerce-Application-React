import express from "express";
import { getAllProducts, getFeaturedProducts } from "../controllers/product.controller.js";
import { protectRoute } from '../middleware/auth.middleware.js';
import { adminRoute } from '../middleware/auth.middleware.js';

const router = express.Router();


router.get("/", protectRoute, adminRoute, getAllProducts)
router.get("/featured", getFeaturedProducts)



export default router; 