-- =============================================================================
-- 001_initial_schema.sql
-- Skema awal aplikasi Landing Page UMKM / Coffee Shop "Kopi Senja"
-- Tabel, index, trigger updated_at, RLS policies, dan storage bucket.
-- =============================================================================

-- Ekstensi untuk gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- -----------------------------------------------------------------------------
-- 1. Tabel
-- -----------------------------------------------------------------------------

-- Konfigurasi brand, tema, dan konten statis (singleton)
CREATE TABLE IF NOT EXISTS public.site_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    brand_name VARCHAR(100) NOT NULL DEFAULT 'Kopi Senja',
    tagline VARCHAR(255) DEFAULT 'Nikmati Setiap Tegukan Hangat Penuh Cerita',
    logo_url TEXT,
    primary_color VARCHAR(10) NOT NULL DEFAULT '#7C2D12',
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

CREATE TABLE IF NOT EXISTS public.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price NUMERIC(12, 0) NOT NULL DEFAULT 0,
    image_url TEXT,
    is_available BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.gallery (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(150),
    caption TEXT,
    image_url TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE TABLE IF NOT EXISTS public.testimonials (
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

CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    contact VARCHAR(100) NOT NULL,
    subject VARCHAR(150) DEFAULT 'Pesan dari Website',
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- -----------------------------------------------------------------------------
-- 2. Index performa
-- -----------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_categories_sort_order ON public.categories (sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_products_category ON public.products (category_id);
CREATE INDEX IF NOT EXISTS idx_products_availability ON public.products (is_available);
CREATE INDEX IF NOT EXISTS idx_products_sort_order ON public.products (sort_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_gallery_sort_order ON public.gallery (sort_order ASC);
CREATE INDEX IF NOT EXISTS idx_testimonials_sort ON public.testimonials (sort_order ASC, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_unread ON public.contact_messages (is_read, created_at DESC);

-- -----------------------------------------------------------------------------
-- 3. Trigger updated_at otomatis
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_site_settings_updated_at ON public.site_settings;
CREATE TRIGGER trg_site_settings_updated_at
    BEFORE UPDATE ON public.site_settings
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS trg_products_updated_at ON public.products;
CREATE TRIGGER trg_products_updated_at
    BEFORE UPDATE ON public.products
    FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- -----------------------------------------------------------------------------
-- 4. Row Level Security
-- -----------------------------------------------------------------------------
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- --- site_settings ---
DROP POLICY IF EXISTS "site_settings_public_select" ON public.site_settings;
CREATE POLICY "site_settings_public_select" ON public.site_settings
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "site_settings_admin_all" ON public.site_settings;
CREATE POLICY "site_settings_admin_all" ON public.site_settings
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- --- categories ---
DROP POLICY IF EXISTS "categories_public_select" ON public.categories;
CREATE POLICY "categories_public_select" ON public.categories
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "categories_admin_all" ON public.categories;
CREATE POLICY "categories_admin_all" ON public.categories
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- --- products ---
DROP POLICY IF EXISTS "products_public_select" ON public.products;
CREATE POLICY "products_public_select" ON public.products
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "products_admin_all" ON public.products;
CREATE POLICY "products_admin_all" ON public.products
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- --- gallery ---
DROP POLICY IF EXISTS "gallery_public_select" ON public.gallery;
CREATE POLICY "gallery_public_select" ON public.gallery
    FOR SELECT USING (true);

DROP POLICY IF EXISTS "gallery_admin_all" ON public.gallery;
CREATE POLICY "gallery_admin_all" ON public.gallery
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- --- testimonials: publik hanya melihat yang aktif ---
DROP POLICY IF EXISTS "testimonials_public_select" ON public.testimonials;
CREATE POLICY "testimonials_public_select" ON public.testimonials
    FOR SELECT USING (is_active = true);

DROP POLICY IF EXISTS "testimonials_admin_all" ON public.testimonials;
CREATE POLICY "testimonials_admin_all" ON public.testimonials
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- --- contact_messages: publik hanya boleh INSERT, admin penuh ---
DROP POLICY IF EXISTS "contact_messages_public_insert" ON public.contact_messages;
CREATE POLICY "contact_messages_public_insert" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "contact_messages_admin_all" ON public.contact_messages;
CREATE POLICY "contact_messages_admin_all" ON public.contact_messages
    FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- -----------------------------------------------------------------------------
-- 5. Storage Bucket "public-media" + storage policies
-- -----------------------------------------------------------------------------
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-media', 'public-media', true)
ON CONFLICT (id) DO NOTHING;

-- Baca publik
DROP POLICY IF EXISTS "public_media_public_read" ON storage.objects;
CREATE POLICY "public_media_public_read" ON storage.objects
    FOR SELECT USING (bucket_id = 'public-media');

-- Tulis/hapus hanya untuk user terotentikasi
DROP POLICY IF EXISTS "public_media_admin_insert" ON storage.objects;
CREATE POLICY "public_media_admin_insert" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'public-media' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "public_media_admin_update" ON storage.objects;
CREATE POLICY "public_media_admin_update" ON storage.objects
    FOR UPDATE USING (bucket_id = 'public-media' AND auth.role() = 'authenticated');

DROP POLICY IF EXISTS "public_media_admin_delete" ON storage.objects;
CREATE POLICY "public_media_admin_delete" ON storage.objects
    FOR DELETE USING (bucket_id = 'public-media' AND auth.role() = 'authenticated');
