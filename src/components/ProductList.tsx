import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { products, type Product } from "../data/products";

const ProductList: React.FC = () => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className="px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Our Products</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1"
          >
            {/* Image */}
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />

            {/* Details */}
            <div className="p-4 flex flex-col h-44 justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  ₹{product.price}
                </p>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => addToCart(product)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  Add to Cart 🛒
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() =>
                    isInWishlist(product.id)
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product)
                  }
                  className={`px-4 py-2 rounded transition ${
                    isInWishlist(product.id)
                      ? "bg-red-500 text-white hover:bg-red-600"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                  }`}
                >
                  {isInWishlist(product.id) ? "Remove ❤️" : "Wishlist 🤍"}
                </button>

                {/* View button */}
                <button
                  onClick={() => setSelectedProduct(product)}
                  className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                >
                  View 👁️
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-md w-full p-6 relative">
            {/* Close button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-600 dark:text-gray-300 hover:text-red-500"
            >
              ✕
            </button>

            {/* Modal content */}
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-56 object-cover rounded-md"
            />
            <h3 className="text-2xl font-bold mt-4">{selectedProduct.name}</h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {selectedProduct.description}
            </p>
            <p className="text-lg font-semibold mt-2">
              ₹{selectedProduct.price}
            </p>

            {/* Modal actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Add to Cart 🛒
              </button>

              <button
                onClick={() => {
                  isInWishlist(selectedProduct.id)
                    ? removeFromWishlist(selectedProduct.id)
                    : addToWishlist(selectedProduct);
                  setSelectedProduct(null);
                }}
                className={`flex-1 px-4 py-2 rounded transition ${
                  isInWishlist(selectedProduct.id)
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
                }`}
              >
                {isInWishlist(selectedProduct.id)
                  ? "Remove ❤️"
                  : "Wishlist 🤍"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
