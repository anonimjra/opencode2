# 02-PROJECT-BRIEF

Dokumen ini mendefinisikan ruang lingkup bisnis, sasaran fungsional, asumsi arsitektur, batasan teknis, serta batasan non-fungsional untuk proyek Landing Page UMKM / Coffee Shop dengan Admin Dashboard dan Export Excel.

---

## 1. Identitas Proyek

- **Nama Proyek:** Template Landing Page UMKM / Coffee Shop dengan Admin Dashboard (Default Mock: "Kopi Senja")
- **Kategori:** Web Application / E-Catalog & CMS UMKM
- **Target Audiens:**
  1. **Pengunjung / Pelanggan:** Pengguna mobile-first (ponsel pintar) yang ingin melihat katalog produk, harga, promo, lokasi toko fisik, jam operasional, serta melakukan pemesanan langsung melalui WhatsApp.
  2. **Pemilik Usaha (Admin):** Pengguna non-teknis yang memerlukan antarmuka dashboard sederhana dan intuitif untuk memperbarui katalog menu, mengubah teks dan foto landing page, melihat pesan masuk, serta mengekspor data ke Excel.

---

## 2. Tujuan Proyek

1. **Digital Presence Instan:** Memberikan kehadiran digital profesional bagi pelaku UMKM tanpa ketergantungan biaya langganan bulanan platform pihak ketiga.
2. **Kemandirian Pengelolaan:** Memungkinkan pemilik bisnis mengelola 100% konten website (menu, harga, ketersediaan, jam buka, foto, tema warna) secara mandiri dari dashboard tanpa menulis satu baris kode pun.
3. **Konversi Penjualan Mudah:** Mengalirkan minat beli pengunjung langsung ke kanal komunikasi personal terpopuler di Indonesia (WhatsApp) dengan pesan pemesanan otomatis terstruktur.
4. **Administrasi Praktis:** Memfasilitasi rekapitulasi data produk dan pesan kontak pelanggan melalui fitur export file Microsoft Excel (.xlsx) siap cetak.

---

## 3. Fitur Utama

### A. Landing Page Publik (Single Page Scroll)
- **Top Navigation Bar:** Logo dinamis, nama brand, link navigasi cepat (Hero, Tentang, Menu, Galeri, Testimoni, Kontak), tombol CTA WhatsApp, dan mobile drawer menu.
- **Hero Section:** Banner sambutan dengan headline, sub-headline, badge jam operasional (Buka/Tutup real-time), tombol CTA "Lihat Menu" dan "Pesan via WhatsApp".
- **Tentang Kami (Story & Value):** Cerita singkat usaha, nilai keunggulan (misal: 100% Kopi Nusantara, Biji Pilihan, Tempat Nyaman), dan foto etalase.
- **Katalog Menu & Produk Dinamis:**
  - Tab filter kategori interaktif (misal: Semua, Kopi Espresso, Minuman Non-Kopi, Makanan Ringan, Makanan Berat).
  - Kartu produk: Foto produk (Next.js Image), badge kategori, nama produk, deskripsi ringkas, harga format Rupiah (Rp), status ketersediaan (Tersedia / Habis).
  - Tombol aksi "Pesan via WhatsApp" di setiap produk dengan pre-filled text otomatis: *"Halo [Nama Toko], saya ingin pesan [Nama Produk] (Rp [Harga]). Apakah masih tersedia?"*.
- **Galeri Foto:** Grid foto responsif menampilkan suasana cafe, barista, dan produk unggulan.
- **Testimoni Pelanggan:** Daftar review pelanggan terverifikasi lengkap dengan avatar, nama pelanggan, komentar, dan bintang rating (1-5).
- **Jam Operasional & Peta Lokasi:** Tabel jam buka tiap hari serta iframe Google Maps responsif yang lokasinya dapat dikonfigurasi melalui URL/embed code.
- **Form Kontak Publik:** Formulir bagi pelanggan untuk mengirim pesan/pertanyaan (Nama, Nomor WhatsApp/Email, Pesan) dengan validasi dan anti-spam sederhana.
- **Footer:** Identitas usaha, tautan sosial media (Instagram, TikTok, Facebook), alamat ringkas, dan copyright.
- **Floating WhatsApp Button:** Tombol melayang di pojok kanan bawah yang selalu terlihat di layar mobile maupun desktop untuk chat langsung.

### B. Otentikasi & Keamanan Admin
- **Halaman Login Terproteksi:** `/admin/login` dengan validasi email dan kata sandi menggunakan Supabase Auth.
- **Route Guarding:** Next.js Middleware mencegat semua akses rute `/admin/*` untuk memastikan sesi aktif, otomatis mengarahkan pengunjung tak terotentikasi ke halaman login.
- **Single Admin Session:** Didesain khusus untuk satu akun administrator utama (pemilik usaha).

