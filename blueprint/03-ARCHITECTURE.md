# 03-ARCHITECTURE

Dokumen ini menjelaskan struktur direktori aplikasi, alur data (data flow), batas keamanan (security boundaries), manajemen state, dan komponen utama dari sistem.

---

## 1. Struktur Direktori Proyek

Aplikasi dibangun menggunakan Next.js App Router dengan arsitektur modular yang memisahkan area publik, area administrasi, logika bisnis, dan integrasi pihak ketiga.

```
opencode2/
├── AGENTS.md                          # Aturan kerja agen opencode
├── blueprint/                         # Seluruh cetak biru arsitektur dan daftar task
├── supabase/
│   ├── migrations/
│   │   └── 001_initial_schema.sql     # Skrip migrasi DDL tabel, index, dan RLS
│   └── seed.sql                       # Data awal toko Kopi Senja
├── public/
│   ├── images/                        # Aset gambar statis default / placeholder
│   │   ├── hero-bg.jpg
│   │   ├── placeholder-product.jpg
│   │   └── default-logo.png
│   └── favicon.ico
├── src/ (atau root level jika tanpa src, disepakati langsung di root)
│   ├── app/
│   │   ├── (public)/                  # Route Group untuk halaman publik
│   │   │   ├── layout.tsx             # Layout publik (Navbar, Footer, Floating WA)
│   │   │   └── page.tsx               # Single-page landing page (Hero, Menu, dll)
│   │   ├── admin/                     # Rute terproteksi Admin Dashboard
│   │   │   ├── layout.tsx             # Layout admin (Sidebar, TopHeader, Guarded)
│   │   │   ├── page.tsx               # Overview dashboard & statistik
│   │   │   ├── login/
│   │   │   │   └── page.tsx           # Halaman login admin (tidak terproteksi)
│   │   │   ├── products/
│   │   │   │   ├── page.tsx           # Daftar produk & tombol export excel
│   │   │   │   ├── new/page.tsx       # Form tambah produk baru
│   │   │   │   └── [id]/edit/page.tsx # Form edit produk
│   │   │   ├── categories/
│   │   │   │   └── page.tsx           # Manajemen kategori
│   │   │   ├── content/
│   │   │   │   └── page.tsx           # Pengaturan teks landing, hero, sosmed
│   │   │   ├── settings/
│   │   │   │   └── page.tsx           # Pengaturan brand, logo, warna tema
│   │   │   ├── gallery/
│   │   │   │   └── page.tsx           # Manajemen foto galeri
│   │   │   ├── testimonials/
│   │   │   │   └── page.tsx           # Manajemen testimoni pelanggan
│   │   │   └── messages/
│   │   │       └── page.tsx           # Manajemen pesan masuk form kontak
│   │   ├── api/
│   │   │   └── admin/
│   │   │       └── export/
│   │   │           ├── products/
│   │   │           │   └── route.ts   # Route handler export Excel katalog produk
│   │   │           └── messages/
│   │   │               └── route.ts   # Route handler export Excel pesan masuk
│   │   ├── actions/                   # Next.js Server Actions
│   │   │   ├── auth.ts                # Action login & logout admin
│   │   │   ├── products.ts            # Action mutasi produk & kategori
│   │   │   ├── content.ts             # Action mutasi konten teks & setting brand
│   │   │   ├── gallery.ts             # Action mutasi foto galeri
│   │   │   ├── testimonials.ts        # Action mutasi testimoni
│   │   │   └── contact.ts             # Action publik kirim pesan form kontak
│   │   ├── layout.tsx                 # Root layout (HTML, Body, Font Loader, Toast)
│   │   ├── globals.css                # Tailwind CSS v4 & custom root variables
│   │   ├── error.tsx                  # Global error boundary
│   │   └── not-found.tsx              # Halaman 404
│   ├── components/
│   │   ├── ui/                        # Komponen atomic primitif (Button, Input, Card, Modal, dll)
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Textarea.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Skeleton.tsx
│   │   │   └── Toast.tsx
│   │   ├── shared/                    # Komponen bersama (public & admin)
│   │   │   ├── ThemeProvider.tsx      # Injektor CSS Variables warna tema dinamis
│   │   │   └── ImageUploader.tsx      # Komponen preview & upload gambar
│   │   ├── landing/                   # Komponen spesifik Landing Page Publik
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileDrawer.tsx
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── MenuSection.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   ├── TestimonialSection.tsx
│   │   │   ├── LocationSection.tsx
│   │   │   ├── ContactSection.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── WhatsAppFloatingButton.tsx
│   │   └── admin/                     # Komponen spesifik Admin Dashboard
│   │       ├── AdminSidebar.tsx
│   │       ├── AdminHeader.tsx
│   │       ├── MetricCard.tsx
│   │       ├── ProductListTable.tsx
│   │       ├── ProductForm.tsx
│   │       ├── CategoryList.tsx
│   │       ├── LandingContentForm.tsx
│   │       ├── ThemeSettingsForm.tsx
│   │       ├── GalleryManager.tsx
│   │       ├── TestimonialManager.tsx
│   │       ├── MessageListTable.tsx
│   │       └── ExportExcelButton.tsx
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts              # Browser Client (@supabase/ssr createBrowserClient)
│   │   │   ├── server.ts              # Server Component Client (@supabase/ssr createServerClient)
│   │   │   ├── middleware.ts          # Middleware Client (Cookie refresh & auth validation)
│   │   │   └── storage.ts             # Helper fungsi upload & delete Supabase Storage
│   │   ├── excel/
│   │   │   ├── builder.ts             # ExcelJS engine builder & standard styling
│   │   │   ├── products-sheet.ts      # Template sheet khusus produk
│   │   │   └── messages-sheet.ts      # Template sheet khusus pesan masuk
│   │   ├── utils.ts                   # Utility formatRupiah, formatDate, cn (clsx + twMerge)
│   │   ├── whatsapp.ts                # Helper pembentuk link URL wa.me dengan teks template
│   │   └── constants.ts               # Default mock constants, preset warna tema
│   ├── types/
│   │   ├── database.ts                # Definisi tipe tabel Supabase hasil introspeksi
│   │   └── index.ts                   # DTOs, interface view model, dan form schemas
│   └── middleware.ts                  # Root Next.js middleware (route guarding)
├── .env.example                       # Contoh variabel lingkungan
├── .env.local                         # Kunci rahasia lokal (diabaikan git)
├── next.config.ts                     # Konfigurasi Next.js (optimasi gambar domain Supabase)
├── package.json                       # Manifest dependensi & script build
├── postcss.config.mjs                 # PostCSS setup
├── tailwind.config.ts                 # Tailwind CSS theme extension
└── tsconfig.json                      # Konfigurasi TypeScript strict mode
```

