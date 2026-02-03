import React, { useState, useEffect } from 'react';
import { getGallery } from '../services/api';

const Gallery = () => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const response = await getGallery();
      setGallery(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching gallery:', error);
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
        <h1 className="text-4xl font-bold text-center mb-4">Galeri Foto</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Lihat koleksi foto kegiatan dan momen berharga kami
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {gallery.map((item) => (
            <div 
              key={item.id} 
              className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition"
              onClick={() => setSelectedImage(item)}
            >
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                {item.image_url ? (
                  <img 
                    src={item.image_url} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  />
                ) : (
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition flex items-end">
                <div className="w-full p-4 text-white opacity-0 group-hover:opacity-100 transition">
                  <h3 className="font-semibold">{item.title}</h3>
                  {item.description && (
                    <p className="text-sm mt-1">{item.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {gallery.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Belum ada foto di galeri</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl w-full">
              <div className="relative">
                <button 
                  className="absolute top-4 right-4 text-white text-3xl hover:text-gray-300"
                  onClick={() => setSelectedImage(null)}
                >
                  ×
                </button>
                <img 
                  src={selectedImage.image_url} 
                  alt={selectedImage.title} 
                  className="w-full h-auto rounded-lg"
                />
                {selectedImage.title && (
                  <div className="text-white mt-4 text-center">
                    <h3 className="text-2xl font-bold">{selectedImage.title}</h3>
                    {selectedImage.description && (
                      <p className="mt-2 text-gray-300">{selectedImage.description}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;