# T015 - Section Galeri Foto Showcase

**Depends on:** T006, T008
**Estimasi:** kecil

## Tujuan
Membangun komponen Galeri Foto (`components/landing/GallerySection.tsx`) yang menampilkan dokumentasi visual suasana tempat, racikan minuman, dan aktivitas kedai dalam layout grid foto yang responsif dan rapi.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/GallerySection.tsx` : Komponen showcase galeri foto publik
- `components/ui/Modal.tsx` : Komponen modal lightbox sederhana untuk pratinjau foto resolusi penuh

## Langkah
1. Buat `components/ui/Modal.tsx`:
   - Komponen modal dialog yang dapat ditutup melalui tombol 'X', tombol keyboard `Escape`, atau klik pada backdrop.
2. Buat `components/landing/GallerySection.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `items: GalleryItem[]`.
   - Kontainer section: `id="gallery"`, padding vertikal `py-20 bg-stone-50`.
   - Header section: Judul *"Suasana & Galeri"* dan subjudul singkat *"Intip momen hangat dan racikan istimewa di sudut kedai kami."*.
   - Tata letak grid: `grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-10`.
   - Item foto:
     - Kontainer `relative aspect-square rounded-2xl overflow-hidden group cursor-pointer shadow-sm hover:shadow-lg transition-all`.
     - Gunakan `next/image` dengan hover zoom effect (`group-hover:scale-110 transition-transform duration-500`).
     - Overlay gelap saat kursor melayang (`opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 flex items-end p-4`).
     - Tampilkan judul atau caption foto di atas overlay.
   - Interaktivitas Lightbox: Ketika foto diklik, buka modal pop-up menampilkan foto besar beserta caption lengkap.

## Kriteria selesai
- [ ] Section memiliki `id="gallery"`.
- [ ] Foto tersusun rapi dalam 2 kolom pada ponsel dan 4 kolom pada desktop.
- [ ] Mengklik foto membuka pratinjau foto lebih besar tanpa mengganggu alur halaman.
- [ ] Gambar menggunakan `next/image` dengan alt text sesuai judul/caption.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jika data `items` dari database kosong (belum diupload oleh admin), section harus menampilkan placeholder minimalis ramah atau tidak memicu error `undefined.map()`.
