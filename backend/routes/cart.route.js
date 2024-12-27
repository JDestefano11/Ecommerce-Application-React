import express from "express";
import { addToCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/", protectedRoute, getCartProducts)
router.post("/", protectedRoute, addToCart)
router.delete("/", protectedRoute, removeAllFromCart)
router.post("/:id", protectedRoute, updateQuantity)

export default router;