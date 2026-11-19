# T032 - Admin Kelola Testimoni Pelanggan

**Depends on:** T023, T025
**Estimasi:** sedang

## Tujuan
Membangun modul manajemen testimoni pelanggan di `/admin/testimonials` beserta Server Actions (`app/actions/testimonials.ts`) untuk menambah ulasan baru, mengatur rating bintang (1-5), mengaktifkan/menonaktifkan ulasan dari landing page publik, serta menghapus testimoni.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/testimonials/page.tsx` : Halaman daftar testimoni
- `components/admin/TestimonialManager.tsx` : Komponen daftar ulasan, toggle aktif, dan modal form
- `app/actions/testimonials.ts` : Server Actions mutasi data testimoni

## Langkah
1. Buat `app/actions/testimonials.ts`:
   - Deklarasikan `'use server'`.
   - Implementasikan `createTestimonial(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak: `customer_name`, `customer_role`, `review_text`, `rating` (1-5), `sort_order`, file avatar jika ada.
     - Simpan avatar ke Supabase Storage jika diunggah.
     - Insert ke tabel `testimonials` dengan `is_active: true`.
     - Revalidasi path `/admin/testimonials` dan `/`.
   - Implementasikan `updateTestimonial(id: string, formData: FormData): Promise<ActionResponse>`:
     - Update field ulasan pada tabel.
     - Revalidasi path.
   - Implementasikan `toggleTestimonialActive(id: string, isActive: boolean): Promise<ActionResponse>`:
     - Update kolom `is_active`.
     - Revalidasi path.
   - Implementasikan `deleteTestimonial(id: string): Promise<ActionResponse>`:
     - Hapus record dari database dan revalidasi path.
2. Buat `components/admin/TestimonialManager.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `testimonials: Testimonial[]`.
   - Tombol "Tambah Testimoni Baru" di bagian atas.
   - Modal Form: Input nama pelanggan, status/peran (misal: "Pelanggan Setia"), isi testimoni, pemilih bintang rating (1 sampai 5 bintang), upload avatar pelanggan opsional.
   - Tabel Daftar Ulasan:
     - Avatar dan Nama Pelanggan
     - Bintang Rating (visual bintang kuning)
     - Potongan Teks Ulasan
     - Toggle Status Aktif (Tampil di Landing Page / Sembunyikan)
     - Tombol Edit & Tombol Hapus dengan konfirmasi.
3. Buat `app/admin/testimonials/page.tsx`:
   - Server Component pemanggil seluruh testimoni dari database Supabase diurutkan berdasarkan `sort_order ASC, created_at DESC`.
   - Render `TestimonialManager`.

## Kriteria selesai
- [ ] Admin dapat menambahkan ulasan baru dengan nama, komentar, dan bintang rating.
- [ ] Rating tervalidasi minimal 1 dan maksimal 5 bintang.
- [ ] Menyalakan atau mematikan toggle status aktif langsung menyembunyikan atau memunculkan ulasan di landing page publik.
- [ ] Hapus testimoni berfungsi dengan konfirmasi dialog.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan input rating berupa angka integer antara 1 dan 5 untuk mematuhi aturan check constraint database PostgreSQL `CHECK (rating >= 1 AND rating <= 5)`.
