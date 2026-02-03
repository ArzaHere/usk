-- Database untuk Company Profile
CREATE DATABASE IF NOT EXISTS company_profile;
USE company_profile;

-- Table untuk informasi perusahaan
CREATE TABLE IF NOT EXISTS company_info (
  id INT PRIMARY KEY AUTO_INCREMENT,
  company_name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(500),
  vision TEXT,
  mission TEXT,
  address TEXT,
  phone VARCHAR(50),
  email VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table untuk produk/layanan
CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  price DECIMAL(10, 2),
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table untuk artikel
CREATE TABLE IF NOT EXISTS articles (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url VARCHAR(500),
  author VARCHAR(100),
  external_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table untuk event
CREATE TABLE IF NOT EXISTS events (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE,
  location VARCHAR(255),
  image_url VARCHAR(500),
  max_participants INT DEFAULT 100,
  registration_deadline DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table untuk registrasi event
CREATE TABLE IF NOT EXISTS event_registrations (
  id INT PRIMARY KEY AUTO_INCREMENT,
  event_id INT NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  message TEXT,
  status ENUM('pending', 'confirmed', 'cancelled') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Table untuk galeri foto
CREATE TABLE IF NOT EXISTS gallery (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  image_url VARCHAR(500) NOT NULL,
  description TEXT,
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table untuk klien
CREATE TABLE IF NOT EXISTS clients (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  logo_url VARCHAR(500),
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table untuk user (login system)
CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'user') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table untuk testimoni
CREATE TABLE IF NOT EXISTS testimonials (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  client_id INT,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255),
  company VARCHAR(255),
  content TEXT NOT NULL,
  rating INT DEFAULT 5,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
);

-- Table untuk transaksi/orders
CREATE TABLE IF NOT EXISTS orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  customer_address TEXT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method ENUM('bank_transfer', 'credit_card', 'ewallet', 'cod') NOT NULL,
  payment_status ENUM('pending', 'paid', 'failed', 'cancelled') DEFAULT 'pending',
  shipping_status ENUM('pending', 'processing', 'shipped', 'delivered') DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table untuk detail order
CREATE TABLE IF NOT EXISTS order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Insert data sample untuk company_info
INSERT INTO company_info (company_name, vision, mission, address, phone, email) VALUES
('Nama Perusahaan', 
 'Menjadi perusahaan terdepan dalam memberikan solusi inovatif untuk kebutuhan bisnis modern.',
 'Memberikan layanan berkualitas tinggi dengan fokus pada kepuasan pelanggan dan inovasi berkelanjutan.',
 'Jl. Contoh No. 123, Jakarta, Indonesia',
 '+62 21 1234567',
 'info@perusahaan.com');

-- Insert data sample untuk products
INSERT INTO products (name, description, category, price) VALUES
('Produk 1', 'Deskripsi produk 1', 'Kategori A', 100000),
('Produk 2', 'Deskripsi produk 2', 'Kategori B', 200000),
('Produk 3', 'Deskripsi produk 3', 'Kategori A', 150000);

-- Insert data sample untuk articles
INSERT INTO articles (title, content, author, external_url) VALUES
('Artikel Pertama', 'Konten artikel pertama tentang perkembangan industri...', 'Admin', 'https://www.kompas.com'),
('Berita Terbaru', 'Berita terbaru mengenai produk dan layanan kami...', 'Admin', 'https://www.detik.com');

-- Insert data sample untuk events
INSERT INTO events (title, description, event_date, location, max_participants, registration_deadline) VALUES
('Workshop 2025', 'Workshop tentang teknologi terbaru', '2025-03-15', 'Jakarta Convention Center', 100, '2025-03-10'),
('Seminar Bisnis', 'Seminar strategi bisnis modern', '2025-04-20', 'Hotel Grand Indonesia', 150, '2025-04-15');

-- Insert data sample untuk testimonials
INSERT INTO testimonials (name, position, company, content, rating) VALUES
('Ahmad Rizki', 'CEO', 'PT ABC', 'Pelayanan yang sangat memuaskan dan profesional. Sangat direkomendasikan!', 5),
('Siti Nurhaliza', 'Manager', 'CV XYZ', 'Produk berkualitas dengan harga yang kompetitif. Pasti akan kembali lagi!', 5),
('Budi Santoso', 'Owner', 'Toko Maju', 'Tim yang responsif dan solusi yang tepat sasaran. Sangat puas!', 5);

-- Insert admin user
INSERT INTO users (username, email, password, role) VALUES
('admin', 'admin@perusahaan.com', '$2a$10$CwTycUXWue0Thq9StjUM0uJ8VKa1JZ5PJnL/sVqKlKbdJKT7XqHNK', 'admin');
