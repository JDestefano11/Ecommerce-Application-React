import Coupon from "../models/coupon.model.js";

// Get Coupon
export const getCoupon = async (req, res) => {
    try {
        // Fetch the coupon associated with the current user and check if it's active
        const coupon = await Coupon.findOne({ userId: req.user._id, isActive: true });

        // Return the coupon if found, otherwise return null
        res.json(coupon || null);
    } catch (error) {
        console.error("Error getting coupon:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// Validate Coupon
export const validateCoupon = async (req, res) => {
    try {
        // Extract coupon code from the request body
        const { code } = req.body;

        // Look for the coupon based on the provided code, userId, and active status
        const coupon = await Coupon.findOne({ code, userId: req.user._id, isActive: true });

        // If coupon is not found, return an error message
        if (!coupon) {
            return res.status(404).json({ message: "Coupon not found" });
        }

        // Check if the coupon has expired by comparing expiration date to the current date
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
