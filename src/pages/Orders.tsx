// src/pages/Orders.tsx
import React from "react";
import { useOrders } from "../context/OrderContext";

const Orders: React.FC = () => {
  const { orders } = useOrders();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-600 text-center">You have no orders yet.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 bg-white shadow"
            >
              <div className="flex justify-between mb-2">
                <p className="font-semibold">Order ID: #{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <ul className="mb-3 space-y-1">
                {order.items.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between text-gray-700"
                  >
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>₹{item.price * item.quantity}</span>
                  </li>
                ))}
              </ul>
              <p className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₹{order.total}</span>
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Payment: {order.paymentMethod === "cod" ? "Cash on Delivery" : "Card"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
