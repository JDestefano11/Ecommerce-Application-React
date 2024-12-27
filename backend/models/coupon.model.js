import mongoose from "mongoose";

const couponSchema = new mongoose.Schema({
    code: {
        type: String,
        required: [true, "Coupon code is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    discount: {
        type: Number,
        required: [true, "Coupon discount is required"],
        min: [0, "Coupon discount must be greater than 0"],
        max: [100, "Coupon discount must be less than 100"],
    },
    expirationDate: {
        type: Date,
        required: [true, "Coupon expiration date is required"],
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Coupon user is required"],
        unique: true
    },
}, { timestamps: true });

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;
