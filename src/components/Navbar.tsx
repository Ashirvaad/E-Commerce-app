// src/components/Navbar.tsx
import React from "react";
import  {useCart}  from "../context/CartContext";
import  {useWishlist} from "../context/WishlistContext"; // ✅ import
import { Link } from "react-router-dom";

interface NavbarProps {
  toggleSidebar: () => void;
}

const IconBars3: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M3 6h18M3 12h18M3 18h18"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
    />
  </svg>
);

const IconCart: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M3 3h2l.6 3M7 13h10l3-8H6.2"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="9" cy="19" r="1.6" fill="currentColor" />
    <circle cx="17" cy="19" r="1.6" fill="currentColor" />
  </svg>
);

const IconHeart: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 21C12 21 4 14.5 4 9a4 4 0 0 1 8 0 4 4 0 0 1 8 0c0 5.5-8 12-8 12z" />
  </svg>
);

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { cart } = useCart();
  const { wishlist } = useWishlist(); // ✅ use wishlist
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-40">
      {/* Sidebar toggle button */}
      <button
        onClick={toggleSidebar}
        aria-label="Toggle menu"
        className="p-2 rounded-md bg-blue-600 hover:bg-blue-700 transition"
      >
        <IconBars3 className="h-6 w-6 text-white" />
      </button>

      {/* Brand */}
      <Link
        to="/"
        className="text-2xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400"
      >
        MyShop
      </Link>

      <div className="flex items-center gap-6">
        {/* Wishlist ❤️ */}
        <Link to="/wishlist" className="relative" aria-label="Wishlist">
          <IconHeart className="h-6 w-6 text-pink-500" />
          {wishlist.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Cart 🛒 */}
        <Link to="/cart" className="relative" aria-label="Cart">
          <IconCart className="h-7 w-7" />
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
