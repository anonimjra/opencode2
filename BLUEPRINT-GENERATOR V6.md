# BLUEPRINT GENERATOR V6 (Intelly - AI Clinical Practice & Patient Intelligence Dashboard)

Kamu adalah **arsitek & planner**, BUKAN coder. Tugasmu: baca brief di bawah, lalu buat folder `blueprint/` berisi puluhan file `.md` yang nantinya dieksekusi oleh agen lain (opencode) secara otonom, tanpa konfirmasi.

**Jangan tulis kode aplikasi.** Yang kamu hasilkan hanya dokumen perencanaan (`.md`) dan satu `AGENTS.md`.

---

## 1. BRIEF (INTELLY - CLINICAL PRACTICE & PATIENT CARE INTELLIGENCE DASHBOARD)

- **Nama project:** Intelly — AI-Powered Clinical Practice & Patient Care Intelligence Dashboard (Brand: "intelly", User Profile Mock: "Dr. Olivia", Target Date: "May 15, 2024").
- **Tujuan:** Dashboard manajemen praktik medis, antrean pasien harian, ringkasan kunjungan klinis, dan jadwal tindakan dokter berbasis web yang mengombinasikan visual estetik modern neo-grotesque soft pastel (ivory cream, deep obsidian charcoal, warm yellow, lilac pink, sage green, periwinkle blue), visualisasi data klinis presisi (Recharts sparkline & distribution bar chart), manajemen rekam medis/visit details pasien aktif, kalender interaktif, serta timeline real-time dengan milestone marker dinamis. Beroperasi 100% client-side local-first dengan persistensi LocalStorage dan siap diexport statis ke GitHub Pages.
- **Target pengguna:**
  - Dokter spesialis, praktisi klinik mandiri, dan kepala tim medis (contoh persona: Dr. Olivia) yang membutuhkan pemantauan antrean pasien harian, observasi resep/tindakan kilat, ringkasan waktu konsultasi, serta asisten klinis AI tanpa dependensi backend yang rumit.
