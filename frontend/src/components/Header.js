import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  FiHome,
  FiFileText,
  FiCalendar,
  FiImage,
  FiUsers,
  FiMessageSquare
} from 'react-icons/fi';


const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close sidebar when route changes
  useEffect(() => {
    setIsSidebarOpen(false);
    setActiveDropdown(null);
  }, [location]);

  // Prevent body scroll when sidebar open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    setIsSidebarOpen(false);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const menuItems = [
  { path: '/', label: 'Home', icon: <FiHome /> },
  { path: '/articles', label: 'Artikel', icon: <FiFileText /> },
  { path: '/events', label: 'Event', icon: <FiCalendar /> },
  { path: '/gallery', label: 'Galeri Foto', icon: <FiImage /> },
  { path: '/clients', label: 'Klien Kami', icon: <FiUsers /> },
];


  return (
    <>
      {/* Header - Optimized with smaller padding */}
      <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-md py-1.5' 
          : 'bg-white py-2'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            {/* Logo & Hamburger */}
            <div className="flex items-center space-x-3">
              {/* Hamburger Menu - Compact */}
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="relative w-9 h-9 flex items-center justify-center rounded-lg hover:bg-blue-50 transition-all duration-300 group"
                aria-label="Toggle Menu"
              >
                <div className="w-5 h-4 flex flex-col justify-between">
                  <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-left ${
                    isSidebarOpen ? 'rotate-45 translate-x-0.5' : ''
                  } group-hover:bg-blue-600`}></span>
                  <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 ${
                    isSidebarOpen ? 'opacity-0 translate-x-4' : ''
                  } group-hover:bg-blue-600`}></span>
                  <span className={`block h-0.5 bg-gray-700 rounded-full transition-all duration-300 origin-left ${
                    isSidebarOpen ? '-rotate-45 translate-x-0.5' : ''
                  } group-hover:bg-blue-600`}></span>
                </div>
              </button>

              {/* Logo - Compact */}
              <Link 
                to="/" 
                className="flex items-center space-x-2 group"
              >
                <div className="w-9 h-9 flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                  <img
                    src="/images/lgk.png"
                    alt="Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Kadilance
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Compact */}
            <nav className="hidden lg:flex items-center space-x-1">
              {[
                { path: '/', label: 'Home' },
                { path: '/about', label: 'About' },
                { path: '/profile', label: 'Profile' },
                { path: '/vision-mission', label: 'Visi & Misi' },
                { path: '/products', label: 'Produk' },
                { path: '/contact', label: 'Kontak' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-3 py-1.5 rounded-lg font-medium transition-all duration-300 group text-sm ${
                    isActive(item.path)
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive(item.path) && (
                    <span className="absolute inset-0 bg-blue-50 rounded-lg animate-fadeIn"></span>
                  )}
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </Link>
              ))}
              
              {user && user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="ml-2 px-3 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:scale-105 transform transition-all duration-300"
                >
                  Admin Panel
                </Link>
              )}
            </nav>

            {/* Right Section - Compact */}
            <div className="flex items-center space-x-2">
              
              {/* User Menu */}
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setActiveDropdown(activeDropdown === 'user' ? null : 'user')}
                    className="flex items-center space-x-2 px-2 py-1.5 rounded-lg hover:bg-gray-100 transition-all duration-300"
                  >
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center transform hover:scale-110 transition-transform duration-300">
                      <span className="text-white font-semibold text-xs">
                        {user.username?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <span className="hidden md:block text-sm font-medium text-gray-700">
                      {user.username}
                    </span>
                    <svg 
                      className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${
                        activeDropdown === 'user' ? 'rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* User Dropdown */}
                  {activeDropdown === 'user' && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 animate-slideDown border border-gray-100">
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-800">{user.username}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      {user.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                        >
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Admin Panel
                          </span>
                        </Link>
                      )}
                      <Link
                        to="/my-testimonials"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
                      >
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          Testimoni Saya
                        </span>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Logout
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-2">
                  <Link
                    to="/login"
                    className="px-3 py-1.5 text-sm text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-all duration-500 ease-out shadow-2xl ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-6 border-b border-gray-100 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg transform hover:rotate-12 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">L</span>
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">Menu</h2>
                  <p className="text-xs text-gray-500">Navigasi Website</p>
                </div>
              </div>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 rounded-lg hover:bg-white/50 transition-all duration-300 group"
              >
                <svg className="w-6 h-6 text-gray-600 group-hover:text-blue-600 group-hover:rotate-90 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* User Info in Sidebar */}
            {user && (
              <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.username?.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{user.username}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            )}
          </div>

          {/* Menu Items */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group animate-slideRight ${
                  isActive(item.path)
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <span className={`text-2xl transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 ${
                  isActive(item.path) ? 'animate-bounce' : ''
                }`}>
                  {item.icon}
                </span>
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                  {item.label}
                </span>
                {isActive(item.path) && (
                  <span className="ml-auto">
                    <svg className="w-5 h-5 animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
              </Link>
            ))}

            {user && (
              <Link
                to="/my-testimonials"
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive('/my-testimonials')
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                    : 'hover:bg-gray-50 text-gray-700'
                }`}
              >
                <FiMessageSquare className="text-2xl transform group-hover:scale-110 transition-all duration-300" />
                <span className="font-medium group-hover:translate-x-1 transition-transform duration-300">
                  Testimoni Saya
                </span>
              </Link>
            )}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            {user ? (
              <>
                {user.role === 'admin' && (
                  <Link
                    to="/admin"
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center space-x-3 px-4 py-3 mb-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="font-semibold">Admin Panel</span>
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center space-x-2 w-full px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-all duration-300 font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="space-y-2">
                <Link
                  to="/login"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-center px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-xl hover:bg-blue-50 transition-all duration-300 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Add custom animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-slideRight {
          animation: slideRight 0.4s ease-out forwards;
        }

        /* Smooth scrollbar for sidebar */
        aside::-webkit-scrollbar {
          width: 6px;
        }

        aside::-webkit-scrollbar-track {
          background: #f1f1f1;
        }

        aside::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        aside::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Glassmorphism effect */
        .backdrop-blur-lg {
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .backdrop-blur-sm {
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
        }
      `}</style>
    </>
  );
};

export default Header;