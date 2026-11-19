# T027 - Admin Kelola Produk - List, Search & Status

**Depends on:** T003, T006, T023, T026
**Estimasi:** sedang

## Tujuan
Membangun halaman katalog produk admin (`app/admin/products/page.tsx`) dengan tabel interaktif (`components/admin/ProductListTable.tsx`) yang memiliki fitur pencarian nama produk, filter kategori, toggle cepat ketersediaan (tersedia/habis), tombol hapus, tombol navigasi edit, dan tombol export Excel.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `app/admin/products/page.tsx` : Halaman tabel data produk menu
- `components/admin/ProductListTable.tsx` : Komponen tabel interaktif dengan pencarian dan filter
- `app/actions/products.ts` : Server Actions mutasi status ketersediaan dan penghapusan produk

## Langkah
1. Buat atau perbarui `app/actions/products.ts`:
   - Deklarasikan `'use server'`.
   - Implementasikan `toggleProductAvailability(id: string, isAvailable: boolean): Promise<ActionResponse>`:
     - Update kolom `is_available` pada tabel `products`.
     - Lakukan `revalidatePath('/admin/products')` dan `revalidatePath('/')`.
   - Implementasikan `deleteProduct(id: string, imagePath?: string): Promise<ActionResponse>`:
     - Hapus record produk dari database.
     - Jika ada file foto di Supabase Storage, panggil `deleteMediaFile()`.
     - Lakukan revalidasi path rute terkait.
2. Buat `components/admin/ProductListTable.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `products: Product[]`, `categories: Category[]`.
   - State klien: `searchQuery`, `selectedCategoryFilter`.
   - Kolom Tabel:
     1. Foto Pratinjau (thumbnail kecil bulat atau rounded)
     2. Nama Produk & Deskripsi Singkat
     3. Kategori Produk
     4. Harga Format Rupiah
     5. Status Ketersediaan (Switch toggle atau tombol badge "Tersedia" / "Habis")
     6. Urutan Tampil
     7. Aksi (Tombol Edit -> link ke `/admin/products/[id]/edit`, Tombol Hapus dengan konfirmasi)
3. Buat `app/admin/products/page.tsx`:
   - Server Component yang memanggil data produk lengkap (dengan join kategori) dan daftar kategori dari Supabase.
   - Header Halaman: Judul "Katalog Produk & Menu", tombol "Tambah Produk Baru" (menuju `/admin/products/new`), dan placeholder tombol "Export Excel".
   - Render tabel data menggunakan `ProductListTable`.

## Kriteria selesai
- [ ] Daftar produk tampil lengkap dengan thumbnail, kategori, dan harga format Rupiah.
- [ ] Fitur pencarian menyaring daftar produk berdasarkan nama secara langsung.
- [ ] Mengklik toggle ketersediaan memperbarui status di database dan me-revalidate tampilan publik.
- [ ] Tombol hapus menghapus produk setelah melewati konfirmasi dialog.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan saat menghapus produk, berkas foto yang tersimpan di Supabase Storage juga ikut dibersihkan agar tidak menumpuk sampah berkas yang menghabiskan kuota gratis storage.