### C. Admin Dashboard (Content Management System)
- **Ringkasan (Overview):** Kartu statistik jumlah produk aktif, jumlah kategori, total pesan masuk, jumlah pesan belum dibaca, dan status buka toko hari ini.
- **Kelola Produk & Menu:**
  - Tambah, edit, dan hapus produk.
  - Form input: Nama produk, kategori, harga (angka), deskripsi, toggle status tersedia/habis, urutan tampilan (sort order), dan upload foto produk.
- **Kelola Kategori:** Tambah, ubah nama, dan hapus kategori produk.
- **Kelola Konten Landing Page:** Form pengisian konten statis: Teks hero headline, deskripsi Tentang Kami, alamat lengkap, nomor WhatsApp pengelola, jam buka (Senin-Minggu), dan link sosial media.
- **Kelola Galeri & Testimoni:** Upload foto galeri baru, kelola caption, tambah dan hapus testimoni pelanggan.
- **Pengaturan Tampilan & Branding:** Ubah nama brand, upload logo usaha, serta pilih warna aksen utama (Primary Color) melalui color picker atau preset (hangat/kopi, elegan/hijau botol, ceria/oranye, minimalis/monokrom).
- **Manajemen Pesan Masuk:** Tabel daftar pesan dari form kontak publik, filter pesan belum dibaca, baca detail pesan, tandai selesai, dan hapus pesan.

### D. Fitur Server-Side Export Excel (.xlsx)
- **Export Katalog Produk:** Tombol unduh di halaman `/admin/products` yang menghasilkan file Excel `produk-YYYY-MM-DD.xlsx`. Kolom: No, Nama Produk, Kategori, Harga (Rupiah), Status (Tersedia/Habis), Urutan, Terakhir Diperbarui.
- **Export Pesan Masuk:** Tombol unduh di halaman `/admin/messages` yang menghasilkan file Excel `pesan-masuk-YYYY-MM-DD.xlsx`. Kolom: No, Tanggal Masuk, Nama Pengirim, Kontak (WA/Email), Isi Pesan, Status (Sudah Dibaca/Belum).
- **Keamanan Export:** Endpoint API Server-side (`/api/admin/export/*`) wajib memverifikasi sesi aktif Supabase Auth sebelum membuat dan mengalirkan file `.xlsx`.

---

## 4. Scope & Non-Scope

### In-Scope (Termasuk)
- Landing page satu halaman publik terintegrasi penuh ke database Supabase.
- Pengaturan warna tema dinamis melalui CSS Variables yang diatur dari database.
- Dashboard admin lengkap dengan otentikasi Supabase Auth.
- Upload aset gambar langsung ke Supabase Storage Bucket dengan validasi tipe (JPG, PNG, WebP) dan ukuran maksimal 2MB.
- Server-side generation file Excel menggunakan library `exceljs`.
- RLS (Row Level Security) Postgres di Supabase: Publik hanya SELECT pada produk/konten/galeri/testimoni dan INSERT pada pesan kontak. Hanya Admin terotentikasi yang memiliki hak mutasi penuh (INSERT, UPDATE, DELETE).
- Responsif di seluruh ukuran layar (Mobile 360px+, Tablet, Desktop).
- Dokumentasi setup lengkap untuk developer maupun pengguna awam.

### Out-of-Scope (Tidak Termasuk)
- Keranjang belanja online (Cart System) dan multi-item checkout di dalam web.
- Integrasi Payment Gateway (Midtrans, Xendit, Stripe). Seluruh transaksi diselesaikan di WhatsApp pemilik usaha.
- Multi-tenancy atau sistem registrasi pengguna publik / banyak akun kasir.
- Sistem inventaris stok kuantitatif otomatis (hanya toggle biner: Tersedia / Habis).
- Notifikasi push mobile (PWA Push Notification).

---

## 5. Asumsi Arsitektur & Bisnis

1. **Akun Admin:** Admin awal dibuat satu kali menggunakan fitur Create User di dashboard Supabase atau via skrip utilitas SQL/CLI pertama kali.
2. **Nomor WhatsApp:** Nomor WhatsApp disimpan dengan format internasional (contoh: `6281234567890`) untuk kompatibilitas tautan URL `https://wa.me/<nomor>`.
3. **Format Tanggal & Waktu:** Menggunakan zona waktu Indonesia Barat (WIB / UTC+7) dan konvensi penamaan tanggal bahasa Indonesia (contoh: *19 November 2026*).
4. **Supabase Free Tier:** Batasan kapasitas storage (1GB) dan database (500MB) dari paket gratis Supabase lebih dari cukup untuk katalog UMKM skala kecil hingga menengah (ratusan produk dan galeri).
5. **Caching & Revalidasi:** Landing page publik menggunakan Incremental Static Regeneration (ISR) atau Server Component dengan revalidasi `revalidatePath` saat admin melakukan mutasi data dari dashboard, sehingga akses publik berkecepatan tinggi tanpa membebani kuota API database Supabase.
6. **Integrasi Peta:** Menggunakan standar Google Maps Embed Iframe URL yang aman dan gratis tanpa memerlukan API Key berbayar dari Google Cloud.
