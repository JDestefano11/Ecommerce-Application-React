import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { createCheckoutSession } from "../controllers/payment.controller.js";


const router = express.Router();

// Route to create a checkout session
router.post("/create-checkout-session", protectRoute, createCheckoutSession);

// Route to handle checkout success
router.post("/checkout-success", protectRoute,)

export default router;

