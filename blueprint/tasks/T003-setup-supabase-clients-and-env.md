# T003 - Konfigurasi Environment & Supabase Client Setup

**Depends on:** T001
**Estimasi:** sedang

## Tujuan
Menyiapkan berkas template variabel lingkungan (`.env.example` & `.env.local`) dan mengimplementasikan adapter klien Supabase untuk browser, server components, server actions, dan middleware menggunakan paket `@supabase/ssr`.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `.env.example` : Dokumentasi variabel lingkungan publik dan rahasia
- `.env.local` : File konfigurasi lingkungan lokal dummy/pengembangan
- `lib/supabase/client.ts` : Supabase client untuk Client Components (browser)
- `lib/supabase/server.ts` : Supabase client untuk Server Components dan Server Actions
- `lib/supabase/middleware.ts` : Helper refresh token sesi cookie untuk Next.js Middleware

## Langkah
1. Buat `.env.example` berisi:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-optional
   ```
2. Buat `.env.local` dengan nilai placeholder yang aman untuk pengetesan lokal.
3. Buat `lib/supabase/client.ts`:
   - Gunakan fungsi `createBrowserClient` dari `@supabase/ssr`.
   - Export fungsi `createClient()` yang mengembalikan instance Supabase client browser.
4. Buat `lib/supabase/server.ts`:
   - Gunakan `createServerClient` dari `@supabase/ssr`.
   - Baca dan kelola cookie menggunakan `cookies()` dari `next/headers`.
   - Tangani error cookie setting saat dipanggil di Server Component murni.
5. Buat `lib/supabase/middleware.ts`:
   - Buat fungsi `updateSession(request: NextRequest)` yang memperbarui cookie auth Supabase dan meneruskan respons Next.js secara aman.

## Kriteria selesai
- [ ] Berkas `.env.example` tersedia dengan kunci yang jelas.
- [ ] Klien browser di `lib/supabase/client.ts` siap pakai.
- [ ] Klien server di `lib/supabase/server.ts` mengelola cookie sesi dengan benar.
- [ ] Helper `updateSession` di `lib/supabase/middleware.ts` menangani refresh cookie secara aman.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan pernah mengekspos `SUPABASE_SERVICE_ROLE_KEY` ke sisi browser atau menyertakannya dengan awalan `NEXT_PUBLIC_`.
- Tangani penulisan cookie di `createServerClient` agar tidak memicu unhandled runtime error di Server Components read-only.
