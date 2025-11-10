# ☕ Cafe Self Service CMS (Frontend Only)

Aplikasi **CMS Self Service Café** berbasis **Vue.js** yang memungkinkan admin mengelola menu makanan dan minuman, serta pelanggan dapat memesan secara langsung dari antarmuka yang interaktif — semuanya berjalan **tanpa backend** (frontend only).

---

## 🚀 Fitur Utama

- 🔐 **Login Admin**
  - Username: `admin`
  - Password: `admin123`
  - Untuk mengakses panel admin dan mengelola data menu.

- 🍔 **Manajemen Menu**
  - Tambah, ubah, dan hapus menu makanan dan minuman.
  - Data disimpan secara lokal (menggunakan `localStorage`).

- 🛍️ **Pemesanan Mandiri (Self Service)**
  - Pelanggan dapat memilih menu dan membuat pesanan langsung.
  - Total harga dihitung otomatis.
  - Pesanan tersimpan sementara di browser.

- 💾 **Tanpa Backend**
  - Seluruh logika berjalan di sisi frontend.
  - Tidak memerlukan server atau database eksternal.

---

## 🧩 Teknologi yang Digunakan

- [Vue.js 3](https://vuejs.org/)
- [Vue Router](https://router.vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/) untuk styling
- `localStorage` untuk penyimpanan data sementara

---

## 🖥️ Cara Menjalankan Proyek

### 1. Clone Repository

```bash
git clone https://github.com/username/nama-repo.git
cd nama-repo
