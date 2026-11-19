import { createClient } from '@/lib/supabase/server';
import { ProductListTable } from '@/components/admin/ProductListTable';
import { ExportExcelButton } from '@/components/admin/ExportExcelButton';
import type { Product, Category } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const supabase = await createClient();
  const [productsRes, categoriesRes] = await Promise.all([
    supabase
      .from('products')
      .select('*, category:categories(*)')
      .order('sort_order', { ascending: true })
      .order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('sort_order', { ascending: true }),
  ]);

  return (
    <ProductListTable
      products={(productsRes.data as Product[] | null) ?? []}
      categories={(categoriesRes.data as Category[] | null) ?? []}
      exportSlot={
        <ExportExcelButton
          endpoint="/api/admin/export/products"
          label="Export Produk (.xlsx)"
        />
      }
    />
  );
}
