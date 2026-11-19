# T019 - Footer Publik & Tautan Media Sosial

**Depends on:** T006, T008
**Estimasi:** kecil

## Tujuan
Membangun komponen Footer (`components/landing/Footer.tsx`) yang menyajikan informasi identitas brand, navigasi tautan cepat, jam buka ringkas, ikon media sosial (Instagram, TikTok, Facebook), dan hak cipta tahun berjalan.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/Footer.tsx` : Komponen footer publik

## Langkah
1. Buat `components/landing/Footer.tsx`.
2. Terima props `brandName: string`, `tagline: string`, `address: string`, `whatsappNumber: string`, `instagramUrl?: string | null`, `tiktokUrl?: string | null`, `facebookUrl?: string | null`.
3. Tata letak footer:
   - Kontainer `bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800`.
   - Grid 4 kolom pada desktop (`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10`):
     - Kolom 1 (Identitas Brand): Nama brand berukuran besar, tagline usaha, dan deskripsi singkat.
     - Kolom 2 (Navigasi Cepat): Tautan cepat ke `#hero`, `#about`, `#menu`, `#gallery`, `#testimonials`, `#location`.
     - Kolom 3 (Kontak & Kunjungan): Alamat kedai ringkas, nomor WhatsApp aktif, dan catatan ramah pemesanan.
     - Kolom 4 (Media Sosial & Komunitas): Tautan ikon media sosial dengan tombol interaktif (Instagram, TikTok, Facebook) yang membuka tab baru.
   - Baris Bawah (Copyright Bar):
     - Garis pemisah `border-t border-stone-800 pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500`.
     - Teks: `© {new Date().getFullYear()} {brandName}. Hak Cipta Dilindungi.`
     - Tautan kecil: Link menuju `/admin/login` (*"Akses Pengelola"*).

## Kriteria selesai
- [ ] Footer tampil elegan dengan warna gelap kontras tinggi.
- [ ] Tahun pada copyright otomatis dinamis mengikuti tahun berjalan sistem.
- [ ] Tautan media sosial mengarah ke URL eksternal dengan atribut `target="_blank" rel="noopener noreferrer"`.
- [ ] Tersedia tautan diskrit menuju halaman login admin.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan menampilkan link sosial media yang bernilai `null` atau kosong dari konfigurasi database agar tidak menghasilkan broken link.
