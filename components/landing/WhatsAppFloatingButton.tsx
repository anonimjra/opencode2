'use client';

import { MessageCircle } from 'lucide-react';
import { generateWhatsAppChatLink } from '@/lib/whatsapp';

type WhatsAppFloatingButtonProps = {
  whatsappNumber: string;
  brandName: string;
};

export function WhatsAppFloatingButton({
  whatsappNumber,
  brandName,
}: WhatsAppFloatingButtonProps) {
  const waLink = generateWhatsAppChatLink(
    whatsappNumber,
    `Halo ${brandName}, saya sedang melihat website Anda dan ingin bertanya mengenai menu/layanan hari ini.`,
  );

  return (
    <a
      href={waLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Hubungi kami melalui WhatsApp"
      className="group fixed bottom-6 right-6 z-50 flex items-center gap-3 focus-ring"
    >
      <span className="pointer-events-none hidden rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100 sm:block">
        Chat dengan Kami
      </span>
      <span className="relative">
        <span className="absolute -inset-1 animate-ping rounded-full bg-whatsapp/40 opacity-75 group-hover:opacity-0" />
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95">
          <MessageCircle className="h-7 w-7" />
        </span>
      </span>
    </a>
  );
}
