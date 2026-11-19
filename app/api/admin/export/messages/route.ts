import { NextResponse, type NextRequest } from 'next/server';
import { format } from 'date-fns';
import { createClient } from '@/lib/supabase/server';
import { createBaseWorkbook, generateBuffer } from '@/lib/excel/builder';
import { buildMessagesWorksheet } from '@/lib/excel/messages-sheet';
import type { ContactMessage } from '@/types/database';

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
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  const messages = (data as ContactMessage[] | null) ?? [];

  const workbook = createBaseWorkbook();
  buildMessagesWorksheet(workbook, messages);
  const buffer = await generateBuffer(workbook);

  const fileName = `pesan-masuk-${format(new Date(), 'yyyy-MM-dd')}.xlsx`;

  return new NextResponse(buffer as unknown as BodyInit, {
    headers: {
      'Content-Type':
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': `attachment; filename="${fileName}"`,
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}
