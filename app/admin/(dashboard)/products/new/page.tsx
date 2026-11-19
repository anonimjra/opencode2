import { createClient } from '@/lib/supabase/server';
import { ProductForm } from '@/components/admin/ProductForm';
import type { Category } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true });

  return (
    <ProductForm
      categories={(data as Category[] | null) ?? []}
      isEditing={false}
    />
  );
}
