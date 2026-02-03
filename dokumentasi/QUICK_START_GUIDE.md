# 🚀 QUICK START GUIDE - Fitur Baru Website

## ✅ Yang Sudah Selesai (Backend)

### 1. Database Schema ✅
- ✅ Table `articles` - Tambah field `external_url`
- ✅ Table `events` - Tambah `max_participants`, `registration_deadline`
- ✅ Table `event_registrations` - Baru! Untuk pendaftaran event
- ✅ Table `gallery` - Tambah field `category`
- ✅ Table `testimonials` - Baru! Untuk testimoni klien
- ✅ Table `orders` - Baru! Untuk sistem pembayaran
- ✅ Table `order_items` - Baru! Untuk detail pesanan

### 2. Backend Routes ✅
- ✅ `eventRegistrationRoutes.js` - Handle pendaftaran event
- ✅ `testimonialRoutes.js` - CRUD testimonials
- ✅ `orderRoutes.js` - Sistem pembayaran & order
- ✅ `galleryRoutes.js` - Tambah fitur EDIT
- ✅ `articleRoutes.js` - Tambah support external_url
- ✅ `eventRoutes.js` - Tambah support max_participants & deadline

### 3. Server Configuration ✅
- ✅ Routes baru ditambahkan di `server.js`
- ✅ Auth middleware sudah dikonfigurasi

---

## 🎯 Implementasi Database

### Step 1: Backup Database Lama (Opsional)
```bash
mysqldump -u root -p company_profile > backup_old.sql
```

### Step 2: Drop & Create Database Baru
```bash
mysql -u root -p
```

```sql
DROP DATABASE IF EXISTS company_profile;
CREATE DATABASE company_profile;
EXIT;
```

### Step 3: Import Schema Baru
```bash
mysql -u root -p company_profile < backend/database/schema.sql
```

### Step 4: Verifikasi
```bash
mysql -u root -p
USE company_profile;
SHOW TABLES;

-- Harus melihat tables:
-- articles, events, event_registrations, gallery, testimonials, 
-- orders, order_items, products, clients, users, company_info
```

---

## 🔧 Testing Backend

### Test 1: Event Registration
```bash
curl -X POST http://localhost:5000/api/event-registrations \
  -H "Content-Type: application/json" \
  -d '{
    "event_id": 1,
    "name": "Test User",
    "email": "test@example.com",
    "phone": "08123456789",
    "company": "Test Company",
    "message": "Saya ingin mendaftar"
  }'
```

### Test 2: Get Testimonials
```bash
curl http://localhost:5000/api/testimonials
```

### Test 3: Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Test Customer",
    "customer_email": "customer@example.com",
    "customer_phone": "08123456789",
    "customer_address": "Jl. Test No. 123",
    "payment_method": "bank_transfer",
    "items": [
      {
        "product_id": 1,
        "quantity": 2
      }
    ]
  }'
```

---

## 📱 Frontend TODO (Manual Implementation Needed)

Karena keterbatasan response, berikut file-file yang perlu Anda buat/update manual:

### PRIORITY 1 - Artikel External URL (MUDAH)

**File:** `frontend/src/pages/Articles.js`

Update bagian "Baca Selengkapnya":
```jsx
// SEBELUM:
<Link to={`/articles/${article.id}`}>
  Baca Selengkapnya →
</Link>

// SESUDAH:
{article.external_url ? (
  <a 
    href={article.external_url}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  >
    Baca Selengkapnya →
  </a>
) : (
  <Link 
    to={`/articles/${article.id}`}
    className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
  >
    Baca Selengkapnya →
  </Link>
)}
```

**File:** `frontend/src/pages/admin/AdminArticles.js`

Tambah field di form:
```jsx
<div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    External URL (Optional)
  </label>
  <input
    type="url"
    name="external_url"
    value={currentArticle.external_url}
    onChange={handleInputChange}
    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
    placeholder="https://example.com/artikel"
  />
  <p className="text-xs text-gray-500 mt-1">
    Jika diisi, tombol "Baca Selengkapnya" akan mengarah ke URL ini
  </p>
