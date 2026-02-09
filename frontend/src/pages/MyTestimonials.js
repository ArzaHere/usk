import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState({
    id: null,
    name: '',
    position: '',
    company: '',
    content: '',
    rating: 5,
    image_url: ''
  });

  useEffect(() => {
    fetchMyTestimonials();
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

  const fetchMyTestimonials = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/testimonials/my/list', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTestimonials(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setCurrentTestimonial({
      ...currentTestimonial,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };

    try {
      if (editMode) {
        await axios.put(
          `http://localhost:5000/api/testimonials/${currentTestimonial.id}`,
          currentTestimonial,
          config
        );
      } else {
        await axios.post('http://localhost:5000/api/testimonials', currentTestimonial, config);
      }
      setShowModal(false);
      resetForm();
      fetchMyTestimonials();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      alert('Gagal menyimpan testimoni');
    }
  };

  const handleEdit = (testimonial) => {
    setCurrentTestimonial(testimonial);
    setEditMode(true);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus testimoni ini?')) {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      try {
        await axios.delete(`http://localhost:5000/api/testimonials/${id}`, config);
        fetchMyTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        alert('Gagal menghapus testimoni');
      }
    }
  };

  const resetForm = () => {
    setCurrentTestimonial({
      id: null,
      name: '',
      position: '',
      company: '',
      content: '',
      rating: 5,
      image_url: ''
    });
    setEditMode(false);
  };

  const openAddModal = () => {
    resetForm();
    setShowModal(true);
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <svg
        key={index}
        className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-200 rounded-full"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-600 rounded-full border-t-transparent animate-spin"></div>
          </div>
          <p className="text-xl text-gray-600 font-semibold">Memuat...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white overflow-hidden py-16">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-1/2 left-1/3 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
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
          <div className="flex justify-between items-start">
            <div className="max-w-2xl">
              <div className="mb-4 inline-block">
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Kelola Testimoni Anda
              </h1>
              <p className="text-lg text-blue-100 mb-6">
                Buat dan kelola testimoni Anda dengan mudah
              </p>
            </div>
            <div className="hidden md:flex flex-col space-y-3">
              <Link
                to="/"
                className="group px-6 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Kembali ke Home
              </Link>
              <button
                onClick={openAddModal}
                className="px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tambah Testimoni
              </button>
            </div>
          </div>

          {/* Mobile buttons */}
          <div className="md:hidden flex space-x-3 mt-6">
            <Link
              to="/user"
              className="flex-1 px-4 py-3 bg-white/10 backdrop-blur-sm border-2 border-white/20 text-white rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all text-center"
            >
              ← Kembali
            </Link>
            <button
              onClick={openAddModal}
              className="flex-1 px-4 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all"
            >
              + Tambah
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <div className="container mx-auto px-4 -mt-8 relative z-10 pb-20">
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 scroll-animate"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="p-6">
                  {/* Header with avatar and info */}
                  <div className="flex items-start mb-4">
                    {testimonial.image_url ? (
                      <img 
                        src={testimonial.image_url} 
                        alt={testimonial.name} 
                        className="w-14 h-14 rounded-full object-cover mr-4 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all" 
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center mr-4 ring-4 ring-blue-100 group-hover:ring-blue-200 transition-all shadow-lg">
                        <span className="text-white font-bold text-xl">
                          {testimonial.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 text-lg truncate group-hover:text-blue-600 transition-colors">
                        {testimonial.name}
                      </h3>
                      {testimonial.position && (
                        <p className="text-sm text-gray-600 font-medium truncate">
                          {testimonial.position}
                        </p>
                      )}
                      {testimonial.company && (
                        <p className="text-sm text-gray-500 truncate">
                          {testimonial.company}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Rating stars */}
                  <div className="flex mb-4">
                    {renderStars(testimonial.rating)}
                  </div>
                  
                  {/* Testimonial content */}
                  <div className="mb-4">
                    <p className="text-gray-700 leading-relaxed line-clamp-4">
                      "{testimonial.content}"
                    </p>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex space-x-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleEdit(testimonial)}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105 text-sm font-semibold inline-flex items-center justify-center shadow-md"
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(testimonial.id)}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl hover:from-red-700 hover:to-red-800 transition-all duration-300 transform hover:scale-105 text-sm font-semibold inline-flex items-center justify-center shadow-md"
                    >
                      <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Hapus
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center scroll-animate">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">Belum Ada Testimoni</h3>
              <p className="text-gray-600 mb-6">Mulai dengan menambahkan testimoni pertama Anda</p>
              <button
                onClick={openAddModal}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Tambah Testimoni Pertama
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => { setShowModal(false); resetForm(); }}>
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-6 text-white rounded-t-2xl sticky top-0 z-10">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold">
                    {editMode ? 'Edit Testimoni' : 'Tambah Testimoni Baru'}
                  </h2>
                  <p className="text-blue-100 text-sm mt-1">
                    {editMode ? 'Perbarui informasi testimoni' : 'Tambahkan testimoni baru'}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={currentTestimonial.name}
                    onChange={handleInputChange}
                    required
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Posisi
                  </label>
                  <input
                    type="text"
                    name="position"
                    value={currentTestimonial.position}
                    onChange={handleInputChange}
                    placeholder="Contoh: CEO, Marketing Manager"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Perusahaan
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={currentTestimonial.company}
                    onChange={handleInputChange}
                    placeholder="Nama perusahaan"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Testimoni <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="content"
                    value={currentTestimonial.content}
                    onChange={handleInputChange}
                    required
                    rows="4"
                    placeholder="Tulis testimoni di sini..."
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rating <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="rating"
                    value={currentTestimonial.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all bg-white"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ (5 - Sempurna)</option>
                    <option value="4">⭐⭐⭐⭐ (4 - Sangat Baik)</option>
                    <option value="3">⭐⭐⭐ (3 - Baik)</option>
                    <option value="2">⭐⭐ (2 - Cukup)</option>
                    <option value="1">⭐ (1 - Kurang)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    URL Foto Profil
                  </label>
                  <input
                    type="url"
                    name="image_url"
                    value={currentTestimonial.image_url}
                    onChange={handleInputChange}
                    placeholder="https://example.com/photo.jpg"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-all"
                  />
                  {currentTestimonial.image_url && (
                    <div className="mt-3 rounded-xl overflow-hidden border-2 border-gray-200">
                      <img 
                        src={currentTestimonial.image_url} 
                        alt="Preview" 
                        className="w-full h-48 object-cover" 
                      />
                    </div>
                  )}
                </div>

                <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    {editMode ? 'Update Testimoni' : 'Simpan Testimoni'}
                  </button>
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

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
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

export default MyTestimonials;