import React, { useState, useEffect } from 'react';
import { getCompanyInfo } from '../services/api';

const Profile = () => {
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
        <h1 className="text-4xl font-bold text-center mb-12">Profile Perusahaan</h1>
        
        <div className="max-w-4xl mx-auto">
          {/* Company Logo */}
          <div className="text-center mb-12">
            <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              {company?.logo_url ? (
                <img src={company.logo_url} alt="Company Logo" className="w-full h-full rounded-full object-cover" />
              ) : (
                <span className="text-white font-bold text-4xl">L</span>
              )}
            </div>
            <h2 className="text-3xl font-bold">{company?.company_name}</h2>
          </div>

          {/* Company Details */}
          <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Tentang Perusahaan</h3>
              <p className="text-gray-600">
                Kami adalah perusahaan yang bergerak di bidang teknologi dan inovasi, 
                berkomitmen untuk memberikan solusi terbaik bagi pelanggan kami.
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Informasi Kontak</h3>
              <div className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">Alamat:</span> {company?.address}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Telepon:</span> {company?.phone}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> {company?.email}
                </p>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Sejarah</h3>
              <p className="text-gray-600">
                Didirikan dengan visi untuk memberikan dampak positif dalam industri, 
                perusahaan kami telah berkembang menjadi salah satu pemimpin pasar 
                dengan jangkauan pelanggan yang luas.
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Tim Kami</h3>
              <p className="text-gray-600">
                Kami memiliki tim profesional yang berpengalaman dan berdedikasi 
                untuk memberikan layanan terbaik. Setiap anggota tim kami memiliki 
                keahlian khusus yang berkontribusi pada kesuksesan perusahaan.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-blue-600 text-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">10+</div>
              <div className="text-lg">Tahun Pengalaman</div>
            </div>
            <div className="bg-green-600 text-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-lg">Klien Puas</div>
            </div>
            <div className="bg-purple-600 text-white rounded-lg p-6 text-center">
              <div className="text-4xl font-bold mb-2">100+</div>
              <div className="text-lg">Proyek Selesai</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;