</div>
```

Update state:
```jsx
const [currentArticle, setCurrentArticle] = useState({
  id: null,
  title: '',
  content: '',
  author: '',
  image_url: '',
  external_url: ''  // TAMBAHKAN INI
});
```

---

### PRIORITY 2 - Event Registration Form (MEDIUM)

**File:** `frontend/src/pages/Events.js`

Tambah state untuk modal:
```jsx
const [showRegistrationModal, setShowRegistrationModal] = useState(false);
const [selectedEvent, setSelectedEvent] = useState(null);
const [registrationData, setRegistrationData] = useState({
  name: '',
  email: '',
  phone: '',
  company: '',
  message: ''
});
```

Update tombol "Daftar Sekarang":
```jsx
<button 
  onClick={() => {
    setSelectedEvent(event);
    setShowRegistrationModal(true);
  }}
  className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
>
  Daftar Sekarang
</button>
```

Tambah modal form di akhir component (sebelum `</div>` penutup):
```jsx
{showRegistrationModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div className="bg-white rounded-lg max-w-md w-full">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">
          Daftar Event: {selectedEvent?.title}
        </h2>
        <form onSubmit={handleRegistrationSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Lengkap *
            </label>
            <input
              type="text"
              name="name"
              value={registrationData.name}
              onChange={handleRegistrationChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={registrationData.email}
              onChange={handleRegistrationChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              No. Telepon
            </label>
            <input
              type="tel"
              name="phone"
              value={registrationData.phone}
              onChange={handleRegistrationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Perusahaan
            </label>
            <input
              type="text"
              name="company"
              value={registrationData.company}
              onChange={handleRegistrationChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Pesan/Alasan Mengikuti Event
            </label>
            <textarea
              name="message"
              value={registrationData.message}
              onChange={handleRegistrationChange}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setShowRegistrationModal(false)}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Daftar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
)}
```

Tambah handler functions:
```jsx
const handleRegistrationChange = (e) => {
  setRegistrationData({
    ...registrationData,
    [e.target.name]: e.target.value
  });
};

const handleRegistrationSubmit = async (e) => {
  e.preventDefault();
  try {
    await axios.post('http://localhost:5000/api/event-registrations', {
      event_id: selectedEvent.id,
      ...registrationData
    });
    alert('Pendaftaran berhasil! Kami akan menghubungi Anda segera.');
    setShowRegistrationModal(false);
    setRegistrationData({ name: '', email: '', phone: '', company: '', message: '' });
  } catch (error) {
    alert(error.response?.data?.message || 'Gagal mendaftar event');
  }
};
```

---

### PRIORITY 3 - Gallery CRUD ✅ DONE!

File `AdminGallery.js` sudah diupdate dengan fitur edit lengkap!

---

## 📊 Checklist Implementasi

### Backend ✅
- [x] Database schema update
- [x] Event registration routes
- [x] Testimonial routes
- [x] Order routes
- [x] Gallery edit feature
- [x] Article external URL support
- [x] Event capacity & deadline

### Frontend 🔄
- [ ] Articles - External URL
- [ ] Events - Registration form
- [x] Gallery - Edit feature (DONE!)
- [ ] Clients - Testimonials section
- [ ] Products - Shopping cart
- [ ] Checkout page
- [ ] Order tracking
- [ ] Admin - Event registrations page
- [ ] Admin - Testimonials page
- [ ] Admin - Orders page

---

## 🎨 Design Upgrade (Future)

Setelah fitur fungsional selesai, upgrade design dengan:
1. Gradient backgrounds
2. Animation on scroll
3. Hover effects
4. Loading skeletons
5. Better typography
6. Icon library (Lucide/Hero Icons)
7. Image optimization
8. Lazy loading

---

## 📞 Support

Jika ada pertanyaan atau butuh bantuan implementasi:
1. Cek dokumentasi di `REVISI_DOCUMENTATION.md`
2. Test backend dengan curl commands di atas
3. Lihat contoh code di quick start guide ini

---

**Last Updated:** January 29, 2025
**Status:** Backend Complete ✅ | Frontend In Progress 🔄