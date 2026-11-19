# T007 - Utility Helper Functions (Rupiah, Date, WhatsApp, CN)

**Depends on:** T001, T006
**Estimasi:** kecil

## Tujuan
Membuat modul helper utilitas umum (`lib/utils.ts`, `lib/whatsapp.ts`, `lib/constants.ts`) untuk formatting Rupiah, parsing tanggal lokalisasi Indonesia, penggabungan class Tailwind (`cn`), pembentukan tautan chat WhatsApp otomatis, dan konstanta default.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `lib/utils.ts` : Helper `cn()`, `formatRupiah()`, `formatDateIndonesia()`, `slugify()`
- `lib/whatsapp.ts` : Helper `generateWhatsAppOrderLink()` dan `cleanPhoneNumber()`
- `lib/constants.ts` : Konstanta fallback default (nama brand, tema warna, nomor WA fallback)

## Langkah
1. Buat direktori `lib/`.
2. Buat berkas `lib/utils.ts`:
   - Implementasikan fungsi `cn(...inputs: ClassValue[])` menggunakan `clsx` dan `twMerge`.
   - Implementasikan `formatRupiah(amount: number): string`: Menghasilkan string berformat `Rp 25.000` menggunakan `Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 })`.
   - Implementasikan `formatDateIndonesia(dateString: string): string`: Menghasilkan format tanggal `19 November 2026, 21:00 WIB`.
   - Implementasikan `slugify(text: string): string`: Mengubah teks judul menjadi string slug URL-friendly.
3. Buat berkas `lib/whatsapp.ts`:
   - Implementasikan `cleanPhoneNumber(phone: string): string`: Membersihkan spasi, tanda hubung, dan mengubah awalan `08...` menjadi format internasional `628...`.
   - Implementasikan `generateWhatsAppOrderLink(options: { phone: string; brandName: string; productName: string; price: number }): string`: Menghasilkan URL `https://wa.me/{cleanPhone}?text={encodedText}` dengan template pesan:
     *"Halo {brandName}, saya ingin memesan {productName} seharga {formatRupiah(price)}. Apakah menu ini masih tersedia hari ini?"*.
4. Buat berkas `lib/constants.ts`:
   - Ekspor konstanta preset warna tema, konfigurasi fallback jika database kosong, dan limit pagination default.

## Kriteria selesai
- [ ] Fungsi `formatRupiah` mengembalikan format Rupiah bersih tanpa desimal sen.
- [ ] Fungsi `generateWhatsAppOrderLink` menghasilkan URL yang valid dan ter-encode sempurna.
- [ ] Fungsi `cn` berhasil menggabungkan kelas Tailwind secara dinamis.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan lupa encode URI komponen pada teks pesan WhatsApp menggunakan `encodeURIComponent()` agar spasi, baris baru, dan tanda baca tidak merusak tautan URL.
