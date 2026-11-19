# T011 - Hero Section Landing Page

**Depends on:** T007, T008, T010
**Estimasi:** kecil

## Tujuan
Membangun komponen Hero Section (`components/landing/HeroSection.tsx`) yang menarik, menampilkan headline sambutan, sub-headline, badge indikator status buka/tutup toko, tombol CTA aksi, dan gambar latar/showcase yang dioptimalkan dengan `next/image`.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/HeroSection.tsx` : Komponen tampilan Hero banner publik
- `components/ui/Badge.tsx` : Komponen badge status atomik

## Langkah
1. Buat `components/ui/Badge.tsx`:
   - Dukung variants: `default`, `success`, `destructive`, `outline`.
   - Dukung dot indicator bulat beranimasi.
2. Buat `components/landing/HeroSection.tsx`:
   - Terima props `title: string`, `subtitle: string`, `imageUrl?: string | null`, `brandName: string`, `whatsappNumber: string`.
   - Struktur kontainer: `relative min-h-[85vh] flex items-center justify-center overflow-hidden py-20 px-4 sm:px-6 lg:px-8`.
   - Latar belakang: Gunakan `next/image` dengan properti `fill`, `priority={true}`, `object-cover`, dilapisi overlay gradient gelap semi-transparan (`bg-stone-900/60 backdrop-blur-[1px]`) agar teks terbaca tajam.
   - Konten teks:
     - Badge selamat datang / status operasional: *"Kedai Kopi Artisanal Nusantara"*.
     - Headline judul besar (`text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight`).
     - Sub-headline deskriptif (`text-lg sm:text-xl text-stone-200 max-w-2xl mt-4 leading-relaxed`).
   - Tombol Aksi (CTA Group):
     - Tombol 1: "Lihat Daftar Menu" (Anchor link ke `#menu`, gaya primary solid).
     - Tombol 2: "Order via WhatsApp" (Tautan langsung membuka chat WA, gaya whatsapp solid atau outline putih).

## Kriteria selesai
- [ ] Hero section tampil proporsional di mobile (360px) dan desktop (1280px).
- [ ] Gambar hero menggunakan properti `priority` untuk Largest Contentful Paint (LCP) yang cepat.
- [ ] Teks memiliki kontras tajam di atas latar belakang gambar.
- [ ] Tombol CTA mengarahkan ke section `#menu` dan link chat WhatsApp dengan benar.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan lupa memberikan fallback gambar lokal default (misal `/images/hero-bg.jpg`) jika `imageUrl` dari Supabase bernilai kosong atau belum diset oleh admin.
