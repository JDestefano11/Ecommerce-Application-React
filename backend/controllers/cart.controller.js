// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;
        const existingItem = user.CartItems.find(item => item.id === productId);
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.CartItems.push(productId);
        }
        await user.save();
        res.status(200).json({ message: "Item added to cart successfully" });
    } catch {
        console.log(error);
        res.status(500).json({ message: "Error adding item to cart" });
    }
}

