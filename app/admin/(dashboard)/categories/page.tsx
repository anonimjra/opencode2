import { createClient } from '@/lib/supabase/server';
import { CategoryList } from '@/components/admin/CategoryList';
import type { CategoryWithCount } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('categories')
    .select('*, products(count)')
    .order('sort_order', { ascending: true });

  return <CategoryList categories={(data as CategoryWithCount[] | null) ?? []} />;
}
