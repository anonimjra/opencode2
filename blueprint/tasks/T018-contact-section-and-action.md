# T018 - Form Kontak Publik & Action Handler

**Depends on:** T003, T006, T008
**Estimasi:** sedang

## Tujuan
Membangun komponen formulir kontak publik (`components/landing/ContactSection.tsx`) beserta Server Action (`app/actions/contact.ts`) yang memvalidasi input pengguna, menyaring spam sederhana, dan menyimpan pesan ke tabel `contact_messages` di database Supabase dengan umpan balik status berhasil/gagal.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/actions/contact.ts` : Next.js Server Action untuk memproses dan menyimpan formulir kontak
- `components/landing/ContactSection.tsx` : Komponen antarmuka form pengiriman pesan publik
- `components/ui/Input.tsx` : Komponen input teks standar
- `components/ui/Textarea.tsx` : Komponen textarea standar

## Langkah
1. Buat `components/ui/Input.tsx` dan `components/ui/Textarea.tsx`:
   - Berikan styling border netral, focus ring warna primary, dan pesan error validasi di bawah kolom input.
2. Buat `app/actions/contact.ts`:
   - Deklarasikan direktif `'use server'`.
   - Ekspor fungsi `submitContactMessage(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak field: `name`, `contact` (nomor WA/email), `subject`, `message`, dan `honeypot` (field tersembunyi anti-bot).
     - Jika field `honeypot` terisi, batalkan proses dan kembalikan respon sukses semu untuk membungkam spam bot.
     - Validasi kelengkapan: `name` minimal 2 karakter, `contact` minimal 5 karakter, `message` minimal 10 karakter.
     - Panggil Supabase server client `createClient()` dari `lib/supabase/server.ts`.
     - Lakukan `insert` ke tabel `public.contact_messages` dengan nilai `is_read: false`.
     - Tangani error Supabase; jika berhasil kembalikan `{ success: true }`.
3. Buat `components/landing/ContactSection.tsx`:
   - Tandai dengan `'use client'`.
   - Kontainer section: `id="contact"`, `py-20 lg:py-28 bg-white`.
   - Form input:
     - Nama Lengkap (Wajib, input teks)
     - Kontak WhatsApp / Email (Wajib, input teks/email)
     - Subjek Pesan (Opsional)
     - Isi Pesan (Wajib, textarea minimal 4 baris)
     - Input tersembunyi `honeypot` (`style={{ display: 'none' }}`).
   - Tombol Kirim: Tampilkan status loading spinner saat proses pengiriman berlangsung.
   - Umpan Balik: Tampilkan banner atau alert sukses berbahasa Indonesia (*"Terima kasih! Pesan Anda telah terkirim. Kami akan segera menghubungi Anda."*) dan reset form setelah berhasil.

## Kriteria selesai
- [ ] Section memiliki `id="contact"`.
- [ ] Validasi form mencegah pengiriman input kosong.
- [ ] Server Action berhasil meng-insert baris baru ke tabel `contact_messages` di Supabase.
- [ ] Form menampilkan pesan sukses dan mengosongkan kolom input setelah pengiriman berhasil.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan mengizinkan pengguna anonim membaca kembali data pesan yang telah dikirim demi menjaga privasi nomor telepon dan email pelanggan (sesuai kebijakan RLS di T004).
