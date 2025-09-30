// src/components/Cart.tsx
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";

const Cart: React.FC = () => {
  const { cart, addToCart, decreaseQuantity, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart 🛒</h2>
        <p className="text-gray-600 mb-4">No items in cart.</p>
        <Link
          to="/products"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      <ul className="mb-6 space-y-4">
        {cart.map((item) => (
          <li key={item.id} className="flex justify-between items-center border-b pb-4">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-gray-600">₹{item.price}</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const ok = decreaseQuantity(item.id);
                  if (ok) toast.success("➖ Decreased quantity");
                }}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                ➖
              </button>

              <span className="font-semibold">{item.quantity}</span>

              <button
                onClick={() => {
                  const addedNew = addToCart(item);
                  if (addedNew) toast.success("🛒 Added to cart");
                  else toast.success("➕ Increased quantity");
                }}
                className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
              >
                ➕
              </button>

              <span className="font-semibold">₹{item.price * item.quantity}</span>

              <button
                onClick={() => {
                  const removed = removeFromCart(item.id);
                  if (removed) toast.success("❌ Removed from cart");
                }}
                className="text-red-500 hover:underline ml-4"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className="text-lg font-semibold mb-4">Total: ₹{total}</p>

      <div className="flex gap-4">
        <button
          onClick={() => {
            clearCart();
            toast.success("🗑️ Cart cleared");
          }}
          className="flex-1 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Clear Cart
        </button>
        <button
          onClick={() => navigate("/checkout")}
          className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