- **Fitur utama (mengacu visual presisi UI referensi):**
  - **Sidebar Navigasi Kiri (Deep Obsidian Charcoal Pill Container):**
    - Container rounded ekstra halus (`rounded-[28px]` / `rounded-3xl`, warna `bg-[#18181B]` atau deep zinc charcoal) dengan padding proporsional.
    - Logo Brand: Tipografi modern lowercase **"intelly"** dilengkapi notch indikator collapsible berwarna lilac pink (`#F5B8DC`) dengan ikon panah kecil (`‹`).
    - Grup Menu **General**:
      - **Dashboard** (State aktif: pill highlight lembut `bg-white/10` dengan ikon grid `LayoutGrid`).
      - **Schedule** (Ikon `Calendar` — melihat kalender & agenda klinik lengkap).
      - **Patients** (Ikon `Users` — database pasien terdaftar & riwayat medis).
      - **Statistics & reports** (Ikon `PieChart` / `BarChart3` — analitik performa klinik & utilisasi waktu).
      - **Education** (Ikon `BookOpen` — referensi protokol medis & jurnal ilmiah).
      - **My articles** (Ikon `Bookmark` — catatan publikasi riset klinis dokter).
    - Grup Menu **Tools**:
      - **Chats & calls** (Ikon `MessageSquareQuote` / `PhoneCall` — telekonsultasi & pesan pasien).
      - **Billing** (Ikon `BadgeDollarSign` / `CreditCard` — invoice, klaim asuransi & kasir).
      - **Documents base** (Ikon `FileText` — arsip dokumen rekam medis & formulir lab).
      - **Settings** (Ikon `Settings` — preferensi klinik, jam praktik, dan tema visual).
    - Bagian Bawah:
      - **Log out** (Ikon `LogOut` — aksi sign out aman).
  - **Header Navigasi Atas (Top Search & Filter Shell):**
    - Search Bar Pill Interaktif: Input pencarian dengan ikon kaca pembesar dalam pill lilac pink (`#F5B8DC`), teks placeholder *"List |"* dilengkapi cursor blinking.
    - Label Kategori *"In:"* diikuti filter pills dengan border dashed/putus-putus:
      - **Patients** (Filter pencarian antrean pasien).
      - **Education** (Pencarian literatur medis).
      - **Prescriptions** (Pencarian arsip resep obat).
      - **Test results** (Pencarian hasil laboratorium & radiologi).
    - User Action Controls (Kanan Atas):
      - Avatar Profile Dokter (Dr. Olivia circle avatar).
      - Notifikasi Bell dengan badge counter unread.
      - Ikon Settings Cepat.
  - **Greeting Section & Daily Clinical Summary:**
    - Headline utama: **"Good morning, Dr.Olivia"** (tipografi modern editorial sans-serif tebal).
    - Subteks deskriptif ramah: *"intelly wishes you a good and productive day. 45 patients waiting for your treatment today. You also have one live event in your calendar today."*
    - Tautan aksi pojok kanan: **"Show all _"** untuk melihat ringkasan antrean lengkap.
  - **Grid 4 Kartu Metrik Klinis Asimetris (Soft Pastel Aesthetic dengan Subtle Watermark Shapes):**
    - **Kartu 1 - Patients: (Warm Pastel Yellow `#FCE688`):**
      - Background watermark geometris: bentuk silang/cross halus (`#EED26D`).
      - Header "Patients:" dengan metrik breakdown usia:
        - `14 pers 22-32 YO` | `5 pers 32-45 YO` | `2 pers 45+ YO`
      - Visual Bar Chart mini distribusi pasien (kombinasi batang vertikal hitam dan kuning lembut dengan label jam `07:30 pm` dan `12:00 pm`).
    - **Kartu 2 - Visits summary: (Soft Lilac Pink `#F5B8DC`):**
      - Background watermark geometris: bentuk hati (*heart shape*) halus (`#EB9DC9`).
      - Header "Visits summary:" dengan metrik durasi kunjungan:
        - `24 min AVERAGE` | `15 min MINIMUM` | `01:30 h MAXIMUM`
      - Visual Sparkline Area/Line Chart Recharts: kurva halus berwarna magenta tua (`#C23B82`) dengan **Milestone Dot Interaktif pada jam 12:00** lengkap dengan garis vertikal putus-putus (*dashed line drop*) ke sumbu waktu.
      - Label Sumbu Waktu: `10:30`, `11:00`, `11:30`, `12:00`, `12:30`, `13:00`, `13:30`.
    - **Kartu 3 - By condition: (Soft Sage Olive Green `#A3BF7E`):**
      - Background watermark geometris: prisma/segitiga halus (`#8FA867`).
      - Header "By condition:" dengan indikator status kesehatan pasien:
        - `14 pers STABLE` (hijau tua lembut)
        - `5 pers FAIR` (kuning zaitun)
        - `1 pers CRITICAL` (aksen peringatan)
    - **Kartu 4 - Sessions: (Soft Periwinkle Sky Blue `#98BFE8`):**
      - Background watermark geometris: bunga/starburst 8-sudut halus (`#80ABDB`).
      - Header "Sessions:" dengan metrik tipe konsultasi:
        - `03:45 h IN CLINIC` | `02:00 min VIDEO CALLS` | `00:24 min IN CHAT`
  - **Section Tengah - Patient's List & Clinical Visit Details (2 Kolom Seimbang):**
    - **Kolom Kiri - Patient's List:**
      - Header "Patient's list" dengan dropdown filter waktu: **"Today v"** (opsi: Today, Tomorrow, This Week, All).
      - Daftar Pill Pasien Interaktif:
        - **Taigo Wilkinson** (State Aktif: background lilac pink `#F5B8DC`, tipe kunjungan *"Emergency Visit"*, jam `09:15 AM`, ikon stetoskop).
        - **Samantha Williams** (Background ivory pill, tipe kunjungan *"Routine Check-Up"*, jam `09:15 AM`, ikon kapsul obat).
        - **Amy White** (Background ivory pill, tipe kunjungan *"Video Consultation"*, jam `09:15 AM`, ikon video cam).
        - **Tyler Young** (Background ivory pill, tipe kunjungan *"Report"*, jam `09:45 AM`, ikon dokumen lab).
      - Mengklik pasien mana pun akan langsung mengupdate kartu "Visit details" di sebelah kanan secara reaktif.
    - **Kolom Kanan - Visit Details (Lilac Pink `#F5B8DC` Card Container):**
      - Header Pasien: Nama **"Taigo Wilkinson"**, gender & umur: *"Male — 38 Years 5 Months"*, Badge Nomor Rekam Medis: **`TEG4-TES-MX72`**.
      - Badges/Pills Gejala: Pills rounded gelap kontras (`#BA3A7D` / deep mauve): **Fever**, **Caught** (Cough), **Heart Burn**.
      - Metadata Klinis:
        - **Last Checked:** `Dr Everly on 21 April 2021` | **Prescription ID:** `#23185KTG`
        - **Observation:** *"High fever and cough at normal hemoglobin levels."*
        - **Prescription:**
          - `Paracetamol — 2 times a day`
          - `Diazepam — Day and Night before meal`
      - Interaktivitas Tambahan: Tombol "Edit Observation", "Add Rx Medicine", "Print Prescription", dan "Complete Consultation".
  - **Sidebar Kanan - Calendar & Today's Clinical Timeline:**
    - **Mini Calendar Component:**
      - Header navigasi bulan: tombol panah kiri-kanan dengan pill judul **`< May 2024 >`**.
      - Grid Kalender 7 Hari: `MO, TU, WE, TH, FR, SA, SU` dengan nomor minggu (`W23, W24, W25, W26, W27`) di margin kanan.
      - Seleksi tanggal aktif: Angka **15** dilingkari pill lilac pink (`#F5B8DC`).
      - Baris Aksi Cepat: Tombol hitam pill **"Add event"**, ikon sinkronisasi/refresh, dan ikon dokumen.
    - **Today's Timeline Component (May 15):**
      - Sub-header: *"Time"*, *"Today's timeline"*, dan filter dropdown **"All v"** (All, Emergency, Tests, Meetings).
      - Penanda Waktu Realtime: Badge pink pill **`08:12`** dengan garis horizontal putus-putus (*dashed line*) yang melintang menunjuk posisi waktu saat ini.
      - Item Jadwal Timeline:
        - `07:00` — **Emergency visit** (West camp, Room 312, 07:00 – 07:30, ikon stetoskop dalam lingkaran pink).
        - `07:30` — **Diagnostic test** (East camp, Laboratory, floor 5, 07:30 – 08:00, ikon alat suntik/tabung reaksi dalam lingkaran biru).
        - `08:00` — **Team daily planning** (East camp, Room 200, 08:00 – 09:00, ikon tim dalam lingkaran kuning, avatar stack peserta: `TH`, `AR`, `TY`, `SB`, `+3`).
        - `09:00` — **Emergency visit** (West camp, Room 312, 09:00 – 09:30).
      - Tombol Aksi Bawah: Tombol hitam pill lebar **"View all details"** untuk membuka jadwal lengkap dokter.
  - **Fitur Ekstensi Enterprise & Interaktivitas Kaya:**
    - **Intelly AI Clinical Scribe Drawer:** Asisten AI cerdas untuk Dr. Olivia yang mampu membuat ringkasan resume medis SOAP (Subjective, Objective, Assessment, Plan), memvalidasi interaksi obat, dan memberikan rekomendasi rujukan lab.
    - **Modal Pasien Baru / Check-in:** Form modal untuk mendaftarkan pasien ke antrean hari ini (Nama, Umur, Gender, Kondisi: Stable/Fair/Critical, Gejala, Jam Kunjungan).
    - **Modal Tambah Event / Tindakan Jadwal:** Form modal untuk menjadwalkan tindakan medis atau rapat koordinasi ke dalam kalender & timeline.
    - **Export Laporan Praktik Medis ke Excel (.xlsx):** Menggunakan `exceljs` client-side untuk mendownload rekap daftar antrean pasien hari ini, status kondisi, observasi klinis, dan log resep obat.
    - **Efek Konfeti & Suara Haptic:** Menggunakan `canvas-confetti` saat dokter menyelesaikan kunjungan pasien (*consultation completed*).
    - **GitHub Pages Ready:** Konfigurasi `next.config.ts` dengan `output: 'export'`, `basePath: '/opencode6'`, `images: { unoptimized: true }`, dan file `.nojekyll` di folder `public/` & `out/`.
