# T004 - Skema Database Supabase DDL Migration & RLS Policies

**Depends on:** none
**Estimasi:** sedang

## Tujuan
Membuat berkas migrasi SQL lengkap (`supabase/migrations/001_initial_schema.sql`) yang berisi definisi DDL tabel-tabel PostgreSQL, indeks performa, trigger update waktu, kebijakan Row Level Security (RLS), dan konfigurasi storage bucket.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `supabase/migrations/001_initial_schema.sql` : Skrip SQL migrasi komprehensif

## Langkah
1. Buat folder `supabase/migrations/` di root proyek.
2. Buat berkas `001_initial_schema.sql` dengan urutan instruksi SQL:
   - Aktifkan ekstensi `pgcrypto` atau `uuid-ossp` untuk `gen_random_uuid()`.
   - Buat tabel `site_settings` dengan seluruh kolom identitas, jam operasional (JSONB), warna tema, dan alamat.
   - Buat tabel `categories` (kolom: id, name, slug, sort_order, created_at).
   - Buat tabel `products` (kolom: id, category_id relasi ke categories, name, description, price, image_url, is_available, is_featured, sort_order, timestamps).
   - Buat tabel `gallery` (kolom: id, title, caption, image_url, sort_order, created_at).
   - Buat tabel `testimonials` (kolom: id, customer_name, customer_role, review_text, rating, avatar_url, is_active, sort_order, created_at).
   - Buat tabel `contact_messages` (kolom: id, name, contact, subject, message, is_read, created_at).
3. Buat indeks performa:
   - `idx_categories_sort_order`, `idx_products_category`, `idx_products_availability`, `idx_products_sort_order`, `idx_messages_unread`.
4. Tambahkan fungsi dan trigger PostgreSQL untuk mengotomatiskan `updated_at = now()` pada tabel `site_settings` dan `products`.
5. Aktifkan RLS pada seluruh 6 tabel (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`).
6. Tulis RLS Policies:
   - Policy publik anonim: SELECT pada `site_settings`, `categories`, `products`, `gallery`, `testimonials` (yang aktif).
   - Policy publik anonim: INSERT pada `contact_messages`.
   - Policy admin terotentikasi: SELECT, INSERT, UPDATE, DELETE penuh pada seluruh tabel menggunakan check `auth.role() = 'authenticated'`.
7. Tambahkan instruksi pembuatan Storage Bucket `public-media` (public = true) beserta policy storage untuk pembacaan publik dan penulisan oleh user `authenticated`.

## Kriteria selesai
- [ ] Berkas `supabase/migrations/001_initial_schema.sql` memuat seluruh 6 tabel sesuai rancangan.
- [ ] Aturan RLS aktif dan mengisolasi akses mutasi hanya untuk pengguna terotentikasi.
- [ ] Kebijakan storage bucket `public-media` terdokumentasi lengkap.

## Verifikasi
Pemeriksaan integritas sintaks SQL (pastikan tidak ada tanda kutip rusak atau syntax error SQL).

## Catatan / jebakan
- Jangan lupa menyertakan kebijakan RLS untuk tabel `contact_messages` agar publik diizinkan melakukan `INSERT` tanpa login, namun dilarang keras melakukan `SELECT` pesan orang lain.
