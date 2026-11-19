'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/utils';
import type { ActionResponse } from '@/types';

export async function createCategory(
  name: string,
  sortOrder: number,
): Promise<ActionResponse> {
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { success: false, error: 'Nama kategori minimal 2 karakter.' };
  }

  try {
    const supabase = await createClient();
    const { error } = await supabase.from('categories').insert({
      name: trimmed,
      slug: slugify(trimmed),
      sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
    });
    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'Kategori dengan nama serupa sudah ada.' };
      }
      return { success: false, error: 'Gagal menyimpan kategori.' };
    }
    revalidatePath('/admin/categories');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menyimpan kategori. Periksa koneksi Anda.' };
  }
}

export async function updateCategory(
  id: string,
  name: string,
  sortOrder: number,
): Promise<ActionResponse> {
  const trimmed = name.trim();
  if (trimmed.length < 2) {
    return { success: false, error: 'Nama kategori minimal 2 karakter.' };
  }
  try {
    const supabase = await createClient();
    const { error } = await supabase
      .from('categories')
      .update({
        name: trimmed,
        slug: slugify(trimmed),
        sort_order: Number.isFinite(sortOrder) ? sortOrder : 0,
      })
      .eq('id', id);
    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'Kategori dengan nama serupa sudah ada.' };
      }
      return { success: false, error: 'Gagal memperbarui kategori.' };
    }
    revalidatePath('/admin/categories');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal memperbarui kategori.' };
  }
}

export async function deleteCategory(id: string): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const { count } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('category_id', id);

    if ((count ?? 0) > 0) {
      return {
        success: false,
        error:
          'Kategori tidak dapat dihapus karena masih digunakan oleh beberapa produk menu.',
      };
    }

    const { error } = await supabase.from('categories').delete().eq('id', id);
    if (error) {
      return { success: false, error: 'Gagal menghapus kategori.' };
    }
    revalidatePath('/admin/categories');
    revalidatePath('/');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menghapus kategori.' };
  }
}
