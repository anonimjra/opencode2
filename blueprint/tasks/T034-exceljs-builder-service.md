# T034 - ExcelJS Builder Service Helper & Formatting

**Depends on:** T001, T006, T007
**Estimasi:** sedang

## Tujuan
Membangun modul helper utilitas pembuat berkas spreadsheet (`lib/excel/builder.ts`) menggunakan library `exceljs` yang mengatur standar desain lembar kerja: baris header berwarna dengan font tebal, penyesuaian lebar kolom otomatis, border tipis di seluruh sel, dan format angka Rupiah standar akuntansi.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/04-TECH-STACK.md

## File yang dibuat / diubah
- `lib/excel/builder.ts` : Modul pembuat workbook dan worksheet ExcelJS terstandarisasi

## Langkah
1. Buat direktori `lib/excel/`.
2. Buat berkas `lib/excel/builder.ts`:
   - Import `Workbook` dari `exceljs`.
   - Ekspor fungsi `createBaseWorkbook(): Workbook`:
     - Inisialisasi `const workbook = new Workbook()`.
     - Atur properti metadata dokumen: `creator: 'Sistem Admin UMKM'`, `lastModifiedBy: 'Admin'`, `created: new Date()`.
   - Implementasikan fungsi `applyStandardWorksheetStyling(worksheet: Worksheet, columnHeaders: string[]): void`:
     - Format Baris Header (Row 1):
       - Tinggi baris: `headerRow.height = 30`.
       - Font: `name: 'Arial', size: 11, bold: true, color: { argb: 'FFFFFFFF' }`.
       - Fill / Latar Belakang: Pattern solid warna tema cokelat kopi gelap `fgColor: { argb: 'FF572C15' }` atau navy gelap.
       - Alignment: `vertical: 'middle', horizontal: 'center'`.
     - Format Garis Pembatas (Border):
       - Berikan border tipis (`style: 'thin', color: { argb: 'FFD1D5DB' }`) pada seluruh sel data.
     - Penyesuaian Lebar Kolom Otomatis (Auto-fit Column Width):
       - Iterasi setiap kolom dan hitung panjang karakter teks maksimum di kolom tersebut, lalu berikan padding ekstra `column.width = Math.max(maxLength + 4, 12)`.
   - Ekspor helper format angka Rupiah:
     - `RUPIAH_NUM_FMT = '"Rp"#,##0'` untuk diterapkan pada kolom harga.
   - Implementasikan fungsi `generateBuffer(workbook: Workbook): Promise<Uint8Array>`:
     - Konversi workbook menjadi buffer binary array (`await workbook.xlsx.writeBuffer()`).

## Kriteria selesai
- [ ] Modul `lib/excel/builder.ts` terbuat tanpa error tipe TypeScript.
- [ ] Header worksheet diformat dengan warna latar belakang elegan dan teks putih tebal.
- [ ] Format angka Rupiah (`RUPIAH_NUM_FMT`) tersedia dan siap diaplikasikan.
- [ ] Lebar kolom menyesuaikan secara dinamis dengan panjang teks data.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan mengembalikan instance Stream yang belum selesai ditutup ke Route Handler; gunakan `writeBuffer()` untuk menghasilkan buffer lengkap yang aman dikirimkan sebagai HTTP binary response.
