import { createClient } from '@/lib/supabase/server';
import { MessageListTable } from '@/components/admin/MessageListTable';
import { ExportExcelButton } from '@/components/admin/ExportExcelButton';
import type { ContactMessage } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <MessageListTable
      messages={(data as ContactMessage[] | null) ?? []}
      exportSlot={
        <ExportExcelButton
          endpoint="/api/admin/export/messages"
          label="Export Pesan (.xlsx)"
        />
      }
    />
  );
}
