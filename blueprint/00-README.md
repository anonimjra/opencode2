# BLUEPRINT INDEX & EXECUTION ORDER

Dokumen ini adalah panduan navigasi dan urutan eksekusi implementasi template landing page UMKM/Coffee Shop ("Kopi Senja") dengan Admin Dashboard & Export Excel berbasis Next.js App Router, Supabase, dan Tailwind CSS.

---

## 1. Daftar Dokumen Fondasi (Wajib Dipahami)

Sebelum agen pelaksana (`opencode`) mengeksekusi task apa pun, pahami arsitektur menyeluruh pada dokumen-dokumen berikut:

| Dokumen | Deskripsi |
|---|---|
| `AGENTS.md` | Protokol eksekusi otomatis, penanganan kendala, batasan keras, konvensi commit. |
| `blueprint/02-PROJECT-BRIEF.md` | Ruang lingkup bisnis, asumsi sistem, target pengguna, batasan teknis & finansial. |
| `blueprint/03-ARCHITECTURE.md` | Peta struktur folder, alur data client-server, proteksi middleware, state management. |
| `blueprint/04-TECH-STACK.md` | Daftar dependensi package npm, versi terkunci, alasan arsitektural. |
| `blueprint/05-CONVENTIONS.md` | Aturan penamaan file, styling, TypeScript standard, sanitasi input, error handling. |
| `blueprint/06-DATA-MODEL.md` | Skema database PostgreSQL (Supabase), relasi tabel, RLS policies, DDL DTOs. |
| `blueprint/07-DESIGN-SYSTEM.md` | Palet warna tema adaptif, tipografi, grid breakpoint, komponen atomic design. |
| `blueprint/PROGRESS.md` | Matriks pelacak progres pengerjaan task (T001 - T040). |
| `blueprint/BLOCKERS.md` | Log pencatatan kendala teknis dan mitigasi otonom. |
| `blueprint/99-FINAL-CHECKLIST.md` | Protokol audit integrasi akhir sebelum handoff produksi. |

---

## 2. Fase & Urutan Eksekusi Task (T001 - T040)

Eksekusi **WAJIB** berurutan tanpa melompat kecuali terdapat dependensi yang gagal dan telah dicatat dalam `BLOCKERS.md`.

### Fase 1: Fondasi, Database & Core Infrastructure (T001 - T007)
- **T001**: Inisialisasi Project Next.js App Router, TypeScript, Tailwind CSS, dan tooling dasar.
- **T002**: Konfigurasi Tailwind CSS v4 / Theme Variable, font Google (Inter & Playfair/Plus Jakarta Sans), dan CSS Global.
- **T003**: Konfigurasi Environment Variable & Setup Supabase Client (Browser, Server Component, Route Handler).
- **T004**: Skema Database Supabase DDL Migration (`001_initial_schema.sql`), Relasi, Indexing, dan RLS Policies.
- **T005**: Seed Data Awal (`seed.sql`) untuk profil brand "Kopi Senja", kategori, produk menu, testimoni, dan galeri.
- **T006**: Pembuatan Tipe TypeScript Global (`types/database.ts` & `types/index.ts`) mencerminkan skema database.
- **T007**: Pembuatan Utility Helper (`formatRupiah`, format tanggal lokal, slug generator, WhatsApp link generator).

### Fase 2: Public Landing Page (T008 - T020)
- **T008**: Root Layout Publik, Font Loader, Metadata SEO Dasar, dan Open Graph Tags.
- **T009**: Provider Tema Dinamis (Injeksi CSS Variables dari konfigurasi warna di Supabase).
- **T010**: Navbar Responsif Publik dengan Logo Dinamis dan Mobile Drawer Menu.
- **T011**: Hero Section Publik (Headline dinamis, tagline, CTA pesan WhatsApp, dan gambar latar).
- **T012**: Section "Tentang Kami" (Deskripsi usaha, nilai jual, foto showcase).
- **T013**: Section Menu/Produk dengan Filter Kategori Tab Interaktif dan Grid Kartu Produk.
- **T014**: Komponen Tombol WhatsApp Melayang (Floating Action Button) dan Tombol Order per Produk.
- **T015**: Section Galeri Foto (Grid foto showcase suasana/produk cafe).
- **T016**: Section Testimoni Pelanggan (Review card dengan avatar & bintang rating).
- **T017**: Section Jam Operasional & Peta Lokasi (Embed Google Maps iframe).
- **T018**: Section Form Kontak Masuk (Validasi form, Server Action/API, proteksi spam, penyimpanan ke database).
- **T019**: Footer Publik dengan Navigasi Cepat, Jam Buka, Tautan Media Sosial, dan Copyright.
- **T020**: Integrasi Halaman Utama Publik (`app/(public)/page.tsx`) dengan Data Fetching Supabase & Caching ISR.

