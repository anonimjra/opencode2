# T024 - Halaman Ringkasan Dashboard Overview & Metrik

**Depends on:** T003, T006, T023
**Estimasi:** kecil

## Tujuan
Membangun halaman utama dashboard admin (`app/admin/page.tsx`) yang menyajikan ringkasan metrik statistik operasional (total produk aktif, jumlah kategori menu, total pesan masuk kontak, pesan baru belum dibaca, dan shortcut aksi cepat).

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `app/admin/page.tsx` : Halaman ringkasan dashboard
- `components/admin/MetricCard.tsx` : Kartu penampil angka metrik statistik

## Langkah
1. Buat `components/admin/MetricCard.tsx`:
   - Terima props `title: string`, `value: number | string`, `icon: LucideIcon`, `description?: string`, `badgeText?: string`, `badgeVariant?: 'default' | 'success' | 'warning'`.
   - Kontainer kartu: `bg-white p-6 rounded-2xl border border-stone-200 shadow-sm flex items-start justify-between`.
   - Sisi kiri: Judul metrik muted, angka metrik besar tebal (`text-3xl font-bold text-stone-900`), keterangan tambahan.
   - Sisi kanan: Lingkaran ikon dengan latar belakang lembut warna aksen.
2. Buat Server Component `app/admin/page.tsx`:
   - Ambil data agregat dari Supabase secara paralel:
     1. `products`: Hitung total produk (`count: 'exact', head: true`) dan hitung produk yang `is_available = true`.
     2. `categories`: Hitung total kategori.
     3. `contact_messages`: Hitung total pesan masuk dan hitung pesan dengan `is_read = false`.
   - Grid Metrik: Tampilkan 4 kartu metrik utama di bagian atas:
     - Kartu 1: "Total Produk Menu" (angka total, keterangan jumlah yang tersedia).
     - Kartu 2: "Kategori Produk" (angka kategori aktif).
     - Kartu 3: "Pesan Masuk Belum Dibaca" (badge peringatan oranye/kuning jika ada pesan belum dibaca).
     - Kartu 4: "Total Kontak Masuk" (akumulasi seluruh pertanyaan pelanggan).
   - Bagian Aksi Cepat (Quick Actions):
     - Tombol cepat "Tambah Menu Baru" -> `/admin/products/new`.
     - Tombol cepat "Kelola Pesan Masuk" -> `/admin/messages`.
     - Tombol cepat "Ubah Jam Operasional & Kontak" -> `/admin/content`.
     - Tombol cepat "Export Excel Produk" -> `/api/admin/export/products`.

## Kriteria selesai
- [ ] Halaman ringkasan `/admin` dapat diakses dengan sesi login aktif.
- [ ] Angka metrik terhitung akurat sesuai baris data di database Supabase.
- [ ] Shortcut aksi cepat dapat diklik dan mengarahkan ke halaman terkait.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan opsi `{ count: 'exact', head: true }` pada query Supabase untuk menghitung jumlah baris tanpa perlu mentransfer seluruh isi data record, guna menghemat bandwidth dan memori server.
