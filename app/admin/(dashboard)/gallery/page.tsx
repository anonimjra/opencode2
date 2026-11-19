import { createClient } from '@/lib/supabase/server';
import { GalleryManager } from '@/components/admin/GalleryManager';
import type { GalleryItem } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function AdminGalleryPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('gallery')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  return <GalleryManager items={(data as GalleryItem[] | null) ?? []} />;
}
