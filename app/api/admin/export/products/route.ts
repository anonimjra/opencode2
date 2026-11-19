import { NextResponse, type NextRequest } from 'next/server';
import { format } from 'date-fns';
import { createClient } from '@/lib/supabase/server';
import {
  createBaseWorkbook,
  generateBuffer,
} from '@/lib/excel/builder';
import { buildProductsWorksheet } from '@/lib/excel/products-sheet';
import type { Product } from '@/types/database';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  void request;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { data } = await supabase
    .from('products')
    .select('*, category:categories(*)')
    .order('sort_order', { ascending: true })
    .order('name', { ascending: true });

  const products = (data as Product[] | null) ?? [];

  const workbook = createBaseWorkbook();
  buildProductsWorksheet(workbook, products);
  const buffer = await generateBuffer(workbook);

  const fileName = `produk-${format(new Date(), 'yyyy-MM-dd')}.xlsx`;

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
