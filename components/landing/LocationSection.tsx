import { MapPin, Clock, Navigation, MessageCircle } from 'lucide-react';
import type { OpeningHour } from '@/types/database';
import { generateWhatsAppChatLink } from '@/lib/whatsapp';

type LocationSectionProps = {
  address: string;
  openingHours: OpeningHour[];
  googleMapsEmbedUrl?: string | null;
  whatsappNumber: string;
  brandName?: string;
};

export function LocationSection({
  address,
  openingHours,
  googleMapsEmbedUrl,
  whatsappNumber,
  brandName = 'Kopi Senja',
}: LocationSectionProps) {
  const mapsSearch = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  const routeLink = generateWhatsAppChatLink(
    whatsappNumber,
    `Halo ${brandName}, boleh minta petunjuk arah menuju kedai Anda di ${address}?`,
  );

  return (
    <section id="location" className="bg-stone-50 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Kunjungi Kami
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-stone-900 md:text-3xl">
            Lokasi &amp; Jam Operasional
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="flex h-full flex-col justify-between rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
              <div>
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-semibold text-stone-900">Alamat Kedai</h3>
                    <p className="mt-1 text-sm text-stone-600">{address}</p>
                    <a
                      href={mapsSearch}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline focus-ring"
                    >
                      <Navigation className="h-4 w-4" />
                      Buka di Google Maps
                    </a>
                  </div>
                </div>

                <div className="mt-6 flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div className="w-full">
                    <h3 className="font-semibold text-stone-900">
                      Jam Buka &amp; Operasional
                    </h3>
                    <ul className="mt-2 space-y-2">
                      {openingHours.map((item, index) => (
                        <li
                          key={`${item.day}-${index}`}
                          className="flex items-center justify-between border-b border-dashed border-stone-200 pb-2 text-sm"
                        >
                          <span className="text-stone-600">{item.day}</span>
                          <span className="font-medium text-stone-900">
                            {item.time}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <a
                href={routeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark focus-ring"
              >
                <MessageCircle className="h-4 w-4" />
                Tanya Rute via WhatsApp
              </a>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative h-80 w-full overflow-hidden rounded-3xl border border-stone-200 bg-stone-200 shadow-md sm:h-96 lg:h-full lg:min-h-[380px]">
              {googleMapsEmbedUrl ? (
                <iframe
                  src={googleMapsEmbedUrl}
                  title="Peta lokasi kedai"
                  className="h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              ) : (
                <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
                  <MapPin className="h-10 w-10 text-stone-400" />
                  <p className="text-sm text-stone-500">
                    Lokasi peta belum diatur.
                  </p>
                  <a
                    href={mapsSearch}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground focus-ring"
                  >
                    Cari Lokasi di Google Maps
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
