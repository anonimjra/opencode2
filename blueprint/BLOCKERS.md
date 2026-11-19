# BLOCKERS

File ini digunakan oleh agen pelaksana (`opencode`) untuk mencatat hambatan teknis yang dihadapi selama pengerjaan task, tindakan yang telah dicoba, serta keputusan mitigasi yang diambil secara otonom.

Format pencatatan blocker:
```markdown
## [TXXX] - <Judul Task>
- **Waktu Terjadi:** YYYY-MM-DD HH:MM
- **Deskripsi Masalah:** <penjelasan error / kendala teknis>
- **Tindakan yang Dicoba:**
  1. <upaya 1>
  2. <upaya 2>
- **Keputusan Mitigasi:** <solusi alternatif aman yang dipilih agar proses tetap berlanjut>
- **Dampak ke Task Lain:** <apakah ada task turunan yang terpengaruh>
```

---

## [GLOBAL] - Supabase Live Belum Dikonfigurasi
- **Waktu Terjadi:** 2026-11-19
- **Deskripsi Masalah:** Environment `.env.local` hanya berisi placeholder (`https://your-project.supabase.co`). Tidak ada proyek Supabase live untuk menjalankan migrasi, seed, dan menguji alur data end-to-end (login, CRUD, upload, export) secara nyata.
- **Tindakan yang Dicoba:**
  1. Membuat seluruh skrip migrasi & seed agar siap dieksekusi pada proyek Supabase pengguna.
  2. Menambahkan fallback data pada landing page (`FALLBACK_SITE_SETTINGS`) agar halaman tetap ter-render tanpa error 500 saat database kosong/tidak tersedia.
  3. Memverifikasi kompilasi (`tsc --noEmit`, `next build`, `npm run lint`) — seluruhnya lolos tanpa perlu koneksi database.
- **Keputusan Mitigasi:** Build & type-check diverifikasi statis; seluruh query dibungkus penanganan error/fallback. Pengujian data live dilakukan saat kredensial Supabase tersedia.
- **Dampak ke Task Lain:** Tidak menghalangi penyelesaian kode; verifikasi runtime database bergantung pada konfigurasi kredensial oleh pengguna (didokumentasikan di `README.md`).
