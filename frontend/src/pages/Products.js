import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';

  const ADMIN_WA = '6285711562563';
  const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState({
      name: '',
      phone: '',
      address: '',
      note: ''
  });
  const handleWhatsAppOrder = () => {
  if (!form.name || !form.phone) {
    alert('Nama dan No WhatsApp wajib diisi');
    return;
  }

  const message = `
  Halo, saya ingin memesan produk:

  📦 Produk: ${selectedProduct.name}
  💰 Harga: Rp ${Number(selectedProduct.price).toLocaleString('id-ID')}

  👤 Nama: ${form.name}
  📱 No WA: ${form.phone}
  🏠 Alamat: ${form.address || '-'}
  📝 Catatan: ${form.note || '-'}
  `;

  const url = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
  };

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await getProducts();
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const categories = ['all', ...new Set(products.map(p => p.category).filter(Boolean))];
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(p => p.category === filter);

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
        <h1 className="text-4xl font-bold text-center mb-4">Produk Kami</h1>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Kami menawarkan berbagai produk berkualitas tinggi yang dirancang untuk memenuhi kebutuhan Anda
        </p>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full font-semibold transition ${
                filter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category === 'all' ? 'Semua' : category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {product.image_url ? (
                  <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <div className="p-4">
                {product.category && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                    {product.category}
                  </span>
                )}
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                {product.price && (
                  <div className="flex justify-between items-center">
                    <span className="text-blue-600 font-bold text-lg">
                      Rp {Number(product.price).toLocaleString('id-ID')}
                    </span>
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition text-sm">
                      Pesan via WA
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Tidak ada produk ditemukan</p>
          </div>
        )}

        {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">
              Pesan: {selectedProduct.name}
            </h2>

            <input
              placeholder="Nama"
              className="w-full border p-2 rounded mb-3"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <input
              placeholder="No WhatsApp"
              className="w-full border p-2 rounded mb-3"
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />

            <textarea
              placeholder="Alamat (opsional)"
              className="w-full border p-2 rounded mb-3"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />

            <textarea
              placeholder="Catatan (opsional)"
              className="w-full border p-2 rounded mb-4"
              onChange={(e) => setForm({ ...form, note: e.target.value })}
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setSelectedProduct(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Batal
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="px-4 py-2 bg-green-600 text-white rounded"
              >
                Kirim ke WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default Products;