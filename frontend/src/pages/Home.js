import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCompanyInfo, getProducts, getArticles } from '../services/api';

const Home = () => {
  const [company, setCompany] = useState(null);
  const [products, setProducts] = useState([]);
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [companyRes, productsRes, articlesRes] = await Promise.all([
        getCompanyInfo(),
        getProducts(),
        getArticles()
      ]);
      setCompany(companyRes.data);
      setProducts(productsRes.data.slice(0, 3));
      setArticles(articlesRes.data.slice(0, 3));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
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
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Solusi Teknologi Modern bersama {company?.company_name}
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Mitra Profesional dalam Pengembangan Sistem dan Transformasi Digital
          </p>
          <Link 
            to="/products" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Jelajahi Layanan Kami
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Tentang Perusahaan</h2>
            <p className="text-gray-600 text-lg">
              Kami adalah perusahaan teknologi informasi yang berfokus pada penyediaan solusi digital 
              yang inovatif, aman, dan berkelanjutan. Dengan pendekatan profesional dan berbasis kebutuhan 
              klien, kami membantu bisnis meningkatkan efisiensi serta daya saing melalui teknologi.
            </p>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Layanan & Solusi Unggulan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {product.image_url ? (
                    <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  {product.price && (
                    <p className="text-blue-600 font-bold text-lg">
                      Rp {Number(product.price).toLocaleString('id-ID')}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/products" 
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Lihat Seluruh Layanan →
            </Link>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Wawasan & Artikel Teknologi</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {articles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  {article.image_url ? (
                    <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-gray-400">No Image</span>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{article.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-3">{article.content}</p>
                  <Link 
                    to={`/articles/${article.id}`}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Baca Selengkapnya →
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link 
              to="/articles" 
              className="text-blue-600 hover:text-blue-800 font-semibold"
            >
              Lihat Semua Artikel →
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Siap Mengembangkan Bisnis Anda dengan Teknologi?
          </h2>
          <p className="text-xl mb-8">
            Konsultasikan kebutuhan sistem dan digitalisasi Anda bersama tim profesional kami
          </p>
          <Link 
            to="/contact" 
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block"
          >
            Konsultasi Sekarang
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
