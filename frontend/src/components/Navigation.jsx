import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, User, Menu, X } from "lucide-react";
import useAuth from "../hooks/useAuth";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);

  const location = useLocation();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(e.target)
      ) {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">StayFinder</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {["/", "/explore", "/dashboard"].map((path) => (
              <Link
                key={path}
                to={path}
                className={`text-sm font-medium transition-colors ${
                  isActive(path)
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                {path === "/"
                  ? "Home"
                  : path.replace("/", "").replace("-", " ")}
              </Link>
            ))}

            {user?.isHost && (
              <Link
                to="/host-dashboard"
                className={`text-sm font-medium transition-colors ${
                  isActive("/host-dashboard")
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Host Dashboard
              </Link>
            )}

            {user ? (
              <div className="relative" ref={profileMenuRef}>
                <button
                  aria-haspopup="true"
                  aria-expanded={isProfileMenuOpen}
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                >
                  <User className="w-4 h-4 text-blue-600" />
                </button>

                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-2 z-50 transition transform origin-top-right scale-95 duration-100 ease-out">
                    <p className="px-4 py-2 text-sm text-gray-700">
                      {user?.name}
                    </p>
                    <Link
                      to="/profile"
                      className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              {["/", "/explore", "/dashboard"].map((path) => (
                <Link
                  key={path}
                  to={path}
                  className={`transition-colors ${
                    isActive(path)
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  {path === "/"
                    ? "Home"
                    : path.replace("/", "").replace("-", " ")}
                </Link>
              ))}

              {user?.isHost && (
                <Link
                  to="/host-dashboard"
                  className={`transition-colors ${
                    isActive("/host-dashboard")
                      ? "text-blue-600"
                      : "text-gray-700 hover:text-blue-600"
                  }`}
                >
                  Host Dashboard
                </Link>
              )}

              {user ? (
                <>
                  <Link
                    to="/profile"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={logout}
                    className="text-left text-red-500 px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t border-gray-100">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
