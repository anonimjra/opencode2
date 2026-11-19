import { createClient } from '@/lib/supabase/server';
import { LandingContentForm } from '@/components/admin/LandingContentForm';
import { FALLBACK_SITE_SETTINGS } from '@/lib/constants';
import type { SiteSettings } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function AdminContentPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .limit(1)
    .maybeSingle();

  return (
    <LandingContentForm
      settings={(data as SiteSettings | null) ?? FALLBACK_SITE_SETTINGS}
    />
  );
}
