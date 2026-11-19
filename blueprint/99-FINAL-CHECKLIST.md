# 99-FINAL-CHECKLIST

Dokumen ini berisi protokol verifikasi menyeluruh yang wajib dijalankan oleh agen pelaksana (`opencode`) setelah menyelesaikan seluruh task T001 hingga T040 sebelum menyatakan proyek selesai.

---

## 1. Verifikasi Build & Kompilasi Kode

- [ ] **Type-Check Bersih:** Jalankan `npx tsc --noEmit`. Tidak boleh ada error tipe TypeScript.
- [ ] **Production Build Berhasil:** Jalankan `npm run build`. Build Next.js harus selesai dengan status sukses (Exit Code 0) tanpa kegagalan route rendering.
- [ ] **Linting Lolos:** Jalankan `npm run lint`. Tidak boleh ada error kritis ESLint.

---

## 2. Verifikasi Database & Supabase Integration

- [ ] **File DDL Lengkap:** File `supabase/migrations/001_initial_schema.sql` valid secara sintaks PostgreSQL dan mencakup tabel `site_settings`, `categories`, `products`, `gallery`, `testimonials`, `contact_messages`.
- [ ] **RLS Aktif & Tervalidasi:** Seluruh tabel memiliki RLS aktif. Pengguna anonim tidak dapat melakukan mutasi data selain insert pada `contact_messages`.
- [ ] **Seed Data Sedia:** File `supabase/seed.sql` berisi data dummy awal Kopi Senja lengkap dengan menu, testimoni, galeri, dan konfigurasi.
- [ ] **Storage Bucket Terdefinisi:** Kebijakan storage bucket `public-media` telah terdokumentasi dan siap pakai.

---

## 3. Verifikasi Landing Page Publik

- [ ] **Responsif Mobile:** Tampilan diuji pada viewport mobile (360px - 414px) dan desktop (1280px+). Tidak ada horizontal overflow/scroll horizontal yang rusak.
- [ ] **Navbar & Drawer:** Menu navigasi scroll halus (smooth scroll) menuju section yang dituju. Hamburger menu di mobile berfungsi membuka dan menutup drawer.
- [ ] **Filter Kategori Menu:** Mengklik tab kategori (Semua, Espresso, Non-Kopi, dll) memfilter daftar kartu produk dengan akurat tanpa me-reload halaman.
- [ ] **Integrasi Pesan WhatsApp:**
  - Tombol order pada kartu produk membuka URL WhatsApp dengan pesan spesifik memuat nama produk dan harga.
  - Floating WhatsApp button di pojok kanan bawah selalu tampak dan mengarah ke nomor WhatsApp pengelola.
- [ ] **Form Kontak Berfungsi:** Mengirim formulir kontak menyimpan data ke tabel `contact_messages` dan menampilkan toast sukses bahasa Indonesia.
- [ ] **Dynamic Theme:** Perubahan nilai `primary_color` di database tercermin pada tombol dan aksen warna landing page.

---

## 4. Verifikasi Autentikasi & Rute Admin

- [ ] **Route Guarding Berjalan:** Mengakses `/admin`, `/admin/products`, atau rute dashboard lain tanpa sesi aktif otomatis ter-redirect ke `/admin/login`.
- [ ] **Login Berfungsi:** Mengisi email dan password admin yang valid berhasil membuat sesi dan masuk ke `/admin`.
- [ ] **Logout Bersih:** Tombol keluar di sidebar admin menghapus sesi cookie dan me-redirect ke `/admin/login`.

---

## 5. Verifikasi Admin Dashboard & CMS

- [ ] **Ringkasan Overview:** Angka total produk, kategori, dan pesan baru tampil akurat di `/admin`.
- [ ] **CRUD Kategori:** Kategori baru dapat ditambah, diubah namanya, dan dihapus.
- [ ] **CRUD Produk:** Produk baru dapat dibuat dengan foto, harga Rupiah, deskripsi, dan kategori terkait. Edit data produk dan hapus produk berfungsi mulus.
- [ ] **Toggle Ketersediaan:** Mengubah status produk menjadi Habis menonaktifkan tombol pemesanan di landing page publik.
- [ ] **Konten Landing & Branding:** Form edit teks Hero, Tentang Kami, nomor WhatsApp, dan logo berhasil memperbarui data di landing page setelah disimpan.
- [ ] **Manajemen Pesan:** Pesan kontak masuk dapat dibaca, ditandai sudah dibaca, dan dihapus.

---

## 6. Verifikasi Export Excel Server-Side

- [ ] **Export Produk:** Tombol "Export Excel" di `/admin/products` mengunduh file `produk-YYYY-MM-DD.xlsx`.
- [ ] **Export Pesan Masuk:** Tombol "Export Excel" di `/admin/messages` mengunduh file `pesan-masuk-YYYY-MM-DD.xlsx`.
- [ ] **Integritas File Excel:** File `.xlsx` dapat dibuka tanpa peringatan korup/rusak. Header tabel berwarna tebal, format harga menggunakan Rupiah (`Rp`), dan lebar kolom otomatis rapi.
- [ ] **Proteksi Endpoint:** Mengakses `/api/admin/export/products` langsung tanpa cookie sesi admin menghasilkan HTTP 401 Unauthorized.

---

## 7. Verifikasi Media & Performa

- [ ] **Next/Image Domain:** Domain Supabase Storage terdaftar di `next.config.ts`, tidak memicu error domain unconfigured.
- [ ] **Fallback Media:** Produk tanpa gambar menggunakan gambar placeholder elegan, tidak menyebabkan broken image icon.

---

## 8. Verifikasi Dokumentasi Handoff

- [ ] File `README.md` memuat panduan komprehensif: setup Supabase, konfigurasi `.env.local`, cara membuat user admin pertama, dan instruksi deploy ke Vercel.
- [ ] File `blueprint/PROGRESS.md` seluruhnya telah bertanda `[x]` dan memuat ringkasan laporan akhir.
