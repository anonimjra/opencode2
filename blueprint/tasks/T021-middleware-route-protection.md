# T021 - Next.js Middleware untuk Proteksi Sesi Admin

**Depends on:** T003
**Estimasi:** kecil

## Tujuan
Mengimplementasikan rute penjagaan (route guarding) pada Next.js Middleware (`middleware.ts`) untuk memvalidasi sesi cookie Supabase Auth pada semua rute administrasi `/admin/*` dan mengarahkan pengguna yang tidak berhak ke halaman login.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md

## File yang dibuat / diubah
- `middleware.ts` : Berkas root Next.js Middleware
- `lib/supabase/middleware.ts` : Verifikasi sesi aktif pengguna

## Langkah
1. Perbarui `lib/supabase/middleware.ts`:
   - Gunakan `createServerClient` dari `@supabase/ssr` dengan penanganan request dan response cookie.
   - Panggil `await supabase.auth.getUser()`.
   - Kembalikan objek `{ response, user }`.
2. Buat `middleware.ts` di root proyek:
   - Tangkap setiap request yang masuk ke `/admin/*` atau `/api/admin/*`.
   - Panggil helper middleware dari `lib/supabase/middleware.ts`.
   - Logika Rute:
     - Jika pengguna **BELUM** login (`!user`):
       - Dan rute yang dituju adalah rute dashboard selain `/admin/login`, lakukan redirect HTTP 307 ke `/admin/login`.
       - Jika request menuju API `/api/admin/*`, kembalikan respon JSON `HTTP 401 Unauthorized`.
     - Jika pengguna **SUDAH** login (`user` aktif):
       - Dan rute yang dituju adalah `/admin/login`, lakukan redirect langsung ke dashboard utama `/admin`.
   - Konfigurasikan `matcher`:
     ```typescript
     export const config = {
       matcher: [
         '/admin/:path*',
         '/api/admin/:path*',
       ],
     };
     ```

## Kriteria selesai
- [ ] Mengakses `/admin` tanpa cookie sesi otomatis di-redirect ke `/admin/login`.
- [ ] Mengakses `/admin/login` dalam kondisi sudah login otomatis di-redirect ke `/admin`.
- [ ] Endpoint `/api/admin/*` menolak akses tanpa token otentikasi dengan status 401.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan `supabase.auth.getUser()` daripada `supabase.auth.getSession()` di middleware, karena `getUser()` memvalidasi token JWT ke server autentikasi Supabase secara riil dan tidak rentan terhadap spoofing cookie lokal.
