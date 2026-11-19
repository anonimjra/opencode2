import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ProductForm } from '@/components/admin/ProductForm';
import type { Product, Category } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [productRes, categoriesRes] = await Promise.all([
    supabase.from('products').select('*').eq('id', id).maybeSingle(),
    supabase.from('categories').select('*').order('sort_order', { ascending: true }),
  ]);

  const product = productRes.data as Product | null;
  if (!product) {
    notFound();
  }

  return (
    <ProductForm
      initialData={product}
      categories={(categoriesRes.data as Category[] | null) ?? []}
      isEditing
    />
  );
}