- **Tech stack:**
  - Next.js (App Router) + TypeScript Strict Mode.
  - Tailwind CSS v4 (`@import "tailwindcss";`) dengan konfigurasi warna custom pastel neo-grotesque (`#F8F5EE`, `#18181B`, `#FCE688`, `#F5B8DC`, `#A3BF7E`, `#98BFE8`).
  - Lucide React (koleksi ikon medis, navigasi & kontrol).
  - Framer Motion (transisi smooth layout, drawer AI, animasi modal).
  - Recharts (Sparkline line/area chart visits summary, distribution bar chart).
  - Zustand + LocalStorage (manajemen antrean pasien terpusat, jadwal timeline, active patient selector).
  - ExcelJS + File-Saver (pembuatan laporan spreadsheet rekam medis harian).
  - Canvas-Confetti (perayaan penyelesaian konsultasi).
- **Batasan:**
  - 100% Client-side local-first: data tersimpan di LocalStorage dengan seed mock awal yang kaya, realistis, dan presisi sesuai gambar referensi.
  - Zero build errors / Zero TypeScript errors.
  - Sepenuhnya kompatibel dengan GitHub Pages static export (`output: 'export'`).

---

## 2. STRUKTUR OUTPUT YANG HARUS DIBUAT

Di root project (`opencode6`), buat:

