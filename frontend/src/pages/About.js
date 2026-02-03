import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Tentang Kami</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Mengenal lebih dekat perusahaan teknologi kami, nilai profesional yang kami pegang,
          serta komitmen kami dalam menghadirkan solusi digital yang andal
        </p>

        <div className="max-w-5xl mx-auto">
          {/* Company Story */}
          <section className="mb-16">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-3xl font-bold mb-6">Profil Perusahaan</h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Kami merupakan perusahaan di bidang Teknologi Informasi yang didirikan dengan tujuan
                memberikan solusi digital yang efektif, aman, dan berkelanjutan bagi berbagai kebutuhan bisnis.
                Fokus utama kami adalah membantu klien beradaptasi dan berkembang di era transformasi digital.
              </p>
              <p className="text-gray-600 mb-4 leading-relaxed">
                Dengan memanfaatkan teknologi modern serta praktik terbaik industri, kami menghadirkan
                layanan yang mencakup pengembangan sistem, integrasi teknologi, serta solusi berbasis kebutuhan klien.
                Setiap solusi dirancang secara strategis untuk memberikan nilai jangka panjang.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Kami berkomitmen untuk menjaga standar profesionalisme, kualitas, dan kepercayaan
                dalam setiap kerja sama, serta terus berinovasi untuk menjawab tantangan teknologi yang terus berkembang.
              </p>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Mengapa Memilih Kami?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Solusi Terpercaya</h3>
                <p className="text-gray-600">
                  Setiap solusi dirancang dengan standar kualitas tinggi dan pendekatan yang terukur
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Efisiensi & Nilai</h3>
                <p className="text-gray-600">
                  Pendekatan yang efisien untuk memberikan nilai maksimal bagi investasi teknologi Anda
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">Tim Berpengalaman</h3>
                <p className="text-gray-600">
                  Didukung oleh tenaga profesional dengan keahlian di berbagai bidang teknologi
                </p>
              </div>
            </div>
          </section>

          {/* Our Team */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Manajemen & Tim Inti</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-blue-600">C</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">Chief Executive Officer</h3>
                  <p className="text-gray-600 text-sm">Strategic Leadership</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-green-600">O</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">Chief Operating Officer</h3>
                  <p className="text-gray-600 text-sm">Operational Excellence</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-purple-600">T</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">Chief Technology Officer</h3>
                  <p className="text-gray-600 text-sm">Technology & Innovation</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
                  <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center">
                    <span className="text-4xl font-bold text-orange-600">F</span>
                  </div>
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-lg">Chief Financial Officer</h3>
                  <p className="text-gray-600 text-sm">Financial Management</p>
                </div>
              </div>
            </div>
          </section>

          {/* Awards & Certifications */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Pengakuan & Sertifikasi</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="bg-white rounded-lg shadow-md p-6 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <p className="text-sm font-semibold">Professional Recognition</p>
                    <p className="text-xs text-gray-600">Technology Industry</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Call to Action */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Siap Berkolaborasi dengan Kami?</h2>
            <p className="text-xl mb-8">
              Kami siap menjadi mitra teknologi Anda dalam mewujudkan solusi digital yang efektif
            </p>
            <Link to="/contact" className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">
               Hubungi Kami
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
