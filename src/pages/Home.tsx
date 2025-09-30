import { Link } from "react-router-dom";
import { IconBrush, IconShoppingBag, IconGift } from "@tabler/icons-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-20 px-6">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Welcome to <span className="text-blue-600">Kalakaar Store</span>
        </h1>
        <p className="text-lg text-gray-600 mb-6 max-w-2xl">
          Discover unique, handcrafted, and artistic creations 🎨 — made with love by real artists.
        </p>
        <Link
          to="/products"
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          Shop Now
        </Link>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Explore Our Collections
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <IconBrush className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Paintings</h3>
            <p className="text-gray-600 text-sm">
              Beautiful hand-painted artwork to brighten your walls.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <IconShoppingBag className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Sketches</h3>
            <p className="text-gray-600 text-sm">
              Unique pencil and charcoal sketches for every taste.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow hover:shadow-lg transition">
            <IconGift className="h-12 w-12 text-pink-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Custom Gifts</h3>
            <p className="text-gray-600 text-sm">
              Personalized art pieces perfect for gifting loved ones.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
