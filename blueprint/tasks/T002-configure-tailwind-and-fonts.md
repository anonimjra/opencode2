# T002 - Konfigurasi Tailwind CSS, Font & Theme Variables

**Depends on:** T001
**Estimasi:** kecil

## Tujuan
Mengonfigurasi Tailwind CSS, mengintegrasikan Google Fonts (`Plus Jakarta Sans` / `Inter`), dan menyiapkan CSS Variables di `globals.css` untuk sistem tema warna dinamis.

## Baca dulu
- AGENTS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `postcss.config.mjs` : Konfigurasi PostCSS untuk Tailwind CSS dan Autoprefixer
- `tailwind.config.ts` : Konfigurasi ekstensi tema warna (primary, secondary, neutral, surface)
- `app/globals.css` : Import dasar Tailwind, styling root, dan deklarasi CSS Variables tema

## Langkah
1. Konfigurasikan `postcss.config.mjs` dengan plugin Tailwind CSS dan Autoprefixer.
2. Buat `tailwind.config.ts` dengan content path mencakup `./app/**/*.{js,ts,jsx,tsx}`, `./components/**/*.{js,ts,jsx,tsx}`, `./lib/**/*.{js,ts,jsx,tsx}`.
3. Ekstensi tema di `tailwind.config.ts`:
   - Hubungkan warna `primary` ke CSS variable:
     - `DEFAULT`: `var(--color-primary, #7C2D12)`
     - `hover`: `var(--color-primary-hover, #9A3412)`
     - `light`: `var(--color-primary-light, #FEF3C7)`
     - `foreground`: `var(--color-primary-foreground, #FFFFFF)`
   - Tambahkan warna semantik untuk WhatsApp: `#25D366`.
4. Perbarui `app/globals.css`:
   - Pasang `@tailwind base; @tailwind components; @tailwind utilities;` (atau sintaks Tailwind v4 `@import "tailwindcss";` jika menggunakan v4).
   - Tentukan `:root` default variabel untuk warna primer hangat:
     - `--color-primary: #7C2D12;`
     - `--color-primary-hover: #9A3412;`
     - `--color-primary-light: #FEF3C7;`
     - `--color-primary-foreground: #FFFFFF;`
   - Berikan aturan `scroll-behavior: smooth;` pada tag `html` untuk navigasi satu halaman.

## Kriteria selesai
- [ ] Tailwind CSS dan PostCSS terkonfigurasi dengan benar.
- [ ] Berkas `app/globals.css` mendefinisikan variabel CSS `:root` default.
- [ ] Utility Tailwind `bg-primary`, `text-primary`, dan `hover:bg-primary-hover` dapat digunakan tanpa error.

## Verifikasi
`npx tailwindcss -i ./app/globals.css -o ./public/test-tailwind.css --minify && rm ./public/test-tailwind.css || npm run build`

## Catatan / jebakan
- Jangan menghapus deklarasi CSS Variable default di `globals.css` agar tampilan tidak blank sebelum konfigurasi database termuat.
