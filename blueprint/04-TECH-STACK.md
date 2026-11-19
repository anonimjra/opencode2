# 04-TECH-STACK

Dokumen ini mendokumentasikan daftar resmi pustaka (libraries), runtime, dan alat bantu pengembangan yang digunakan dalam proyek, lengkap dengan versi spesifik dan justifikasi teknisnya.

---

## 1. Core Framework & Runtime

| Paket / Tool | Versi | Justifikasi Arsitektur |
|---|---|---|
| **Node.js** | `>= 20.x LTS` | Runtime JavaScript performa tinggi dengan dukungan native Web Streams, Crypto, dan Fetch API. |
| **Next.js** | `15.x` (atau `14.2.x LTS`) | Framework React utama berbasis App Router. Mendukung Server Components (kecepatan awal tinggi & SEO optimal), Server Actions untuk mutasi data tanpa boilerplate API, dan route handler untuk file streaming. |
| **React & React DOM** | `19.x` (atau `18.3.x`) | Library antarmuka deklaratif inti, fondasi rendering Next.js. |
| **TypeScript** | `^5.6.x` | Menjamin type-safety ketat, mencegah runtime type error, dan mengotomatiskan kontrak antarmuka database Supabase. |

---

## 2. Styling, Ikon & Antarmuka UI

| Paket | Versi | Justifikasi Arsitektur |
|---|---|---|
| **Tailwind CSS** | `^3.4.x` / `^4.0.x` | Utility-first CSS framework untuk pengembangan UI responsif yang cepat dan bundle size minimal (purged CSS). |
| **PostCSS & Autoprefixer** | `^8.4.x` / `^10.4.x` | Memproses sintaks Tailwind dan menambahkan vendor prefix CSS secara otomatis untuk kompatibilitas lintas browser. |
| **Lucide React** | `^0.460.x` | Kumpulan ikon SVG modern yang ringan, pohon pohon (tree-shakeable), dan konsisten untuk dashboard serta navigasi publik. |
| **clsx & tailwind-merge** | `^2.1.x` / `^2.5.x` | Helper penggabung class Tailwind secara kondisional (`cn()`) tanpa benturan aturan spesifisitas CSS. |

---

## 3. Backend, Database, Auth & Storage

| Paket | Versi | Justifikasi Arsitektur |
|---|---|---|
| **@supabase/supabase-js** | `^2.46.x` | SDK resmi Supabase untuk query database PostgreSQL, mutasi data, dan manajemen storage berkas media. |
| **@supabase/ssr** | `^0.5.x` | Adapter otentikasi resmi Supabase khusus Next.js App Router yang mengelola pertukaran cookie sesi secara aman di Server Components, Server Actions, Route Handlers, dan Middleware. |

---

## 4. Pembuat Berkas Excel (Spreadsheet Engine)

| Paket | Versi | Justifikasi Arsitektur |
|---|---|---|
| **exceljs** | `^4.4.x` | Library Node.js andal untuk pembuatan berkas Microsoft Excel (.xlsx) di sisi server. Memiliki kontrol penuh atas styling sel (font, border, fill warna, lebar kolom otomatis), format mata uang (Rupiah), dan efisiensi memori dengan dukungan streaming buffer. |

---

## 5. Utilitas Tambahan

| Paket | Versi | Justifikasi Arsitektur |
|---|---|---|
| **date-fns** | `^4.1.x` | Utilitas manipulasi tanggal modular dan ringan, dilengkapi lokalisasi bahasa Indonesia (`id`) untuk format tanggal pada UI dan nama file export. |

---

## 6. Target Lingkungan & Deployment

- **Hosting Platform:** **Vercel (Hobby / Free Tier)**
  - Integrasi zero-configuration dengan Next.js App Router.
  - Dukungan Global Edge Network untuk penyajian aset statis dan ISR.
  - Otomasi CI/CD terhubung langsung dengan repositori Git.
- **Database & Storage Cloud:** **Supabase Cloud (Free Tier)**
  - PostgreSQL terkelola dengan Row Level Security (RLS) untuk isolasi data.
  - Supabase Auth bawaan berbasis JSON Web Tokens (JWT) & HTTP-only cookies.
  - Supabase Storage S3-compatible untuk penyimpanan berkas foto menu, galeri, dan logo.

---

## 7. Batasan Instalasi (Hard Rule)

Agen pelaksana (`opencode`) **TIDAK BOLEH** menginstal dependensi di luar daftar di atas tanpa instruksi spesifik di dalam file task. Penambahan paket yang tidak terdaftar akan memicu pembengkakan bundle dan potensi inkonsistensi environment.
