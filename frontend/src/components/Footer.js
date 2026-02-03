import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Nama Perusahaan</h3>
            <p className="text-gray-400 text-sm">
              Memberikan solusi terbaik untuk kebutuhan bisnis Anda dengan layanan berkualitas tinggi.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Link Cepat</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-white transition">Home</Link></li>
              <li><Link to="/profile" className="text-gray-400 hover:text-white transition">Profile</Link></li>
              <li><Link to="/products" className="text-gray-400 hover:text-white transition">Produk</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition">About Us</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Layanan</h4>
            <ul className="space-y-2">
              <li><Link to="/articles" className="text-gray-400 hover:text-white transition">Artikel</Link></li>
              <li><Link to="/events" className="text-gray-400 hover:text-white transition">Event</Link></li>
              <li><Link to="/gallery" className="text-gray-400 hover:text-white transition">Galeri</Link></li>
              <li><Link to="/clients" className="text-gray-400 hover:text-white transition">Klien</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Kontak</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Jl. Contoh No. 123</li>
              <li>Jakarta, Indonesia</li>
              <li>Phone: +62 21 1234567</li>
              <li>Email: info@perusahaan.com</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 Nama Perusahaan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;