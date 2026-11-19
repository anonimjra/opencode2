# T033 - Admin Kelola Pesan Masuk Form Kontak

**Depends on:** T018, T023
**Estimasi:** sedang

## Tujuan
Membangun halaman manajemen pesan kontak pelanggan di `/admin/messages` beserta antarmuka tabel (`components/admin/MessageListTable.tsx`) untuk melihat daftar pesan, memfilter pesan belum dibaca, membaca isi pesan lengkap, menandai pesan sudah dibaca, menghapus pesan, dan shortcut export Excel.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/messages/page.tsx` : Halaman daftar pesan masuk
- `components/admin/MessageListTable.tsx` : Komponen tabel pesan dengan filter status dan modal baca pesan
- `app/actions/messages.ts` : Server Actions untuk menandai pesan dibaca dan menghapus pesan

## Langkah
1. Buat `app/actions/messages.ts`:
   - Deklarasikan `'use server'`.
   - Implementasikan `markMessageAsRead(id: string, isRead: boolean): Promise<ActionResponse>`:
     - Update kolom `is_read` pada tabel `contact_messages`.
     - Revalidasi path `/admin/messages` dan `/admin`.
   - Implementasikan `deleteMessage(id: string): Promise<ActionResponse>`:
     - Hapus pesan dari tabel `contact_messages`.
     - Revalidasi path.
2. Buat `components/admin/MessageListTable.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `messages: ContactMessage[]`.
   - Filter Tab: "Semua Pesan", "Belum Dibaca" (dengan badge jumlah angka), dan "Sudah Dibaca".
   - Tabel Daftar Pesan:
     - Status Badge: Belum Dibaca (Oranye/Kuning tebal) vs Sudah Dibaca (Abu-abu/Hijau lembut).
     - Tanggal Masuk (Format Indonesia `formatDateIndonesia`).
     - Nama Pengirim & Kontak (Nomor WA / Email).
     - Subjek & Cuplikan Isi Pesan.
     - Aksi Cepat: Tombol "Baca Detail" (membuka modal), tombol toggle tanda baca, tombol tautan langsung chat WhatsApp ke pengirim pesan jika kontak berupa nomor ponsel, tombol hapus pesan.
   - Modal Baca Pesan: Menampilkan nama pengirim, nomor kontak, tanggal kirim lengkap, dan seluruh isi teks pesan. Saat modal dibuka, otomatis panggil `markMessageAsRead` jika statusnya masih belum dibaca.
3. Buat `app/admin/messages/page.tsx`:
   - Server Component yang memanggil data pesan dari Supabase diurutkan berdasarkan `created_at DESC`.
   - Header Halaman: Judul "Kotak Pesan Masuk", keterangan jumlah pesan belum dibaca, dan placeholder tombol "Export Excel".
   - Render `MessageListTable`.

## Kriteria selesai
- [ ] Daftar pesan kontak masuk tampil urut dari yang paling baru.
- [ ] Pesan baru belum dibaca memiliki tanda visual yang jelas.
- [ ] Membuka modal baca pesan otomatis memperbarui status menjadi sudah dibaca.
- [ ] Admin dapat menghapus pesan yang tidak relevan atau spam.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Format kontak pelanggan bisa berupa nomor telepon atau email; sediakan deteksi sederhana (jika berisi `@` buka tautan `mailto:`, jika berupa angka buka tautan `https://wa.me/`).
