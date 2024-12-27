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