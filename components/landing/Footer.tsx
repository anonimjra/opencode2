import Link from 'next/link';
import { Instagram, Facebook, MapPin, Phone, ArrowUpRight } from 'lucide-react';
import { cleanPhoneNumber } from '@/lib/whatsapp';

type FooterProps = {
  brandName: string;
  tagline: string;
  address: string;
  whatsappNumber: string;
  instagramUrl?: string | null;
  tiktokUrl?: string | null;
  facebookUrl?: string | null;
};

const quickLinks = [
  { href: '#hero', label: 'Beranda' },
  { href: '#about', label: 'Tentang' },
  { href: '#menu', label: 'Menu' },
  { href: '#gallery', label: 'Galeri' },
  { href: '#testimonials', label: 'Testimoni' },
  { href: '#location', label: 'Lokasi' },
];

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.5 3c.3 2.1 1.5 3.6 3.5 3.9V10c-1.3 0-2.5-.4-3.5-1.1v5.6c0 3-2.4 5.5-5.5 5.5S5.5 17.5 5.5 14.5 7.9 9 11 9c.3 0 .6 0 .9.1v3.1c-.3-.1-.6-.2-.9-.2-1.4 0-2.5 1.1-2.5 2.5s1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5V3h3z" />
    </svg>
  );
}

export function Footer({
  brandName,
  tagline,
  address,
  whatsappNumber,
  instagramUrl,
  tiktokUrl,
  facebookUrl,
}: FooterProps) {
  const phone = cleanPhoneNumber(whatsappNumber);

  return (
    <footer className="border-t border-stone-800 bg-stone-900 pb-12 pt-16 text-stone-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-2xl font-bold text-white">{brandName}</h3>
            <p className="mt-2 text-sm italic text-stone-400">{tagline}</p>
            <p className="mt-4 text-sm leading-relaxed text-stone-400">
              Kedai kopi artisanal nusantara dengan suasana hangat, racikan kopi
              pilihan, dan tempat santai yang nyaman.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Navigasi Cepat
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-400 transition-colors hover:text-white focus-ring"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Kontak &amp; Kunjungan
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href={`https://wa.me/${phone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white focus-ring"
                >
                  +{phone}
                </a>
              </li>
              <li className="text-stone-500">
                Pesan antar tersedia via WhatsApp setiap hari.
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white">
              Media Sosial
            </h4>
            <div className="mt-4 flex gap-3">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-800 text-stone-300 transition-colors hover:bg-primary hover:text-white focus-ring"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
              {tiktokUrl && (
                <a
                  href={tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-800 text-stone-300 transition-colors hover:bg-primary hover:text-white focus-ring"
                >
                  <TikTokIcon className="h-5 w-5" />
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-800 text-stone-300 transition-colors hover:bg-primary hover:text-white focus-ring"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-stone-800 pt-8 text-xs text-stone-500 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {brandName}. Hak Cipta Dilindungi.
          </p>
          <Link
            href="/admin/login"
            className="inline-flex items-center gap-1 transition-colors hover:text-stone-300 focus-ring"
          >
            Akses Pengelola
            <ArrowUpRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
