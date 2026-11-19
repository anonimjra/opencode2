import { createClient } from '@/lib/supabase/server';
import { TestimonialManager } from '@/components/admin/TestimonialManager';
import type { Testimonial } from '@/types/database';

export const dynamic = 'force-dynamic';

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: false });

  return (
    <TestimonialManager testimonials={(data as Testimonial[] | null) ?? []} />
  );
}
