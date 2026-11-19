import type { SiteSettings } from '@/types/database';

export const THEME_PRESETS: { name: string; color: string }[] = [
  { name: 'Warm Coffee', color: '#7C2D12' },
  { name: 'Matcha & Nature', color: '#15803D' },
  { name: 'Sunset Artisan', color: '#C2410C' },
  { name: 'Modern Minimalist', color: '#18181B' },
];

export const DEFAULT_PRIMARY_COLOR = '#7C2D12';
export const DEFAULT_WHATSAPP_NUMBER = '6281234567890';
export const DEFAULT_BRAND_NAME = 'Kopi Senja';
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_UPLOAD_SIZE = 2 * 1024 * 1024;
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const FALLBACK_SITE_SETTINGS: SiteSettings = {
  id: 'fallback',
  brand_name: DEFAULT_BRAND_NAME,
  tagline: 'Nikmati Setiap Tegukan Hangat Penuh Cerita',
  logo_url: null,
  primary_color: DEFAULT_PRIMARY_COLOR,
  hero_title: 'Tempat Terbaik Menikmati Kopi & Santai Sejenak',
  hero_subtitle:
    'Diseduh dari biji kopi pilihan nusantara dengan racikan sepenuh hati. Kunjungi kedai kami atau pesan langsung ke meja Anda.',
  hero_image_url: '/images/hero-bg.svg',
  about_title: 'Cerita Dari Secangkir Kopi Kami',
  about_description:
    'Bermula dari kecintaan pada aroma biji kopi lokal, Kopi Senja hadir sebagai ruang temu yang hangat bagi siapa saja yang ingin jeda sejenak dari hiruk pikuk kota.',
  about_image_url: '/images/hero-bg.svg',
  whatsapp_number: DEFAULT_WHATSAPP_NUMBER,
  address: 'Jl. Merpati No. 12, Senopati, Jakarta Selatan',
  google_maps_embed_url: null,
  opening_hours: [
    { day: 'Senin - Jumat', time: '08:00 - 22:00' },
    { day: 'Sabtu - Minggu', time: '07:00 - 23:00' },
  ],
  instagram_url: 'https://instagram.com',
  tiktok_url: 'https://tiktok.com',
  facebook_url: 'https://facebook.com',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};
