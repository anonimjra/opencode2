import Image from 'next/image';
import { Star } from 'lucide-react';
import type { Testimonial } from '@/types/database';
import { cn } from '@/lib/utils';

type TestimonialSectionProps = {
  testimonials: Testimonial[];
};

function initials(name: string): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

export function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  const active = testimonials.filter((t) => t.is_active);
  if (active.length === 0) return null;

  return (
    <section id="testimonials" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Kata Mereka
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-stone-900 md:text-3xl">
            Apa Kata Pengunjung Kopi Senja?
          </h2>
          <p className="mt-3 text-stone-600">
            Cerita jujur dari pelanggan setia yang telah merasakan racikan dan
            suasana kedai kami.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {active.map((testimonial) => (
            <article
              key={testimonial.id}
              className="flex flex-col justify-between rounded-2xl border border-stone-200/80 bg-stone-50 p-6 shadow-sm transition-shadow hover:shadow-md sm:p-8"
            >
              <div>
                <div className="flex gap-0.5" aria-label={`Rating ${testimonial.rating} dari 5`}>
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      className={cn(
                        'h-4 w-4',
                        index < testimonial.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-stone-200 text-stone-200',
                      )}
                    />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-stone-700 italic leading-relaxed">
                  &ldquo;{testimonial.review_text}&rdquo;
                </blockquote>
              </div>

              <div className="mt-6 flex items-center gap-3">
                {testimonial.avatar_url ? (
                  <Image
                    src={testimonial.avatar_url}
                    alt={testimonial.customer_name}
                    width={44}
                    height={44}
                    className="h-11 w-11 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-sm font-semibold text-primary">
                    {initials(testimonial.customer_name)}
                  </span>
                )}
                <div>
                  <p className="font-semibold text-stone-900">
                    {testimonial.customer_name}
                  </p>
                  <p className="text-xs text-stone-500">
                    {testimonial.customer_role || 'Pelanggan Setia'}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
