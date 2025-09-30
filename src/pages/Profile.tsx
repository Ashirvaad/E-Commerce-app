import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import type { User } from "../context/AuthContext";
import { countryCodes } from "../utils/countryCodes";
import { products } from "../data/products"; // ✅ for showing product images

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState<User | null>(user);
  const [message, setMessage] = useState("");

  if (!user) return <p className="text-center mt-10">Please log in</p>;

  const handleSave = () => {
    if (!formData) return;

    if (!/^\d{10}$/.test(formData.phone || "")) {
      setMessage("Phone must be 10 digits");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setMessage("Invalid email format");
      return;
    }

    updateUser(formData);
    setEditing(false);
    setMessage("Profile updated successfully ✅");
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">👤 Profile</h2>

      {message && <p className="text-green-600 mb-4">{message}</p>}

      {/* ✅ Edit / View Mode */}
      {editing ? (
        <div className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              value={formData?.name || ""}
              onChange={(e) =>
                setFormData({ ...formData!, name: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              value={formData?.email || ""}
              onChange={(e) =>
                setFormData({ ...formData!, email: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <div className="flex space-x-2">
              <select
                value={formData?.countryCode || "+91"}
                onChange={(e) =>
                  setFormData({ ...formData!, countryCode: e.target.value })
                }
                className="w-24 border px-2 py-2 rounded"
              >
                {countryCodes.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label} ({c.code})
                  </option>
                ))}
              </select>
              <input
                type="tel"
                value={formData?.phone || ""}
                onChange={(e) =>
                  setFormData({
                    ...formData!,
                    phone: e.target.value.replace(/\D/g, ""),
                  })
                }
                className="flex-1 border px-3 py-2 rounded"
                maxLength={10}
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              value={formData?.address || ""}
              onChange={(e) =>
                setFormData({ ...formData!, address: e.target.value })
              }
              className="w-full border px-3 py-2 rounded"
            />
          </div>

          <button
            onClick={handleSave}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p>
            <b>Name:</b> {user.name}
          </p>
          <p>
            <b>Email:</b> {user.email}
          </p>
          <p>
            <b>Phone:</b> {user.countryCode} {user.phone}
          </p>
          <p>
            <b>Address:</b> {user.address || "Not set"}
          </p>
          <p>
            <b>Wallet:</b> ₹{user.wallet}
          </p>

          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
          >
            Edit Profile
          </button>
        </div>
      )}

      {/* ✅ My Reviews */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">⭐ My Reviews</h3>
        {user.myReviews?.length ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {user.myReviews.map((r, idx) => {
              const product = products.find((p) => p.id === r.productId);
              return (
                <div
                  key={idx}
                  className="p-4 border rounded-lg shadow-sm flex gap-3 bg-gray-50"
                >
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{product?.name}</p>
                    <p>{"⭐".repeat(r.rating)}</p>
                    <p className="text-gray-600 text-sm">{r.comment}</p>
                    <p className="text-xs text-gray-400">{r.date}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* ✅ Purchase History */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">🛒 Purchase History</h3>
        {user.orders?.length ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {user.orders.map((o, idx) => {
              const product = products.find((p) => p.id === o.id);
              return (
                <div
                  key={idx}
                  className="p-4 border rounded-lg shadow-sm flex gap-3 bg-gray-50"
                >
                  <img
                    src={product?.image}
                    alt={o.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">{o.name}</p>
                    <p className="text-gray-600">
                      Qty: {o.quantity} • ₹{o.price * o.quantity}
                    </p>
                  </div>
                  <button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Buy Again
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No purchases yet.</p>
        )}
      </div>

      {/* ✅ Browsing History */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">👀 Recently Viewed</h3>
        {user.history?.length ? (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {user.history.map((h, idx) => {
              const product = products.find((p) => p.id === h.productId);
              return (
                <div
                  key={idx}
                  className="min-w-[150px] border rounded-lg shadow-sm bg-white"
                >
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="w-full h-24 object-cover rounded-t"
                  />
                  <p className="p-2 text-sm font-semibold text-center">
                    {product?.name}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No history yet.</p>
        )}
      </div>

      {/* ✅ Recommendations */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-3">✨ Recommended for You</h3>
        {user.recommendations?.length ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {user.recommendations.map((r, idx) => {
              const product = products.find((p) => p.id === r.productId);
              return (
                <div
                  key={idx}
                  className="border rounded-lg shadow-sm bg-white overflow-hidden"
                >
                  <img
                    src={product?.image}
                    alt={product?.name}
                    className="h-32 w-full object-cover"
                  />
                  <div className="p-3">
                    <p className="font-semibold">{product?.name}</p>
                    <p className="text-gray-600">₹{product?.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500">No recommendations yet.</p>
        )}
      </div>
    </div>
  );
}
