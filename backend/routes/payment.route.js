import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import Coupon from "../models/coupon.model.js";
import { stripe } from "../lib/stripe.js";
import { createCheckoutSession } from "../controllers/payment.controller.js";

const router = express.Router();


router.post("/create-checkout-session", protectRoute, createCheckoutSession);
// Helper function to create a Stripe coupon based on the discount percentage

export default router;
