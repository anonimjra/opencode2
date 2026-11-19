'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { uploadMediaFile } from '@/lib/supabase/storage';
import type { ActionResponse } from '@/types';

function clampRating(value: unknown): number {
  const num = Math.round(Number(value));
  if (!Number.isFinite(num)) return 5;
  return Math.min(5, Math.max(1, num));
}

export async function createTestimonial(formData: FormData): Promise<ActionResponse> {
  const customer_name = String(formData.get('customer_name') ?? '').trim();
  const customer_role = String(formData.get('customer_role') ?? '').trim() || 'Pelanggan Setia';
  const review_text = String(formData.get('review_text') ?? '').trim();
  const rating = clampRating(formData.get('rating'));
  const sort_order = Number(formData.get('sort_order') ?? 0) || 0;

  if (customer_name.length < 2) {
    return { success: false, error: 'Nama pelanggan minimal 2 karakter.' };
  }
  if (review_text.length < 5) {
    return { success: false, error: 'Isi testimoni minimal 5 karakter.' };
  }

  try {
    let avatar_url: string | null = null;
    const avatar = formData.get('avatar') as File | null;
    if (avatar && avatar.size > 0) {
      const upload = await uploadMediaFile(avatar, 'gallery');
      if (!upload.success) return { success: false, error: upload.error };
      avatar_url = upload.data?.url ?? null;
    }

    const supabase = await createClient();
    const { error } = await supabase.from('testimonials').insert({
      customer_name,
      customer_role,
      review_text,
      rating,
      sort_order,
      avatar_url,
      is_active: true,
    });
    if (error) return { success: false, error: 'Gagal menyimpan testimoni.' };
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menyimpan testimoni.' };
  }
}

export async function updateTestimonial(
  id: string,
  formData: FormData,
): Promise<ActionResponse> {
  const customer_name = String(formData.get('customer_name') ?? '').trim();
  const customer_role = String(formData.get('customer_role') ?? '').trim() || 'Pelanggan Setia';
  const review_text = String(formData.get('review_text') ?? '').trim();
  const rating = clampRating(formData.get('rating'));
  const sort_order = Number(formData.get('sort_order') ?? 0) || 0;

  if (customer_name.length < 2 || review_text.length < 5) {
    return { success: false, error: 'Periksa kembali nama dan isi testimoni.' };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('testimonials')
      .update({
        customer_name,
        customer_role,
        review_text,
        rating,
        sort_order,
      })
      .eq('id', id);
    if (error) return { success: false, error: 'Gagal memperbarui testimoni.' };
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal memperbarui testimoni.' };
  }
}

export async function toggleTestimonialActive(
  id: string,
  isActive: boolean,
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('testimonials')
      .update({ is_active: isActive })
      .eq('id', id);
    if (error) return { success: false, error: 'Gagal memperbarui status testimoni.' };
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal memperbarui status testimoni.' };
  }
}

export async function deleteTestimonial(id: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('testimonials').delete().eq('id', id);
    if (error) return { success: false, error: 'Gagal menghapus testimoni.' };
    revalidatePath('/admin/testimonials');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menghapus testimoni.' };
  }
}