```text
AGENTS.md                      <- aturan kerja untuk opencode (dibaca otomatis)
blueprint/
  00-README.md                 <- index + urutan eksekusi
  02-PROJECT-BRIEF.md          <- ringkasan, sasaran, scope & non-scope
  03-ARCHITECTURE.md           <- struktur folder kode, state management, alur data
  04-TECH-STACK.md             <- library + versi + alasan arsitektural
  05-CONVENTIONS.md            <- penamaan, standardisasi kode, struktur commit
  06-DATA-MODEL.md             <- TypeScript interfaces, data mock seeds, LocalStorage state
  07-DESIGN-SYSTEM.md          <- token warna pastel, watermark SVG, tipografi, Recharts styling
  tasks/
    T001-setup-nextjs-project.md
    T002-configure-tailwind-and-theme.md
    T003-typescript-types-and-interfaces.md
    T004-mock-seed-data.md
    T005-localstorage-zustand-store.md
    T006-utility-formatters-and-time.md
    T007-app-root-shell-and-layout.md
    T008-sidebar-navigation.md
    T009-top-search-filter-header.md
    T010-doctor-greeting-banner.md
    T011-card-patients-age-chart.md
    T012-card-visits-summary-sparkline.md
    T013-card-condition-and-sessions.md
    T014-patients-queue-list.md
    T015-visit-details-clinical-card.md
    T016-calendar-widget-component.md
    T017-today-timeline-feed.md
    T018-assemble-dashboard-main-page.md
    T019-modal-add-patient-checkin.md
    T020-modal-add-event-timeline.md
    T021-intelly-ai-clinical-scribe-drawer.md
    T022-exceljs-clinical-report-export.md
    T023-patients-management-subpage.md
    T024-schedule-timeline-subpage.md
    T025-github-pages-export-configuration.md
    T026-documentation-and-build-verification.md
  PROGRESS.md                  <- checklist semua task (semua [ ] di awal)
  BLOCKERS.md                  <- log kendala teknis (kosong di awal)
  99-FINAL-CHECKLIST.md        <- verifikasi build, typecheck, static export, visual QA
```

---

## 3. PROMPT SATU BARIS UNTUK EKSEKUSI OPENCODE

> Baca `AGENTS.md` dan `blueprint/00-README.md`, lalu kerjakan semua task di `blueprint/tasks/` berurutan sampai selesai tanpa bertanya. Update `blueprint/PROGRESS.md` setiap task selesai.
