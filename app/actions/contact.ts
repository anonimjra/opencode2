'use server';

import { createClient } from '@/lib/supabase/server';
import type { ActionResponse } from '@/types';

export async function submitContactMessage(
  formData: FormData,
): Promise<ActionResponse> {
  const name = String(formData.get('name') ?? '').trim();
  const contact = String(formData.get('contact') ?? '').trim();
  const subject = String(formData.get('subject') ?? '').trim() || 'Pesan dari Website';
  const message = String(formData.get('message') ?? '').trim();
  const honeypot = String(formData.get('honeypot') ?? '').trim();

  // Anti-spam: jika honeypot terisi, kembalikan sukses semu tanpa menyimpan.
  if (honeypot) {
    return { success: true };
  }

  if (name.length < 2) {
    return { success: false, error: 'Nama minimal 2 karakter.' };
  }
  if (contact.length < 5) {
    return { success: false, error: 'Kontak minimal 5 karakter.' };
  }
  if (message.length < 10) {
    return { success: false, error: 'Pesan minimal 10 karakter.' };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from('contact_messages').insert({
      name: name.slice(0, 100),
      contact: contact.slice(0, 100),
      subject: subject.slice(0, 150),
      message: message.slice(0, 1000),
      is_read: false,
    });

    if (error) {
      return {
        success: false,
        error: 'Gagal mengirim pesan. Silakan coba lagi nanti.',
      };
    }
    return { success: true };
  } catch {
    return {
      success: false,
      error: 'Gagal mengirim pesan. Silakan periksa koneksi internet Anda.',
    };
  }
}
