'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { uploadMediaFile, deleteMediaFile } from '@/lib/supabase/storage';
import type { ActionResponse } from '@/types';

export async function addGalleryPhoto(formData: FormData): Promise<ActionResponse> {
  const file = formData.get('photo') as File | null;
  if (!file || file.size === 0) {
    return { success: false, error: 'Pilih foto terlebih dahulu.' };
  }

  const title = String(formData.get('title') ?? '').trim() || null;
  const caption = String(formData.get('caption') ?? '').trim() || null;
  const sortOrder = Number(formData.get('sort_order') ?? 0) || 0;

  try {
    const upload = await uploadMediaFile(file, 'gallery');
    if (!upload.success || !upload.data) {
      return { success: false, error: upload.error ?? 'Gagal mengunggah foto.' };
    }

    const supabase = await createClient();
    const { error } = await supabase.from('gallery').insert({
      title,
      caption,
      image_url: upload.data.url,
      sort_order: sortOrder,
    });
    if (error) {
      return { success: false, error: 'Gagal menyimpan foto galeri.' };
    }
    revalidatePath('/admin/gallery');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menyimpan foto galeri.' };
  }
}

export async function updateGalleryPhoto(
  id: string,
  title: string,
  caption: string,
  sortOrder: number,
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('gallery')
      .update({
        title: title.trim() || null,
        caption: caption.trim() || null,
        sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      })
      .eq('id', id);
    if (error) return { success: false, error: 'Gagal memperbarui foto.' };
    revalidatePath('/admin/gallery');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal memperbarui foto.' };
  }
}

export async function deleteGalleryPhoto(
  id: string,
  imagePath?: string,
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('gallery').delete().eq('id', id);
    if (error) return { success: false, error: 'Gagal menghapus foto.' };
    if (imagePath) await deleteMediaFile(imagePath);
    revalidatePath('/admin/gallery');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menghapus foto.' };
  }
}
