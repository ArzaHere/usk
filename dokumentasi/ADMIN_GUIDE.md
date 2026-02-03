# 🔐 Panduan Admin Panel

## Login ke Admin Panel

1. **Akses Halaman Login**
   - Buka browser dan akses `http://localhost:3000/login`
   - Atau klik menu **hamburger** (☰) di kiri atas → **Sign In**

2. **Masukkan Kredensial Admin**
   ```
   Email: admin@perusahaan.com
   Password: admin123
   ```

3. **Akses Admin Panel**
   - Setelah login, klik **Admin Panel** di menu navigasi
   - Atau akses langsung `http://localhost:3000/admin`

---

## Dashboard

Dashboard menampilkan:
- **Statistik** - Total produk, artikel, event, galeri, klien, dan users
- **Quick Actions** - Tombol cepat untuk menambah content
- **Recent Activities** - 10 aktivitas terbaru

---

## Kelola Produk

### Menambah Produk Baru
1. Klik **"+ Tambah Produk"**
2. Isi form:
   - **Nama Produk** (required)
   - **Deskripsi**
   - **Harga**
   - **Kategori**
   - **URL Gambar**
3. Klik **"Simpan"**

### Edit Produk
1. Klik tombol **"Edit"** pada produk yang ingin diubah
2. Ubah data yang diperlukan
3. Klik **"Update"**

### Hapus Produk
1. Klik tombol **"Hapus"** pada produk
2. Konfirmasi dengan klik **"OK"**

---

## Kelola Artikel

### Menambah Artikel Baru
1. Klik **"+ Tambah Artikel"**
2. Isi form:
   - **Judul** (required)
   - **Konten** (required)
   - **Penulis**
   - **URL Gambar**
3. Klik **"Simpan"**

### Edit Artikel
1. Klik tombol **"Edit"** pada artikel
2. Ubah data yang diperlukan
3. Klik **"Update"**

### Hapus Artikel
1. Klik tombol **"Hapus"** pada artikel
2. Konfirmasi dengan klik **"OK"**

---

## Kelola Event

### Menambah Event Baru
1. Klik **"+ Tambah Event"**
2. Isi form:
   - **Judul Event** (required)
   - **Deskripsi**
   - **Tanggal Event**
   - **Lokasi**
   - **URL Gambar**
3. Klik **"Simpan"**

### Edit Event
1. Klik tombol **"Edit"** pada event
2. Ubah data yang diperlukan
3. Klik **"Update"**

### Hapus Event
1. Klik tombol **"Hapus"** pada event
2. Konfirmasi dengan klik **"OK"**

---

## Kelola Galeri

### Menambah Foto Baru
1. Klik **"+ Tambah Foto"**
2. Isi form:
   - **Judul**
   - **Deskripsi**
   - **URL Gambar** (required)
3. Klik **"Simpan"**

### Hapus Foto
1. Hover mouse pada foto
2. Klik tombol **"Hapus"** yang muncul
3. Konfirmasi dengan klik **"OK"**

---

## Kelola Klien

### Menambah Klien Baru
1. Klik **"+ Tambah Klien"**
2. Isi form:
   - **Nama Klien** (required)
   - **Deskripsi**
   - **URL Logo**
3. Klik **"Simpan"**

### Edit Klien
1. Klik tombol **"Edit"** pada klien
2. Ubah data yang diperlukan
3. Klik **"Update"**

### Hapus Klien
1. Klik tombol **"Hapus"** pada klien
2. Konfirmasi dengan klik **"OK"**

---

## Tips & Best Practices

### Upload Gambar
Aplikasi ini menggunakan **URL gambar** untuk semua media. Anda bisa:
- Upload gambar ke hosting seperti [Imgur](https://imgur.com) atau [Cloudinary](https://cloudinary.com)
- Gunakan CDN untuk performa lebih baik
- Pastikan URL valid dan dapat diakses publik

### Menulis Konten
- **Judul:** Singkat, jelas, dan menarik (max 100 karakter)
- **Deskripsi:** Informatif namun tidak terlalu panjang (150-200 karakter)
- **Konten Artikel:** Gunakan paragraf yang jelas, hindari teks terlalu panjang

### Kategori Produk
- Gunakan kategori yang konsisten
- Nama kategori dengan huruf kapital di awal kata
- Contoh: "Kategori A", "Kategori B", "Elektronik", "Furniture"

---

## Troubleshooting

### Tidak Bisa Login ke Admin Panel
- ✅ Pastikan menggunakan email: `admin@perusahaan.com`
- ✅ Password: `admin123`
- ✅ Pastikan backend server berjalan
- ✅ Cek console browser untuk error

### Data Tidak Tersimpan
- ✅ Pastikan token JWT masih valid (coba login ulang)
- ✅ Cek network tab di browser developer tools
- ✅ Pastikan semua field required sudah diisi
- ✅ Cek error message di console

### Gambar Tidak Muncul
- ✅ Pastikan URL gambar valid dan bisa diakses
- ✅ Gunakan URL dengan format: `https://...`
- ✅ Cek CORS jika menggunakan hosting gambar tertentu

### Modal Tidak Muncul
- ✅ Refresh halaman
- ✅ Cek console untuk JavaScript error
- ✅ Pastikan tidak ada extension browser yang block

---

## Keamanan

### Mengubah Password Admin
Password admin harus diubah melalui database (fitur change password bisa ditambahkan):

```sql
-- Generate hash baru untuk password dengan bcrypt online tool
-- Atau gunakan Node.js:
-- const bcrypt = require('bcryptjs');
-- const hash = bcrypt.hashSync('password_baru', 10);

UPDATE users 
SET password = 'hash_password_baru' 
WHERE email = 'admin@perusahaan.com';
```

### Best Practices
- ⚠️ Jangan share kredensial admin
- ⚠️ Gunakan password yang kuat
- ⚠️ Logout setelah selesai menggunakan admin panel
- ⚠️ Jangan akses admin panel di public WiFi
- ⚠️ Update JWT_SECRET di `.env` untuk production

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Esc` | Tutup modal yang sedang terbuka |
| `Ctrl/Cmd + S` | Submit form (jika focus di form) |

---

## Support

Jika mengalami masalah:
1. Cek dokumentasi di README.md
2. Lihat console browser untuk error
3. Cek log server backend
4. Buat issue di repository

---

**© 2025 Company Profile Website - Admin Panel Documentation**