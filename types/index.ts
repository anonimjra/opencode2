import type { OpeningHour } from './database';

export type { OpeningHour };
export type {
  SiteSettings,
  Category,
  CategoryWithCount,
  Product,
  GalleryItem,
  Testimonial,
  ContactMessage,
} from './database';

export type ActionResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type MenuCategoryFilter = string;

export type ProductFormInput = {
  name: string;
  category_id: string | null;
  description: string;
  price: number;
  sort_order: number;
  is_available: boolean;
  image_url: string | null;
};

export type SiteSettingsFormInput = {
  brand_name: string;
  tagline: string;
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
};

export type CategoryFormInput = {
  name: string;
  sort_order: number;
};

export type TestimonialFormInput = {
  customer_name: string;
  customer_role: string;
  review_text: string;
  rating: number;
  sort_order: number;
  avatar_url: string | null;
};

export type ContactFormInput = {
  name: string;
  contact: string;
  subject: string;
  message: string;
};
