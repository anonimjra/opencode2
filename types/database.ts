export type OpeningHour = { day: string; time: string };

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
  opening_hours: OpeningHour[];
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

export type CategoryWithCount = Category & {
  products?: { count: number }[];
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
