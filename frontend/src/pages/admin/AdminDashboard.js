import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    articles: 0,
    events: 0,
    gallery: 0,
    clients: 0,
    users: 0
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Quick Action Modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showEventModal, setShowEventModal] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  // Forms data
  const [productData, setProductData] = useState({ name: '', description: '', price: '', category: '', image_url: '' });
  const [articleData, setArticleData] = useState({ title: '', content: '', author: '', image_url: '', external_url: '' });
  const [eventData, setEventData] = useState({ title: '', description: '', event_date: '', location: '', image_url: '', max_participants: 100, registration_deadline: '' });
  const [galleryData, setGalleryData] = useState({ title: '', description: '', image_url: '', category: '' });
  const [clientData, setClientData] = useState({ name: '', description: '', logo_url: '' });
  const [userData, setUserData] = useState({ username: '', email: '', password: '', role: 'user' });

  useEffect(() => {
    fetchDashboardData();
    setIsVisible(true);

    // Intersection Observer untuk animasi scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");
        }
      });
    }, observerOptions);

    setTimeout(() => {
      const animateElements = document.querySelectorAll(".scroll-animate");
      animateElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const [statsRes, activitiesRes] = await Promise.all([
        axios.get('http://localhost:5000/api/admin/stats', config),
        axios.get('http://localhost:5000/api/admin/recent-activities', config)
      ]);

      setStats(statsRes.data);
      setActivities(activitiesRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  // Quick Add Handlers
  const handleQuickAddProduct = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/products', productData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowProductModal(false);
      setProductData({ name: '', description: '', price: '', category: '', image_url: '' });
      fetchDashboardData();
      alert('Produk berhasil ditambahkan!');
    } catch (error) {
      alert('Gagal menambahkan produk');
    }
  };

  const handleQuickAddArticle = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/articles', articleData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowArticleModal(false);
      setArticleData({ title: '', content: '', author: '', image_url: '', external_url: '' });
      fetchDashboardData();
      alert('Artikel berhasil ditambahkan!');
    } catch (error) {
      alert('Gagal menambahkan artikel');
    }
  };

  const handleQuickAddEvent = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/events', eventData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowEventModal(false);
      setEventData({ title: '', description: '', event_date: '', location: '', image_url: '', max_participants: 100, registration_deadline: '' });
      fetchDashboardData();
      alert('Event berhasil ditambahkan!');
    } catch (error) {
      alert('Gagal menambahkan event');
    }
  };

  const handleQuickAddGallery = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/gallery', galleryData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowGalleryModal(false);
      setGalleryData({ title: '', description: '', image_url: '', category: '' });
      fetchDashboardData();
      alert('Foto berhasil ditambahkan!');
    } catch (error) {
      alert('Gagal menambahkan foto');
    }
  };

  const handleQuickAddClient = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/clients', clientData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowClientModal(false);
      setClientData({ name: '', description: '', logo_url: '' });
      fetchDashboardData();
      alert('Klien berhasil ditambahkan!');
    } catch (error) {
      alert('Gagal menambahkan klien');
    }
  };

  const handleQuickAddUser = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://localhost:5000/api/users', userData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setShowUserModal(false);
      setUserData({ username: '', email: '', password: '', role: 'user' });
      fetchDashboardData();
      alert('User berhasil ditambahkan!');
    } catch (error) {
      alert(error.response?.data?.message || 'Gagal menambahkan user');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-xl text-gray-600 font-semibold">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden py-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-1/2 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`,
              }}
            />
          ))}
        </div>

        <div className={`container mx-auto px-4 relative z-10 transition-all duration-1000 transform ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}>
          <div className="max-w-4xl">
            <div className="mb-4 inline-block">
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Admin Dashboard
            </h1>
            <p className="text-lg text-blue-100 mb-6 max-w-2xl">
              Kelola konten website Anda dengan mudah dan efisien
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-8 relative z-10 pb-20">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 scroll-animate">
          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Produk</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">{stats.products}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
            </div>
            <Link to="/admin/products" className="inline-flex items-center text-blue-600 text-sm mt-4 font-semibold hover:gap-2 transition-all group">
              Kelola Produk
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Artikel</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">{stats.articles}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <Link to="/admin/articles" className="inline-flex items-center text-green-600 text-sm mt-4 font-semibold hover:gap-2 transition-all group">
              Kelola Artikel
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Event</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-purple-400 bg-clip-text text-transparent">{stats.events}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <Link to="/admin/events" className="inline-flex items-center text-purple-600 text-sm mt-4 font-semibold hover:gap-2 transition-all group">
              Kelola Event
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Galeri Foto</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">{stats.gallery}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <Link to="/admin/gallery" className="inline-flex items-center text-orange-600 text-sm mt-4 font-semibold hover:gap-2 transition-all group">
              Kelola Galeri
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Klien</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent">{stats.clients}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <Link to="/admin/clients" className="inline-flex items-center text-pink-600 text-sm mt-4 font-semibold hover:gap-2 transition-all group">
              Kelola Klien
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-semibold mb-2">Total Users</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">{stats.users}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <Link to="/admin/users" className="inline-flex items-center text-indigo-600 text-sm mt-4 font-semibold hover:gap-2 transition-all group">
              Kelola Users
              <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8 scroll-animate">
          <div className="mb-6">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Quick Actions</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tambah Konten Baru
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <button 
              onClick={() => setShowProductModal(true)}
              className="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 text-center">Tambah Produk</span>
            </button>

            <button 
              onClick={() => setShowArticleModal(true)}
              className="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-green-500 hover:bg-gradient-to-br hover:from-green-50 hover:to-green-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 text-center">Tambah Artikel</span>
            </button>

            <button 
              onClick={() => setShowEventModal(true)}
              className="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-purple-500 hover:bg-gradient-to-br hover:from-purple-50 hover:to-purple-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 text-center">Tambah Event</span>
            </button>

            <button 
              onClick={() => setShowGalleryModal(true)}
              className="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-orange-500 hover:bg-gradient-to-br hover:from-orange-50 hover:to-orange-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 text-center">Tambah Foto</span>
            </button>

            <button 
              onClick={() => setShowClientModal(true)}
              className="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-pink-500 hover:bg-gradient-to-br hover:from-pink-50 hover:to-pink-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl flex items-center justify-center mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 text-center">Tambah Klien</span>
            </button>

            <button 
              onClick={() => setShowUserModal(true)}
              className="group flex flex-col items-center p-6 border-2 border-dashed border-gray-200 rounded-2xl hover:border-indigo-500 hover:bg-gradient-to-br hover:from-indigo-50 hover:to-indigo-100 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center mb-3 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <span className="text-sm font-semibold text-gray-700 text-center">Tambah User</span>
            </button>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-2xl shadow-lg p-8 scroll-animate">
          <div className="mb-6">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Recent Activities</span>
            <h2 className="text-2xl md:text-3xl font-bold mt-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Aktivitas Terbaru
            </h2>
          </div>
          <div className="space-y-4">
            {activities.length > 0 ? (
              activities.map((activity) => (
                <div key={`${activity.type}-${activity.id}`} className="group flex items-center justify-between p-4 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 border border-transparent hover:border-blue-100">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${
                      activity.type === 'article' ? 'bg-gradient-to-br from-green-500 to-green-600' :
                      activity.type === 'event' ? 'bg-gradient-to-br from-purple-500 to-purple-600' :
                      'bg-gradient-to-br from-blue-500 to-blue-600'
                    }`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">{activity.title}</p>
                      <p className="text-sm text-gray-500">
                        {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)} • 
                        {new Date(activity.created_at).toLocaleDateString('id-ID')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="text-gray-500 font-semibold">Belum ada aktivitas terbaru</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* Product Modal */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setShowProductModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 text-white rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Tambah Produk Baru</h2>
                  <p className="text-blue-100 text-sm mt-1">Tambahkan produk ke katalog Anda</p>
                </div>
                <button
                  onClick={() => setShowProductModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleQuickAddProduct} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Produk <span className="text-red-500">*</span></label>
                  <input type="text" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" value={productData.name} onChange={(e) => setProductData({...productData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                  <textarea rows="3" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all resize-none" value={productData.description} onChange={(e) => setProductData({...productData, description: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Harga</label>
                  <input type="number" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" value={productData.price} onChange={(e) => setProductData({...productData, price: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                  <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" value={productData.category} onChange={(e) => setProductData({...productData, category: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL Gambar</label>
                  <input type="url" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all" value={productData.image_url} onChange={(e) => setProductData({...productData, image_url: e.target.value})} />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={() => setShowProductModal(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">Batal</button>
                  <button type="submit" className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Article Modal */}
      {showArticleModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setShowArticleModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-green-600 to-green-700 p-6 text-white rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Tambah Artikel Baru</h2>
                  <p className="text-green-100 text-sm mt-1">Publikasikan artikel atau berita</p>
                </div>
                <button
                  onClick={() => setShowArticleModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleQuickAddArticle} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul <span className="text-red-500">*</span></label>
                  <input type="text" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all" value={articleData.title} onChange={(e) => setArticleData({...articleData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Konten <span className="text-red-500">*</span></label>
                  <textarea rows="4" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all resize-none" value={articleData.content} onChange={(e) => setArticleData({...articleData, content: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Penulis</label>
                  <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all" value={articleData.author} onChange={(e) => setArticleData({...articleData, author: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL Gambar</label>
                  <input type="url" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all" value={articleData.image_url} onChange={(e) => setArticleData({...articleData, image_url: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">External URL (Optional)</label>
                  <input type="url" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 transition-all" value={articleData.external_url} onChange={(e) => setArticleData({...articleData, external_url: e.target.value})} placeholder="https://example.com" />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={() => setShowArticleModal(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">Batal</button>
                  <button type="submit" className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setShowEventModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 text-white rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Tambah Event Baru</h2>
                  <p className="text-purple-100 text-sm mt-1">Buat event atau acara baru</p>
                </div>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleQuickAddEvent} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul Event <span className="text-red-500">*</span></label>
                  <input type="text" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all" value={eventData.title} onChange={(e) => setEventData({...eventData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                  <textarea rows="3" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all resize-none" value={eventData.description} onChange={(e) => setEventData({...eventData, description: e.target.value})} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Tanggal Event</label>
                    <input type="date" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all" value={eventData.event_date} onChange={(e) => setEventData({...eventData, event_date: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Deadline</label>
                    <input type="date" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all" value={eventData.registration_deadline} onChange={(e) => setEventData({...eventData, registration_deadline: e.target.value})} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Lokasi</label>
                    <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all" value={eventData.location} onChange={(e) => setEventData({...eventData, location: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Max Peserta</label>
                    <input type="number" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all" value={eventData.max_participants} onChange={(e) => setEventData({...eventData, max_participants: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL Gambar</label>
                  <input type="url" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-all" value={eventData.image_url} onChange={(e) => setEventData({...eventData, image_url: e.target.value})} />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={() => setShowEventModal(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">Batal</button>
                  <button type="submit" className="px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setShowGalleryModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-orange-600 to-orange-700 p-6 text-white rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Tambah Foto Baru</h2>
                  <p className="text-orange-100 text-sm mt-1">Tambahkan foto ke galeri</p>
                </div>
                <button
                  onClick={() => setShowGalleryModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleQuickAddGallery} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Judul</label>
                  <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all" value={galleryData.title} onChange={(e) => setGalleryData({...galleryData, title: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                  <textarea rows="2" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all resize-none" value={galleryData.description} onChange={(e) => setGalleryData({...galleryData, description: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Kategori</label>
                  <input type="text" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all" value={galleryData.category} onChange={(e) => setGalleryData({...galleryData, category: e.target.value})} placeholder="Event, Produk, Tim, dll" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL Gambar <span className="text-red-500">*</span></label>
                  <input type="url" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-orange-500 transition-all" value={galleryData.image_url} onChange={(e) => setGalleryData({...galleryData, image_url: e.target.value})} />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={() => setShowGalleryModal(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">Batal</button>
                  <button type="submit" className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Client Modal */}
      {showClientModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setShowClientModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-pink-600 to-pink-700 p-6 text-white rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Tambah Klien Baru</h2>
                  <p className="text-pink-100 text-sm mt-1">Tambahkan klien atau mitra</p>
                </div>
                <button
                  onClick={() => setShowClientModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleQuickAddClient} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Nama Klien <span className="text-red-500">*</span></label>
                  <input type="text" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all" value={clientData.name} onChange={(e) => setClientData({...clientData, name: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Deskripsi</label>
                  <textarea rows="3" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all resize-none" value={clientData.description} onChange={(e) => setClientData({...clientData, description: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">URL Logo</label>
                  <input type="url" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-500 transition-all" value={clientData.logo_url} onChange={(e) => setClientData({...clientData, logo_url: e.target.value})} />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={() => setShowClientModal(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">Batal</button>
                  <button type="submit" className="px-6 py-3 bg-gradient-to-r from-pink-600 to-pink-700 text-white rounded-xl font-semibold hover:from-pink-700 hover:to-pink-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* User Modal */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setShowUserModal(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 p-6 text-white rounded-t-2xl">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">Tambah User Baru</h2>
                  <p className="text-indigo-100 text-sm mt-1">Buat akun pengguna baru</p>
                </div>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6">
              <form onSubmit={handleQuickAddUser} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Username <span className="text-red-500">*</span></label>
                  <input type="text" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-all" value={userData.username} onChange={(e) => setUserData({...userData, username: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Email <span className="text-red-500">*</span></label>
                  <input type="email" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-all" value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Password <span className="text-red-500">*</span></label>
                  <input type="password" required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-all" value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value})} placeholder="Min. 6 karakter" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Role <span className="text-red-500">*</span></label>
                  <select required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500 transition-all" value={userData.role} onChange={(e) => setUserData({...userData, role: e.target.value})}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button type="button" onClick={() => setShowUserModal(false)} className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105">Batal</button>
                  <button type="submit" className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">Simpan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Custom Animations CSS */}
      <style>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .scroll-animate {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .scroll-animate.animate-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }

        html {
          scroll-behavior: smooth;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
          
          .scroll-animate {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;