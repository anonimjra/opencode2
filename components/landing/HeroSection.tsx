import Image from 'next/image';
import Link from 'next/link';
import { UtensilsCrossed, MessageCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { generateWhatsAppChatLink } from '@/lib/whatsapp';

type HeroSectionProps = {
  title: string;
  subtitle: string;
  imageUrl?: string | null;
  brandName: string;
  whatsappNumber: string;
};

export function HeroSection({
  title,
  subtitle,
  imageUrl,
  brandName,
  whatsappNumber,
}: HeroSectionProps) {
  const bg = imageUrl || '/images/hero-bg.svg';
  const waLink = generateWhatsAppChatLink(
    whatsappNumber,
    `Halo ${brandName}, saya ingin memesan menu. Apakah kedai sedang buka hari ini?`,
  );

  return (
    <section
      id="hero"
      className="relative flex min-h-[85vh] items-center justify-center overflow-hidden px-4 py-20 sm:px-6 lg:px-8"
    >
      <Image
        src={bg}
        alt={`Suasana kedai ${brandName}`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-[1px]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <Badge variant="default" className="mb-5 bg-white/15 text-amber-100 backdrop-blur-sm" dot animateDot>
          Kedai Kopi Artisanal Nusantara
        </Badge>
        <h1 className="text-4xl font-bold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-stone-200 sm:text-xl">
          {subtitle}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="#menu"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-lg transition-all hover:bg-primary-hover active:scale-95 focus-ring sm:w-auto"
          >
            <UtensilsCrossed className="h-5 w-5" />
            Lihat Daftar Menu
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-3.5 text-base font-semibold text-white shadow-lg transition-all hover:bg-whatsapp-dark active:scale-95 focus-ring sm:w-auto"
          >
            <MessageCircle className="h-5 w-5" />
            Order via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
