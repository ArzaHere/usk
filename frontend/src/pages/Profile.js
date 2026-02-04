import React, { useState, useEffect } from 'react';
import { getCompanyInfo } from '../services/api';

const Profile = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const fetchCompanyInfo = async () => {
    try {
      const response = await getCompanyInfo();
      setCompany(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching company info:', error);
      setLoading(false);
    }
  };

  const stats = [
    {
      id: 1,
      value: '10+',
      label: 'Tahun Pengalaman',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      gradient: 'from-blue-500 to-blue-600',
      delay: '0ms'
    },
    {
      id: 2,
      value: '500+',
      label: 'Klien Puas',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      gradient: 'from-green-500 to-emerald-600',
      delay: '100ms'
    },
    {
      id: 3,
      value: '100+',
      label: 'Proyek Selesai',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      gradient: 'from-purple-500 to-purple-600',
      delay: '200ms'
    },
    {
      id: 4,
      value: '24/7',
      label: 'Support Available',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      gradient: 'from-orange-500 to-orange-600',
      delay: '300ms'
    }
  ];

  const values = [
    {
      id: 1,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: 'Integritas',
      description: 'Kami menjunjung tinggi kejujuran dan transparansi dalam setiap aspek bisnis',
      color: 'blue'
    },
    {
      id: 2,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: 'Inovasi',
      description: 'Selalu menghadirkan solusi kreatif dan teknologi terkini untuk pelanggan',
      color: 'purple'
    },
    {
      id: 3,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
      title: 'Kolaborasi',
      description: 'Membangun kemitraan yang kuat dengan semua stakeholder',
      color: 'green'
    },
    {
      id: 4,
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      ),
      title: 'Keunggulan',
      description: 'Berkomitmen memberikan kualitas terbaik dalam setiap layanan',
      color: 'orange'
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
          <p className="text-xl text-gray-700 font-medium">Memuat profil...</p>
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
              About Us
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6 animate-slide-down">
            Profile Perusahaan
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed animate-slide-up">
            Mengenal lebih dekat tentang perjalanan, visi, dan nilai-nilai yang kami junjung tinggi
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Company Logo & Name */}
          <div className="text-center mb-16 animate-fade-in-up">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-2xl opacity-30 animate-pulse"></div>

              <div className="relative w-40 h-40 rounded-full flex items-center justify-center mx-auto shadow-2xl transform hover:scale-110 transition-transform duration-500 overflow-hidden">
                <img
                  src="/images/lgk.png"
                  alt="Kadilance Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-2">
              Kadilance
            </h2>
            <p className="text-gray-600 text-lg">
              Solusi Teknologi Terpercaya
            </p>
          </div>

          {/* Tabs Navigation */}
          <div className="flex justify-center mb-12 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <div className="inline-flex bg-white rounded-2xl shadow-lg p-2 space-x-2">
              {[
                { id: 'about', label: 'Tentang Kami'},
                { id: 'contact', label: 'Kontak'},
                { id: 'history', label: 'Sejarah'},
                { id: 'team', label: 'Tim',}
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg scale-105'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{tab.icon}</span>
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-16 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            {activeTab === 'about' && (
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white mr-4">
                    📖
                  </span>
                  Tentang Perusahaan
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-6">
                  Kami adalah perusahaan yang bergerak di bidang teknologi dan inovasi, 
                  berkomitmen untuk memberikan solusi terbaik bagi pelanggan kami. Dengan 
                  pengalaman bertahun-tahun, kami telah membantu ratusan klien mencapai 
                  tujuan bisnis mereka melalui teknologi yang tepat dan layanan yang profesional.
                </p>
                <p className="text-gray-600 leading-relaxed text-lg">
                  Kami percaya bahwa setiap bisnis memiliki kebutuhan yang unik, dan itulah 
                  mengapa kami menyediakan solusi yang disesuaikan dengan kebutuhan spesifik 
                  setiap klien. Tim ahli kami siap membantu Anda dari konsultasi awal hingga 
                  implementasi dan dukungan berkelanjutan.
                </p>
              </div>
            )}

            {activeTab === 'contact' && (
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mr-4">
                    📞
                  </span>
                  Informasi Kontak
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">Alamat</p>
                      <p className="text-gray-600">{company?.address || 'Jl. Contoh No. 123, Jakarta'}</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl">
                    <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">Telepon</p>
                      <p className="text-gray-600">{company?.phone || '+62 21 1234567'}</p>
                    </div>
                  </div>

                  <div className="flex items-start p-4 bg-gradient-to-r from-purple-50 to-purple-50 rounded-xl">
                    <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center text-white mr-4 flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800 mb-1">Email</p>
                      <p className="text-gray-600">{company?.email || 'info@company.com'}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white mr-4">
                    🏆
                  </span>
                  Sejarah Perusahaan
                </h3>
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed text-lg">
                    Didirikan dengan visi untuk memberikan dampak positif dalam industri teknologi, 
                    perusahaan kami telah berkembang menjadi salah satu pemimpin pasar dengan 
                    jangkauan pelanggan yang luas di seluruh Indonesia.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-blue-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-gray-800">2014 - Awal Perjalanan</p>
                        <p className="text-gray-600">Perusahaan didirikan dengan tim kecil yang passionate</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-green-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-gray-800">2017 - Ekspansi</p>
                        <p className="text-gray-600">Membuka kantor cabang dan memperluas layanan</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-purple-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-gray-800">2020 - Transformasi Digital</p>
                        <p className="text-gray-600">Mengadopsi teknologi terkini dan layanan cloud</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <div className="w-3 h-3 bg-orange-600 rounded-full mt-2 mr-4 flex-shrink-0"></div>
                      <div>
                        <p className="font-semibold text-gray-800">2024 - Masa Depan</p>
                        <p className="text-gray-600">Terus berinovasi untuk solusi yang lebih baik</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'team' && (
              <div className="animate-fade-in">
                <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                  <span className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl flex items-center justify-center text-white mr-4">
                    👥
                  </span>
                  Tim Kami
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  Kami memiliki tim profesional yang berpengalaman dan berdedikasi 
                  untuk memberikan layanan terbaik. Setiap anggota tim kami memiliki 
                  keahlian khusus yang berkontribusi pada kesuksesan perusahaan.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Manajemen</h4>
                    <p className="text-gray-600">Tim kepemimpinan yang visioner dan berpengalaman</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Developer</h4>
                    <p className="text-gray-600">Expert dalam berbagai teknologi dan framework</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-50 rounded-xl">
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Designer</h4>
                    <p className="text-gray-600">Kreatif dalam menciptakan pengalaman user yang luar biasa</p>
                  </div>
                  
                  <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-50 rounded-xl">
                    <h4 className="font-bold text-gray-800 text-lg mb-2">Support</h4>
                    <p className="text-gray-600">Siap membantu 24/7 dengan respon cepat</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div 
                key={stat.id}
                className={`group bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up relative overflow-hidden`}
                style={{ animationDelay: stat.delay }}
              >
                {/* Decorative background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${stat.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 text-white transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>

                {/* Bottom accent */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${stat.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}></div>
              </div>
            ))}
          </div>

          {/* Values Section */}
          <div className="mb-16 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
            <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Nilai-Nilai Kami</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div 
                  key={value.id}
                  className="group bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className={`w-16 h-16 bg-gradient-to-br from-${value.color}-500 to-${value.color}-600 rounded-2xl flex items-center justify-center mb-4 text-white transform group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
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
      `}</style>
    </div>
  );
};

export default Profile;