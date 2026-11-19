# T009 - Theme Provider Dinamis untuk Primary Color

**Depends on:** T002, T006, T008
**Estimasi:** kecil

## Tujuan
Membuat komponen penyedia tema dinamis (`components/shared/ThemeProvider.tsx`) yang menginjeksi nilai warna primer (`primary_color`) dari database Supabase langsung ke CSS Variables di tag `<html>` atau wrapper utama.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `components/shared/ThemeProvider.tsx` : Client Component penyedia variabel tema CSS
- `lib/theme.ts` : Helper kalkulasi warna turunan (hover color, light background, contrast foreground)

## Langkah
1. Buat direktori `components/shared/`.
2. Buat `lib/theme.ts`:
   - Implementasikan fungsi `adjustBrightness(hex: string, percent: number): string` untuk menghitung warna hover (lebih terang/gelap).
   - Implementasikan fungsi `getContrastTextColor(hex: string): string` untuk menentukan teks putih atau gelap tergantung tingkat kecerahan warna primer.
3. Buat `components/shared/ThemeProvider.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `primaryColor?: string` dan `children: React.ReactNode`.
   - Gunakan hook `useEffect` untuk mengatur variabel style pada `document.documentElement`:
     - `--color-primary`: nilai hex dari prop (atau fallback `#7C2D12`)
     - `--color-primary-hover`: hasil `adjustBrightness(color, 15)`
     - `--color-primary-light`: warna aksen lembut
     - `--color-primary-foreground`: `#FFFFFF` atau `#18181B` sesuai kontras
   - Render `children` secara langsung.
4. Integrasikan `ThemeProvider` pada `app/layout.tsx`.

## Kriteria selesai
- [ ] Komponen `ThemeProvider` berhasil menginjeksi CSS Variables `--color-primary` ke DOM.
- [ ] Nilai hover dan warna teks kontras dikalkulasikan secara otomatis.
- [ ] Tersedia fallback warna aman jika prop `primaryColor` bernilai undefined atau kosong.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Pastikan saat SSR (sebelum hidrasi klien) komponen me-render tag `<style>` inline atau default CSS variable agar tidak terjadi *Flash of Unstyled Theme* (FOUT).
