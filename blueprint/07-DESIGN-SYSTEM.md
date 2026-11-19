# 07-DESIGN-SYSTEM

Dokumen ini mendefinisikan sistem desain visual, palet warna, tipografi, grid responsif, dan spesifikasi komponen UI untuk antarmuka publik dan dashboard admin.

---

## 1. Filosofi Visual & Nuansa (Design Language)

- **Karakter:** Hangat (*warm*), bersih (*clean*), mengundang (*inviting*), dan ramah mobile (*touch-friendly*).
- **Default Mood:** Coffee shop artisanal modern dengan perpaduan warna tanah (cokelat hangat, krem, dan aksen emas/amber lembut) yang dapat diubah sesuai brand UMKM pengguna melalui dashboard.

---

## 2. Palet Warna (Color Palette)

### A. Dynamic Primary Color (Dapat Dikonfigurasi di Database)
Warna utama dikendalikan melalui CSS Variables di `:root` yang diinjeksikan oleh `ThemeProvider`.

| Token CSS Variable | Nilai Default (Coffee) | Penggunaan |
|---|---|---|
| `--color-primary` | `#7C2D12` (Amber/Brown-900) | Tombol utama, aksen navbar, link aktif, border fokus |
| `--color-primary-hover` | `#9A3412` (Amber/Brown-800) | State hover tombol utama |
| `--color-primary-light` | `#FEF3C7` (Amber-100) | Background badge, highlight kartu, aksen lembut |
| `--color-primary-foreground`| `#FFFFFF` | Warna teks di atas background primary |

### B. Preset Pilihan Tema UMKM
Admin dapat memilih 4 preset siap pakai dari dashboard:
1. **Warm Coffee (Default):** `#7C2D12` (Cokelat Kopi Hangat)
2. **Matcha & Nature:** `#15803D` (Hijau Botol / Daun Teh Segar)
3. **Sunset Artisan:** `#C2410C` (Oranye Terracotta Hangat)
4. **Modern Minimalist:** `#18181B` (Hitam Pekat Arang / Charcoal)

### C. Netral & Permukaan (Neutral & Surface)
- **Background Utama Publik:** `#FAFAF9` (Stone-50 - lembut di mata, tidak menyilaukan)
- **Background Kartu / Card:** `#FFFFFF` (White murni dengan subtle border)
- **Background Dashboard Admin:** `#F4F4F5` (Zinc-100)
- **Border Default:** `#E7E5E4` (Stone-200)
- **Teks Utama:** `#1C1917` (Stone-900 - kontras tinggi & tajam)
- **Teks Sekunder (Muted):** `#78716C` (Stone-500)

### D. Warna Semantik (Feedback)
- **Success / Tersedia:** `#16A34A` (Green-600), background `#DCFCE7` (Green-100)
- **Destructive / Habis:** `#DC2626` (Red-600), background `#FEE2E2` (Red-100)
- **Warning / Pending:** `#D97706` (Amber-600), background `#FEF3C7` (Amber-100)
- **WhatsApp Brand Color:** `#25D366` (Hijau resmi WhatsApp untuk floating FAB dan CTA pemesanan)

---

## 3. Tipografi (Typography)

Menggunakan font modern dari Google Fonts via `next/font/google`:
- **Font Utama (Body & UI):** `Plus Jakarta Sans` atau `Inter` (Sans-Serif dengan keterbacaan tinggi di layar kecil).
- **Font Aksen Heading (Opsional):** `Playfair Display` (Serif elegan untuk judul Hero dan Tentang Kami pada tema cafe) atau `Plus Jakarta Sans` bold.

### Hierarki Skala Tipografi
- **Display 1 (Hero Title):** `text-4xl md:text-5xl lg:text-6xl`, `font-bold`, `tracking-tight`
- **Heading 2 (Section Title):** `text-2xl md:text-3xl`, `font-bold`
- **Heading 3 (Card Title / Subhead):** `text-lg md:text-xl`, `font-semibold`
- **Body Large:** `text-base md:text-lg`, `leading-relaxed`
- **Body Normal:** `text-sm md:text-base`, `leading-normal`
- **Caption / Badge:** `text-xs`, `font-medium`, `uppercase tracking-wider`

---

## 4. Spacing, Radius, & Shadows

- **Container Max-Width:** `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Section Vertical Padding:** `py-16 md:py-24`
- **Border Radius:**
  - Card & Modal: `rounded-2xl` (16px - ramah dan modern)
  - Button & Input: `rounded-xl` (12px)
  - Badge & Tag: `rounded-full`
- **Box Shadow:**
  - Card Default: `shadow-sm hover:shadow-md transition-shadow duration-200`
  - Floating WhatsApp: `shadow-lg hover:shadow-xl`
  - Modal Dialog: `shadow-2xl`

---

## 5. Spesifikasi Komponen Inti

### A. Button (`components/ui/Button.tsx`)
- **Variant:**
  - `primary`: `bg-[var(--color-primary)] text-white hover:bg-[var(--color-primary-hover)] active:scale-95`
  - `whatsapp`: `bg-[#25D366] text-white hover:bg-[#20BA5A] shadow-md`
  - `secondary`: `bg-stone-100 text-stone-900 hover:bg-stone-200`
  - `outline`: `border border-stone-300 text-stone-800 hover:bg-stone-50`
  - `destructive`: `bg-red-600 text-white hover:bg-red-700`
  - `ghost`: `text-stone-700 hover:bg-stone-100`
- **Size:** `sm` (px-3 py-1.5 text-xs), `md` (px-4 py-2.5 text-sm), `lg` (px-6 py-3.5 text-base font-semibold).
- **State:** `disabled:opacity-50 disabled:cursor-not-allowed`, spinner loading icon otomatis saat `isLoading=true`.

### B. Badge Ketersediaan (`components/ui/Badge.tsx`)
- **Tersedia:** `bg-green-100 text-green-800 border border-green-200` dengan dot hijau.
- **Habis:** `bg-stone-200 text-stone-700 border border-stone-300` dengan teks tegas "Habis".

### C. Kartu Produk (`components/landing/ProductCard.tsx`)
- Rasio Gambar: `aspect-square` atau `aspect-[4/3]` dengan `object-cover`.
- Desain hover: Zoom halus pada gambar (`group-hover:scale-105 transition-transform duration-300`).
- Informasi: Nama produk tebal, deskripsi 2 baris (`line-clamp-2`), badge kategori di pojok gambar.
- Aksi: Tombol "Pesan via WhatsApp" hijau dengan ikon WhatsApp Lucide / SVG resmi. Jika status habis, tombol dinonaktifkan (`disabled`).

### D. Floating WhatsApp Button (`components/landing/WhatsAppFloatingButton.tsx`)
- Posisi: `fixed bottom-6 right-6 z-50`.
- Tampilan: Lingkaran hijau WhatsApp dengan ikon chat, ada efek *pulse ring* animasi lembut untuk menarik atensi tanpa mengganggu membaca.
- Tooltip hover: "Chat dengan Kami".
