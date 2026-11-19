'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/types';

export async function markMessageAsRead(
  id: string,
  isRead: boolean,
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('contact_messages')
      .update({ is_read: isRead })
      .eq('id', id);
    if (error) return { success: false, error: 'Gagal memperbarui status pesan.' };
    revalidatePath('/admin/messages');
    revalidatePath('/admin');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal memperbarui status pesan.' };
  }
}

export async function deleteMessage(id: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('contact_messages').delete().eq('id', id);
    if (error) return { success: false, error: 'Gagal menghapus pesan.' };
    revalidatePath('/admin/messages');
    revalidatePath('/admin');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menghapus pesan.' };
  }
}
