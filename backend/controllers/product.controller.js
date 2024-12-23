import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting products", error: error.message });
    }
};

// Get featured products
export const getFeaturedProducts = async (req, res) => {
    try {
        let featuredProducts = await redis.get("featuredProducts");
        if (featuredProducts) {
            return res.status(200).json({ products: JSON.parse(featuredProducts) });
        }

        // Get products from MongoDB if not found in Redis
        featuredProducts = await Product.find({ isFeatured: true }).lean();

        // Store featured products in Redis
        await redis.set("featuredProducts", JSON.stringify(featuredProducts));

        // Send the featured products response
        res.status(200).json({ products: featuredProducts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error getting featured products", error: error.message });
    }
};

// Create a product
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, image, category } = req.body;

        let cloudinaryResponse = null;

        if (image) {
            await cloudinary.uploader.upload(image, { folder: "products" })
        }
        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
            category
        })
        res.status(201).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating product", error: error.message });

    }
};