import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product name is required"],
    },
    description: {
        type: String,
        required: [true, "Product description is required"],
    },
    price: {
        type: Number,
        required: [true, "Product price is required"],
        min: [0, "Product price must be greater than 0"],
    },
    image: {
        type: String,
        required: [true, "Product image is required"],
    },
    category: {
        type: String,
        required: [true, "Product category is required"],
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;