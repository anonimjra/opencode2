# T037 - Integrasi Tombol Download Excel pada UI Dashboard

**Depends on:** T027, T033, T035, T036
**Estimasi:** kecil

## Tujuan
Mengintegrasikan komponen tombol "Export Excel" (`components/admin/ExportExcelButton.tsx`) ke antarmuka halaman Produk (`/admin/products`) dan halaman Pesan Masuk (`/admin/messages`) dengan penanganan status loading saat file spreadsheet sedang digenerate oleh server.

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/admin/ExportExcelButton.tsx` : Komponen tombol download Excel dengan indikator proses
- `app/admin/products/page.tsx` : Menambahkan tombol Export Excel di header halaman produk
- `app/admin/messages/page.tsx` : Menambahkan tombol Export Excel di header halaman pesan

## Langkah
1. Buat `components/admin/ExportExcelButton.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `endpoint: string` (contoh: `/api/admin/export/products`), `label?: string` (default: "Export Excel"), `variant?: 'outline' | 'secondary'`.
   - Kelola state: `isDownloading: boolean`.
   - Handle klik unduh:
     - Ubah `isDownloading` menjadi `true`.
     - Lakukan `fetch(endpoint)`.
     - Periksa status respon; jika `response.ok`:
       - Dapatkan blob dari respon: `const blob = await response.blob()`.
       - Ambil nama file dari header `Content-Disposition` atau buat fallback dengan tanggal saat ini.
       - Buat URL objek: `const url = window.URL.createObjectURL(blob)`.
       - Buat elemen tautan sementara `<a>`, klik otomatis, lalu lepaskan URL objek (`window.URL.revokeObjectURL(url)`).
     - Tangani error jika terjadi kegagalan jaringan atau sesi kedaluwarsa.
     - Kembalikan `isDownloading` ke `false`.
   - Desain tombol:
     - Ikon `FileSpreadsheet` atau `Download` dari `lucide-react`.
     - Teks: "Mengunduh Excel..." (saat loading) atau label normal "Export Excel".
     - Styling tombol elegan dengan border hijau Excel lembut (`hover:bg-emerald-50 hover:border-emerald-500 hover:text-emerald-700`).
2. Perbarui `app/admin/products/page.tsx`:
   - Sisipkan `<ExportExcelButton endpoint="/api/admin/export/products" label="Export Produk (.xlsx)" />` di samping tombol "Tambah Produk".
3. Perbarui `app/admin/messages/page.tsx`:
   - Sisipkan `<ExportExcelButton endpoint="/api/admin/export/messages" label="Export Pesan (.xlsx)" />` di samping filter tab pesan.

## Kriteria selesai
- [ ] Tombol Export Excel tampil di halaman produk dan pesan masuk.
- [ ] Mengklik tombol menampilkan spinner animasi loading selama proses unduh berlangsung.
- [ ] File Excel `.xlsx` otomatis terunduh ke direktori Download komputer pengguna.
- [ ] Tombol kembali ke kondisi normal setelah unduhan selesai.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan mengarahkan user menggunakan tag `<a href="/api/..." download>` secara langsung jika ingin menampilkan animasi loading state dan menangani error HTTP 401 secara anggun di UI.
