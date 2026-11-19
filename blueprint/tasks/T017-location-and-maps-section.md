# T017 - Section Jam Operasional & Google Maps Embed

**Depends on:** T006, T008
**Estimasi:** kecil

## Tujuan
Membangun komponen Section Lokasi dan Jam Buka (`components/landing/LocationSection.tsx`) yang menampilkan jadwal operasional lengkap tiap hari, alamat fisik, petunjuk arah, dan iframe sematan Google Maps interaktif.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/LocationSection.tsx` : Komponen alamat, jam operasional, dan embed peta

## Langkah
1. Buat `components/landing/LocationSection.tsx`.
2. Terima props `address: string`, `openingHours: Array<{ day: string; time: string }>`, `googleMapsEmbedUrl?: string | null`, `whatsappNumber: string`.
3. Struktur tata letak:
   - Kontainer section: `id="location"`, `py-20 bg-stone-50`.
   - Grid 2 kolom responsif: `grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-10`.
4. Kolom Informasi (lg:col-span-5):
   - Kartu Informasi: `bg-white p-8 rounded-3xl border border-stone-200 shadow-sm flex flex-col justify-between`.
   - Blok Alamat: Ikon `MapPin` warna primary, judul "Alamat Kedai", teks alamat lengkap, dan tautan tombol "Buka di Google Maps".
   - Blok Jam Operasional: Ikon `Clock` warna primary, judul "Jam Buka & Operasional".
     - Loop daftar `openingHours`: Tampilkan baris hari di sisi kiri dan rentang jam di sisi kanan bergaris putus-putus (`border-b border-dashed border-stone-200`).
   - Tombol Petunjuk Arah / Tanya Rute via WhatsApp.
5. Kolom Peta Sematan (lg:col-span-7):
   - Kontainer peta: `w-full h-80 sm:h-96 lg:h-full min-h-[380px] rounded-3xl overflow-hidden shadow-md border border-stone-200 relative bg-stone-200`.
   - Jika `googleMapsEmbedUrl` tersedia: Render `<iframe>` responsif (`w-full h-full border-0`, `loading="lazy"`, `referrerPolicy="no-referrer-when-downgrade"`).
   - Jika belum diisi: Tampilkan placeholder ilustrasi peta dengan tombol tautan pencarian alamat.

## Kriteria selesai
- [ ] Section memiliki `id="location"`.
- [ ] Jadwal jam buka terender dinamis dari array JSONB `openingHours`.
- [ ] Iframe Google Maps responsif dan mengisi ruang kontainer tanpa overflow.
- [ ] Tautan rute dapat dibuka pada tab baru.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan memasukkan API Key Google Maps pada URL embed; gunakan format standar URL embed publik Google Maps (`https://www.google.com/maps/embed?...`) yang gratis dan tidak memiliki kuota berbayar.
