# 06-DATA-MODEL

Dokumen ini mendefinisikan rancangan skema database PostgreSQL di Supabase, relasi antar entitas, aturan Row Level Security (RLS), konfigurasi storage bucket, dan definisi tipe TypeScript.

---

## 1. Skema Entitas Database (PostgreSQL DDL)

### A. Tabel `site_settings`
Menyimpan konfigurasi identitas brand, tema warna, konten statis landing page, dan tautan sosial media (hanya 1 baris/singleton).

```sql
CREATE TABLE public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_name VARCHAR(100) NOT NULL DEFAULT 'Kopi Senja',
    tagline VARCHAR(255) DEFAULT 'Nikmati Setiap Tegukan Hangat Penuh Cerita',
    logo_url TEXT,
    primary_color VARCHAR(10) NOT NULL DEFAULT '#7C2D12', -- Default Warm Brown / Amber-900
    hero_title VARCHAR(200) NOT NULL DEFAULT 'Tempat Terbaik Menikmati Kopi & Santai Sejenak',
    hero_subtitle TEXT DEFAULT 'Diseduh dari biji kopi pilihan nusantara dengan racikan sepenuh hati. Kunjungi kedai kami atau pesan langsung ke meja Anda.',
    hero_image_url TEXT,
    about_title VARCHAR(200) NOT NULL DEFAULT 'Cerita Dari Secangkir Kopi Kami',
    about_description TEXT DEFAULT 'Bermula dari kecintaan pada aroma biji kopi lokal, Kopi Senja hadir sebagai ruang temu yang hangat bagi siapa saja yang ingin jeda sejenak dari hiruk pikuk kota.',
    about_image_url TEXT,
    whatsapp_number VARCHAR(30) NOT NULL DEFAULT '6281234567890',
    address TEXT DEFAULT 'Jl. Merpati No. 12, Senopati, Jakarta Selatan',
    google_maps_embed_url TEXT,
    opening_hours JSONB NOT NULL DEFAULT '[
        {"day": "Senin - Jumat", "time": "08:00 - 22:00"},
        {"day": "Sabtu - Minggu", "time": "07:00 - 23:00"}
    ]'::jsonb,
    instagram_url VARCHAR(255) DEFAULT 'https://instagram.com',
    tiktok_url VARCHAR(255) DEFAULT 'https://tiktok.com',
    facebook_url VARCHAR(255) DEFAULT 'https://facebook.com',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);
```

### B. Tabel `categories`
Menyimpan kategori produk/menu (misal: Espresso, Manual Brew, Non-Kopi, Camilan).

```sql
CREATE TABLE public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_categories_sort_order ON public.categories (sort_order ASC);
```

### C. Tabel `products`
Menyimpan katalog menu dan produk yang dijual.

```sql
CREATE TABLE public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(12, 0) NOT NULL DEFAULT 0, -- Harga bulat dalam mata uang Rupiah
    image_url TEXT,
    is_available BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_products_category ON public.products (category_id);
CREATE INDEX idx_products_availability ON public.products (is_available);
CREATE INDEX idx_products_sort_order ON public.products (sort_order ASC, created_at DESC);
```

### D. Tabel `gallery`
Menyimpan foto-foto suasana cafe atau produk unggulan.

```sql
CREATE TABLE public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150),
    caption TEXT,
    image_url TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_gallery_sort_order ON public.gallery (sort_order ASC);
```

### E. Tabel `testimonials`
Menyimpan ulasan dan testimoni dari pelanggan terverifikasi.

```sql
CREATE TABLE public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_name VARCHAR(120) NOT NULL,
    customer_role VARCHAR(100) DEFAULT 'Pelanggan Setia',
    review_text TEXT NOT NULL,
    rating INT NOT NULL DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
    avatar_url TEXT,
    is_active BOOLEAN NOT NULL DEFAULT true,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_testimonials_sort ON public.testimonials (sort_order ASC, created_at DESC);
```

### F. Tabel `contact_messages`
Menyimpan pesan yang dikirim pelanggan melalui formulir kontak landing page.

```sql
CREATE TABLE public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(100) NOT NULL, -- Nomor WhatsApp atau Alamat Email
    subject VARCHAR(150) DEFAULT 'Pesan dari Website',
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX idx_messages_unread ON public.contact_messages (is_read, created_at DESC);
```

---

## 2. Row Level Security (RLS) Policies

Semua tabel wajib mengaktifkan `ALTER TABLE ... ENABLE ROW LEVEL SECURITY;`.

### Matriks Hak Akses
| Tabel | Anon / Publik (Unauthenticated) | Admin (Authenticated) |
|---|---|---|
| `site_settings` | **SELECT** saja | **SELECT, INSERT, UPDATE** |
| `categories` | **SELECT** saja | **SELECT, INSERT, UPDATE, DELETE** |
| `products` | **SELECT** saja | **SELECT, INSERT, UPDATE, DELETE** |
| `gallery` | **SELECT** saja | **SELECT, INSERT, UPDATE, DELETE** |
| `testimonials` | **SELECT** (hanya `is_active = true`) | **SELECT, INSERT, UPDATE, DELETE** |
| `contact_messages` | **INSERT** saja | **SELECT, UPDATE, DELETE** |

---

## 3. Storage Bucket Configuration

- **Nama Bucket:** `public-media`
- **Tipe:** Public Bucket (`public = true`).
- **Kebijakan Akses (Storage RLS):**
  - **Read:** Terbuka untuk umum (`anon` dan `authenticated`).
  - **Insert / Update / Delete:** Hanya diizinkan untuk pengguna berstatus `authenticated`.

---

## 4. Representasi Tipe TypeScript (`types/database.ts`)

```typescript
export type SiteSettings = {
  id: string;
  brand_name: string;
  tagline: string;
  logo_url: string | null;
  primary_color: string;
  hero_title: string;
  hero_subtitle: string;
  hero_image_url: string | null;
  about_title: string;
  about_description: string;
  about_image_url: string | null;
  whatsapp_number: string;
  address: string;
  google_maps_embed_url: string | null;
  opening_hours: Array<{ day: string; time: string }>;
  instagram_url: string | null;
  tiktok_url: string | null;
  facebook_url: string | null;
  created_at: string;
  updated_at: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  sort_order: number;
  created_at: string;
};

export type Product = {
  id: string;
  category_id: string | null;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  is_featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
  category?: Category | null;
};

export type GalleryItem = {
  id: string;
  title: string | null;
  caption: string | null;
  image_url: string;
  sort_order: number;
  created_at: string;
};

export type Testimonial = {
  id: string;
  customer_name: string;
  customer_role: string | null;
  review_text: string;
  rating: number;
  avatar_url: string | null;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  contact: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};
```
