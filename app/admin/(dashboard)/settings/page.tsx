import { createClient } from '@/lib/supabase/server';
import { ThemeSettingsForm } from '@/components/admin/ThemeSettingsForm';
import { FALLBACK_SITE_SETTINGS } from '@/lib/constants';
import type { SiteSettings } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function AdminSettingsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  return (
    <ThemeSettingsForm
      settings={(data as SiteSettings | null) ?? FALLBACK_SITE_SETTINGS}
    />
  );
}
