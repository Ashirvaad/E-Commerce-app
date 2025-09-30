import React, { type FormEvent } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

const Checkout: React.FC = () => {
  const { cart, getCartTotal, clearCart } = useCart();
  const { user, updateUser } = useAuth();

  const total = getCartTotal();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!user) {
      toast.error("⚠️ Please log in first!");
      return;
    }

    if (user.wallet < total) {
      toast.error("❌ Not enough balance in wallet!");
      return;
    }

    // Save orders
    const newOrders = [
      ...(user.orders || []),
      ...cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
    ];

    const updatedUser = {
      ...user,
      wallet: user.wallet - total,
      orders: newOrders,
    };

    updateUser(updatedUser);
    clearCart();

    toast.success("✅ Order placed successfully!");
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Checkout</h2>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white shadow rounded-lg p-6"
        >
          <h3 className="text-xl font-semibold mb-4">Billing Details</h3>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Address"
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Place Order
          </button>
        </form>

        {/* Order Summary */}
        <div className="bg-gray-50 shadow rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            <ul className="space-y-2 mb-4">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>₹{item.price * item.quantity}</span>
                </li>
              ))}
            </ul>
          )}
          <p className="font-bold text-lg flex justify-between">
            <span>Total:</span>
            <span>₹{total}</span>
          </p>
          {user && (
            <p className="mt-2 text-gray-600">
              💰 Wallet Balance: ₹{user.wallet}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