### Fase 3: Autentikasi Admin & Proteksi Rute (T021 - T023)
- **T021**: Next.js Middleware untuk Proteksi Sesi Supabase Auth pada Semua Rute `/admin/*` (kecuali `/admin/login`).
- **T022**: Halaman Login Admin (`/admin/login`) dengan Form Validasi, Error Handling, dan Autentikasi Supabase.
- **T023**: Layout Dashboard Admin dengan Sidebar Navigasi Responsif, Top Header, dan Fitur Logout.

### Fase 4: Fitur Admin Dashboard & Manajemen Konten (T024 - T033)
- **T024**: Halaman Ringkasan Dashboard (`/admin`) dengan Kartu Metrik (Total Produk, Kategori, Pesan Baru, Status Toko).
- **T025**: Storage Service Helper untuk Upload Gambar ke Supabase Storage (Validasi MIME, Size Limit 2MB, Clean Slug).
- **T026**: Manajemen Kategori Menu (`/admin/categories`) - CRUD Kategori Produk dan Urutan Tampil.
- **T027**: Daftar Produk Menu (`/admin/products`) - Tabel Data, Pencarian, Filter Kategori, Toggle Ketersediaan, dan Hapus.
- **T028**: Form Tambah & Edit Produk (`/admin/products/new` & `/admin/products/[id]/edit`) dengan Upload Foto.
- **T029**: Manajemen Konten Landing Page (`/admin/content`) - Hero Text, Tentang Kami, Jam Buka, Alamat, Kontak, dan Sosmed.
- **T030**: Pengaturan Tampilan & Brand (`/admin/settings`) - Nama Brand, Upload Logo, dan Pemilih Warna Tema Utama.
- **T031**: Manajemen Galeri Foto (`/admin/gallery`) - Upload Foto, Atur Keterangan, Urutan Tampil, dan Hapus.
- **T032**: Manajemen Testimoni Pelanggan (`/admin/testimonials`) - Tambah, Edit, Hapus Testimoni & Rating.
- **T033**: Manajemen Pesan Masuk Kontak (`/admin/messages`) - List Pesan, Filter Belum Dibaca, Tandai Selesai, dan Hapus.

### Fase 5: Server-side Excel Export Engine (T034 - T037)
- **T034**: ExcelJS Utility Builder Service (`lib/excel/builder.ts`) - Format Header, Kolom Rupiah, Lebar Otomatis, Border & Font.
- **T035**: Server Route Handler Export Excel Produk (`/api/admin/export/products`) dengan Verifikasi Sesi Admin.
- **T036**: Server Route Handler Export Excel Pesan Masuk (`/api/admin/export/messages`) dengan Verifikasi Sesi Admin.
- **T037**: Integrasi Tombol Download Excel pada UI Dashboard Produk dan Pesan Masuk dengan State Loading.

### Fase 6: Polish, Validasi Produksi, & Deployment Guide (T038 - T040)
- **T038**: Global Error Boundary, Not Found 404 Page, Loading Skeleton, dan Komponen Toast Notifikasi.
- **T039**: Audit Performa, Optimasi Gambar `next/image`, Responsivitas Mobile, dan Audit Aksesibilitas Web.
- **T040**: Dokumentasi Proyek (`README.md`), Setup Guide Supabase, Skrip Pembuatan Admin Awal, dan Panduan Deploy Vercel.

---

## 3. Instruksi Eksekusi untuk Agen Pelaksana

1. Mulai dengan membaca `blueprint/tasks/T001-setup-nextjs-project.md`.
2. Selesaikan langkah-langkahnya, jalankan verifikasi.
3. Ubah status task di `blueprint/PROGRESS.md`.
4. Lakukan commit git dengan format `T001: <judul>`.
5. Lanjut ke task berikutnya (`T002`, `T003`, dst.) sampai `T040`.
6. Lakukan eksekusi checklist final di `blueprint/99-FINAL-CHECKLIST.md`.
