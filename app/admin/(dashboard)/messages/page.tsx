import { createClient } from '@/lib/supabase/server';
import { MessageListTable } from '@/components/admin/MessageListTable';
import type { ContactMessage } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('contact_messages')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <MessageListTable messages={(data as ContactMessage[] | null) ?? []} />
  );
}
