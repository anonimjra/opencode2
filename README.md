# Kopi Senja — Template Landing Page UMKM & Coffee Shop

Template website profesional untuk UMKM / coffee shop berbasis **Next.js App Router**, **Supabase**, dan **Tailwind CSS**. Dilengkapi **landing page publik** yang terhubung ke database, **admin dashboard** (CMS) untuk mengelola konten tanpa coding, serta **export Excel (.xlsx)** server-side.

Default demo brand: **Kopi Senja**.

---

## ✨ Fitur Utama

- **Landing Page Publik (single page scroll):** Navbar responsif, Hero, Tentang Kami, Katalog Menu dengan filter kategori, Galeri, Testimoni, Jam Operasional + Peta, Form Kontak, dan Footer.
- **Pemesanan via WhatsApp:** Tombol per produk + Floating Action Button dengan pesan otomatis terisi nama & harga.
- **Kustomisasi Tema Dinamis:** Warna primary diatur dari dashboard (color picker + preset), langsung mengubah CSS Variables di seluruh situs.
- **Admin Dashboard & CMS:** Kelola produk, kategori, konten landing, galeri, testimoni, pesan masuk, dan branding.
- **Autentikasi & Proteksi Rute:** Supabase Auth + middleware yang menjaga seluruh rute `/admin/*` dan `/api/admin/*`.
- **Export Excel Server-side:** Katalog produk (`produk-YYYY-MM-DD.xlsx`) dan pesan masuk (`pesan-masuk-YYYY-MM-DD.xlsx`) dengan styling profesional via ExcelJS.

---

## 🧱 Tech Stack

| Kategori | Teknologi |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Bahasa | TypeScript (strict mode) |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer |
| UI & Ikon | Lucide React, clsx, tailwind-merge |
| Backend & DB | Supabase (PostgreSQL, Auth, Storage) via `@supabase/supabase-js` & `@supabase/ssr` |
| Excel | ExcelJS |
| Tanggal | date-fns |

---

## ✅ Prasyarat

- **Node.js v20+**
- Akun gratis **[Supabase](https://supabase.com)**
- Akun **[Vercel](https://vercel.com)** (untuk deploy)

---

## 🗄️ Langkah Setup Supabase (Langkah Demi Langkah)

1. **Buat proyek baru** di [dashboard Supabase](https://app.supabase.com).
2. Buka menu **SQL Editor**, salin dan jalankan seluruh isi skrip:
   - `supabase/migrations/001_initial_schema.sql` (tabel, index, trigger, RLS, storage bucket).
3. Jalankan juga skrip **`supabase/seed.sql`** untuk mengisi data awal toko "Kopi Senja" (kategori, 8 produk, galeri, testimoni).
4. Buka menu **Storage** → pastikan bucket **`public-media`** telah dibuat dengan opsi **Public** (skrip migrasi sudah membuatnya otomatis).
5. Buka menu **Authentication → Users** → klik **Add User → Create User**, lalu masukkan email dan password untuk **akun admin pertama**. Akun inilah yang dipakai login di `/admin/login`.
6. Buka **Project Settings → API**, salin:
   - `Project URL` → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` key → `SUPABASE_SERVICE_ROLE_KEY` (rahasia, jangan pernah dipakai di browser)

---

## 💻 Setup Lingkungan Lokal

```bash
# 1. Install dependensi
npm install

# 2. Salin template environment
copy .env.example .env.local      # Windows
# cp .env.example .env.local      # macOS / Linux
```

3. Isi `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

4. Jalankan server pengembangan:

```bash
npm run dev
```

5. Buka `http://localhost:3000` (landing page publik).
6. Masuk ke dashboard admin di `http://localhost:3000/admin/login`.

### Perintah Berguna

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Menjalankan server pengembangan |
| `npm run build` | Build produksi |
| `npm run start` | Menjalankan hasil build produksi |
| `npm run lint` | Pemeriksaan ESLint |
| `npx tsc --noEmit` | Pemeriksaan tipe TypeScript |

---

## 🚀 Panduan Deployment ke Vercel

1. Push repositori ke **GitHub**.
2. Buka [dashboard Vercel](https://vercel.com/new) dan **Import** repositori tersebut.
3. Pada bagian **Environment Variables**, masukkan variabel yang sama seperti di `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Klik **Deploy**. Vercel akan otomatis mendeteksi Next.js.
5. Setelah selesai, kunjungi URL produksi dan login admin di `/admin/login`.

> **Catatan keamanan:** Jangan pernah meng-commit nilai asli `.env.local` atau service role key ke repositori. Gunakan nilai placeholder di dokumentasi.

---

## 📁 Struktur Proyek (Ringkas)

```
app/
  (public)/            # Landing page publik
  admin/               # Dashboard admin (login + route group dashboard)
  api/admin/export/    # Route handler export Excel
  actions/             # Server Actions (mutasi data)
components/
  landing/             # Komponen landing page
  admin/               # Komponen dashboard
  ui/                  # Komponen atomik (Button, Input, Modal, Toast, dst.)
  shared/              # ThemeProvider, ImageUploader
lib/
  supabase/            # Klien Supabase (browser/server/middleware/storage)
  excel/               # ExcelJS builder & sheet generator
  data/                # Query data publik
types/                 # Tipe database & DTO
supabase/
  migrations/          # Skrip DDL + RLS
  seed.sql             # Data contoh
```

---

## 🔐 Ringkasan Keamanan

- RLS aktif pada seluruh tabel; publik hanya boleh `SELECT` data umum & `INSERT` pesan kontak.
- Mutasi data hanya untuk pengguna `authenticated`.
- Middleware memvalidasi sesi (`getUser()`) di setiap akses `/admin/*` dan `/api/admin/*`.
- Upload media dibatasi tipe (JPG/PNG/WebP) dan ukuran maksimal **2MB**.

---

## 📄 Lisensi

Template ini disediakan untuk kebutuhan internal UMKM. Sesuaikan branding dan data sesuai usaha Anda.
