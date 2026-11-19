'use client';

import { useMemo, useState, useTransition } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Pencil, Trash2, Plus, FileSpreadsheet } from 'lucide-react';
import type { Product, Category } from '@/types/database';
import { formatRupiah, cn } from '@/lib/utils';
import { toggleProductAvailability, deleteProduct } from '@/app/actions/products';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';

type ProductListTableProps = {
  products: Product[];
  categories: Category[];
  exportSlot?: React.ReactNode;
};

export function ProductListTable({
  products,
  categories,
  exportSlot,
}: ProductListTableProps) {
  const [isPending, startTransition] = useTransition();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);
  const [localOverrides, setLocalOverrides] = useState<Record<string, boolean>>({});

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === 'all' || product.category_id === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, categoryFilter]);

  function handleToggle(product: Product) {
    const nextValue = !product.is_available;
    setLocalOverrides((prev) => ({ ...prev, [product.id]: nextValue }));
    startTransition(async () => {
      const result = await toggleProductAvailability(product.id, nextValue);
      if (!result.success) {
        setLocalOverrides((prev) => ({ ...prev, [product.id]: product.is_available }));
      }
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      await deleteProduct(deleteTarget.id, deleteTarget.image_url ?? undefined);
      setDeleteTarget(null);
    });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-stone-900">
          Katalog Produk &amp; Menu
        </h1>
        <div className="flex flex-wrap gap-2">
          {exportSlot ?? (
            <a
              href="/api/admin/export/products"
              className="inline-flex items-center gap-2 rounded-xl border border-stone-300 px-3.5 py-2 text-sm font-medium text-stone-700 hover:bg-stone-50 focus-ring"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Export Excel
            </a>
          )}
          <Link
            href="/admin/products/new"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary-hover focus-ring"
          >
            <Plus className="h-4 w-4" />
            Tambah Produk Baru
          </Link>
        </div>
      </div>

      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari nama produk..."
            aria-label="Cari produk"
            className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          aria-label="Filter kategori"
          className="rounded-xl border border-stone-300 bg-white px-3 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
        >
          <option value="all">Semua Kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-4 py-3">Produk</th>
              <th className="px-4 py-3">Kategori</th>
              <th className="px-4 py-3">Harga</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Urutan</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-10 text-center text-stone-500">
                  Tidak ada produk yang cocok.
                </td>
              </tr>
            ) : (
              filtered.map((product) => {
                const available =
                  localOverrides[product.id] ?? product.is_available;
                return (
                  <tr key={product.id} className="hover:bg-stone-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                          <Image
                            src={product.image_url || '/images/placeholder-product.svg'}
                            alt={product.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium text-stone-900">{product.name}</p>
                          {product.description && (
                            <p className="line-clamp-1 max-w-[220px] text-xs text-stone-500">
                              {product.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-stone-600">
                      {product.category?.name ?? '-'}
                    </td>
                    <td className="px-4 py-3 font-medium text-stone-900">
                      {formatRupiah(product.price)}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggle(product)}
                        aria-label={`Ubah status ${product.name}`}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium transition-colors focus-ring',
                          available
                            ? 'bg-green-100 text-green-700'
                            : 'bg-stone-200 text-stone-600',
                        )}
                      >
                        <span
                          className={cn(
                            'h-2 w-2 rounded-full',
                            available ? 'bg-green-500' : 'bg-stone-400',
                          )}
                        />
                        {available ? 'Tersedia' : 'Habis'}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-stone-600">{product.sort_order}</td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <Link
                          href={`/admin/products/${product.id}/edit`}
                          aria-label={`Edit ${product.name}`}
                          className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-primary focus-ring"
                        >
                          <Pencil className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(product)}
                          aria-label={`Hapus ${product.name}`}
                          className="rounded-lg p-2 text-stone-500 hover:bg-red-50 hover:text-red-600 focus-ring"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title="Konfirmasi Hapus Produk"
      >
        <p className="text-sm text-stone-600">
          Yakin ingin menghapus produk <strong>{deleteTarget?.name}</strong>? Tindakan ini
          tidak dapat dibatalkan.
        </p>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => setDeleteTarget(null)}>
            Batal
          </Button>
          <Button variant="destructive" onClick={handleDelete} isLoading={isPending}>
            Hapus
          </Button>
        </div>
      </Modal>
    </div>
  );
}
