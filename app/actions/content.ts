'use server';

import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { uploadMediaFile } from '@/lib/supabase/storage';
import { cleanPhoneNumber } from '@/lib/whatsapp';
import type { ActionResponse, OpeningHour } from '@/types';

function parseOpeningHours(raw: string): OpeningHour[] {
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (Array.isArray(parsed)) {
      return parsed
        .filter(
          (item): item is OpeningHour =>
            typeof item === 'object' &&
            item !== null &&
            typeof (item as OpeningHour).day === 'string' &&
            typeof (item as OpeningHour).time === 'string',
        )
        .map((item) => ({ day: item.day, time: item.time }));
    }
  } catch {
    // abaikan
  }
  return [];
}

export async function updateLandingContent(
  formData: FormData,
): Promise<ActionResponse> {
  try {
    const supabase = await createClient();
    const { data: current } = await supabase
      .from('site_settings')
      .select('*')
      .limit(1)
      .maybeSingle();

    const whatsappRaw = String(formData.get('whatsapp_number') ?? '').trim();
    const whatsapp_number = whatsappRaw ? cleanPhoneNumber(whatsappRaw) : '6281234567890';

    const updatePayload: Record<string, unknown> = {
      hero_title: String(formData.get('hero_title') ?? '').trim().slice(0, 200),
      hero_subtitle: String(formData.get('hero_subtitle') ?? '').trim(),
      about_title: String(formData.get('about_title') ?? '').trim().slice(0, 200),
      about_description: String(formData.get('about_description') ?? '').trim(),
      address: String(formData.get('address') ?? '').trim(),
      whatsapp_number,
      google_maps_embed_url:
        String(formData.get('google_maps_embed_url') ?? '').trim() || null,
      instagram_url: String(formData.get('instagram_url') ?? '').trim() || null,
      tiktok_url: String(formData.get('tiktok_url') ?? '').trim() || null,
      facebook_url: String(formData.get('facebook_url') ?? '').trim() || null,
      opening_hours: parseOpeningHours(String(formData.get('opening_hours') ?? '[]')),
    };

    const heroImage = formData.get('hero_image') as File | null;
    if (heroImage && heroImage.size > 0) {
      const upload = await uploadMediaFile(heroImage, 'brand');
      if (!upload.success) return { success: false, error: upload.error };
      updatePayload.hero_image_url = upload.data?.url ?? null;
    }

    const aboutImage = formData.get('about_image') as File | null;
    if (aboutImage && aboutImage.size > 0) {
      const upload = await uploadMediaFile(aboutImage, 'brand');
      if (!upload.success) return { success: false, error: upload.error };
      updatePayload.about_image_url = upload.data?.url ?? null;
    }

    if (current?.id) {
      const { error } = await supabase
        .from('site_settings')
        .update(updatePayload)
        .eq('id', (current as { id: string }).id);
      if (error) return { success: false, error: 'Gagal menyimpan konten.' };
    } else {
      const { error } = await supabase.from('site_settings').insert(updatePayload);
      if (error) return { success: false, error: 'Gagal menyimpan konten.' };
    }

    revalidatePath('/');
    revalidatePath('/admin/content');
    return { success: true };
  } catch {
    return { success: false, error: 'Gagal menyimpan konten. Periksa koneksi Anda.' };
  }
}
