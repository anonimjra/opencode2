# T016 - Section Testimoni Pelanggan

**Depends on:** T006, T008
**Estimasi:** kecil

## Tujuan
Membangun komponen Section Testimoni (`components/landing/TestimonialSection.tsx`) untuk meningkatkan bukti sosial (social proof) dengan menampilkan ulasan nyata, nama pelanggan, peran, bintang rating (1-5), dan kutipan review.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/landing/TestimonialSection.tsx` : Komponen ulasan dan testimoni pelanggan

## Langkah
1. Buat `components/landing/TestimonialSection.tsx`.
2. Terima props `testimonials: Testimonial[]`.
3. Struktur kontainer:
   - `id="testimonials"` dengan padding vertikal `py-20 lg:py-28 bg-white`.
   - Header section: Badge *"Kata Mereka"*, judul utama *"Apa Kata Pengunjung Kopi Senja?"*, subjudul *"Cerita jujur dari pelanggan setia yang telah merasakan racikan dan suasana kedai kami."*.
4. Render grid kartu ulasan:
   - `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12`.
5. Kartu Testimoni individual:
   - `bg-stone-50 border border-stone-200/80 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow`.
   - Deretan Bintang Rating: Render 5 ikon `Star` dari `lucide-react` dengan warna emas (`text-amber-400 fill-amber-400`).
   - Teks Ulasan: `text-stone-700 italic mt-4 leading-relaxed flex-1` diapit tanda kutip lembut.
   - Profil Pelanggan:
     - Avatar bulat di sebelah kiri (foto atau inisial huruf jika foto kosong).
     - Nama pelanggan tebal (`font-semibold text-stone-900`).
     - Label peran atau status pelanggan (`text-xs text-stone-500`, contoh: *"Pecinta Espresso"* atau *"Pengunjung Harian"*).

## Kriteria selesai
- [ ] Section memiliki `id="testimonials"`.
- [ ] Jumlah bintang rating sesuai dengan nilai integer di database (1 sampai 5).
- [ ] Tampilan responsif 1 kolom pada ponsel dan 3 kolom pada layar laptop/desktop.
- [ ] Fallback inisial nama berfungsi dengan baik jika URL avatar bernilai null.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan menampilkan testimoni dengan status `is_active === false` pada antarmuka publik.
