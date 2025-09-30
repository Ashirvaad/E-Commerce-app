import { Link } from "react-router-dom";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTwitter,
} from "@tabler/icons-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 mt-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-xl font-extrabold tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            MyShop
          </h2>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} MyShop. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <ul className="flex gap-6 text-sm">
          <li>
            <Link
              to="/"
              className="hover:text-blue-400 transition"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="hover:text-blue-400 transition"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/profile"
              className="hover:text-blue-400 transition"
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/checkout"
              className="hover:text-blue-400 transition"
            >
              Checkout
            </Link>
          </li>
        </ul>

        {/* Social Media */}
        <div className="flex gap-4">
          <a href="#" aria-label="Facebook">
            <IconBrandFacebook className="h-5 w-5 text-gray-400 hover:text-blue-500 transition" />
          </a>
          <a href="#" aria-label="Instagram">
            <IconBrandInstagram className="h-5 w-5 text-gray-400 hover:text-pink-500 transition" />
          </a>
          <a href="#" aria-label="Twitter">
            <IconBrandTwitter className="h-5 w-5 text-gray-400 hover:text-sky-400 transition" />
          </a>
        </div>
      </div>
    </footer>
  );
}
