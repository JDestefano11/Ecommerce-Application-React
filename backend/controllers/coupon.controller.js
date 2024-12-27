import Coupon from "../models/coupon.model.js";

// Get Coupon
export const getCoupon = async (req, res) => {
    try {
        const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });
        res.json(coupon || null);
    } catch (error) {
        console.error("Error getting coupon:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Validate Coupon 
export const validateCoupon = async (req, res) => {
    try {
        const { code } = req.body;
        const coupon = await Coupon.findOne({ code, userId: req.user._id, isActive: true });

        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        if (coupon.expirationDate < new Date()) {
            coupon.isActive = false;
            await coupon.save();
            return res.status(400).json({ message: "Coupon has expired" });
        }
        res.json({
            message: "Coupon is valid",
            discount: coupon.discount,
            code: coupon.code
        });
    } catch (error) {
        console.error("Error validating coupon:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}