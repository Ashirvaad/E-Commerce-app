import { useState } from "react";
import { Link } from "react-router-dom";
import { products as initialProducts } from "../data/products";
import type { Product } from "../data/products";
import { HeartIcon as HeartOutline } from "@heroicons/react/24/outline";
import { HeartIcon as HeartSolid } from "@heroicons/react/24/solid";
import { useWishlist } from "../context/WishlistContext";
import toast from "react-hot-toast";

export default function Products() {
  const [products] = useState<Product[]>(initialProducts);
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState<number | "">(1500);
  const [sortBy, setSortBy] = useState<
    "none" | "priceAsc" | "priceDesc" | "nameAsc"
  >("none");

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // 🔎 Filtering
  let filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) &&
      (maxPrice === "" || p.price <= maxPrice)
  );

  // 🔄 Sorting
  if (sortBy === "priceAsc") filteredProducts.sort((a, b) => a.price - b.price);
  if (sortBy === "priceDesc")
    filteredProducts.sort((a, b) => b.price - a.price);
  if (sortBy === "nameAsc")
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));

  // ⭐ Helper: calculate average rating
  const getAverageRating = (reviews: Product["reviews"]) => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, r) => sum + r.rating, 0);
    return total / reviews.length;
  };

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Products</h2>

      {/* 🔎 Search, Filter & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  placeholder="Max Price"
  value={maxPrice === "" ? "" : String(maxPrice)}
  onChange={(e) => {
    const digitsOnly = e.target.value.replace(/[^\d]/g, "");
    const normalized = digitsOnly.replace(/^0+/, "");
    setMaxPrice(normalized === "" ? "" : Number(normalized));
  }}
  className="w-40 border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
/>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="w-40 border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
        >
          <option value="none">Sort By</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
          <option value="nameAsc">Name: A → Z</option>
        </select>
      </div>

      {/* 🛒 Product Grid */}
      {filteredProducts.length === 0 ? (
        <p className="text-gray-500">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((p) => {
            const avgRating = getAverageRating(p.reviews);

            return (
              <div
                key={p.id}
                className="relative bg-white rounded-xl shadow hover:shadow-2xl transition transform hover:-translate-y-1 overflow-hidden"
              >
                {/* ❤️ Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (isInWishlist(p.id)) {
                      const removed = removeFromWishlist(p.id);
                      if (removed)
                        toast.error(`${p.name} removed from wishlist 💔`);
                    } else {
                      const added = addToWishlist(p);
                      if (added) toast.success(`${p.name} added to wishlist ❤️`);
                      else toast("Already in wishlist ❤️", { icon: "💡" });
                    }
                  }}
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
                >
                  {isInWishlist(p.id) ? (
                    <HeartSolid className="w-6 h-6 text-red-500" />
                  ) : (
                    <HeartOutline className="w-6 h-6 text-gray-600" />
                  )}
                </button>

                {/* Image */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-48 w-full object-cover"
                />

                <div className="p-4 text-center">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {p.name}
                  </h3>
                  <p className="text-gray-600 mb-2">₹{p.price}</p>

                  {/* ⭐ Rating */}
                  <div className="flex items-center justify-center mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < Math.round(avgRating)
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        ★
                      </span>
                    ))}
                    <span className="ml-2 text-sm text-gray-500">
                      ({p.reviews.length} review
                      {p.reviews.length !== 1 ? "s" : ""})
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <Link
                      to={`/products/${p.id}`}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
