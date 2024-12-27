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

        // Upload the image if it's provided
        if (image) {
            cloudinaryResponse = await cloudinary.uploader.upload(image, { folder: "products" });
        }

        const product = await Product.create({
            name,
            description,
            price,
            image: cloudinaryResponse ? cloudinaryResponse.secure_url : "",
            category
        });

        res.status(201).json({ product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating product", error: error.message });
    }
};

// Delete Product 
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Delete the image from Cloudinary if it exists
        if (product.image) {
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("Image deleted from Cloudinary");
            } catch (error) {
                console.error(error);
            }
        }

        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

// Get Recommended Products
export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 } // Randomly sample 3 products
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    image: 1,
                    price: 1,
                    description: 1
                }
            }
        ]);
        res.json({ products });
    } catch (error) {
        console.error("Error details:", error.message);
        res.status(500).json({ message: "Error getting recommended products" });
    }
};
