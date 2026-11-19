# 05-CONVENTIONS

Dokumen ini mendefinisikan standar penamaan, gaya penulisan kode, penanganan error, keamanan, dan aturan commit yang wajib ditaati oleh agen pelaksana selama pengerjaan seluruh task.

---

## 1. Aturan Penamaan (Naming Conventions)

### A. Berkas & Direktori
- **Komponen React:** PascalCase (contoh: `HeroSection.tsx`, `ProductCard.tsx`, `AdminSidebar.tsx`).
- **Halaman & Layout Next.js:** kebab-case atau sesuai konvensi App Router (`page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `route.ts`).
- **Utilitas & Helper:** camelCase atau kebab-case (contoh: `formatRupiah.ts`, `builder.ts`, `storage.ts`).
- **Server Actions:** kebab-case atau camelCase (contoh: `products.ts`, `auth.ts`, `contact.ts`).
- **Tipe & Interface:** PascalCase di dalam `types/` (contoh: `Product`, `Category`, `SiteSettings`).

### B. Database & Skema
- **Nama Tabel:** snake_case jamak (contoh: `categories`, `products`, `testimonials`, `contact_messages`, `site_settings`).
- **Nama Kolom:** snake_case (contoh: `created_at`, `is_available`, `primary_color`, `whatsapp_number`).
- **Foreign Key:** `<singular_table>_id` (contoh: `category_id`).

### C. Variabel & Fungsi
- **Variabel & Fungsi:** camelCase (contoh: `fetchProducts`, `handleDeleteProduct`, `isSubmitting`).
- **Konstanta Global / Environment:** UPPER_SNAKE_CASE (contoh: `NEXT_PUBLIC_SUPABASE_URL`, `DEFAULT_THEME_COLOR`).
- **Komponen Boolean:** Diawali kata kerja bantu (contoh: `isLoading`, `isAvailable`, `hasError`).

---

## 2. Standar TypeScript & React

1. **Strict Type-Safety:**
   - Dilarang keras menggunakan tipe `any` kecuali terpaksa dan disertai alasan teknis yang kuat.
   - Gunakan `unknown` dengan type-guard jika tipe belum diketahui secara pasti.
   - Selalu tentukan tipe kembalian (return type) pada fungsi utilitas dan Server Actions.
2. **Server Components First:**
   - Jadikan semua komponen sebagai Server Component secara default untuk performa maksimal dan bundle klien yang ramping.
   - Tambahkan direktif `'use client'` hanya pada berkas yang membutuhkan React state (`useState`, `useEffect`), event handlers interaktif (`onClick`, `onChange`), atau browser API.
3. **Komposisi Komponen UI:**
   - Gunakan fungsi helper `cn()` (kombinasi `clsx` dan `tailwind-merge`) untuk menggabungkan class Tailwind CSS dinamis.
   - Pisahkan logika form yang kompleks ke dalam hook terpisah atau Server Action khusus.

---

## 3. Penanganan Error & Notifikasi Pengguna

1. **Format Respon Server Action:**
   Selalu kembalikan struktur respon standar yang terprediksi:
   ```typescript
   export type ActionResponse<T = unknown> = {
     success: boolean;
     data?: T;
     error?: string;
   };
   ```
2. **Bahasa Pesan:**
   - Seluruh pesan error, peringatan, dan sukses yang tampil di antarmuka pengguna (UI) **WAJIB** menggunakan bahasa Indonesia yang ramah, jelas, dan profesional (contoh: *"Gagal menyimpan produk. Silakan periksa koneksi internet Anda."* atau *"Pesan berhasil dikirim. Kami akan segera menghubungi Anda."*).
3. **Penyaluran Error (Error Boundaries):**
   - Rute halaman harus memiliki `error.tsx` untuk menangani unhandled exception secara anggun tanpa membuat aplikasi crash total.

---

## 4. Standar Optimasi Gambar & Media

1. **Penggunaan `next/image`:**
   - Seluruh render gambar publik wajib menggunakan komponen `<Image />` dari `next/image`.
   - Wajib menyertakan properti `alt` yang deskriptif untuk aksesibilitas (a11y).
   - Tentukan `width` dan `height` atau gunakan properti `fill` dengan container berposisi `relative` dan atribut `sizes` responsif.
2. **Domain Konfigurasi:**
   - Daftarkan hostname domain Supabase Storage pada properti `images.remotePatterns` di berkas `next.config.ts`.
3. **Fallback Placeholder:**
   - Sediakan gambar placeholder default jika URL gambar produk atau galeri bernilai `null` atau gagal dimuat.

---

## 5. Keamanan & Sanitasi Input

1. **Environment Variables:**
   - Variabel rahasia (`SUPABASE_SERVICE_ROLE_KEY`) **TIDAK BOLEH** menggunakan prefiks `NEXT_PUBLIC_` dan dilarang dipanggil di Client Components.
   - Hanya `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY` yang diizinkan untuk diakses di sisi browser.
2. **Sanitasi Form:**
   - Validasi seluruh input di sisi server (Server Action / API route) sebelum query database dieksekusi.
   - Batasi panjang karakter untuk mencegah buffer overrun atau spam teks raksasa (contoh: nama maksimal 100 karakter, pesan maksimal 1000 karakter).
3. **Proteksi File Upload:**
   - Verifikasi MIME type berkas sebelum upload (`image/jpeg`, `image/png`, `image/webp`).
   - Batasi ukuran berkas maksimal **2MB** per gambar.

---

## 6. Format Commit Git

Setiap penyelesaian satu task wajib menghasilkan satu commit git terisolasi:

```
T001: Setup inisialisasi Next.js project dan Tailwind CSS
T002: Konfigurasi tema warna dan font global
T003: Setup klien Supabase untuk browser, server, dan middleware
...
T040: Finalisasi dokumentasi README dan skrip verifikasi build
```
Dilarang menggabungkan beberapa task ke dalam satu commit git besar.
