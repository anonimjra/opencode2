# T031 - Admin Kelola Galeri Foto

**Depends on:** T023, T025
**Estimasi:** sedang

## Tujuan
Membangun modul manajemen galeri foto di `/admin/gallery` yang memungkinkan admin mengunggah foto-foto baru suasana atau kegiatan kedai ke Supabase Storage, menulis judul/caption, mengatur urutan tampil, dan menghapus foto lama.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/gallery/page.tsx` : Halaman manajemen galeri
- `components/admin/GalleryManager.tsx` : Komponen grid galeri, modal upload, dan form caption
- `app/actions/gallery.ts` : Server Actions mutasi foto galeri (upload, edit info, delete)

## Langkah
1. Buat `app/actions/gallery.ts`:
   - Deklarasikan `'use server'`.
   - Implementasikan `addGalleryPhoto(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak berkas foto, `title`, `caption`, `sort_order`.
     - Unggah file ke Supabase Storage pada folder `gallery/`.
     - Simpan record baru ke tabel `gallery`.
     - Revalidasi path `/admin/gallery` dan `/`.
   - Implementasikan `updateGalleryPhoto(id: string, title: string, caption: string, sortOrder: number): Promise<ActionResponse>`:
     - Update metadata foto pada tabel `gallery`.
     - Revalidasi path.
   - Implementasikan `deleteGalleryPhoto(id: string, imagePath?: string): Promise<ActionResponse>`:
     - Hapus record dari database.
     - Hapus berkas foto dari Supabase Storage.
     - Revalidasi path.
2. Buat `components/admin/GalleryManager.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `items: GalleryItem[]`.
   - Header: Tombol "Unggah Foto Baru" (membuka modal upload).
   - Modal Upload Foto: Pemilih file gambar, pratinjau, input judul foto opsional, caption, dan input urutan.
   - Grid Galeri Admin: Tampilkan kartu foto berbentuk grid kartu dengan thumbnail, judul/caption, urutan tampil, tombol edit keterangan, dan tombol hapus foto dengan dialog konfirmasi.
3. Buat `app/admin/gallery/page.tsx`:
   - Server Component yang memanggil seluruh foto dari tabel `gallery` diurutkan berdasarkan `sort_order ASC, created_at DESC`.
   - Render `GalleryManager`.

## Kriteria selesai
- [ ] Admin dapat mengunggah foto baru ke dalam galeri kedai.
- [ ] Foto baru otomatis tersimpan ke Supabase Storage dan tercatat di database.
- [ ] Keterangan foto (judul, caption, urutan) dapat diedit.
- [ ] Menghapus foto berhasil menghapus baris database sekaligus membersihkan berkas di Supabase Storage.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan mengizinkan submit form upload foto sebelum file gambar dipilih oleh pengguna.
