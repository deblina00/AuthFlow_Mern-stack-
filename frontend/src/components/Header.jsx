import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import useAuthStore from "../store/authStore";

const Header = () => {
  const navigate = useNavigate();
  const { role, logout } = useAuthStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-[#0f172a]/80 backdrop-blur-md text-white px-4 md:px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-bold">
          <Link to={role === "admin" ? "/products" : "/"}>AuthFlow</Link>
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6 relative">
          <Link
            to="/products"
            className="hover:text-[#DA9B2B] transition duration-200"
          >
            All Products
          </Link>
          {role === "admin" && (
            <Link
              to="/products/add"
              className="hover:text-[#DA9B2B] transition duration-200"
            >
              Add Product
            </Link>
          )}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="relative bg-white text-[#0f172a] px-3 py-1 rounded-md font-medium hover:bg-gray-100"
            >
              Settings
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white text-black rounded-md shadow-lg z-50">
                <Link
                  to="/profile"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-[#f3f4f6]"
                >
                  My Profile
                </Link>
                <Link
                  to="/change-password"
                  onClick={() => setDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-[#f3f4f6]"
                >
                  Update Password
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-[#f3f4f6]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden mt-4 space-y-3">
          <Link
            to="/products"
            onClick={() => setMenuOpen(false)}
            className="block px-2 py-1 hover:text-[#DA9B2B]"
          >
            All Products
          </Link>
          {role === "admin" && (
            <Link
              to="/products/add"
              onClick={() => setMenuOpen(false)}
              className="block px-2 py-1 hover:text-[#DA9B2B]"
            >
              Add Product
            </Link>
          )}
          <Link
            to="/profile"
            onClick={() => setMenuOpen(false)}
            className="block px-2 py-1 hover:text-[#DA9B2B]"
          >
            My Profile
          </Link>
          <Link
            to="/change-password"
            onClick={() => setMenuOpen(false)}
            className="block px-2 py-1 hover:text-[#DA9B2B]"
          >
            Update Password
          </Link>
          <button
            onClick={() => {
              handleLogout();
              setMenuOpen(false);
            }}
            className="block w-full text-left px-2 py-1 text-red-400 hover:text-red-500"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
