-- =============================================================================
-- seed.sql — Data awal toko "Kopi Senja"
-- Jalankan setelah 001_initial_schema.sql
-- =============================================================================

-- Bersihkan data seed lama agar idempoten
TRUNCATE public.contact_messages, public.products, public.categories,
         public.gallery, public.testimonials, public.site_settings RESTART IDENTITY CASCADE;

-- -----------------------------------------------------------------------------
-- 1. Site Settings (singleton)
-- -----------------------------------------------------------------------------
INSERT INTO public.site_settings (
    brand_name, tagline, primary_color,
    hero_title, hero_subtitle, hero_image_url,
    about_title, about_description, about_image_url,
    whatsapp_number, address, google_maps_embed_url,
    opening_hours, instagram_url, tiktok_url, facebook_url
) VALUES (
    'Kopi Senja',
    'Nikmati Setiap Tegukan Hangat Penuh Cerita',
    '#7C2D12',
    'Tempat Terbaik Menikmati Kopi & Santai Sejenak',
    'Diseduh dari biji kopi pilihan nusantara dengan racikan sepenuh hati. Kunjungi kedai kami atau pesan langsung ke meja Anda.',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1600&q=80',
    'Cerita Dari Secangkir Kopi Kami',
    'Bermula dari kecintaan pada aroma biji kopi lokal, Kopi Senja hadir sebagai ruang temu yang hangat bagi siapa saja yang ingin jeda sejenak dari hiruk pikuk kota.',
    'https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80',
    '6281234567890',
    'Jl. Merpati No. 12, Senopati, Jakarta Selatan',
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0!2d106.8!3d-6.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sSenopati!5e0!3m2!1sid!2sid!4v1700000000000',
    '[
        {"day": "Senin - Jumat", "time": "08:00 - 22:00"},
        {"day": "Sabtu - Minggu", "time": "07:00 - 23:00"}
    ]'::jsonb,
    'https://instagram.com',
    'https://tiktok.com',
    'https://facebook.com'
);

-- -----------------------------------------------------------------------------
-- 2. Kategori
-- -----------------------------------------------------------------------------
INSERT INTO public.categories (name, slug, sort_order) VALUES
    ('Espresso & Kopi Susu', 'espresso-kopi-susu', 1),
    ('Manual Brew Nusantara', 'manual-brew-nusantara', 2),
    ('Minuman Non-Kopi', 'minuman-non-kopi', 3),
    ('Camilan & Makanan Ringan', 'camilan-makanan-ringan', 4);

-- -----------------------------------------------------------------------------
-- 3. Produk
-- -----------------------------------------------------------------------------
INSERT INTO public.products (category_id, name, description, price, image_url, is_available, sort_order) VALUES
    ((SELECT id FROM public.categories WHERE slug = 'espresso-kopi-susu'), 'Kopi Susu Gula Aren', 'Espresso pekat dipadu susu segar dan manisnya gula aren alami.', 22000, 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=600&q=80', true, 1),
    ((SELECT id FROM public.categories WHERE slug = 'espresso-kopi-susu'), 'Espresso Single Origin', 'Satu shot espresso murni dari biji pilihan, aroma kuat dan bersih.', 18000, 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=600&q=80', true, 2),
    ((SELECT id FROM public.categories WHERE slug = 'espresso-kopi-susu'), 'Caramel Macchiato', 'Lapisan susu creamy, espresso lembut, dan saus karamel manis.', 28000, 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80', true, 3),
    ((SELECT id FROM public.categories WHERE slug = 'manual-brew-nusantara'), 'V60 Aceh Gayo', 'Seduhan manual brew dengan notes fruity dan keasaman segar.', 25000, 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', true, 4),
    ((SELECT id FROM public.categories WHERE slug = 'manual-brew-nusantara'), 'Japanese Iced Drip', 'Kopi tetes dingin disajikan segar dengan aroma yang lembut.', 27000, 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=600&q=80', true, 5),
    ((SELECT id FROM public.categories WHERE slug = 'minuman-non-kopi'), 'Matcha Latte Creamy', 'Matcha premium Jepang dengan susu creamy yang lembut.', 26000, 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?auto=format&fit=crop&w=600&q=80', true, 6),
    ((SELECT id FROM public.categories WHERE slug = 'camilan-makanan-ringan'), 'Croissant Butter Renyah', 'Pastry mentega berlapis, renyah di luar dan lembut di dalam.', 20000, 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80', true, 7),
    ((SELECT id FROM public.categories WHERE slug = 'camilan-makanan-ringan'), 'Kentang Goreng Truffle', 'Kentang goreng gurih dengan aroma truffle dan taburan keju.', 24000, 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=600&q=80', false, 8);

-- -----------------------------------------------------------------------------
-- 4. Galeri
-- -----------------------------------------------------------------------------
INSERT INTO public.gallery (title, caption, image_url, sort_order) VALUES
    ('Suasana Interior', 'Ruang hangat dengan pencahayaan temaram yang nyaman.', 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80', 1),
    ('Mesin Espresso', 'Mesin espresso andalan kami, siap menyeduh racikan terbaik.', 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80', 2),
    ('Barista Kami', 'Barista berpengalaman meracik setiap cangkir penuh dedikasi.', 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=800&q=80', 3),
    ('Area Outdoor', 'Tempat duduk outdoor untuk bersantai sore hari.', 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=800&q=80', 4);

-- -----------------------------------------------------------------------------
-- 5. Testimoni
-- -----------------------------------------------------------------------------
INSERT INTO public.testimonials (customer_name, customer_role, review_text, rating, avatar_url, is_active, sort_order) VALUES
    ('Anisa Putri', 'Mahasiswa', 'Kopi susu gula arennya juara! Tempatnya nyaman banget buat ngerjain tugas seharian.', 5, NULL, true, 1),
    ('Bima Pratama', 'Freelancer', 'Wifi kencang, suasananya tenang, dan manual brew-nya konsisten enak. Cocok untuk work from cafe.', 5, NULL, true, 2),
    ('Citra Dewi', 'Pecinta Kopi', 'Sebagai penggemar kopi nusantara, saya suka V60 Aceh Gayonya yang fruity dan bersih. Recommended!', 5, NULL, true, 3);
