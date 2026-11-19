# T035 - Server Route Handler Export Excel Produk

**Depends on:** T003, T006, T034
**Estimasi:** sedang

## Tujuan
Membangun Server Route Handler (`app/api/admin/export/products/route.ts`) yang memverifikasi sesi login admin, mengambil data seluruh katalog produk beserta kategorinya dari Supabase, menyusun berkas Excel menggunakan `exceljs`, dan mengalirkan file unduhan `produk-YYYY-MM-DD.xlsx` dengan header HTTP yang tepat.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `app/api/admin/export/products/route.ts` : API endpoint ekspor berkas Excel produk
- `lib/excel/products-sheet.ts` : Generator worksheet katalog produk

## Langkah
1. Buat `lib/excel/products-sheet.ts`:
   - Buat fungsi `buildProductsWorksheet(workbook: Workbook, products: Product[]): void`:
     - Buat worksheet baru bernama `"Katalog Produk"`.
     - Konfigurasi definisi kolom:
       1. `header: 'No', key: 'no', width: 6`
       2. `header: 'Nama Produk', key: 'name', width: 28`
       3. `header: 'Kategori', key: 'category', width: 20`
       4. `header: 'Harga (Rp)', key: 'price', width: 16`
       5. `header: 'Status Ketersediaan', key: 'status', width: 18`
       6. `header: 'Urutan', key: 'sort_order', width: 10`
       7. `header: 'Tanggal Dibuat', key: 'created_at', width: 22`
     - Tambahkan baris data:
       - Iterasi `products`, petakan nomor urut 1..N.
       - Tulis nilai harga mentah bertipe angka, lalu set properti cell `cell.numFmt = RUPIAH_NUM_FMT`.
       - Tulis status: *"Tersedia"* (jika `is_available === true`) atau *"Habis"*.
       - Format tanggal ke string waktu lokal.
     - Terapkan styling menggunakan `applyStandardWorksheetStyling`.
2. Buat `app/api/admin/export/products/route.ts`:
   - Tangani method `GET(request: NextRequest)`.
   - Verifikasi sesi admin menggunakan `lib/supabase/server.ts` (`await supabase.auth.getUser()`).
   - Jika pengguna tidak terotentikasi, kembalikan `new NextResponse('Unauthorized', { status: 401 })`.
   - Query seluruh data dari tabel `products` join `categories`, diurutkan berdasarkan `sort_order ASC, name ASC`.
   - Buat workbook dan panggil `buildProductsWorksheet`.
   - Hasilkan binary buffer dari workbook.
   - Format nama berkas: `produk-${format(new Date(), 'yyyy-MM-dd')}.xlsx`.
   - Kembalikan `new NextResponse(buffer, { headers: { ... } })`:
     - `'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'`
     - `'Content-Disposition': 'attachment; filename="' + fileName + '"'`
     - `'Cache-Control': 'no-store, max-age=0'`

## Kriteria selesai
- [ ] Endpoint `/api/admin/export/products` menolak request tanpa otentikasi dengan HTTP 401.
- [ ] Endpoint mengembalikan file berkas binary Excel dengan nama `produk-YYYY-MM-DD.xlsx`.
- [ ] Seluruh produk termuat dengan kolom Nomor, Nama, Kategori, Harga Rupiah, Status, dan Tanggal.
- [ ] Format angka pada kolom harga terbaca sebagai mata uang di Excel.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan mengembalikan file dalam format CSV; permintaan wajib menghasilkan file Microsoft Excel asli berformat `.xlsx` (OpenXML).
