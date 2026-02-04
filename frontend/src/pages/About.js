import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  useEffect(() => {
    // Intersection Observer untuk animasi scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-visible');
        }
      });
    }, observerOptions);

    // Observe semua element dengan class 'scroll-animate'
    setTimeout(() => {
      const animateElements = document.querySelectorAll('.scroll-animate');
      animateElements.forEach(el => observer.observe(el));
    }, 100);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Solusi Terpercaya",
      description: "Setiap solusi dirancang dengan standar kualitas tinggi dan pendekatan yang terukur",
      color: "blue"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Efisiensi & Nilai",
      description: "Pendekatan yang efisien untuk memberikan nilai maksimal bagi investasi teknologi Anda",
      color: "green"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Tim Berpengalaman",
      description: "Didukung oleh tenaga profesional dengan keahlian di berbagai bidang teknologi",
      color: "purple"
    }
  ];

  const team = [
    { 
      role: "Chief Executive Officer", 
      subtitle: "Strategic Leadership", 
      initial: "C", 
      color: "from-blue-400 to-blue-600",
      iconColor: "text-blue-600"
    },
    { 
      role: "Chief Operating Officer", 
      subtitle: "Operational Excellence", 
      initial: "O", 
      color: "from-green-400 to-green-600",
      iconColor: "text-green-600"
    },
    { 
      role: "Chief Technology Officer", 
      subtitle: "Technology & Innovation", 
      initial: "T", 
      color: "from-purple-400 to-purple-600",
      iconColor: "text-purple-600"
    },
    { 
      role: "Chief Financial Officer", 
      subtitle: "Financial Management", 
      initial: "F", 
      color: "from-orange-400 to-orange-600",
      iconColor: "text-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block mb-4 animate-fadeIn">
              <span className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold border border-white/20">
                About Us
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-slideUp">
              Tentang Kami
            </h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto animate-slideUp animation-delay-200">
              Mengenal lebih dekat perusahaan teknologi kami, nilai profesional yang kami pegang,
              serta komitmen kami dalam menghadirkan solusi digital yang andal
            </p>
          </div>
        </div>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg className="relative block w-full h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f9fafb"></path>
          </svg>
        </div>
      </section>

      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-6xl mx-auto">
          {/* Company Story */}
          <section className="mb-20 scroll-animate">
            <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Profil Perusahaan
                </h2>
              </div>
              
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p className="text-lg">
                  Kami merupakan perusahaan di bidang <span className="font-semibold text-gray-800">Teknologi Informasi</span> yang didirikan dengan tujuan
                  memberikan solusi digital yang efektif, aman, dan berkelanjutan bagi berbagai kebutuhan bisnis.
                  Fokus utama kami adalah membantu klien beradaptasi dan berkembang di era transformasi digital.
                </p>
                <p className="text-lg">
                  Dengan memanfaatkan teknologi modern serta praktik terbaik industri, kami menghadirkan
                  layanan yang mencakup pengembangan sistem, integrasi teknologi, serta solusi berbasis kebutuhan klien.
                  Setiap solusi dirancang secara strategis untuk memberikan nilai jangka panjang.
                </p>
                <p className="text-lg">
                  Kami berkomitmen untuk menjaga standar <span className="font-semibold text-gray-800">profesionalisme, kualitas, dan kepercayaan</span> dalam setiap kerja sama, serta terus berinovasi untuk menjawab tantangan teknologi yang terus berkembang.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-10 pt-8 border-t border-gray-200">
                <div className="text-center group scroll-animate">
                  <div className="text-4xl font-bold text-blue-600 mb-2 group-hover:scale-110 transition-transform">10+</div>
                  <div className="text-sm text-gray-600">Tahun Pengalaman</div>
                </div>
                <div className="text-center group scroll-animate">
                  <div className="text-4xl font-bold text-purple-600 mb-2 group-hover:scale-110 transition-transform">500+</div>
                  <div className="text-sm text-gray-600">Proyek Selesai</div>
                </div>
                <div className="text-center group scroll-animate">
                  <div className="text-4xl font-bold text-pink-600 mb-2 group-hover:scale-110 transition-transform">100+</div>
                  <div className="text-sm text-gray-600">Klien Puas</div>
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-20">
            <div className="text-center mb-12 scroll-animate">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Keunggulan Kami</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mengapa Memilih Kami?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Komitmen kami untuk memberikan layanan terbaik
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100 scroll-animate"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`w-16 h-16 bg-${feature.color}-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-${feature.color}-600 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Our Team */}
          <section className="mb-20">
            <div className="text-center mb-12 scroll-animate">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Tim Kami</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Manajemen & Tim Inti
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Dipimpin oleh profesional berpengalaman di bidangnya
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div 
                  key={index}
                  className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 scroll-animate"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`relative h-56 bg-gradient-to-br ${member.color} flex items-center justify-center overflow-hidden`}>
                    {/* Decorative circles */}
                    <div className="absolute inset-0">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full opacity-10 -mr-16 -mt-16"></div>
                      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full opacity-10 -ml-12 -mb-12"></div>
                    </div>
                    
                    <div className="relative w-24 h-24 bg-white rounded-full flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl">
                      <span className={`text-5xl font-bold ${member.iconColor}`}>{member.initial}</span>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-1 text-gray-800 group-hover:text-blue-600 transition-colors">
                      {member.role}
                    </h3>
                    <p className="text-gray-600 text-sm">{member.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Awards & Certifications */}
          <section className="mb-20">
            <div className="text-center mb-12 scroll-animate">
              <span className="text-blue-600 font-semibold text-sm uppercase tracking-wider">Pencapaian</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Pengakuan & Sertifikasi
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Penghargaan yang kami raih sebagai bukti komitmen kualitas
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item, index) => (
                <div 
                  key={item} 
                  className="group bg-white rounded-2xl shadow-lg p-8 flex items-center justify-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 scroll-animate"
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold text-gray-800 mb-1">Professional Recognition</p>
                    <p className="text-xs text-gray-600">Technology Industry</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="scroll-animate">
            <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-12 md:p-16 text-center overflow-hidden shadow-2xl">
              {/* Animated background */}
              <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-yellow-200 rounded-full mix-blend-overlay filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
              </div>

              <div className="relative z-10">
                <div className="inline-block mb-4">
                  <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/30">
                    Mari Berkolaborasi
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                  Siap Berkolaborasi dengan Kami?
                </h2>
                <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
                  Kami siap menjadi mitra teknologi Anda dalam mewujudkan solusi digital yang efektif
                </p>
                <Link 
                  to="/contact" 
                  className="group inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  Hubungi Kami
                  <svg className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="py-12"></div>

      {/* Custom Animations CSS */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
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

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }

        .animate-slideUp {
          animation: slideUp 1s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
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

export default About;