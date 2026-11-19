import { createClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/utils';
import { ALLOWED_IMAGE_TYPES, MAX_UPLOAD_SIZE } from '@/lib/constants';
import type { ActionResponse } from '@/types';

export const BUCKET_NAME = 'public-media';
export const MAX_FILE_SIZE = MAX_UPLOAD_SIZE;
export const ALLOWED_MIME_TYPES = ALLOWED_IMAGE_TYPES;

export type UploadFolder = 'products' | 'gallery' | 'brand';

export function validateImageFile(file: File): { valid: boolean; error?: string } {
  if (!ALLOWED_MIME_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: 'Format file harus JPG, PNG, atau WebP.',
    };
  }
  if (file.size > MAX_FILE_SIZE) {
    return {
      valid: false,
      error: 'Ukuran file maksimal 2MB.',
    };
  }
  return { valid: true };
}

export async function uploadMediaFile(
  file: File,
  folder: UploadFolder,
): Promise<ActionResponse<{ url: string; path: string }>> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    return { success: false, error: validation.error };
  }

  const extension = file.name.split('.').pop()?.toLowerCase() ?? 'jpg';
  const baseName = slugify(file.name.replace(/\.[^/.]+$/, '')) || 'file';
  const path = `${folder}/${Date.now()}-${baseName}.${extension}`;

  try {
    const supabase = await createClient();
    const arrayBuffer = await file.arrayBuffer();
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(path, arrayBuffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      return { success: false, error: 'Gagal mengunggah gambar. Silakan coba lagi.' };
    }

    const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
    return { success: true, data: { url: data.publicUrl, path } };
  } catch {
    return { success: false, error: 'Gagal mengunggah gambar. Periksa koneksi Anda.' };
  }
}

export async function deleteMediaFile(path: string): Promise<ActionResponse> {
  if (!path) return { success: true };
  try {
    const supabase = await createClient();
    const cleanPath = path.includes('/storage/v1/object/public/')
      ? path.split('/storage/v1/object/public/')[1]?.replace(`${BUCKET_NAME}/`, '')
      : path;
    const { error } = await supabase.storage
      .from(BUCKET_NAME)
      .remove([cleanPath ?? path]);
    if (error) {
      return { success: false, error: 'Gagal menghapus file gambar.' };
    }
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menghapus file gambar.' };
  }
}
