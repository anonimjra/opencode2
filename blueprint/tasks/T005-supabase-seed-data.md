# T005 - Seed Data Contoh Toko Kopi Senja

**Depends on:** T004
**Estimasi:** kecil

## Tujuan
Menyediakan berkas SQL seed data (`supabase/seed.sql`) berisi data awal realistis untuk brand contoh "Kopi Senja" agar antarmuka landing page langsung tampil indah, terisi, dan siap diuji begitu migrasi database diterapkan.

## Baca dulu
- AGENTS.md
- blueprint/02-PROJECT-BRIEF.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `supabase/seed.sql` : Skrip SQL populasi data awal realistis

## Langkah
1. Buat berkas `supabase/seed.sql`.
2. Masukkan 1 baris konfigurasi default pada `site_settings`:
   - Brand: "Kopi Senja"
   - Tagline: "Nikmati Setiap Tegukan Hangat Penuh Cerita"
   - Primary Color: `#7C2D12`
   - Nomor WhatsApp: `6281234567890`
   - Alamat: "Jl. Merpati No. 12, Senopati, Jakarta Selatan"
   - Jam Buka (JSONB): Senin - Jumat 08:00 - 22:00, Sabtu - Minggu 07:00 - 23:00
   - Google Maps Iframe: URL embed contoh lokasi Senopati
3. Masukkan 4 kategori menu pada tabel `categories`:
   - "Espresso & Kopi Susu" (`espresso-kopi-susu`, order 1)
   - "Manual Brew Nusantara" (`manual-brew-nusantara`, order 2)
   - "Minuman Non-Kopi" (`minuman-non-kopi`, order 3)
   - "Camilan & Makanan Ringan" (`camilan-makanan-ringan`, order 4)
4. Masukkan minimal 8 produk contoh pada tabel `products`:
   - "Kopi Susu Gula Aren" (Rp 22.000, kategori Espresso)
   - "Espresso Single Origin" (Rp 18.000, kategori Espresso)
   - "Caramel Macchiato" (Rp 28.000, kategori Espresso)
   - "V60 Aceh Gayo" (Rp 25.000, kategori Manual Brew)
   - "Japanese Iced Drip" (Rp 27.000, kategori Manual Brew)
   - "Matcha Latte Creamy" (Rp 26.000, kategori Non-Kopi)
   - "Croissant Butter Renyah" (Rp 20.000, kategori Camilan)
   - "Kentang Goreng Truffle" (Rp 24.000, kategori Camilan)
   - Berikan gambar placeholder Unsplash bertema coffee untuk masing-masing produk.
5. Masukkan 4 foto galeri pada tabel `gallery` (suasana interior cafe, mesin espresso, barista, seating area outdoor).
6. Masukkan 3 ulasan pelanggan pada tabel `testimonials` (nama, ulasan positif, rating bintang 5, peran: Mahasiswa, Freelancer, Pecinta Kopi).

## Kriteria selesai
- [ ] Berkas `supabase/seed.sql` terbuat dan tidak mengandung syntax error SQL.
- [ ] Data seed mencakup `site_settings`, kategori, minimal 8 produk, galeri, dan testimoni.
- [ ] Nilai harga menu dalam mata uang Rupiah bulat tanpa desimal sen.

## Verifikasi
Pemeriksaan integritas sintaks SQL pada berkas `supabase/seed.sql`.

## Catatan / jebakan
- Gunakan ID kategori yang konsisten saat meng-insert data relasi produk, atau gunakan sub-query: `(SELECT id FROM public.categories WHERE slug = 'espresso-kopi-susu' LIMIT 1)`.
