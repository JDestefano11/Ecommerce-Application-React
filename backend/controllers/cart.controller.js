// Add item to cart
export const addToCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        // Find existing item in cart
        const existingItem = user.CartItems.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.CartItems.push({ id: productId, quantity: 1 });
        }

        // Save the user cart
        await user.save();

        res.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error adding item to cart" });
    }
};

// Remove item from cart (or clear cart)
export const removeAllFromCart = async (req, res) => {
    try {
        const { productId } = req.body;
        const user = req.user;

        // If productId is not provided, clear the entire cart
        if (!productId) {
            user.CartItems = [];
        } else {
            // Remove specific item from cart
            user.CartItems = user.CartItems.filter(item => item.id !== productId);
        }

        // Save the user cart after modification
        await user.save();

        res.status(200).json({ message: "Item removed from cart successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error removing item from cart" });
    }
};
