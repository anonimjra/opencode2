# T030 - Admin Kelola Pengaturan Tampilan & Warna Brand

**Depends on:** T009, T023, T025
**Estimasi:** kecil

## Tujuan
Membangun halaman pengaturan tampilan dan branding (`app/admin/settings/page.tsx`) yang memungkinkan admin mengganti nama brand, mengunggah file logo kedai, dan memilih palet warna tema utama melalui pemilih warna (color picker) atau tombol preset tema siap pakai.

## Baca dulu
- AGENTS.md
- blueprint/06-DATA-MODEL.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `app/admin/settings/page.tsx` : Halaman pengaturan identitas dan tema
- `components/admin/ThemeSettingsForm.tsx` : Form nama brand, upload logo, dan color picker
- `app/actions/settings.ts` : Server Action update identitas brand dan warna tema

## Langkah
1. Buat `app/actions/settings.ts`:
   - Deklarasikan `'use server'`.
   - Implementasikan `updateBrandAndTheme(formData: FormData): Promise<ActionResponse>`:
     - Ekstrak: `brand_name`, `tagline`, `primary_color` (format HEX, misal `#7C2D12`).
     - Jika ada file logo baru yang diunggah, simpan ke Supabase Storage dan dapatkan URL barunya.
     - Simpan perubahan ke tabel `site_settings`.
     - Lakukan revalidasi layout root `revalidatePath('/', 'layout')`.
2. Buat `components/admin/ThemeSettingsForm.tsx`:
   - Tandai dengan `'use client'`.
   - Terima props `settings: SiteSettings`.
   - Form Identitas Brand:
     - Nama Brand Usaha (Input teks, default "Kopi Senja").
     - Tagline Usaha (Input teks).
     - Upload Logo Brand: Komponen `ImageUploader` khusus file logo (mendukung format PNG transparan / SVG).
   - Pemilih Warna Tema Utama (Primary Theme Color):
     - Input pemilih warna HTML native: `<input type="color" value={primaryColor} onChange={...} />`.
     - Input kode HEX manual dengan validasi format regex `^#([A-Fa-f0-9]{6})$`.
     - Deretan 4 Tombol Preset Tema Cepat:
       1. Warm Coffee (`#7C2D12`)
       2. Matcha & Nature (`#15803D`)
       3. Sunset Artisan (`#C2410C`)
       4. Modern Minimalist (`#18181B`)
     - Mengklik tombol preset langsung mengisi nilai warna dan memperbarui pratinjau warna secara instan di form.
   - Tombol "Terapkan Perubahan Tampilan".
3. Buat `app/admin/settings/page.tsx`:
   - Server Component pemanggil `site_settings`.
   - Render `ThemeSettingsForm`.

## Kriteria selesai
- [ ] Admin dapat mengubah nama brand dan tagline toko dengan mudah.
- [ ] Admin dapat mengganti logo kedai melalui unggah file gambar.
- [ ] Admin dapat memilih warna tema dari 4 preset atau memilih warna custom via color picker.
- [ ] Mengubah warna tema segera memperbarui variabel CSS pada seluruh antarmuka web.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- Gunakan `revalidatePath('/', 'layout')` agar revalidasi Next.js membersihkan cache layout root tempat ThemeProvider diinjeksi.
