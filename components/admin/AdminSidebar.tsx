'use client';

import Link from 'next/link';
import {
  LayoutDashboard,
  Coffee,
  Tag,
  FileText,
  Image as ImageIcon,
  MessageSquareQuote,
  Inbox,
  Palette,
  ExternalLink,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const menu = [
  { href: '/admin', label: 'Ringkasan', icon: LayoutDashboard, exact: true },
  { href: '/admin/products', label: 'Produk Menu', icon: Coffee },
  { href: '/admin/categories', label: 'Kategori', icon: Tag },
  { href: '/admin/content', label: 'Konten Landing', icon: FileText },
  { href: '/admin/gallery', label: 'Galeri Foto', icon: ImageIcon },
  { href: '/admin/testimonials', label: 'Testimoni', icon: MessageSquareQuote },
  { href: '/admin/messages', label: 'Pesan Masuk', icon: Inbox },
  { href: '/admin/settings', label: 'Pengaturan & Brand', icon: Palette },
];

type AdminSidebarProps = {
  currentPath: string;
  onCloseMobile?: () => void;
};

export function AdminSidebar({ currentPath, onCloseMobile }: AdminSidebarProps) {
  function isActive(href: string, exact?: boolean) {
    if (exact) return currentPath === href;
    return currentPath === href || currentPath.startsWith(`${href}/`);
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-stone-200 bg-white">
      <div className="flex h-16 items-center justify-between border-b border-stone-200 px-5">
        <Link href="/admin" className="flex items-center gap-2 focus-ring">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Coffee className="h-5 w-5" />
          </span>
          <span className="font-display text-lg font-bold text-stone-900">Kopi Senja</span>
        </Link>
        {onCloseMobile && (
          <button
            type="button"
            onClick={onCloseMobile}
            aria-label="Tutup sidebar"
            className="rounded-lg p-1.5 text-stone-500 hover:bg-stone-100 focus-ring md:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Navigasi admin">
        {menu.map((item) => {
          const active = isActive(item.href, item.exact);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onCloseMobile}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors focus-ring',
                active
                  ? 'bg-primary-light text-primary'
                  : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900',
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-stone-200 p-3">
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-stone-600 transition-colors hover:bg-stone-100 focus-ring"
        >
          <ExternalLink className="h-4 w-4" />
          Lihat Website Publik
        </Link>
      </div>
    </aside>
  );
}
