# T013 - Section Menu Produk dengan Filter Kategori

**Depends on:** T006, T007, T010
**Estimasi:** sedang

## Tujuan
Membangun komponen Section Menu (`components/landing/MenuSection.tsx`) interaktif dengan tab filter kategori, bilah pencarian cepat, dan grid kartu produk (`components/landing/ProductCard.tsx`) yang menampilkan detail harga Rupiah, status ketersediaan, serta tombol order WhatsApp otomatis.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/ProductCard.tsx` : Kartu produk individual dengan detail & tombol order WA
- `components/landing/MenuSection.tsx` : Komponen interaktif pembungkus katalog menu dengan tab filter

## Langkah
1. Buat `components/landing/ProductCard.tsx`:
   - Terima props `product: Product`, `brandName: string`, `whatsappNumber: string`.
   - Kontainer kartu: `bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-sm hover:shadow-md transition duration-200 flex flex-col`.
   - Area Gambar: Kontainer rasio `aspect-square relative overflow-hidden bg-stone-100`.
     - Gunakan `next/image` dengan hover zoom halus.
     - Badge ketersediaan: Jika `is_available === false`, beri overlay transparan dengan badge merah *"Habis"*.
     - Badge kategori: Ditampilkan di sudut kiri atas gambar.
   - Area Konten:
     - Nama produk: `font-semibold text-stone-900 text-lg`.
     - Deskripsi: `text-sm text-stone-500 line-clamp-2 mt-1`.
     - Harga: Format Rupiah tebal menggunakan `formatRupiah(product.price)` dengan warna aksen primary.
   - Area Tombol Aksi:
     - Tombol "Pesan via WhatsApp": Jika `is_available === true`, tautan dibuat melalui `generateWhatsAppOrderLink(...)`.
     - Jika `is_available === false`, tombol dinonaktifkan (`disabled`) dengan teks *"Stok Habis"*.
2. Buat `components/landing/MenuSection.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `categories: Category[]`, `products: Product[]`, `brandName: string`, `whatsappNumber: string`.
   - Kelola state klien: `selectedCategory` ('all' atau category.id) dan `searchQuery` (string).
   - Filter daftar produk secara reaktif berdasarkan kategori terpilih dan kata kunci pencarian nama produk.
   - Baris Tab Filter: Tombol tab horizontal yang bisa digeser (horizontal scrollable) di layar mobile.
     - Tab pertama: "Semua Menu".
     - Tab selanjutnya: Berdasarkan daftar `categories` yang diurutkan oleh `sort_order`.
   - Render grid produk: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8`.
   - State kosong (Empty State): Jika tidak ada produk yang cocok dengan filter, tampilkan ilustrasi atau teks *"Tidak ada menu yang sesuai dalam kategori ini."*.

## Kriteria selesai
- [ ] Section memiliki `id="menu"` untuk target navigasi.
- [ ] Tab filter kategori menyaring daftar kartu produk secara instan tanpa reload halaman.
- [ ] Kartu produk menampilkan nama, harga format Rupiah, dan status ketersediaan.
- [ ] Tombol pemesanan WhatsApp memuat template pesan otomatis berisi nama produk yang tepat.
- [ ] Produk habis dinonaktifkan dari pemesanan.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan melakukan fetch ulang ke server saat berpindah tab kategori; data awal sudah diteruskan sebagai props sehingga filtering terjadi murni di memori klien dengan performa instan (0ms latency).
