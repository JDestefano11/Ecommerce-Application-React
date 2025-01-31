import React, { useState, useEffect } from "react";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import "../styles/Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("/api/cart");
      setCartItems(response.data.cartItems);
      setIsLoading(false);
    } catch (error) {
      toast.error("Error fetching cart items");
      setIsLoading(false);
    }
  };

  const updateQuantity = async (productId, newQuantity) => {
    try {
      await axios.put(`/api/cart/${productId}`, { quantity: newQuantity });
      fetchCartItems();
      toast.success("Cart updated");
    } catch (error) {
      toast.error("Error updating cart");
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.post("/api/cart/remove", { productId });
      fetchCartItems();
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Error removing item");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p className="subtitle">{cartItems.length} items in your cart</p>
        </div>

        {isLoading ? (
          <div className="loader"></div>
        ) : cartItems.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some items to get started!</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="item-details">
                    <h3>{item.name}</h3>
                    <p className="item-price">${item.price}</p>
                  </div>
                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <FiMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        updateQuantity(item._id, item.quantity + 1)
                      }
                    >
                      <FiPlus />
                    </button>
                  </div>
                  <button
                    className="remove-button"
                    onClick={() => removeItem(item._id)}
                  >
                    <FiTrash2 />
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-row">
                <span>Subtotal</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <button className="checkout-button">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
