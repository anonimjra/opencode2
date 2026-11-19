# T010 - Navbar Publik & Mobile Drawer Menu

**Depends on:** T007, T008
**Estimasi:** sedang

## Tujuan
Membangun komponen bilah navigasi publik (`components/landing/Navbar.tsx`) yang sticky/fixed dengan logo dinamis, tautan navigasi smooth-scroll, tombol CTA WhatsApp cepat, dan menu drawer responsif untuk perangkat seluler.

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/Navbar.tsx` : Komponen navigasi utama publik (desktop & mobile)
- `components/landing/MobileDrawer.tsx` : Komponen drawer sliding menu untuk layar ponsel
- `components/ui/Button.tsx` : Komponen tombol UI atomik dasar

## Langkah
1. Buat direktori `components/ui/` dan `components/landing/`.
2. Buat `components/ui/Button.tsx`:
   - Dukung variants: `primary`, `secondary`, `outline`, `whatsapp`, `ghost`.
   - Dukung sizes: `sm`, `md`, `lg`.
   - Dukung properti `isLoading` dengan spinner ikon Lucide.
3. Buat `components/landing/MobileDrawer.tsx`:
   - Tandai dengan `'use client'`.
   - Kelola state buka/tutup drawer (`isOpen`, `onClose`).
   - Sediakan backdrop gelap semi-transparan dengan animasi transisi.
   - Tampilkan link navigasi (Beranda `#hero`, Tentang `#about`, Menu `#menu`, Galeri `#gallery`, Testimoni `#testimonials`, Kontak `#contact`).
   - Setiap link diklik otomatis menutup drawer.
4. Buat `components/landing/Navbar.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `brandName: string`, `logoUrl?: string | null`, `whatsappNumber: string`.
   - Atur posisi `sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-stone-200/80 transition-all`.
   - Sisi kiri: Logo gambar (jika ada) dan teks `brandName` dengan styling elegan.
   - Sisi tengah (desktop): Link navigasi horizontal `#hero`, `#about`, `#menu`, `#gallery`, `#testimonials`, `#contact`.
   - Sisi kanan (desktop): Tombol CTA "Pesan WhatsApp" (`Button variant="whatsapp"`).
   - Tombol hamburger ikon `Menu` dari `lucide-react` untuk memicu `MobileDrawer` pada layar `< md`.

## Kriteria selesai
- [ ] Navbar menempel di bagian atas saat halaman di-scroll (`sticky top-0`).
- [ ] Tautan navigasi mengarah ke id section yang sesuai dengan transisi halus.
- [ ] Drawer menu terbuka dan tertutup dengan mulus pada layar mobile.
- [ ] Komponen `Button` atomik berfungsi dengan berbagai variant.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Kunci scroll body (`document.body.style.overflow = 'hidden'`) ketika drawer mobile sedang terbuka agar layar di belakangnya tidak ikut bergulir.
