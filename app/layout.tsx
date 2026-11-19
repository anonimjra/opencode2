import type { Metadata, Viewport } from 'next';
import { Plus_Jakarta_Sans, Playfair_Display } from 'next/font/google';
import { ThemeProvider } from '@/components/shared/ThemeProvider';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kopisenja.example.com'),
  title: {
    default: 'Kopi Senja - Kedai Kopi & Tempat Santai Nyaman',
    template: '%s | Kopi Senja',
  },
  description:
    'Katalog menu kopi nusantara, cemilan lezat, dan suasana santai. Pesan langsung lewat WhatsApp.',
  openGraph: {
    title: 'Kopi Senja - Kedai Kopi & Tempat Santai Nyaman',
    description:
      'Katalog menu kopi nusantara, cemilan lezat, dan suasana santai. Pesan langsung lewat WhatsApp.',
    type: 'website',
    locale: 'id_ID',
    siteName: 'Kopi Senja',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${jakarta.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-stone-50 font-sans text-stone-900 antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
