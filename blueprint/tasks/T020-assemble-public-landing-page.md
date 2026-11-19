# T020 - Assembling Landing Page dengan Data Fetching Supabase

**Depends on:** T003, T008, T009, T010, T011, T012, T013, T014, T015, T016, T017, T018, T019
**Estimasi:** sedang

## Tujuan
Mengintegrasikan seluruh komponen section publik ke dalam halaman utama (`app/(public)/page.tsx`) sebagai Server Component yang melakukan pemanggilan data paralel ke Supabase dengan caching ISR dan fallback data yang andal.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `app/(public)/page.tsx` : Halaman landing page utama publik
- `lib/data/landing.ts` : Helper service pengambil data publik dari Supabase

## Langkah
1. Buat berkas `lib/data/landing.ts`:
   - Buat fungsi `getLandingPageData()` yang melakukan query data secara paralel menggunakan `Promise.all`:
     1. Ambil 1 baris dari `site_settings` (jika null, gunakan fallback mock "Kopi Senja").
     2. Ambil seluruh baris dari `categories` diurutkan berdasarkan `sort_order ASC`.
     3. Ambil seluruh produk dari `products` dengan join kategori, diurutkan berdasarkan `sort_order ASC, created_at DESC`.
     4. Ambil foto dari `gallery` diurutkan `sort_order ASC`.
     5. Ambil ulasan dari `testimonials` di mana `is_active = true` diurutkan `sort_order ASC`.
   - Kembalikan objek terstruktur berisi kelima kumpulan data tersebut.
2. Buat berkas `app/(public)/page.tsx`:
   - Jadikan sebagai async Server Component.
   - Atur revalidasi: `export const revalidate = 3600; // Cache 1 jam, dengan revalidasi on-demand saat mutasi admin`.
   - Panggil `const data = await getLandingPageData()`.
   - Susun komponen secara berurutan:
     1. `<Navbar brandName={...} logoUrl={...} whatsappNumber={...} />`
     2. `<HeroSection ... />`
     3. `<AboutSection ... />`
     4. `<MenuSection categories={...} products={...} ... />`
     5. `<GallerySection items={...} />`
     6. `<TestimonialSection testimonials={...} />`
     7. `<LocationSection address={...} openingHours={...} googleMapsEmbedUrl={...} ... />`
     8. `<ContactSection />`
     9. `<Footer ... />`
     10. `<WhatsAppFloatingButton whatsappNumber={...} brandName={...} />`
3. Bungkus layout dengan `ThemeProvider` untuk meneruskan nilai `primary_color` dari database.

## Kriteria selesai
- [ ] Halaman `/` berhasil di-render tanpa hydration error atau server error.
- [ ] Seluruh data (kategori, produk, foto galeri, testimoni, konfigurasi toko) termuat dengan tepat dari Supabase.
- [ ] Landing page dapat di-scroll mulus dari atas ke bawah dan seluruh tombol berfungsi semestinya.

## Verifikasi
`npm run build`

## Catatan / jebakan
- Selalu berikan fallback default jika tabel database masih kosong agar halaman landing page tidak melempar runtime error 500 saat diakses pertama kali sebelum seed diaplikasikan.
