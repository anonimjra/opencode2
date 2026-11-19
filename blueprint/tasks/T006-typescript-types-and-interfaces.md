# T006 - Definisi TypeScript Types & Database Interfaces

**Depends on:** T001
**Estimasi:** kecil

## Tujuan
Membuat file definisi tipe TypeScript (`types/database.ts` dan `types/index.ts`) yang merepresentasikan entitas database, bentuk respon Server Action, serta DTO form input untuk menjamin kepatuhan type-safety di seluruh aplikasi.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `types/database.ts` : Tipe skema tabel Supabase (SiteSettings, Category, Product, GalleryItem, Testimonial, ContactMessage)
- `types/index.ts` : Tipe DTO, ActionResponse, filter state, dan form payload

## Langkah
1. Buat direktori `types/`.
2. Buat berkas `types/database.ts`:
   - Deklarasikan tipe `SiteSettings`, `Category`, `Product`, `GalleryItem`, `Testimonial`, dan `ContactMessage`.
   - Sertakan properti opsional `category?: Category | null` pada tipe `Product` untuk hasil query dengan join Supabase (`products(*, category:categories(*))`).
3. Buat berkas `types/index.ts`:
   - Export generic type `ActionResponse<T = unknown>` dengan format `{ success: boolean; data?: T; error?: string }`.
   - Buat interface payload form: `ProductFormInput`, `SiteSettingsFormInput`, `CategoryFormInput`, `TestimonialFormInput`, `ContactFormInput`.
   - Buat type filter menu: `MenuCategoryFilter = string` (berisi slug kategori atau 'all').

## Kriteria selesai
- [ ] Berkas `types/database.ts` dan `types/index.ts` terbuat tanpa error tipe.
- [ ] Seluruh field tabel database di `06-DATA-MODEL.md` terpetakan secara akurat.
- [ ] Tipe `ActionResponse` tersedia untuk standarisasi output Server Actions.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan tipe angka Rupiah menggunakan `number` di TypeScript, dan tanggal bertipe `string` (representasi ISO timestamp dari Supabase).
