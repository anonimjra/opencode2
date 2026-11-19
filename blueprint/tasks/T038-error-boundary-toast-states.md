# T038 - Error Boundary, 404 Page, Loading State & Toast UI

**Depends on:** T008, T023
**Estimasi:** sedang

## Tujuan
Menyediakan halaman penanganan error global (`app/error.tsx`), halaman 404 ramah (`app/not-found.tsx`), animasi loading skeleton (`app/loading.tsx` & `app/admin/loading.tsx`), serta sistem notifikasi toast (`components/ui/Toast.tsx`) untuk memberikan feedback visual langsung saat mutasi data berhasil atau gagal.

## Baca dulu
- AGENTS.md
- blueprint/05-CONVENTIONS.md
- blueprint/07-DESIGN-SYSTEM.md

## File yang dibuat / diubah
- `app/error.tsx` : Global error boundary penangkap unhandled exception
- `app/not-found.tsx` : Halaman 404 jika halaman atau produk tidak ditemukan
- `app/loading.tsx` : Halaman skeleton loading publik
- `app/admin/loading.tsx` : Halaman skeleton loading panel admin
- `components/ui/Toast.tsx` : Komponen toast notifikasi mengambang (sukses, error, info)
- `components/ui/Skeleton.tsx` : Komponen placeholder shimmer loading atomik

## Langkah
1. Buat `components/ui/Skeleton.tsx`:
   - Komponen visual shimmer efek `animate-pulse bg-stone-200 rounded-lg`.
2. Buat `components/ui/Toast.tsx`:
   - Tandai dengan `'use client'`.
   - Dukung notifikasi popup otomatis hilang dalam 4 detik.
   - Variasi: Sukses (Hijau dengan ikon centang), Error (Merah dengan ikon silang peringatan), Info (Biru).
3. Buat `app/error.tsx`:
   - Tandai dengan `'use client'`.
   - Tampilkan pesan ramah: *"Terjadi kendala pada sistem. Jangan khawatir, silakan muat ulang halaman."*.
   - Sediakan tombol "Coba Lagi" (`reset()`) dan tombol "Kembali ke Beranda".
4. Buat `app/not-found.tsx`:
   - Tampilan grafis bersih: Angka "404", judul *"Halaman Tidak Ditemukan"*, keterangan *"Halaman yang Anda tuju mungkin telah dipindahkan atau tautan tidak valid."*, dan tombol kembali ke halaman beranda.
5. Buat `app/loading.tsx` dan `app/admin/loading.tsx`:
   - Render susunan komponen `Skeleton` yang meniru tata letak navbar, hero banner, dan kartu produk untuk mencegah layout shift mendadak saat data sedang ditarik dari server.

## Kriteria selesai
- [ ] Error boundary menangkap error dan tidak menampilkan layar putih kosong (blank screen).
- [ ] Halaman 404 berfungsi jika mengakses rute acak yang tidak ada.
- [ ] Skeleton loading tampil anggun saat perpindahan rute berlangsung.
- [ ] Notifikasi toast muncul dengan jelas saat admin menyimpan data atau saat form kontak terkirim.

## Verifikasi
`npx tsc --noEmit`

## Catatan / jebakan
- File `app/error.tsx` wajib diawali direktif `'use client'` sesuai aturan standar Next.js App Router.
