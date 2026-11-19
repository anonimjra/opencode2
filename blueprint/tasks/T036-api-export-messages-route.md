# T036 - Server Route Handler Export Excel Pesan Masuk

**Depends on:** T003, T006, T034
**Estimasi:** sedang

## Tujuan
Membangun Server Route Handler (`app/api/admin/export/messages/route.ts`) yang memverifikasi sesi login admin, mengambil seluruh rekaman pesan masuk pelanggan dari tabel `contact_messages`, menyusun berkas Excel dengan `exceljs`, dan mengalirkan file unduhan `pesan-masuk-YYYY-MM-DD.xlsx`.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/06-DATA-MODEL.md

## File yang dibuat / diubah
- `app/api/admin/export/messages/route.ts` : API endpoint ekspor berkas Excel pesan kontak
- `lib/excel/messages-sheet.ts` : Generator worksheet pesan kontak masuk

## Langkah
1. Buat `lib/excel/messages-sheet.ts`:
   - Buat fungsi `buildMessagesWorksheet(workbook: Workbook, messages: ContactMessage[]): void`:
     - Buat worksheet baru bernama `"Pesan Masuk Pelanggan"`.
     - Konfigurasi definisi kolom:
       1. `header: 'No', key: 'no', width: 6`
       2. `header: 'Tanggal Masuk', key: 'created_at', width: 22`
       3. `header: 'Nama Pengirim', key: 'name', width: 25`
       4. `header: 'Kontak (WA/Email)', key: 'contact', width: 24`
       5. `header: 'Subjek', key: 'subject', width: 25`
       6. `header: 'Isi Pesan', key: 'message', width: 45`
       7. `header: 'Status Baca', key: 'status', width: 16`
     - Tambahkan baris data:
       - Iterasi `messages`.
       - Format tanggal ke waktu lokal Indonesia.
       - Tulis status: *"Sudah Dibaca"* atau *"Belum Dibaca"*.
       - Atur wrap text pada kolom Isi Pesan (`row.getCell('message').alignment = { wrapText: true }`).
     - Terapkan styling header dan border menggunakan `applyStandardWorksheetStyling`.
2. Buat `app/api/admin/export/messages/route.ts`:
   - Tangani method `GET(request: NextRequest)`.
   - Verifikasi sesi admin menggunakan `lib/supabase/server.ts` (`await supabase.auth.getUser()`).
   - Jika tidak terotentikasi, kembalikan `new NextResponse('Unauthorized', { status: 401 })`.
   - Query seluruh data dari tabel `contact_messages` diurutkan berdasarkan `created_at DESC`.
   - Buat workbook dan panggil `buildMessagesWorksheet`.
   - Hasilkan binary buffer dari workbook.
   - Format nama file: `pesan-masuk-${format(new Date(), 'yyyy-MM-dd')}.xlsx`.
   - Kembalikan response streaming dengan header `Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` dan `Content-Disposition: attachment; filename="..."`.

## Kriteria selesai
- [ ] Endpoint `/api/admin/export/messages` memblokir akses tanpa login admin.
- [ ] Mengembalikan file binary Excel dengan nama `pesan-masuk-YYYY-MM-DD.xlsx`.
- [ ] Kolom pesan mencakup Tanggal, Pengirim, Nomor Kontak, Subjek, Isi Pesan, dan Status Baca.
- [ ] Teks pesan panjang memiliki pengaturan `wrapText` agar mudah dibaca di Excel.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan lupa memberikan penanganan error jika database pesan masih kosong; file Excel tetap harus terbentuk dengan baris header tanpa crash.
