import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import logo from '../assets/logo.png'; // ✅ Place logo inside src/assets/

export default function Navbar() {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isAdminMenuOpen) setIsAdminMenuOpen(false);
  };

  const toggleAdminMenu = () => {
    setIsAdminMenuOpen(!isAdminMenuOpen);
  };

  const closeAllMenus = () => {
    setIsMenuOpen(false);
    setIsAdminMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and mobile menu button */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex-shrink-0 flex items-center space-x-2"
              onClick={closeAllMenus}
            >
              <img
                src={logo}
                alt="UK Tours Logo"
                className="h-10 w-auto"
              />
              <span className="text-2xl font-bold text-blue-600 hidden sm:block">
                UK Tours
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden md:ml-6 md:flex md:items-center md:space-x-1">
              <NavLink
                to="/tours"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                Tours
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                Contact
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`
                }
              >
                About
              </NavLink>

              {/* Admin dropdown */}
              {user?.role === 'admin' && (
                <div className="relative">
                  <button
                    onClick={toggleAdminMenu}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                      isAdminMenuOpen
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`}
                  >
                    <span>Admin</span>
                    <svg
                      className={`ml-1 h-4 w-4 transition-transform duration-200 ${
                        isAdminMenuOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {isAdminMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <NavLink
                          to="/admin/tours"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeAllMenus}
                        >
                          Manage Tours
                        </NavLink>
                        <NavLink
                          to="/admin/bookings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeAllMenus}
                        >
                          Bookings
                        </NavLink>
                        <NavLink
                          to="/admin/media"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={closeAllMenus}
                        >
                          Home Media
                        </NavLink>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Desktop auth buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {!user ? (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 shadow-sm"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">
                  Welcome, {user.name || user.email}
                </span>
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <NavLink
              to="/tours"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={closeAllMenus}
            >
              Tours
            </NavLink>
            <NavLink
              to="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={closeAllMenus}
            >
              Contact
            </NavLink>
            <NavLink
              to="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
              onClick={closeAllMenus}
            >
              About
            </NavLink>

            {user?.role === 'admin' && (
              <>
                <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Admin Panel
                </div>
                <NavLink
                  to="/admin/tours"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeAllMenus}
                >
                  Manage Tours
                </NavLink>
                <NavLink
                  to="/admin/bookings"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeAllMenus}
                >
                  Bookings
                </NavLink>
                <NavLink
                  to="/admin/media"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  onClick={closeAllMenus}
                >
                  Home Media
                </NavLink>
              </>
            )}

            <div className="pt-4 pb-2 border-t border-gray-200">
              {!user ? (
                <>
                  <NavLink
                    to="/login"
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100 mb-2"
                    onClick={closeAllMenus}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/register"
                    className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 text-center shadow-sm"
                    onClick={closeAllMenus}
                  >
                    Register
                  </NavLink>
                </>
              ) : (
                <>
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Signed in as{' '}
                    <span className="font-medium text-gray-700">
                      {user.name || user.email}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      closeAllMenus();
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
