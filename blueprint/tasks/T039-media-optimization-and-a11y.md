# T039 - Optimasi Media next/image, Mobile & Aksesibilitas

**Depends on:** T020, T028, T031
**Estimasi:** sedang

## Tujuan
Melakukan audit dan optimasi menyeluruh pada penanganan aset gambar (`next/image`), rasio aspek, responsivitas layar ponsel kecil (360px), serta kepatuhan aksesibilitas web dasar (label ARIA, navigasi keyboard, kontras warna).

## Baca dulu
- AGENTS.md
- blueprint/05-CONVENTIONS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `next.config.ts` : Verifikasi remote patterns hostname Supabase Storage dan optimasi format WebP/AVIF
- `components/landing/Navbar.tsx` : Penyesuaian atribut aksesibilitas tombol menu
- `components/landing/ProductCard.tsx` : Penyesuaian `sizes` responsif pada tag `next/image`
- `components/landing/GallerySection.tsx` : Penyesuaian `sizes` dan alt text deskriptif

## Langkah
1. Konfigurasikan optimasi media pada `next.config.ts`:
   - Pastikan properti `images.formats = ['image/avif', 'image/webp']` aktif.
   - Daftarkan wildcard domain Supabase Storage:
     ```typescript
     images: {
       remotePatterns: [
         {
           protocol: 'https',
           hostname: '**.supabase.co',
           pathname: '/storage/v1/object/public/**',
         },
         {
           protocol: 'https',
           hostname: 'images.unsplash.com', // Untuk mock seed photos
         },
       ],
     },
     ```
2. Audit komponen gambar pada `ProductCard` dan `GallerySection`:
   - Pasang atribut `sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"` agar browser mengunduh resolusi gambar yang proporsional dengan lebar layar.
   - Pastikan seluruh tag `<Image />` memiliki properti `alt` yang tidak kosong.
3. Audit Aksesibilitas & Navigasi Keyboard:
   - Tambahkan `aria-label` pada tombol ikon (tombol close modal, tombol hamburger drawer, tombol floating WhatsApp).
   - Pastikan outline fokus (`focus-visible:ring-2 focus-visible:ring-primary`) terlihat jelas saat navigasi menggunakan tombol `Tab` keyboard.
4. Audit Responsivitas Layar Sempit (360px):
   - Periksa seluruh section landing page publik agar tidak terjadi overflow horizontal (`overflow-x: hidden` pada container utama jika diperlukan).

## Kriteria selesai
- [ ] Gambar dioptimalkan dan disajikan dalam format WebP/AVIF secara otomatis oleh Next.js.
- [ ] Tidak ada peringatan "missing alt property" pada konsol build.
- [ ] Navigasi halaman tidak bergeser ke samping secara horizontal pada resolusi 360px.
- [ ] Seluruh tombol interaktif dapat difokuskan dan dioperasikan menggunakan keyboard.

## Verifikasi
`npm run build`

## Catatan / jebakan
- Jangan gunakan gambar mentah berukuran multi-megabyte tanpa pembatasan ukuran di sisi client; selalu manfaatkan kompresi bawaan `next/image`.
