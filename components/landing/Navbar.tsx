'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, MessageCircle } from 'lucide-react';
import { MobileDrawer, NAV_LINKS } from './MobileDrawer';
import { cleanPhoneNumber, generateWhatsAppChatLink } from '@/lib/whatsapp';

type NavbarProps = {
  brandName: string;
  logoUrl?: string | null;
  whatsappNumber: string;
};

export function Navbar({ brandName, logoUrl, whatsappNumber }: NavbarProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const waLink = generateWhatsAppChatLink(
    whatsappNumber,
    `Halo ${brandName}, saya ingin bertanya mengenai menu hari ini.`,
  );

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200/80 bg-white/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="#hero" className="flex items-center gap-2.5 focus-ring" aria-label={`${brandName} - Beranda`}>
          {logoUrl ? (
            <Image
              src={logoUrl}
              alt={`Logo ${brandName}`}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-display text-lg font-bold">
              {brandName.charAt(0)}
            </span>
          )}
          <span className="font-display text-xl font-bold tracking-tight text-stone-900">
            {brandName}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Navigasi utama">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 hover:text-primary focus-ring"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-whatsapp-dark focus-ring"
          >
            <MessageCircle className="h-4 w-4" />
            Pesan WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsDrawerOpen(true)}
          aria-label="Buka menu navigasi"
          className="rounded-lg p-2 text-stone-700 hover:bg-stone-100 focus-ring md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      <MobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </header>
  );
}

export { cleanPhoneNumber };
