# T023 - Layout Dashboard Admin dengan Sidebar & Header

**Depends on:** T010, T021, T022
**Estimasi:** sedang

## Tujuan
Membangun layout utama panel administrasi (`app/admin/layout.tsx`) yang mencakup sidebar navigasi responsif (`components/admin/AdminSidebar.tsx`), header atas dengan tombol logout (`components/admin/AdminHeader.tsx`), dan area konten utama yang bersih.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `app/admin/layout.tsx` : Layout pembungkus rute dashboard admin
- `components/admin/AdminSidebar.tsx` : Sidebar menu navigasi desktop & drawer mobile
- `components/admin/AdminHeader.tsx` : Header atas dengan status user aktif & tombol logout

## Langkah
1. Buat direktori `components/admin/`.
2. Buat `components/admin/AdminSidebar.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `currentPath: string`, `onCloseMobile?: () => void`.
   - Daftar Menu Navigasi:
     1. Ringkasan / Overview (`/admin` - Ikon `LayoutDashboard`)
     2. Produk Menu (`/admin/products` - Ikon `Coffee` atau `Utensils`)
     3. Kategori (`/admin/categories` - Ikon `Layers` atau `Tag`)
     4. Konten Landing (`/admin/content` - Ikon `FileText`)
     5. Galeri Foto (`/admin/gallery` - Ikon `Image`)
     6. Testimoni (`/admin/testimonials` - Ikon `MessageSquareQuote`)
     7. Pesan Masuk (`/admin/messages` - Ikon `Inbox` atau `Mail`)
     8. Pengaturan & Brand (`/admin/settings` - Ikon `Palette` atau `Settings`)
   - Tandai menu aktif dengan background highlight warna primary lembut dan teks tebal.
   - Sisi bawah sidebar: Tautan cepat "Lihat Website Publik" (membuka tab baru ke `/`).
3. Buat `components/admin/AdminHeader.tsx`:
   - Sisi kiri: Tombol hamburger untuk toggle sidebar pada layar ponsel.
   - Sisi tengah: Judul halaman aktif secara dinamis atau breadcrumbs.
   - Sisi kanan: Profil singkat admin (email pengguna aktif) dan tombol Logout yang memanggil `logoutAction()`.
4. Buat `app/admin/layout.tsx`:
   - Server Component layout yang membungkus konten rute anak (`children`).
   - Jangan gunakan layout ini untuk `/admin/login` (atau kecualikan tampilan sidebar jika berada di sub-path login).
   - Susun grid dashboard: Sidebar di sisi kiri (tetap `w-64 hidden md:block border-r border-stone-200 bg-white h-screen sticky top-0`) dan area konten di sisi kanan (`flex-1 flex flex-col min-w-0 bg-stone-50 overflow-y-auto`).

## Kriteria selesai
- [ ] Sidebar menampilkan seluruh 8 menu modul admin dengan ikon yang serasi.
- [ ] Indikator menu aktif berpindah secara otomatis sesuai rute URL browser.
- [ ] Tombol logout di header memicu pembersihan sesi dan redirect ke login.
- [ ] Sidebar dapat diakses melalui drawer pada layar mobile smartphone.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan halaman `/admin/login` tidak terhalang atau menampilkan sidebar admin ganda. Buat layout khusus atau isolasi rute login jika diperlukan.
