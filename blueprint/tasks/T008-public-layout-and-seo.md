# T008 - Public Layout, Font Loader, & SEO Meta Tags

**Depends on:** T001, T002, T006
**Estimasi:** kecil

## Tujuan
Menyiapkan root layout aplikasi (`app/layout.tsx`) dan layout publik (`app/(public)/layout.tsx`) dengan font loader Google, viewport mobile-first, dan metadata SEO dinamis (Title, Description, Open Graph, Favicon).

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `app/layout.tsx` : Root layout utama dengan deklarasi tag `<html>`, `<body>`, dan font loader
- `app/(public)/layout.tsx` : Layout pembungkus area publik (menyediakan Navbar, Footer, dan Floating WhatsApp)

## Langkah
1. Buat atau perbarui `app/layout.tsx`:
   - Muat font `Plus Jakarta Sans` dari `next/font/google` dengan subset `latin`.
   - Konfigurasikan objek metadata Next.js:
     - `title`: `{ default: 'Kopi Senja - Kedai Kopi & Tempat Santai Nyaman', template: '%s | Kopi Senja' }`
     - `description`: 'Katalog menu kopi nusantara, cemilan lezat, dan suasana santai. Pesan langsung lewat WhatsApp.'
     - `metadataBase`: `new URL('https://kopisenja.example.com')`
     - Open Graph tags (`title`, `description`, `type: 'website'`, `locale: 'id_ID'`).
   - Sertakan viewport: `width: 'device-width', initialScale: 1, maximumScale: 5`.
   - Pasang class font pada `<body>` dengan background netral `bg-stone-50` dan teks `text-stone-900`.
2. Buat `app/(public)/layout.tsx`:
   - Menjadi Server Component wrapper untuk semua halaman publik.
   - Render placeholder container untuk children komponen.

## Kriteria selesai
- [ ] Root layout me-load font Google secara optimal tanpa layout shift (CLS).
- [ ] Metadata title, description, dan Open Graph terkonfigurasi dalam bahasa Indonesia.
- [ ] Viewport mobile responsif terpasang dengan benar.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan mendefinisikan tag `<html>` atau `<body>` ganda di dalam `app/(public)/layout.tsx`, tag tersebut hanya boleh ada di `app/layout.tsx`.