---

## 2. Alur Data (Data Flow Architecture)

### A. Alur Publik (Landing Page)
1. Permintaan masuk ke rute `/`.
2. `app/(public)/page.tsx` (Server Component) mengambil data konfigurasi website, kategori, produk aktif, galeri, dan testimoni secara paralel dari database Supabase menggunakan `lib/supabase/server.ts`.
3. Komponen me-render HTML statis awal dengan dukungan ISR (`revalidate = 3600` atau `revalidatePath` on-demand saat mutasi admin).
4. `ThemeProvider` menginjeksi variabel warna `--color-primary` ke elemen root `<html>` berdasarkan nilai yang tersimpan di tabel `site_settings`.
5. Pengunjung mengeklik tombol "Pesan via WhatsApp": Browser membuka jendela baru ke URL `https://wa.me/{nomor}?text={encoded_message}` tanpa lalu lintas server tambahan.
6. Pengunjung mengirim pesan form kontak: Komponen `ContactSection.tsx` memanggil Server Action `actions/contact.ts`, memvalidasi input, lalu meng-insert record ke tabel `contact_messages`.

### B. Alur Autentikasi Admin & Proteksi Rute
1. Kunjungan ke `/admin/*`: Middleware `middleware.ts` membaca cookie sesi menggunakan `@supabase/ssr`.
2. Jika pengguna belum terotentikasi dan mencoba mengakses selain `/admin/login`, Middleware me-redirect permintaan ke `/admin/login`.
3. Jika pengguna yang sudah login mengakses `/admin/login`, Middleware me-redirect langsung ke `/admin`.
4. Proses Login: Admin mengisi form login, memanggil Server Action `actions/auth.ts`, Supabase Auth memverifikasi email & password, mengeset session cookie terenkripsi, lalu mengarahkan ke dashboard.

