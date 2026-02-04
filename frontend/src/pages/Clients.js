import React, { useState, useEffect } from 'react';
import { getClients } from '../services/api';

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchClients = async () => {
    try {
      const response = await getClients();
      setClients(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching clients:', error);
      setLoading(false);
    }
  };

  const testimonials = [
    {
      id: 1,
      name: "Ahmad Rizki",
      position: "CEO",
      company: "PT ABC",
      avatar: "A",
      color: "blue",
      text: "Pelayanan yang sangat memuaskan dan profesional. Tim mereka sangat responsif dan selalu memberikan solusi terbaik untuk kebutuhan bisnis kami."
    },
    {
      id: 2,
      name: "Siti Nurhaliza",
      position: "Manager",
      company: "CV XYZ",
      avatar: "S",
      color: "green",
      text: "Produk berkualitas dengan harga yang kompetitif. Implementasi berjalan lancar dan hasilnya melebihi ekspektasi kami. Pasti akan kembali lagi!"
    },
    {
      id: 3,
      name: "Budi Santoso",
      position: "Owner",
      company: "Toko Maju",
      avatar: "B",
      color: "purple",
      text: "Tim yang responsif dan solusi yang tepat sasaran. Mereka benar-benar memahami kebutuhan bisnis dan memberikan hasil yang luar biasa!"
    }
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-200 rounded-full animate-ping"></div>
            <div className="absolute top-0 left-0 w-full h-full border-4 border-t-blue-600 border-r-blue-600 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-xl text-gray-700 font-medium">Memuat data klien...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-sm font-semibold tracking-wide uppercase">
              Trusted Partners
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-slide-down">
            Klien Kami
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Kami bangga telah bekerja sama dengan berbagai perusahaan dan organisasi terkemuka dalam memberikan solusi teknologi yang inovatif dan terpercaya
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
          <div className="group bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold mb-3 animate-count-up">{clients.length}+</div>
              <div className="text-lg font-medium opacity-90">Klien Aktif</div>
              <div className="mt-4 w-16 h-1 bg-white/30 mx-auto rounded-full"></div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up relative overflow-hidden" style={{ animationDelay: '100ms' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold mb-3">98%</div>
              <div className="text-lg font-medium opacity-90">Kepuasan Klien</div>
              <div className="mt-4 w-16 h-1 bg-white/30 mx-auto rounded-full"></div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl p-8 text-center shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up relative overflow-hidden" style={{ animationDelay: '200ms' }}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>
            <div className="relative z-10">
              <div className="text-5xl font-bold mb-3">5+</div>
              <div className="text-lg font-medium opacity-90">Tahun Kemitraan</div>
              <div className="mt-4 w-16 h-1 bg-white/30 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Clients Grid */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Partner Terpercaya Kami
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {clients.map((client, index) => (
              <div 
                key={client.id} 
                className="group bg-white rounded-2xl shadow-lg p-6 flex items-center justify-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Decorative Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="text-center relative z-10">
                  <div className="w-24 h-24 mx-auto mb-3 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-500 shadow-md group-hover:shadow-lg transform group-hover:rotate-6">
                    {client.logo_url ? (
                      <img 
                        src={client.logo_url} 
                        alt={client.name} 
                        className="w-20 h-20 object-contain transition-transform duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <span className="text-3xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        {client.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-gray-800 text-sm group-hover:text-blue-600 transition-colors duration-300">
                    {client.name}
                  </h3>
                </div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </div>
            ))}
          </div>
        </div>

        {clients.length === 0 && (
          <div className="text-center py-20 animate-fade-in">
            <div className="max-w-md mx-auto">
              <div className="w-32 h-32 mx-auto mb-8 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center">
                <svg className="w-16 h-16 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Belum Ada Klien</h3>
              <p className="text-gray-600 text-lg leading-relaxed">
                Saat ini belum ada klien terdaftar dalam sistem kami.
              </p>
            </div>
          </div>
        )}

        {/* Testimonials Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Testimoni Klien
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dengarkan langsung dari klien kami yang puas dengan layanan dan solusi yang kami berikan
            </p>
          </div>

          {/* Desktop View - All Cards */}
          <div className="hidden lg:grid grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div 
                key={testimonial.id}
                className="group bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up relative overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                  <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Stars */}
                <div className="flex items-center mb-4 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <svg 
                      key={i} 
                      className="w-5 h-5 text-yellow-400 transform group-hover:scale-110 transition-transform duration-300"
                      style={{ transitionDelay: `${i * 50}ms` }}
                      fill="currentColor" 
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>

                {/* Testimonial Text */}
                <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Author */}
                <div className="flex items-center relative z-10">
                  <div className={`w-12 h-12 bg-gradient-to-br from-${testimonial.color}-500 to-${testimonial.color}-600 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.position}, {testimonial.company}</div>
                  </div>
                </div>

                {/* Bottom Accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-${testimonial.color}-500 to-${testimonial.color}-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet View - Carousel */}
          <div className="lg:hidden max-w-2xl mx-auto relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-700 ease-in-out"
                style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}
              >
                {testimonials.map((testimonial) => (
                  <div 
                    key={testimonial.id}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="bg-white rounded-2xl shadow-lg p-8 relative overflow-hidden">
                      {/* Quote Icon */}
                      <div className="absolute top-6 right-6 opacity-10">
                        <svg className="w-16 h-16 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center mb-4 space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      <p className="text-gray-600 mb-6 leading-relaxed relative z-10">
                        "{testimonial.text}"
                      </p>

                      <div className="flex items-center relative z-10">
                        <div className={`w-12 h-12 bg-gradient-to-br from-${testimonial.color}-500 to-${testimonial.color}-600 rounded-full flex items-center justify-center text-white font-bold mr-4 shadow-lg`}>
                          {testimonial.avatar}
                        </div>
                        <div>
                          <div className="font-bold text-gray-800">{testimonial.name}</div>
                          <div className="text-sm text-gray-500">{testimonial.position}, {testimonial.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center mt-6 space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeTestimonial === index 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes count-up {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-slide-down {
          animation: slide-down 0.8s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out both;
        }

        .animate-count-up {
          animation: count-up 0.8s ease-out 0.3s both;
        }
      `}</style>
    </div>
  );
};

export default Clients;