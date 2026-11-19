'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { GalleryItem } from '@/types/database';
import { Modal } from '@/components/ui/Modal';

type GallerySectionProps = {
  items: GalleryItem[];
};

export function GallerySection({ items }: GallerySectionProps) {
  const [active, setActive] = useState<GalleryItem | null>(null);

  return (
    <section id="gallery" className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Galeri
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-stone-900 md:text-3xl">
            Suasana &amp; Galeri
          </h2>
          <p className="mt-3 text-stone-600">
            Intip momen hangat dan racikan istimewa di sudut kedai kami.
          </p>
        </div>

        {items.length > 0 ? (
          <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {items.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActive(item)}
                className="group relative aspect-square cursor-pointer overflow-hidden rounded-2xl shadow-sm transition-all hover:shadow-lg focus-ring"
                aria-label={`Lihat foto ${item.title ?? 'galeri'}`}
              >
                <Image
                  src={item.image_url || '/images/placeholder-gallery.svg'}
                  alt={item.title || item.caption || 'Foto galeri kedai'}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <span className="absolute inset-0 flex items-end bg-black/40 p-4 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="text-left text-sm font-medium text-white">
                    {item.title || item.caption || ''}
                  </span>
                </span>
              </button>
            ))}
          </div>
        ) : (
          <p className="mt-10 text-center text-stone-500">
            Galeri foto akan segera hadir.
          </p>
        )}
      </div>

      <Modal
        isOpen={active !== null}
        onClose={() => setActive(null)}
        title={active?.title ?? undefined}
      >
        {active && (
          <div>
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-stone-100">
              <Image
                src={active.image_url || '/images/placeholder-gallery.svg'}
                alt={active.title || active.caption || 'Foto galeri kedai'}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            {active.caption && (
              <p className="mt-3 text-sm text-stone-600">{active.caption}</p>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}
