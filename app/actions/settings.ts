'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { uploadMediaFile } from '@/lib/supabase/storage';
import type { ActionResponse } from '@/types';

const HEX_REGEX = /^#([A-Fa-f0-9]{6})$/;

export async function updateBrandAndTheme(
  formData: FormData,
): Promise<ActionResponse> {
  const brand_name = String(formData.get('brand_name') ?? '').trim().slice(0, 100);
  const tagline = String(formData.get('tagline') ?? '').trim().slice(0, 255);
  const primaryColorRaw = String(formData.get('primary_color') ?? '').trim();

  if (!brand_name) {
    return { success: false, error: 'Nama brand wajib diisi.' };
  }
  if (!HEX_REGEX.test(primaryColorRaw)) {
    return { success: false, error: 'Kode warna HEX tidak valid (contoh: #7C2D12).' };
  }

  try {
    const supabase = await createClient();
    const updatePayload: Record<string, unknown> = {
      brand_name,
      tagline,
      primary_color: primaryColorRaw,
    };

    const logo = formData.get('logo') as File | null;
    if (logo && logo.size > 0) {
      const upload = await uploadMediaFile(logo, 'brand');
      if (!upload.success) return { success: false, error: upload.error };
      updatePayload.logo_url = upload.data?.url ?? null;
    }

    const { data: current } = await supabase
      .from('site_settings')
      .select('id')
      .limit(1)
      .maybeSingle();

    if (current?.id) {
      const { error } = await supabase
        .from('site_settings')
        .update(updatePayload)
        .eq('id', current.id);
      if (error) return { success: false, error: 'Gagal menyimpan pengaturan.' };
    } else {
      const { error } = await supabase.from('site_settings').insert(updatePayload);
      if (error) return { success: false, error: 'Gagal menyimpan pengaturan.' };
    }

    revalidatePath('/', 'layout');
    revalidatePath('/admin/settings');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menyimpan pengaturan.' };
  }
}
