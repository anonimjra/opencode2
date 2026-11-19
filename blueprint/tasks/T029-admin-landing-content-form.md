# T029 - Admin Kelola Konten Teks Landing Page

**Depends on:** T023, T025
**Estimasi:** sedang

## Tujuan
Membangun halaman manajemen konten landing page (`app/admin/content/page.tsx`) dan form editor (`components/admin/LandingContentForm.tsx`) untuk memperbarui teks Hero, cerita Tentang Kami, jam operasional tiap hari, alamat, nomor WhatsApp pemesanan, dan tautan media sosial.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/content/page.tsx` : Halaman editor konten landing
- `components/admin/LandingContentForm.tsx` : Form input teks dan jam operasional
- `app/actions/content.ts` : Server Action update konfigurasi tabel `site_settings`

## Langkah
1. Buat `app/actions/content.ts`:
   - Deklarasikan `'use server'`.
   - Implementasikan fungsi `updateLandingContent(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak teks Hero (`hero_title`, `hero_subtitle`), Tentang Kami (`about_title`, `about_description`), Kontak & Alamat (`address`, `whatsapp_number`, `google_maps_embed_url`), Media Sosial (`instagram_url`, `tiktok_url`, `facebook_url`), dan array JSON Jam Operasional (`opening_hours`).
     - Tangani upload gambar Hero dan gambar Tentang Kami jika admin mengunggah file baru.
     - Update record singleton pada tabel `site_settings`.
     - Lakukan `revalidatePath('/')` dan `revalidatePath('/admin/content')`.
2. Buat `components/admin/LandingContentForm.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `settings: SiteSettings`.
   - Susun dalam beberapa tab atau kartu terpisah:
     - Kartu 1: Bagian Hero (Judul banner, subjudul, ganti gambar background).
     - Kartu 2: Bagian Tentang Kami (Judul cerita, isi cerita, ganti foto cerita).
     - Kartu 3: Kontak & WhatsApp (Nomor WA pemesanan format 62..., alamat fisik toko, URL embed peta).
     - Kartu 4: Jam Operasional (Editor baris hari & jam dinamis, tambah baris hari baru / hapus baris).
     - Kartu 5: Tautan Media Sosial (Instagram, TikTok, Facebook).
   - Tombol "Simpan Seluruh Perubahan Konten" dengan status feedback sukses bahasa Indonesia.
3. Buat `app/admin/content/page.tsx`:
   - Server Component yang memanggil data `site_settings` dari Supabase.
   - Render `LandingContentForm` dengan data pengaturan saat ini.

## Kriteria selesai
- [ ] Admin dapat memperbarui seluruh teks pada landing page publik tanpa coding.
- [ ] Jam operasional dapat ditambah atau diubah barisnya secara dinamis.
- [ ] Nomor WhatsApp pengelola tersimpan dengan format yang benar.
- [ ] Perubahan langsung tercermin di landing page publik segera setelah tombol simpan ditekan.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Validasi nomor WhatsApp agar diawali dengan kode negara (misal 62) atau otomatis konversi awalan 0 menjadi 62 sebelum disimpan ke database.
