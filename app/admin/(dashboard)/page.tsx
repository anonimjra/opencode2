import Link from 'next/link';
import { Coffee, Tag, Inbox, Mail, Plus, FileSpreadsheet, Settings2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { MetricCard } from '@/components/admin/MetricCard';

export const dynamic = 'force-dynamic';

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [
    productsTotal,
    productsAvailable,
    categoriesTotal,
    messagesTotal,
    messagesUnread,
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_available', true),
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('contact_messages').select('*', { count: 'exact', head: true }),
    supabase
      .from('contact_messages')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false),
  ]);

  const totalProducts = productsTotal.count ?? 0;
  const totalAvailable = productsAvailable.count ?? 0;
  const totalCategories = categoriesTotal.count ?? 0;
  const totalMessages = messagesTotal.count ?? 0;
  const unreadMessages = messagesUnread.count ?? 0;

  const quickActions = [
    { href: '/admin/products/new', label: 'Tambah Menu Baru', icon: Plus },
    { href: '/admin/messages', label: 'Kelola Pesan Masuk', icon: Inbox },
    { href: '/admin/content', label: 'Ubah Jam & Kontak', icon: Settings2 },
    { href: '/api/admin/export/products', label: 'Export Excel Produk', icon: FileSpreadsheet },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-stone-900">Ringkasan Dashboard</h1>
        <p className="mt-1 text-sm text-stone-500">
          Selamat datang kembali! Berikut ringkasan performa website Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          title="Total Produk Menu"
          value={totalProducts}
          icon={Coffee}
          description={`${totalAvailable} tersedia untuk dipesan`}
          badgeText={totalAvailable > 0 ? 'Aktif' : undefined}
          badgeVariant="success"
        />
        <MetricCard
          title="Kategori Produk"
          value={totalCategories}
          icon={Tag}
          description="Kategori menu aktif"
        />
        <MetricCard
          title="Pesan Belum Dibaca"
          value={unreadMessages}
          icon={Inbox}
          description="Pesan dari pengunjung"
          badgeText={unreadMessages > 0 ? 'Perlu ditinjau' : 'Semua terbaca'}
          badgeVariant={unreadMessages > 0 ? 'warning' : 'success'}
        />
        <MetricCard
          title="Total Kontak Masuk"
          value={totalMessages}
          icon={Mail}
          description="Akumulasi pesan pelanggan"
        />
      </div>

      <div className="rounded-2xl border border-stone-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-stone-900">Aksi Cepat</h2>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            const isExternal = action.href.startsWith('/api');
            const content = (
              <>
                <Icon className="h-5 w-5" />
                {action.label}
              </>
            );
            return isExternal ? (
              <a
                key={action.href}
                href={action.href}
                className="flex items-center gap-2 rounded-xl border border-stone-200 px-4 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-primary hover:bg-primary-light hover:text-primary focus-ring"
              >
                {content}
              </a>
            ) : (
              <Link
                key={action.href}
                href={action.href}
                className="flex items-center gap-2 rounded-xl border border-stone-200 px-4 py-3 text-sm font-medium text-stone-700 transition-colors hover:border-primary hover:bg-primary-light hover:text-primary focus-ring"
              >
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
