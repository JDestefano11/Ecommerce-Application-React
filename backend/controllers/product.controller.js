export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error getting products", error: error.message });
    }

}