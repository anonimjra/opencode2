# T026 - Admin Kelola Kategori Produk Menu

**Depends on:** T003, T006, T023
**Estimasi:** sedang

## Tujuan
Membangun modul manajemen kategori produk di halaman `/admin/categories` beserta Server Actions (`app/actions/categories.ts`) untuk menambah kategori baru, mengedit nama kategori, mengatur urutan tampil, dan menghapus kategori.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/categories/page.tsx` : Halaman daftar dan manajemen kategori
- `app/actions/categories.ts` : Server Actions mutasi data kategori (create, update, delete)
- `components/admin/CategoryList.tsx` : Komponen tabel data kategori dan modal form tambah/edit

## Langkah
1. Buat `app/actions/categories.ts`:
   - Deklarasikan `'use server'`.
   - Implementasikan `createCategory(name: string, sortOrder: number): Promise<ActionResponse>`:
     - Generate slug unik dari `name` menggunakan `slugify()`.
     - Insert ke tabel `categories`.
     - Jalankan `revalidatePath('/admin/categories')` dan `revalidatePath('/')`.
   - Implementasikan `updateCategory(id: string, name: string, sortOrder: number): Promise<ActionResponse>`:
     - Update nama, slug, dan sort_order kategori.
     - Lakukan revalidasi cache rute.
   - Implementasikan `deleteCategory(id: string): Promise<ActionResponse>`:
     - Periksa apakah masih ada produk yang menggunakan kategori ini.
     - Jika ada, batalkan dan beri peringatan bahasa Indonesia: *"Kategori tidak dapat dihapus karena masih digunakan oleh beberapa produk menu."*.
     - Hapus kategori dari database dan revalidasi cache rute.
2. Buat `components/admin/CategoryList.tsx`:
   - Tandai dengan `'use client'`.
   - Tampilkan tabel daftar kategori: Nama, Slug, Urutan Tampil (sort_order), Jumlah Produk Terkait, dan Tombol Aksi (Edit, Hapus).
   - Modal Form Tambah / Edit Kategori dengan validasi input.
   - Konfirmasi dialog sebelum menghapus kategori untuk mencegah klik tidak sengaja.
3. Buat `app/admin/categories/page.tsx`:
   - Server Component yang mengambil daftar kategori beserta jumlah relasi produk (`categories(*, products(count))`) dari Supabase.
   - Render header halaman dengan tombol "Tambah Kategori Baru".
   - Render komponen `<CategoryList categories={...} />`.

## Kriteria selesai
- [ ] Admin dapat membuat kategori menu baru dengan nama dan urutan tampil.
- [ ] Slug terbuat secara otomatis dan unik.
- [ ] Kategori yang masih menaungi produk tidak dapat dihapus secara sepihak.
- [ ] Perubahan kategori langsung memicu revalidasi pada landing page publik.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan menghapus kategori secara sembrono jika foreign key `ON DELETE SET NULL` akan menyebabkan produk menjadi tanpa kategori (orphan category); berikan feedback pencegahan yang edukatif kepada admin.
