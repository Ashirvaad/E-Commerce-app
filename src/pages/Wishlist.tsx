// src/pages/Wishlist.tsx
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const moveToCart = (item: any) => {
    const addedNew = addToCart(item, 1);
    removeFromWishlist(item.id);
    if (addedNew) toast.success(`${item.name} moved to cart ✅`);
    else toast.success(`${item.name} quantity increased in cart ✅`);
  };

  const removeItem = (id: number, name: string) => {
    const removed = removeFromWishlist(id);
    if (removed) toast.error(`${name} removed from wishlist ❌`);
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Wishlist ❤️</h2>

      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden"
            >
              <img src={item.image} alt={item.name} className="h-48 w-full object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-gray-600 mb-3">₹{item.price}</p>

                <div className="flex gap-2">
                  <Link
                    to={`/products/${item.id}`}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => moveToCart(item)}
                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item.id, item.name)}
                    className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
