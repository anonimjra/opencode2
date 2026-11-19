# T028 - Admin Kelola Produk - Form Tambah & Edit Produk

**Depends on:** T025, T026, T027
**Estimasi:** sedang

## Tujuan
Membangun halaman form tambah produk baru (`app/admin/products/new/page.tsx`) dan form edit produk (`app/admin/products/[id]/edit/page.tsx`) yang didukung komponen form terpadu (`components/admin/ProductForm.tsx`) dengan upload foto ke Supabase Storage dan validasi data.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/products/new/page.tsx` : Halaman pembuatan produk baru
- `app/admin/products/[id]/edit/page.tsx` : Halaman pengubahan produk yang ada
- `components/admin/ProductForm.tsx` : Komponen form serbaguna (create & edit)
- `app/actions/products.ts` : Server Actions untuk `createProduct` dan `updateProduct`

## Langkah
1. Perbarui `app/actions/products.ts`:
   - Implementasikan `createProduct(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak: `name`, `category_id`, `price`, `description`, `sort_order`, `is_available`, file foto jika ada.
     - Unggah foto menggunakan helper storage jika ada file yang dipilih.
     - Insert ke tabel `products`.
     - Revalidasi path `/admin/products` dan `/`.
   - Implementasikan `updateProduct(id: string, formData: FormData): Promise<ActionResponse>`:
     - Ekstrak field dan file foto baru (jika ada pergantian foto).
     - Update record produk di tabel `products`.
     - Revalidasi path.
2. Buat `components/admin/ProductForm.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `initialData?: Product`, `categories: Category[]`, `isEditing?: boolean`.
   - Kolom Form:
     - Nama Produk (Input teks wajib, minimal 3 karakter).
     - Kategori (Select dropdown dari daftar `categories`).
     - Harga (Input angka wajib, format Rupiah).
     - Deskripsi Menu (Textarea opsional, bahan baku / rasa).
     - Urutan Tampil (Input angka, default 0).
     - Status Ketersediaan (Checkbox / Switch: "Tersedia untuk dipesan").
     - Unggah Foto Menu: Integrasikan `ImageUploader` dari T025 dengan pratinjau gambar.
   - Tombol "Simpan Produk" dengan status loading saat submit.
   - Tombol "Batal" (kembali ke `/admin/products`).
3. Buat `app/admin/products/new/page.tsx`:
   - Fetch daftar `categories` dari Supabase.
   - Render `ProductForm` dalam mode pembuatan baru (`isEditing={false}`).
4. Buat `app/admin/products/[id]/edit/page.tsx`:
   - Ambil parameter route `id`.
   - Fetch data produk terkait dan daftar kategori dari Supabase.
   - Jika produk tidak ditemukan, arahkan ke `notFound()`.
   - Render `ProductForm` dengan `initialData` yang terisi lengkap.

## Kriteria selesai
- [ ] Admin dapat membuat menu baru lengkap dengan foto, nama, harga, dan kategori.
- [ ] Admin dapat mengubah data menu yang sudah ada dan mengganti fotonya.
- [ ] Input harga terkonversi dengan benar menjadi format angka Rupiah tanpa desimal sen.
- [ ] Sukses submit otomatis mengarahkan admin kembali ke `/admin/products` dengan notifikasi.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Saat mengedit produk tanpa mengganti foto lama, jangan menghapus URL foto lama atau menimpa kolom `image_url` dengan string kosong.
