import React, { useState, useEffect } from 'react';
import { getCompanyInfo } from '../services/api';

const VisionMission = () => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12">Visi dan Misi</h1>
        
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Vision Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-600 text-white py-6 px-8">
              <h2 className="text-3xl font-bold flex items-center">
                <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                VISI
              </h2>
            </div>
            <div className="p-8">
              <p className="text-gray-700 text-lg leading-relaxed">
                {company?.vision || 'Menjadi perusahaan terdepan dalam memberikan solusi inovatif untuk kebutuhan bisnis modern.'}
              </p>
            </div>
          </div>

          {/* Mission Section */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="bg-green-600 text-white py-6 px-8">
              <h2 className="text-3xl font-bold flex items-center">
                <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                MISI
              </h2>
            </div>
            <div className="p-8">
              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {company?.mission || 'Memberikan layanan berkualitas tinggi dengan fokus pada kepuasan pelanggan dan inovasi berkelanjutan.'}
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Menghadirkan produk dan layanan berkualitas tinggi yang memenuhi kebutuhan pelanggan</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Membangun hubungan jangka panjang dengan klien melalui kepercayaan dan transparansi</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Terus berinovasi untuk menghadapi tantangan industri yang dinamis</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-6 h-6 text-green-600 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Menciptakan lingkungan kerja yang positif dan mendukung pengembangan tim</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Values Section */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-center mb-8">Nilai-Nilai Perusahaan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border-l-4 border-blue-600 pl-4">
                <h3 className="text-xl font-semibold mb-2">Integritas</h3>
                <p className="text-gray-600">Kami berkomitmen pada kejujuran dan transparansi dalam setiap tindakan</p>
              </div>
              <div className="border-l-4 border-green-600 pl-4">
                <h3 className="text-xl font-semibold mb-2">Inovasi</h3>
                <p className="text-gray-600">Terus berinovasi untuk memberikan solusi terbaik</p>
              </div>
              <div className="border-l-4 border-purple-600 pl-4">
                <h3 className="text-xl font-semibold mb-2">Kolaborasi</h3>
                <p className="text-gray-600">Bekerja sama untuk mencapai tujuan bersama</p>
              </div>
              <div className="border-l-4 border-orange-600 pl-4">
                <h3 className="text-xl font-semibold mb-2">Keunggulan</h3>
                <p className="text-gray-600">Berusaha mencapai standar tertinggi dalam setiap hal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisionMission;