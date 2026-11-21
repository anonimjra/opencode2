# BLUEPRINT GENERATOR V3 (Furniture & Living Store Edition)

Kamu adalah **arsitek & planner**, BUKAN coder. Tugasmu: baca brief di bawah, lalu buat folder `blueprint/` berisi puluhan file `.md` yang nantinya dieksekusi oleh agen lain (opencode) secara otonom, tanpa konfirmasi.

**Jangan tulis kode aplikasi.** Yang kamu hasilkan hanya dokumen perencanaan (`.md`) dan satu `AGENTS.md`.

---

## 1. BRIEF (FURNITURE & CUSTOM INTERIOR EDITION)

- **Nama project:** Template E-Catalog & CMS Toko Furniture / Mebel Modern dengan Admin Dashboard (nama brand dummy: "Kalingga Living & Furniture", mudah diganti dari dashboard)
- **Tujuan:** Website katalog premium dan showcase portofolio untuk pengrajin/toko furniture (lemari, sofa, meja makan, tempat tidur, kitchen set, kabinet). Pelanggan dapat melihat katalog dengan spesifikasi teknis lengkap (dimensi fisik, material kayu/kain, varian finishing, opsi Ready Stock / Pre-Order), melakukan pemesanan via WhatsApp dengan format alamat kirim (untuk perhitungan ongkir kargo/armada toko), atau mengajukan konsultasi custom furniture. Pemilik toko dapat mengelola produk, foto proyek terpasang, dan ekspor data ke Excel secara mandiri tanpa coding.
- **Target pengguna:**
  - Pengunjung/pelanggan: Pemilik rumah baru, apartemen, atau renovator (mobile-first, butuh melihat detail dimensi, foto material close-up, dan bukti instalasi nyata).
  - Admin = pemilik toko/pengrajin mebel (antarmuka input dimensi, bahan, status PO/Ready yang praktis).
- **Fitur utama:**
  - **Landing page publik** (single page scroll modern & elegan):
    - Navbar: Logo, navigasi cepat (Hero, Tentang, Katalog Ruangan, Custom Order, Portofolio Terpasang, Testimoni, Showroom/Workshop, Kontak), tombol WhatsApp cepat.
    - Hero section: Showcase furniture ruang tamu/kamar tidur estetik, badge garansi rangka kayu, CTA "Jelajahi Katalog" dan "Konsultasi Custom Ukuran".
    - Filter Kategori Ruangan:
      - Ruang Tamu (Sofa 2/3 Seater, L-Shape Sofa, Coffee Table, Rak TV)
      - Kamar Tidur (Lemari Pakaian 2/3/4 Pintu Sliding/Swing, Dipan Tempat Tidur, Meja Rias)
      - Ruang Makan (Set Meja Makan Kayu Solid, Kursi Makan, Credenza)
      - Ruang Kerja (Meja Kerja Minimalis, Rak Buku)
      - Custom Furniture (Pesanan khusus menyesuaikan denah ruangan)
    - Kartu Produk Furniture (Fitur Spesifik Mebel):
      - Foto produk resolusi tinggi dengan carousel atau zoom halus.
      - Badge status: **Ready Stock** atau **Pre-Order (PO 7-14 Hari)**.
      - Spesifikasi teknis ringkas di kartu: Dimensi (P x L x T cm), Material Utama (misal: Kayu Jati Solid / Mahoni / Busa High-Density / Kain Linen Fabric).
      - Modal Detail / Quick View: Menampilkan foto detail tekstur kayu, pilihan warna finishing (Natural Teak, Walnut, Dark Charcoal, Bleached Oak), estimasi waktu produksi, dan panduan perawatan.
      - Tombol "Pesan via WhatsApp": Membuka chat dengan template otomatis memuat: *Nama Produk*, *Dimensi*, *Material*, *Harga*, dan meminta pelanggan mencantumkan *Kota/Kecamatan Pengiriman* untuk estimasi ongkos kirim.
    - Section "Layanan Custom Furniture": Form singkat untuk pelanggan mengajukan pembuatan furniture custom sesuai ukuran ruangan (upload sketsa/denah via WA).
    - Portofolio Proyek Terpasang (Before-After / Installation Showcase): Galeri foto asli produk setelah dikirim dan dipasang di rumah/apartemen pelanggan.
    - Section Workshop & Showroom Fisik: Alamat workshop tempat produksi, embed Google Maps, dan tombol booking jadwal kunjungan showroom fisik.
    - Form Kontak & Permintaan Penawaran (Request for Quotation).
    - Tombol WhatsApp Melayang (Floating FAB).
  - **Login admin**: Rute `/admin/login`, email + password Supabase Auth, middleware proteksi `/admin/*`.
  - **Dashboard admin**:
    - Ringkasan metrik: Total produk mebel aktif, jumlah item Ready Stock vs PO, permintaan custom masuk, total lead konsultasi.
    - Kelola Produk & Spesifikasi:
      - Tambah, edit, hapus produk.
      - Form field spesifik: Nama produk, kategori ruangan, harga (Rupiah), dimensi fisik (Panjang x Lebar x Tinggi dalam cm), bahan/material kayu & busa/kain, pilihan warna/finishing, garansi rangka (misal: 1 Tahun, 3 Tahun, Tanpa Garansi), status ketersediaan (Ready Stock / Pre-Order), lama waktu PO (hari), upload multiple foto/angle.
    - Kelola Kategori Ruangan & Produk.
    - Kelola Portofolio Instalasi: Upload foto hasil kirim di rumah klien, nama proyek/kota, dan jenis furniture yang dipasang.
    - Kelola Testimoni & Review Klien.
    - Kelola Permintaan Konsultasi & Pesan Masuk.
    - Pengaturan Brand & Tema: Nama brand mebel, logo, warna aksen (default: Warm Wood Teak `#8B5A2B` / Walnut `#5C4033`).
  - **Export Excel (.xlsx)** dari dashboard:
    - Export Katalog Furniture: No, Nama Produk, Kategori Ruangan, Dimensi (P x L x T), Material Utama, Status (Ready/PO), Garansi, Harga (Rupiah), Tanggal Update.
    - Export Leads Konsultasi Custom: No, Tanggal Masuk, Nama Klien, Kontak WA, Tipe Ruangan/Kebutuhan, Catatan Ukuran, Status Follow-up.
    - Dibuat di server dengan `exceljs`, format rapi, styling header profesional.
- **Tech stack:**
  - Next.js (App Router) + TypeScript + Tailwind CSS.
  - Supabase untuk database (PostgreSQL), auth admin, dan storage foto furniture.
  - `exceljs` untuk export Excel di Route Handler server (`/api/admin/export/[type]`).
  - Deploy: Vercel (gratis).
- **Batasan:**
  - Free tier Vercel + Supabase.
  - Bahasa UI: Indonesia. Mata uang: Rupiah (Rp).
  - Mobile-first, Next/Image dioptimasi untuk foto furniture bertekstur.
  - Tanpa payment gateway online: Transaksi, pembayaran DP pre-order, dan pelunasan dikoordinasikan langsung via WhatsApp toko/pengrajin.
  - Data awal (seed) berisi contoh katalog furniture realistis (lemari pakaian 3 pintu jati, sofa L-shape scandinavian, set meja makan 6 kursi, dipan tempat tidur minimalis).

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
  06-DATA-MODEL.md             <- skema tabel Supabase (kolom dimensi, material, garansi, status PO)
  07-DESIGN-SYSTEM.md          <- warna hangat kayu jati/walnut, tipografi elegan, modal quick-view
  tasks/
    T001-<slug>.md
    T002-<slug>.md
    ...                        <- 40-50 file atomik, berurutan, spesifik furniture
  PROGRESS.md                  <- checklist semua task
  BLOCKERS.md                  <- log kendala teknis
  99-FINAL-CHECKLIST.md        <- verifikasi akhir
```

---

## 3. ATURAN MEMBUAT TASK (`blueprint/tasks/`)

Setiap task harus:
1. **Atomik**: Satu tujuan jelas, tuntas dalam satu kali eksekusi.
2. **Mandiri**: Cukup berbekal `AGENTS.md` + file task + file referensi "Baca dulu".
3. **Spesifik Furniture**: Jangan gunakan data generik makanan/kopi; gunakan field nyata dimensi PxLxT, material kayu solid/HPL/fabric, status Ready/PO, dan kalkulasi chat kirim ke WhatsApp.
4. **Tanpa placeholder**: Nama file, interface TypeScript, skrip SQL, dan komponen harus ditulis konkret.
5. **Bisa diverifikasi**: Ada kriteria selesai dan perintah CLI verifikasi.

---

## 4. PROMPT EKSEKUSI OPENCODE

Setelah blueprint selesai di-generate:

> Baca `AGENTS.md` dan `blueprint/00-README.md`, lalu kerjakan semua task di `blueprint/tasks/` berurutan sampai selesai tanpa bertanya. Update `blueprint/PROGRESS.md` setiap task selesai.
