import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticles } from '../services/api';

const Articles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const response = await getArticles();
      setArticles(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching articles:', error);
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl text-gray-600">Memuat artikel...</div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">Artikel & Insight Teknologi</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Kumpulan artikel yang membahas perkembangan teknologi, wawasan industri,
          serta pemikiran strategis seputar transformasi digital
        </p>

        <div className="max-w-5xl mx-auto space-y-8">
          {articles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
              <div className="md:flex">
                <div className="md:w-1/3">
                  <div className="h-full min-h-[200px] bg-gray-200 flex items-center justify-center">
                    {article.image_url ? (
                      <img src={article.image_url} alt={article.title} className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    )}
                  </div>
                </div>
                <div className="md:w-2/3 p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{formatDate(article.created_at)}</span>
                    {article.author && (
                      <>
                        <span className="mx-2">•</span>
                        <span>Ditulis oleh {article.author}</span>
                      </>
                    )}
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{article.title}</h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {article.content}
                  </p>
                  {article.external_url ? (
                  <a href={article.external_url} target="_blank" rel="noopener noreferrer" className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                    Baca Selengkapnya →
                  </a>) : (
                    <Link to={`/articles/${article.id}`} className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
                      Baca Selengkapnya →
                    </Link>)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              Artikel sedang dalam proses publikasi. Silakan kembali lagi nanti.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Articles;
