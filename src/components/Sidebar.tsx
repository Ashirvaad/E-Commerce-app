import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

import {
  ShoppingBagIcon,
  ShoppingCartIcon,
  WalletIcon,
  UserCircleIcon,
  ClipboardDocumentListIcon,
  ArrowRightOnRectangleIcon,
  ArrowLeftOnRectangleIcon,
  UserPlusIcon,
} from "@heroicons/react/24/outline";

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toggleSidebar();
    navigate("/login");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={toggleSidebar} />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 z-30
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex justify-between items-center border-b">
          <h2 className="text-lg font-bold text-blue-600">MyShop</h2>
          <button onClick={toggleSidebar} className="text-gray-600 text-2xl">
            ×
          </button>
        </div>

        <nav className="p-6 flex flex-col space-y-4">
          <Link to="/products" onClick={toggleSidebar} className="flex items-center text-gray-700 hover:text-blue-600">
            <ShoppingBagIcon className="w-5 h-5 mr-2" />
            Products
          </Link>

          <Link to="/cart" onClick={toggleSidebar} className="flex items-center text-gray-700 hover:text-blue-600 relative">
            <ShoppingCartIcon className="w-5 h-5 mr-2" />
            Cart
            {getCartCount() > 0 && (
              <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                {getCartCount()}
              </span>
            )}
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/wallet" onClick={toggleSidebar} className="flex items-center text-gray-700 hover:text-blue-600">
                <WalletIcon className="w-5 h-5 mr-2" />
                Wallet
              </Link>
              <Link to="/profile" onClick={toggleSidebar} className="flex items-center text-gray-700 hover:text-blue-600">
                <UserCircleIcon className="w-5 h-5 mr-2" />
                {user?.name || "Profile"}
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center mt-6 bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 w-full"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5 mr-2 text-white" />
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/orders" onClick={toggleSidebar} className="flex items-center text-gray-700 hover:text-blue-600">
                <ClipboardDocumentListIcon className="w-5 h-5 mr-2" />
                My Orders
              </Link>
              <Link to="/login" onClick={toggleSidebar} className="flex items-center text-gray-700 hover:text-blue-600">
                <ArrowLeftOnRectangleIcon className="w-5 h-5 mr-2" />
                Login
              </Link>
              <Link to="/register" onClick={toggleSidebar} className="flex items-center text-gray-700 hover:text-blue-600">
                <UserPlusIcon className="w-5 h-5 mr-2" />
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
