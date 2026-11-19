# T040 - Dokumentasi README, Setup Guide & Verifikasi Build

**Depends on:** T038, T039
**Estimasi:** sedang

## Tujuan
Menyusun dokumentasi lengkap proyek pada file `README.md` (panduan instalasi lokal, konfigurasi Supabase, pembuatan akun admin awal, dan panduan deployment ke Vercel) serta melakukan verifikasi kompilasi build produksi akhir.

## Baca dulu
- AGENTS.md
- blueprint/00-README.md
- blueprint/02-PROJECT-BRIEF.md
- blueprint/99-FINAL-CHECKLIST.md

## File yang dibuat / diubah
- `README.md` : Dokumentasi lengkap panduan setup developer dan pemilik usaha
- `blueprint/PROGRESS.md` : Memperbarui checklist T040 dan mengisi laporan akhir

## Langkah
1. Buat berkas `README.md` di root proyek dengan struktur panduan:
   - **Tentang Proyek**: Penjelasan singkat template landing page UMKM & coffee shop dengan admin dashboard dan ekspor Excel.
   - **Fitur Utama**: Landing page publik, pemesanan via WhatsApp, manajemen menu & kategori, kustomisasi tema warna dinamis, manajemen pesan kontak, dan export file Excel (.xlsx).
   - **Prasyarat Sistem**: Node.js v20+ dan akun gratis di Supabase & Vercel.
   - **Langkah Setup Supabase (Langkah Demi Langkah)**:
     1. Buat proyek baru di dashboard Supabase.
     2. Buka menu **SQL Editor**, salin dan jalankan skrip `supabase/migrations/001_initial_schema.sql`.
     3. Jalankan skrip `supabase/seed.sql` untuk mengisi data awal toko "Kopi Senja".
     4. Buka menu **Storage**, pastikan bucket `public-media` telah dibuat dengan opsi *Public*.
     5. Buka menu **Authentication** > **Users**, klik *Add User* > *Create User*, masukkan email dan password untuk akun admin pertama.
   - **Setup Lingkungan Lokal**:
     1. Clone repositori dan jalankan `npm install`.
     2. Salin `.env.example` menjadi `.env.local`.
     3. Isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
     4. Jalankan `npm run dev` dan buka `http://localhost:3000`.
     5. Masuk ke dashboard admin di `http://localhost:3000/admin/login`.
   - **Panduan Deployment ke Vercel**:
     1. Push repositori ke GitHub.
     2. Import proyek di dashboard Vercel.
     3. Masukkan Environment Variables yang sama dengan `.env.local`.
     4. Klik *Deploy*.
2. Jalankan perintah kompilasi produksi Next.js `npm run build` untuk memverifikasi bahwa seluruh rute terkompilasi bersih tanpa kegagalan tipe atau missing dependencies.
3. Buka `blueprint/PROGRESS.md`, tandai seluruh task `[x]`, dan isi bagian laporan akhir eksekusi.

## Kriteria selesai
- [ ] Berkas `README.md` memuat instruksi yang jelas, lengkap, dan mudah diikuti dari nol hingga live.
- [ ] Panduan pembuatan akun admin Supabase pertama dijelaskan secara eksplisit.
- [ ] Perintah `npm run build` selesai dengan kode exit 0 (sukses).
- [ ] Seluruh checklist di `blueprint/99-FINAL-CHECKLIST.md` terpenuhi.

## Verifikasi
`npm run build && npx tsc --noEmit`

## Catatan / jebakan
- Jangan mencantumkan API key atau password sensitif asli di dalam `README.md`; gunakan nilai placeholder yang aman.
