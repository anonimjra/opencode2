# T001 - Inisialisasi Project Next.js, TypeScript & Tooling

**Depends on:** none
**Estimasi:** sedang

## Tujuan
Menginisialisasi proyek Next.js dengan App Router, TypeScript, dan menginstal paket pustaka inti sesuai spesifikasi tech stack tanpa error dependensi.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/04-TECH-STACK.md

## File yang dibuat / diubah
- `package.json` : Konfigurasi manifest proyek, dependensi npm, dan skrip build/dev
- `tsconfig.json` : Konfigurasi TypeScript strict mode dengan path alias `@/*`
- `next.config.ts` : Konfigurasi Next.js dasar dengan allow remote patterns untuk domain Supabase
- `.gitignore` : Pengabaian file sensitif, node_modules, `.next`, `.env*.local`

## Langkah
1. Pastikan file `package.json` memuat pustaka inti:
   - `next`, `react`, `react-dom`, `typescript`, `@types/react`, `@types/node`
   - `@supabase/supabase-js`, `@supabase/ssr`
   - `lucide-react`, `clsx`, `tailwind-merge`
   - `exceljs`, `date-fns`
2. Jalankan perintah instalasi dependensi menggunakan `npm install`.
3. Konfigurasikan `tsconfig.json` dengan:
   - `"strict": true`
   - `"target": "ES2022"`
   - `"lib": ["dom", "dom.iterable", "esnext"]`
   - `"paths": { "@/*": ["./*"] }` (atau `./src/*` jika folder sumber berada di dalam `src`)
4. Konfigurasikan `next.config.ts` untuk mengizinkan remote images dari Supabase Storage (`hostname: '**.supabase.co'`).
5. Buat atau perbarui file `.gitignore` agar menyaring `.env.local`, `.env*.local`, `node_modules/`, `.next/`, `out/`, dan file berkas build.

## Kriteria selesai
- [ ] File `package.json` dan `package-lock.json` terbuat dan terinstal bersih.
- [ ] File `tsconfig.json` memiliki pengaturan strict mode dan path alias `@/*`.
- [ ] File `next.config.ts` tervalidasi dan siap untuk remote images.
- [ ] Folder `node_modules` terinstal tanpa dependensi yang hilang.

## Verifikasi
`npm run build || npx tsc --noEmit`

## Catatan / jebakan
- Jangan menginstal pustaka di luar daftar `blueprint/04-TECH-STACK.md`.
- Pastikan konfigurasi path alias `@/*` konsisten dengan penempatan file aplikasi.
