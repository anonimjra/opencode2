import { createClient } from '@/lib/supabase/server';
import { FALLBACK_SITE_SETTINGS } from '@/lib/constants';
import type {
  SiteSettings,
  Category,
  Product,
  GalleryItem,
  Testimonial,
} from '@/types/database';

export type LandingPageData = {
  settings: SiteSettings;
  categories: Category[];
  products: Product[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
};

const EMPTY: LandingPageData = {
  settings: FALLBACK_SITE_SETTINGS,
  categories: [],
  products: [],
  gallery: [],
  testimonials: [],
};

export async function getLandingPageData(): Promise<LandingPageData> {
  try {
    const supabase = await createClient();

    const [settingsRes, categoriesRes, productsRes, galleryRes, testimonialsRes] =
      await Promise.all([
        supabase.from('site_settings').select('*').limit(1).maybeSingle(),
        supabase.from('categories').select('*').order('sort_order', { ascending: true }),
        supabase
          .from('products')
          .select('*, category:categories(*)')
          .order('sort_order', { ascending: true })
          .order('created_at', { ascending: false }),
        supabase.from('gallery').select('*').order('sort_order', { ascending: true }),
        supabase
          .from('testimonials')
          .select('*')
          .eq('is_active', true)
          .order('sort_order', { ascending: true }),
      ]);

    return {
      settings: (settingsRes.data as SiteSettings | null) ?? FALLBACK_SITE_SETTINGS,
      categories: (categoriesRes.data as Category[] | null) ?? [],
      products: (productsRes.data as Product[] | null) ?? [],
      gallery: (galleryRes.data as GalleryItem[] | null) ?? [],
      testimonials: (testimonialsRes.data as Testimonial[] | null) ?? [],
    };
  } catch {
    return EMPTY;
  }
}
