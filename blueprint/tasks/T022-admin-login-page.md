# T022 - Halaman Login Admin & Form Autentikasi

**Depends on:** T003, T006, T010, T021
**Estimasi:** sedang

## Tujuan
Membangun halaman login admin (`app/admin/login/page.tsx`) dengan antarmuka bersih dan form interaktif (`components/admin/LoginForm.tsx`) yang terhubung ke Server Action otentikasi Supabase (`app/actions/auth.ts`) untuk verifikasi kredensial email & password.

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- blueprint/05-CONVENTIONS.md

## File yang dibuat / diubah
- `app/admin/login/page.tsx` : Halaman login admin
- `components/admin/LoginForm.tsx` : Form input email, password, dan status error
- `app/actions/auth.ts` : Server Actions untuk login dan logout

## Langkah
1. Buat `app/actions/auth.ts`:
   - Deklarasikan `'use server'`.
   - Ekspor fungsi `loginAction(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak `email` dan `password`.
     - Validasi kelengkapan form.
     - Panggil `supabase.auth.signInWithPassword({ email, password })`.
     - Jika error dari Supabase, kembalikan pesan ramah bahasa Indonesia: *"Email atau kata sandi yang Anda masukkan salah."*.
     - Jika berhasil, panggil `redirect('/admin')`.
   - Ekspor fungsi `logoutAction(): Promise<void>`:
     - Panggil `supabase.auth.signOut()`.
     - Lakukan redirect ke `/admin/login`.
2. Buat `components/admin/LoginForm.tsx`:
   - Tandai dengan `'use client'`.
   - Gunakan form submission dengan hook `useTransition` atau `useActionState` (atau event handler `onSubmit`).
   - Sediakan kolom input Email (tipe `email`, wajib, auto-focus) dan Kata Sandi (tipe `password`, wajib, tombol toggle lihat/sembunyikan password).
   - Tombol "Masuk ke Dashboard" dengan indikator loading spinner.
   - Kotak peringatan error berwarna merah jika kredensial tidak sesuai.
3. Buat `app/admin/login/page.tsx`:
   - Tampilan halaman terpusat (center card) dengan latar belakang lembut `bg-stone-100 min-h-screen flex items-center justify-center p-4`.
   - Kartu login: Logo brand atau ikon kunci, judul *"Masuk ke Portal Admin"*, subjudul *"Kelola katalog menu dan konten website Kopi Senja."*, dan form login.
   - Tautan kecil kembali ke halaman publik (*"← Kembali ke Website"*).

## Kriteria selesai
- [ ] Halaman login dapat diakses di `/admin/login`.
- [ ] Percobaan login dengan password salah menampilkan pesan error bahasa Indonesia.
- [ ] Login dengan kredensial valid berhasil menyimpan session cookie dan me-redirect ke `/admin`.
- [ ] Tombol kembali ke landing page berfungsi dengan benar.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Jangan pernah menyimpan password dalam bentuk plain text di client state log atau console log.
