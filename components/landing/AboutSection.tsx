import Image from 'next/image';
import { Coffee, Sofa, HeartHandshake, BadgeCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

type AboutSectionProps = {
  title: string;
  description: string;
  imageUrl?: string | null;
  brandName: string;
};

const features = [
  {
    icon: Coffee,
    title: 'Bahan Baku Pilihan',
    text: 'Menggunakan biji kopi segar langsung dari petani lokal.',
  },
  {
    icon: Sofa,
    title: 'Tempat Nyaman & Santai',
    text: 'Dilengkapi Wi-Fi cepat, stopkontak, dan suasana tenang.',
  },
  {
    icon: HeartHandshake,
    title: 'Pelayanan Ramah & Hangat',
    text: 'Barista berpengalaman siap menyajikan racikan terbaik.',
  },
];

export function AboutSection({
  title,
  description,
  imageUrl,
  brandName,
}: AboutSectionProps) {
  const img = imageUrl || '/images/hero-bg.svg';

  return (
    <section id="about" className="bg-white py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div className="relative">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
            <Image
              src={img}
              alt={`Suasana ${brandName}`}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-4 flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg sm:right-4">
            <BadgeCheck className="h-6 w-6 text-primary" />
            <span className="text-sm font-semibold text-stone-800">
              100% Biji Kopi Asli Indonesia
            </span>
          </div>
        </div>

        <div>
          <Badge variant="default">Tentang Kami</Badge>
          <h2 className="mt-4 font-display text-2xl font-bold text-stone-900 md:text-3xl">
            {title}
          </h2>
          <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-stone-600 lg:text-lg">
            {description}
          </p>

          <div className="mt-8 space-y-4">
            {features.map(({ icon: Icon, title: featureTitle, text }) => (
              <div key={featureTitle} className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-light text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="font-semibold text-stone-900">{featureTitle}</h3>
                  <p className="text-sm text-stone-600">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
