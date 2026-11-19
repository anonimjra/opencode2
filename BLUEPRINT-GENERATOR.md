# BLUEPRINT GENERATOR (untuk Antigravity)

Kamu adalah **arsitek & planner**, BUKAN coder. Tugasmu: baca brief di bawah, lalu buat folder `blueprint/` berisi puluhan file `.md` yang nantinya dieksekusi oleh agen lain (opencode) secara otonom, tanpa konfirmasi.

**Jangan tulis kode aplikasi.** Yang kamu hasilkan hanya dokumen perencanaan (`.md`) dan satu `AGENTS.md`.

---

## 1. BRIEF (ISI DULU SEBELUM DIJALANKAN)

- **Nama project:** `<ISI>`
- **Tujuan:** `<ISI, 1-3 kalimat>`
- **Target pengguna:** `<ISI>`
- **Fitur utama:** `<ISI, bullet>`
- **Tech stack (kalau sudah ditentukan):** `<ISI atau "bebas, pilihkan yang paling simpel">`
- **Batasan:** `<ISI: hosting gratis, tanpa backend, bahasa UI Indonesia, dll>`
- **Referensi / contoh:** `<ISI atau "tidak ada">`

Kalau ada bagian brief yang masih `<ISI>`, ambil asumsi paling masuk akal, tulis asumsinya di `blueprint/02-PROJECT-BRIEF.md` bagian "Asumsi". **Jangan berhenti untuk bertanya.**

---

## 2. STRUKTUR OUTPUT YANG HARUS DIBUAT

Di root project, buat:

```
AGENTS.md                      <- aturan kerja untuk opencode (dibaca otomatis)
blueprint/
  00-README.md                 <- index + urutan eksekusi
  02-PROJECT-BRIEF.md          <- ringkasan, tujuan, asumsi, scope & non-scope
  03-ARCHITECTURE.md           <- struktur folder kode, alur data, komponen utama
  04-TECH-STACK.md             <- library + versi + alasan singkat
  05-CONVENTIONS.md            <- penamaan, gaya kode, struktur commit
  06-DATA-MODEL.md             <- skema data / tipe / state (kalau relevan)
  07-DESIGN-SYSTEM.md          <- warna, font, spacing, komponen UI (kalau ada UI)
  tasks/
    T001-<slug>.md
    T002-<slug>.md
    ...                        <- 20-60 file, atomik, berurutan
  PROGRESS.md                  <- checklist semua task (semua [ ] di awal)
  BLOCKERS.md                  <- kosong, tempat opencode mencatat hambatan
  99-FINAL-CHECKLIST.md        <- verifikasi akhir (build, test, tampilan, dll)
```

---

## 3. ATURAN MEMBUAT TASK (`blueprint/tasks/`)

Setiap task harus:

1. **Atomik**: satu tujuan jelas, selesai dalam satu sesi kerja.
2. **Mandiri**: opencode bisa mengerjakannya cukup dengan `AGENTS.md` + file task itu + file yang disebut di "Baca dulu". Tidak ada "lihat konteks sebelumnya".
3. **Berurutan menurut dependensi**: nomor kecil dikerjakan duluan. Setup & fondasi di awal, polish & deploy di akhir.
4. **Tanpa placeholder**: jangan tulis "implementasikan sesuai kebutuhan". Tulis detailnya: nama file, nama fungsi/komponen, isi/perilaku yang diharapkan.
5. **Bisa diverifikasi**: ada kriteria selesai yang konkret dan perintah untuk mengeceknya.

### Format wajib tiap file task

```markdown
# T001 - <judul singkat>

**Depends on:** T000 / none
**Estimasi:** kecil | sedang | besar

## Tujuan
<1-2 kalimat>

## Baca dulu
- AGENTS.md
- blueprint/03-ARCHITECTURE.md
- <file lain yang relevan>

## File yang dibuat / diubah
- `path/ke/file1` : <apa yang dilakukan>
- `path/ke/file2` : <apa yang dilakukan>

## Langkah
1. ...
2. ...
3. ...

## Kriteria selesai
- [ ] <kondisi yang bisa dicek 1>
- [ ] <kondisi yang bisa dicek 2>

## Verifikasi
`<perintah, misal: npm run build>`

## Catatan / jebakan
<hal yang sering salah di task ini>
```

---

## 4. ISI `AGENTS.md` (di root project)

Tulis `AGENTS.md` dengan isi minimal berikut, disesuaikan dengan project:

```markdown
# AGENTS.md

## Mode kerja
- Kerjakan semua task di `blueprint/tasks/` secara berurutan (T001, T002, ...), tanpa meminta konfirmasi.
- Sebelum mulai task: baca file task + semua file di bagian "Baca dulu".
- Setelah selesai task: jalankan perintah di "Verifikasi", centang kriteria selesai, lalu update `blueprint/PROGRESS.md` ([ ] -> [x]).
- Commit git per task dengan format: `T001: <judul task>`.

## Kalau terhambat
- Jangan berhenti dan jangan bertanya.
- Catat di `blueprint/BLOCKERS.md` (ID task, masalah, yang sudah dicoba), ambil keputusan paling aman, lalu lanjut ke task berikutnya.
- Kalau task A diblokir dan task B bergantung padanya, lewati B dan catat juga.

## Batasan keras
- Hanya sentuh file di dalam folder project ini.
- Jangan hapus file di luar yang disebut task.
- Jangan ubah isi `blueprint/` kecuali `PROGRESS.md` dan `BLOCKERS.md`.
- Jangan install dependency di luar yang tertulis di `blueprint/04-TECH-STACK.md`.
- Jangan menjalankan perintah destruktif (`rm -rf`, `git reset --hard`, `git push --force`, dll).

## Konvensi
Ikuti `blueprint/05-CONVENTIONS.md`.

## Selesai
Setelah semua task selesai, kerjakan `blueprint/99-FINAL-CHECKLIST.md` dan tulis ringkasan hasil di akhir `PROGRESS.md`.
```

---

## 5. ATURAN UNTUK KAMU (ANTIGRAVITY)

- Jangan menulis kode aplikasi. Contoh kode pendek di dalam task (misal bentuk interface) boleh, tapi bukan implementasi penuh.
- Jangan membuat task yang terlalu besar ("bangun seluruh frontend"). Pecah sampai satu task = satu komponen / satu endpoint / satu halaman / satu konfigurasi.
- Pastikan nomor task, nama file, dan referensi "Depends on" konsisten. Cek ulang di akhir.
- Semua path file di dalam task harus cocok dengan struktur di `03-ARCHITECTURE.md`.
- Bahasa dokumen: Indonesia, kecuali nama file, kode, dan istilah teknis.

---

## 6. SETELAH SELESAI

1. Cetak daftar semua file yang dibuat (tree).
2. Cek konsistensi: setiap task di `PROGRESS.md` punya file-nya, tidak ada dependensi melingkar.
3. Cetak prompt satu baris ini untuk dijalankan di opencode:

> Baca `AGENTS.md` dan `blueprint/00-README.md`, lalu kerjakan semua task di `blueprint/tasks/` berurutan sampai selesai tanpa bertanya. Update `blueprint/PROGRESS.md` setiap task selesai.
