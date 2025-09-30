import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { user, updateUser, isAuthenticated } = useAuth();

  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  // ✅ Save product to browsing history
  useEffect(() => {
    if (product && user) {
      const newHistory = [
        { productId: product.id, date: new Date().toISOString() },
        ...(user.history || []).filter((h) => h.productId !== product.id), // avoid duplicates
      ].slice(0, 10); // keep last 10 only

      updateUser({ ...user, history: newHistory });
    }
  }, [product, user, updateUser]);

  if (!product) return <p className="text-center mt-10">Product not found</p>;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success(`${product.name} added to cart 🛒`);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.error(`${product.name} removed from wishlist ❌`);
    } else {
      addToWishlist(product);
      toast.success(`${product.name} added to wishlist ❤️`);
    }
  };

  const handleReviewSubmit = () => {
    if (!isAuthenticated || !user) {
      toast.error("⚠️ Please login to leave a review!");
      return;
    }

    if (rating === 0 || comment.trim() === "") {
      toast.error("Please provide a rating and a comment.");
      return;
    }

    const newReview = {
      id: Date.now(),
      user: user.name,
      rating,
      comment,
      date: new Date().toISOString().split("T")[0],
    };

    product.reviews.push(newReview);
    toast.success("✅ Review submitted!");

    // Also save review to user profile
    updateUser({
      ...user,
      myReviews: [
        ...(user.myReviews || []),
        {
          productId: product.id,
          rating,
          comment,
          date: newReview.date,
        },
      ],
    });

    setComment("");
    setRating(0);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-80 object-cover rounded-lg"
        />

        {/* Product Info */}
        <div>
          <h2 className="text-3xl font-bold">{product.name}</h2>
          <p className="text-gray-600 my-2">₹{product.price}</p>
          <p className="mb-4">{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center mb-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
            >
              ➖
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
            >
              ➕
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Add to Cart
            </button>
            <button
              onClick={handleWishlistToggle}
              className={`flex-1 px-4 py-2 rounded ${
                isInWishlist(product.id)
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {isInWishlist(product.id) ? "♥ In Wishlist" : "♡ Add to Wishlist"}
            </button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">⭐ Reviews</h3>

        {isAuthenticated ? (
          <div className="mb-6">
            <div className="flex items-center mb-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <span
                  key={i}
                  onClick={() => setRating(i + 1)}
                  className={`cursor-pointer text-2xl ${
                    i < rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              className="w-full border rounded p-2 mb-2"
            />
            <button
              onClick={handleReviewSubmit}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Submit Review
            </button>
          </div>
        ) : (
          <p className="text-gray-500">🔒 Login to add a review.</p>
        )}

        {product.reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-4">
            {product.reviews.map((r) => (
              <div key={r.id} className="border-b pb-2">
                <p className="font-semibold">{r.user}</p>
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span
                      key={i}
                      className={`${
                        i < r.rating ? "text-yellow-400" : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p>{r.comment}</p>
                <p className="text-xs text-gray-500">{r.date}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
