# T012 - Section Tentang Kami (Story & Value)

**Depends on:** T007, T008
**Estimasi:** kecil

## Tujuan
Membangun komponen Section "Tentang Kami" (`components/landing/AboutSection.tsx`) yang menceritakan latar belakang usaha, nilai keunggulan produk/tempat, dan menampilkan foto showcase dengan komposisi dua kolom responsif.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/AboutSection.tsx` : Komponen visual Tentang Kami & nilai jual brand

## Langkah
1. Buat `components/landing/AboutSection.tsx`.
2. Terima props `title: string`, `description: string`, `imageUrl?: string | null`, `brandName: string`.
3. Struktur tata letak:
   - Kontainer section dengan `id="about"` dan padding vertikal `py-20 lg:py-28 bg-white`.
   - Grid 2 kolom responsif (`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center`).
4. Kolom Gambar (Kiri/Mobile Atas):
   - Kontainer gambar berbingkai dengan `rounded-3xl overflow-hidden shadow-xl aspect-[4/3] relative`.
   - Render gambar menggunakan `next/image` dengan properti `fill` dan `object-cover`.
   - Berikan elemen aksen dekoratif (kartu kecil mengambang di pojok, misal *"100% Biji Kopi Asli Indonesia"* dengan ikon centang atau bintang).
5. Kolom Teks (Kanan):
   - Badge kecil: *"Tentang Kami"*.
   - Judul section: `title` (contoh: *"Cerita Dari Secangkir Kopi Kami"*).
   - Paragraf cerita: `description` dengan teks `text-stone-600 leading-relaxed text-base lg:text-lg`.
   - Tiga kartu poin keunggulan singkat (Feature highlights):
     1. *"Bahan Baku Pilihan"*: Menggunakan biji kopi segar langsung dari petani lokal.
     2. *"Tempat Nyaman & Santai"*: Dilengkapi Wi-Fi cepat, stopkontak, dan suasana tenang.
     3. *"Pelayanan Ramah & Hangat"*: Barista berpengalaman siap menyajikan racikan terbaik.

## Kriteria selesai
- [ ] Section memiliki elemen HTML dengan atribut `id="about"` untuk target tautan navbar.
- [ ] Tampilan responsif berubah dari satu kolom di mobile menjadi dua kolom sejajar di layar desktop.
- [ ] Gambar menggunakan `next/image` dengan aspek rasio terjaga.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Format paragraf panjang dari database mungkin memiliki pemisah baris baru (`\n`). Gunakan styling `whitespace-pre-line` pada elemen teks agar pemisahan paragraf tampil natural.
