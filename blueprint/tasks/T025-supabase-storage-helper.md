# T025 - Supabase Storage Helper untuk Upload Foto

**Depends on:** T003, T004
**Estimasi:** sedang

## Tujuan
Membuat modul helper utilitas upload berkas gambar (`lib/supabase/storage.ts`) ke Supabase Storage Bucket `public-media` dengan validasi ketat terhadap ukuran file (maksimal 2MB), format MIME yang diizinkan (JPEG, PNG, WebP), sanitasi nama file unik, dan fungsi hapus file.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/05-CONVENTIONS.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `lib/supabase/storage.ts` : Modul fungsi upload dan delete Supabase Storage
- `components/shared/ImageUploader.tsx` : Komponen antarmuka pratinjau dan pemilih file gambar

## Langkah
1. Buat `lib/supabase/storage.ts`:
   - Deklarasikan konstanta:
     - `BUCKET_NAME = 'public-media'`
     - `MAX_FILE_SIZE = 2 * 1024 * 1024` (2 Megabytes)
     - `ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/webp']`
   - Implementasikan fungsi `validateImageFile(file: File): { valid: boolean; error?: string }`:
     - Periksa apakah ukuran file melebihi 2MB.
     - Periksa apakah MIME type terdaftar dalam `ALLOWED_MIME_TYPES`.
   - Implementasikan fungsi `uploadMediaFile(file: File, folder: 'products' | 'gallery' | 'brand'): Promise<ActionResponse<{ url: string; path: string }>>`:
     - Jalankan validasi file.
     - Buat nama file unik: `${folder}/${Date.now()}-${slugify(file.name.replace(/\.[^/.]+$/, ''))}.${file.name.split('.').pop()}`.
     - Unggah file ke bucket `public-media` menggunakan Supabase client.
     - Dapatkan URL publik permanen menggunakan `supabase.storage.from(BUCKET_NAME).getPublicUrl(path)`.
     - Kembalikan `{ success: true, data: { url, path } }`.
   - Implementasikan fungsi `deleteMediaFile(path: string): Promise<ActionResponse>`:
     - Hapus file dari Supabase Storage jika file diganti atau record dihapus.
2. Buat `components/shared/ImageUploader.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `currentImageUrl?: string | null`, `onImageSelected: (file: File) => void`, `onImageRemoved: () => void`, `label?: string`.
   - Pratinjau langsung gambar terpilih menggunakan `URL.createObjectURL(file)`.
   - Sediakan tombol drag-and-drop atau klik untuk memilih file, serta tombol hapus pratinjau.

## Kriteria selesai
- [ ] Validasi menolak berkas non-gambar atau berkas berukuran di atas 2MB dengan pesan error bahasa Indonesia.
- [ ] Berkas berhasil diunggah ke path Supabase Storage yang terstruktur (`products/`, `gallery/`, `brand/`).
- [ ] Fungsi menghasilkan public URL yang valid untuk disimpan ke database.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan gunakan nama file mentah tanpa sanitasi karena karakter khusus, spasi, atau tanda tanya pada nama file dapat menyebabkan kegagalan URL encoding saat ditampilkan di browser.