### C. Alur Mutasi Konten & Upload File
1. Form admin (misal `ProductForm.tsx`) menerima input data dan berkas gambar.
2. Berkas gambar divalidasi di sisi klien (tipe: `image/jpeg`, `image/png`, `image/webp`; ukuran: `< 2MB`).
3. Berkas diunggah langsung atau melalui helper `lib/supabase/storage.ts` ke Supabase Storage bucket `public-media`.
4. URL publik gambar disimpan ke kolom tabel database PostgreSQL.
5. Server Action memicu `revalidatePath('/')` sehingga pembaruan konten langsung tampil di landing page publik tanpa restart aplikasi.

### D. Alur Export Excel Server-Side
1. Admin mengeklik tombol "Export Excel" pada tabel produk atau pesan masuk.
2. Klien memicu navigasi unduh atau request `fetch` ke endpoint `/api/admin/export/products` atau `/api/admin/export/messages`.
3. Route Handler mengecek sesi otentikasi admin. Jika tidak valid, mengembalikan respon `401 Unauthorized`.
4. Route Handler mengambil data komprehensif dari database.
5. Utility `lib/excel/builder.ts` menggunakan library `exceljs` untuk menyusun workbook, menambahkan worksheet, mengonfigurasi header berwarna dengan font tebal, mengatur border tipis di semua sel, mengeset format angka Rupiah (`"Rp"#,##0`), dan menyesuaikan lebar kolom otomatis.
6. Workbook diubah menjadi binary buffer dan dikembalikan dengan header HTTP:
   - `Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet`
   - `Content-Disposition: attachment; filename="produk-YYYY-MM-DD.xlsx"`

---

## 3. Batas Keamanan (Security Boundaries)

```
[ Publik / Pengunjung ]
       │
       ▼ (Hanya GET Data Publik & POST Contact Message)
┌──────────────────────────────────────────────────────────┐
│ Next.js App Router (Public Components)                   │
└──────────────────────────────────────────────────────────┘
       │
       ▼ (Anon Key)
┌──────────────────────────────────────────────────────────┐
│ Supabase PostgreSQL (Row Level Security - RLS)           │
│ - SELECT: Diizinkan untuk produk, konten, testimoni      │
│ - INSERT: Diizinkan hanya untuk contact_messages         │
│ - UPDATE / DELETE: DITOLAK KERAS untuk publik            │
└──────────────────────────────────────────────────────────┘

[ Admin / Pemilik Usaha ]
       │
       ▼ (Sesi Supabase Auth Cookie)
┌──────────────────────────────────────────────────────────┐
│ Next.js Middleware (Proteksi Rute /admin/*)              │
└──────────────────────────────────────────────────────────┘
       │
       ▼ (Akses Diizinkan)
┌──────────────────────────────────────────────────────────┐
│ Admin Dashboard & Server Actions                         │
└──────────────────────────────────────────────────────────┘
       │
       ▼ (Authenticated Role Key)
┌──────────────────────────────────────────────────────────┐
│ Supabase PostgreSQL (Row Level Security - RLS)           │
│ - SELECT, INSERT, UPDATE, DELETE: Penuh                  │
│ Supabase Storage Bucket ("public-media")                 │
│ - INSERT, DELETE: Hanya role 'authenticated'             │
└──────────────────────────────────────────────────────────┘
```

---

## 4. Sistem Tema Dinamis (Dynamic Theming Engine)

Untuk mendukung perubahan warna brand utama tanpa build ulang aplikasi:
1. Kolom `primary_color` (format HEX, contoh `#7C2D12`) disimpan di tabel `site_settings`.
2. Di `app/layout.tsx`, nilai `primary_color` dibaca dari database.
3. Komponen `ThemeProvider` menanamkan CSS Variable `--color-primary` dan turunannya (hover, focus, border) ke tag `:root` atau wrapper `<body>`.
4. Tailwind CSS dikonfigurasikan untuk memanfaatkan variabel `var(--color-primary)` sebagai kelas utilitas `bg-primary`, `text-primary`, `border-primary`, dan `hover:bg-primary-dark`.
