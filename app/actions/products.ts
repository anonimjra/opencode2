'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { uploadMediaFile, deleteMediaFile } from '@/lib/supabase/storage';
import type { ActionResponse } from '@/types';

export async function toggleProductAvailability(
  id: string,
  isAvailable: boolean,
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('products')
      .update({ is_available: isAvailable })
      .eq('id', id);
    if (error) {
      return { success: false, error: 'Gagal memperbarui status produk.' };
    }
    revalidatePath('/admin/products');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal memperbarui status produk.' };
  }
}

export async function deleteProduct(
  id: string,
  imagePath?: string,
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      return { success: false, error: 'Gagal menghapus produk.' };
    }
    if (imagePath) {
      await deleteMediaFile(imagePath);
    }
    revalidatePath('/admin/products');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menghapus produk.' };
  }
}

async function extractProductFields(formData: FormData) {
  const name = String(formData.get('name') ?? '').trim();
  const categoryIdRaw = String(formData.get('category_id') ?? '').trim();
  const priceRaw = String(formData.get('price') ?? '0');
  const price = Math.max(0, Math.round(Number(priceRaw.replace(/[^\d]/g, '')) || 0));
  const description = String(formData.get('description') ?? '').trim();
  const sortOrder = Number(formData.get('sort_order') ?? 0) || 0;
  const isAvailable = formData.get('is_available') === 'on' ||
    formData.get('is_available') === 'true';
  const imageFile = formData.get('image') as File | null;

  return {
    name,
    category_id: categoryIdRaw || null,
    price,
    description: description || null,
    sort_order: sortOrder,
    is_available: isAvailable,
    imageFile,
  };
}

export async function createProduct(formData: FormData): Promise<ActionResponse> {
  const fields = await extractProductFields(formData);
  if (fields.name.length < 3) {
    return { success: false, error: 'Nama produk minimal 3 karakter.' };
  }
  if (fields.price <= 0) {
    return { success: false, error: 'Harga harus lebih dari 0.' };
  }

  try {
    let imageUrl: string | null = null;
    if (fields.imageFile && fields.imageFile.size > 0) {
      const upload = await uploadMediaFile(fields.imageFile, 'products');
      if (!upload.success) {
        return { success: false, error: upload.error };
      }
      imageUrl = upload.data?.url ?? null;
    }

    const supabase = await createClient();
    const { error } = await supabase.from('products').insert({
      name: fields.name,
      category_id: fields.category_id,
      price: fields.price,
      description: fields.description,
      sort_order: fields.sort_order,
      is_available: fields.is_available,
      image_url: imageUrl,
    });
    if (error) {
      return { success: false, error: 'Gagal menyimpan produk.' };
    }
    revalidatePath('/admin/products');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menyimpan produk. Periksa koneksi Anda.' };
  }
}

export async function updateProduct(
  id: string,
  formData: FormData,
): Promise<ActionResponse> {
  const fields = await extractProductFields(formData);
  if (fields.name.length < 3) {
    return { success: false, error: 'Nama produk minimal 3 karakter.' };
  }
  if (fields.price <= 0) {
    return { success: false, error: 'Harga harus lebih dari 0.' };
  }

  try {
    const updatePayload: Record<string, unknown> = {
      name: fields.name,
      category_id: fields.category_id,
      price: fields.price,
      description: fields.description,
      sort_order: fields.sort_order,
      is_available: fields.is_available,
    };

    if (fields.imageFile && fields.imageFile.size > 0) {
      const upload = await uploadMediaFile(fields.imageFile, 'products');
      if (!upload.success) {
        return { success: false, error: upload.error };
      }
      updatePayload.image_url = upload.data?.url ?? null;
    }

    const supabase = await createClient();
    const { error } = await supabase.from('products').update(updatePayload).eq('id', id);
    if (error) {
      return { success: false, error: 'Gagal memperbarui produk.' };
    }
    revalidatePath('/admin/products');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal memperbarui produk.' };
  }
}
