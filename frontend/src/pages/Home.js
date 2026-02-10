import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCompanyInfo, getProducts, getArticles } from "../services/api";

const Home = () => {
  const [company, setCompany] = useState(null);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchData();
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

    // Observe semua element dengan class 'scroll-animate'
    setTimeout(() => {
      const animateElements = document.querySelectorAll(".scroll-animate");
      animateElements.forEach((el) => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const handleWhatsAppOrder = () => {
    setIsSubmitting(true);

    const message = `Halo, saya ingin memesan:
  
*Produk:* ${selectedProduct.name}
${selectedProduct.price ? `*Harga:* Rp ${Number(selectedProduct.price).toLocaleString("id-ID")}` : ""}

*Detail Pemesan:*
Nama: ${form.name}
No. WhatsApp: ${form.phone}
${form.address ? `Alamat: ${form.address}` : ""}
${form.note ? `\nCatatan: ${form.note}` : ""}`;

    const whatsappUrl = `https://wa.me/6285711562563?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank");

    setTimeout(() => {
      setIsSubmitting(false);
      setSelectedProduct(null);
      setForm({ name: "", phone: "", address: "", note: "" });
    }, 1000);
  };

  const fetchData = async () => {
    try {
      const [companyRes, productsRes, articlesRes] = await Promise.all([
        getCompanyInfo(),
        getProducts(),
        getArticles(),
      ]);
      setCompany(companyRes.data);
      setProducts(productsRes.data.slice(0, 3));
      setArticles(articlesRes.data.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
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
    <div className="overflow-hidden">
      {/* Hero Section - With Background Image */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image Container */}
        <div className="absolute inset-0">
          {/* Background Image - Replace src with your image path */}
          <img
            src="/images/hero-background.jpg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />

          {/* Overlay Gradient for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-blue-800/70 to-purple-900/80"></div>

          {/* Additional dark overlay on mobile for better readability */}
          <div className="absolute inset-0 bg-black/20 md:bg-black/0"></div>
        </div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/4 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-1/2 left-1/3 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
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

        {/* Content */}
        <div
          className={`container mx-auto px-4 text-center relative z-10 text-white transition-all duration-1000 transform ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <div className="mb-6 inline-block"></div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-slideUp drop-shadow-2xl">
            Wujudkan Transformasi Digital {/* DIUBAH */}
            <br />
            <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Bersama Kadilance
            </span>
          </h1>

          <p className="text-lg md:text-xl lg:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto animate-slideUp animation-delay-200 drop-shadow-lg">
            Layanan IT Profesional untuk UMKM, Sekolah, Instansi, dan Perusahaan
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slideUp animation-delay-400">
            <Link
              to="/products"
              className="group bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl inline-flex items-center"
            >
              Lihat Semua Layanan
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>

            <Link
              to="/contact"
              className="group bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 inline-flex items-center"
            >
              Hubungi Kami
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section - New Structure with Original Design */}
      <section className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Section Title - Centered */}
            <div className="text-center mb-16 scroll-animate">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
                Tentang Kami
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Tentang Perusahaan
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Mengenal lebih dekat Kadilance dan perjalanan kami dalam dunia
                teknologi
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center scroll-animate">
              {/* Image Side - Left with Overlapping Grid Design */}
              <div className="relative h-[500px]">
                {/* Overlapping Layout - ALWAYS SHOW IMAGE */}
                <div className="relative h-full">
                  {/* Large Image - Bottom Left */}
                  <div className="absolute bottom-0 left-0 w-3/4 h-4/5 z-10 group">
                    <div className="relative h-full bg-white rounded-2xl shadow-2xl p-2">
                      <div className="relative h-full overflow-hidden rounded-xl">
                        <img
                          src="/images/companyK.png"
                          alt="Kadilance Company Main"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  </div>

                  {/* Small Image - Top Right */}
                  <div className="absolute top-0 right-0 w-1/2 h-3/5 z-20 group">
                    <div className="relative h-full bg-white rounded-2xl shadow-2xl p-2">
                      <div className="relative h-full overflow-hidden rounded-xl">
                        <img
                          src="/images/tim.png"
                          alt="Kadilance Company Secondary"
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Floating Badge */}
                        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl shadow-lg">
                          <div className="flex items-center space-x-2">
                            <div className="relative">
                              <div className="absolute inset-0 bg-green-400 rounded-full blur-sm animate-pulse"></div>
                              <div className="relative w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
                            </div>
                            <div>
                              <p className="text-gray-800 font-bold text-sm">
                                Kadilance
                              </p>
                              <p className="text-gray-500 text-xs">
                                Trusted Partner
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-4 -left-4 w-20 h-20 border-t-4 border-l-4 border-blue-400/60 rounded-tl-3xl z-0"></div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 border-b-4 border-r-4 border-purple-400/60 rounded-br-3xl z-0"></div>
                </div>
              </div>

              {/* Content Side - Right (Original Cards Design) */}
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Inovasi & Kreativitas
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Kami menghadirkan solusi digital yang inovatif dan
                        kreatif untuk membantu bisnis Anda berkembang di era
                        digital.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Tim Profesional
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Didukung oleh tim yang berpengalaman dan profesional
                        dalam bidang teknologi informasi dan pengembangan
                        sistem.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-emerald-600 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 mb-2">
                        Terpercaya & Aman
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        Keamanan dan kepercayaan klien adalah prioritas utama
                        kami dalam setiap project yang dikerjakan.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats Section - Kept from Original */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 scroll-animate">
              <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600 font-semibold">
                  Project Selesai
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  30+
                </div>
                <div className="text-gray-600 font-semibold">Klien Puas</div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl font-bold text-green-600 mb-2">5+</div>
                <div className="text-gray-600 font-semibold">
                  Tahun Pengalaman
                </div>
              </div>
              <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl font-bold text-pink-600 mb-2">
                  24/7
                </div>
                <div className="text-gray-600 font-semibold">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section - Enhanced Cards */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 -mr-48 -mt-48"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full filter blur-3xl opacity-20 -ml-48 -mb-48"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 scroll-animate">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Produk & Layanan Kami
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Solusi Digital Terlengkap
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Berbagai layanan pengembangan website dan aplikasi untuk kebutuhan bisnis Anda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 scroll-animate"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                  {product.image_url ? (
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-20 h-20 text-white opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {product.price && (
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <p className="text-blue-600 font-bold text-xl">
                        Rp {Number(product.price).toLocaleString("id-ID")}
                      </p>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          Pesan
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Order Modal */}
          {selectedProduct && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
              <div
                className="bg-white rounded-2xl w-full max-w-lg shadow-2xl animate-scale-in relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -translate-y-32 translate-x-32 opacity-50"></div>

                {/* Header */}
                <div className="relative z-10 bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-2">Pesan Produk</h2>
                      <p className="text-green-100 text-sm">
                        {selectedProduct.name}
                      </p>
                      {selectedProduct.price && (
                        <div className="mt-3 inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                          <span className="text-white font-bold text-lg">
                            Rp{" "}
                            {Number(selectedProduct.price).toLocaleString(
                              "id-ID",
                            )}
                          </span>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="w-10 h-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Form */}
                <div className="p-6 relative z-10">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleWhatsAppOrder();
                    }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Nama Lengkap <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Masukkan nama lengkap"
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                        onFocus={() => setFocusedField("name")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                          focusedField === "name"
                            ? "border-green-500 shadow-lg shadow-green-100"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                      {focusedField === "name" && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 animate-expand"></div>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        No. WhatsApp <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="08XXX..."
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        required
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none ${
                          focusedField === "phone"
                            ? "border-green-500 shadow-lg shadow-green-100"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                      {focusedField === "phone" && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 animate-expand"></div>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Alamat Pengiriman
                      </label>
                      <textarea
                        placeholder="Alamat lengkap untuk pengiriman (opsional)"
                        value={form.address}
                        onChange={(e) =>
                          setForm({ ...form, address: e.target.value })
                        }
                        onFocus={() => setFocusedField("address")}
                        onBlur={() => setFocusedField(null)}
                        rows="2"
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none resize-none ${
                          focusedField === "address"
                            ? "border-green-500 shadow-lg shadow-green-100"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                      {focusedField === "address" && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 animate-expand"></div>
                      )}
                    </div>

                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Catatan Pesanan
                      </label>
                      <textarea
                        placeholder="Tambahkan catatan untuk pesanan Anda (opsional)"
                        value={form.note}
                        onChange={(e) =>
                          setForm({ ...form, note: e.target.value })
                        }
                        onFocus={() => setFocusedField("note")}
                        onBlur={() => setFocusedField(null)}
                        rows="3"
                        className={`w-full px-4 py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none resize-none ${
                          focusedField === "note"
                            ? "border-green-500 shadow-lg shadow-green-100"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      />
                      {focusedField === "note" && (
                        <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 animate-expand"></div>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 pt-4">
                      <button
                        type="button"
                        onClick={() => setSelectedProduct(null)}
                        className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin h-5 w-5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Mengirim...
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-5 h-5"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                            </svg>
                            Kirim ke WhatsApp
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          <div className="text-center mt-12 scroll-animate">
            <Link
              to="/products"
              className="group inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg"
            >
              Lihat Semua Produk & Layanan
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Section - Modern Blog Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 scroll-animate">
            <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">
              Insight & Tutorial
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Tips & Artikel Seputar IT
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Update terbaru seputar teknologi, web development, dan digital marketing
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, index) => (
              <article
                key={article.id}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 scroll-animate"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="relative h-56 bg-gradient-to-br from-blue-400 to-purple-500 overflow-hidden">
                  {article.image_url ? (
                    <img
                      src={article.image_url}
                      alt={article.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg
                        className="w-20 h-20 text-white opacity-50"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-600 px-3 py-1 rounded-full text-xs font-semibold">
                      Artikel
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.content}
                  </p>

                  {article.external_url ? (
                    <a
                      href={article.external_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group-hover:gap-2 transition-all"
                    >
                      Baca Selengkapnya
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      to={`/articles/${article.id}`}
                      className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold group-hover:gap-2 transition-all"
                    >
                      Baca Selengkapnya
                      <svg
                        className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>

          <div className="text-center mt-12 scroll-animate">
            <Link
              to="/articles"
              className="group inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-lg"
            >
              Lihat Semua Artikel
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-2 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 scroll-animate">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 text-center shadow-2xl">
            <span className="inline-block mb-6 px-4 py-2 bg-white/20 text-white rounded-full font-semibold border border-white/30">
              Mari Bekerja Sama
            </span>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              Siap Mengembangkan Bisnis Anda
              <br />
              dengan Teknologi?
            </h2>

            <p className="text-lg text-blue-100 mb-10 max-w-2xl mx-auto">
              Konsultasikan kebutuhan sistem, website, dan digitalisasi Anda
              bersama tim profesional Kadilance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Hubungi Sekarang
              </Link>

              <Link
                to="/products"
                className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                Lihat Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Animations CSS */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

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

        /* Scroll animations */
        .scroll-animate {
          opacity: 0;
          transform: translateY(50px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }

        .scroll-animate.animate-visible {
          opacity: 1;
          transform: translateY(0);
        }

        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-slideUp {
          animation: slideUp 1s ease-out forwards;
          opacity: 0;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-300 {
          animation-delay: 300ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 40px 40px;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Smooth scroll */
        html {
          scroll-behavior: smooth;
        }

        /* Remove animation on mobile for better performance */
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

export default Home;
