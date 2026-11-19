'use client';

import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { Category, Product } from '@/types/database';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

type MenuSectionProps = {
  categories: Category[];
  products: Product[];
  brandName: string;
  whatsappNumber: string;
};

export function MenuSection({
  categories,
  products,
  brandName,
  whatsappNumber,
}: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sortedCategories = useMemo(
    () => [...categories].sort((a, b) => a.sort_order - b.sort_order),
    [categories],
  );

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category_id === selectedCategory;
      const matchesSearch =
        searchQuery.trim() === '' ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  return (
    <section id="menu" className="bg-stone-50 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Menu Kami
          </span>
          <h2 className="mt-2 font-display text-2xl font-bold text-stone-900 md:text-3xl">
            Pilihan Menu Terbaik
          </h2>
          <p className="mt-3 text-stone-600">
            Racikan istimewa dari biji kopi pilihan nusantara hingga cemilan lezat
            pendamping hari Anda.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 lg:mx-0 lg:px-0 lg:pb-0">
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className={cn(
                'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-ring',
                selectedCategory === 'all'
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-white text-stone-600 hover:bg-stone-100',
              )}
            >
              Semua Menu
            </button>
            {sortedCategories.map((category) => (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors focus-ring',
                  selectedCategory === category.id
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white text-stone-600 hover:bg-stone-100',
                )}
              >
                {category.name}
              </button>
            ))}
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari menu..."
              aria-label="Cari menu"
              className="w-full rounded-xl border border-stone-300 bg-white py-2.5 pl-10 pr-4 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                brandName={brandName}
                whatsappNumber={whatsappNumber}
              />
            ))}
          </div>
        ) : (
          <div className="mt-12 rounded-2xl border border-dashed border-stone-300 bg-white py-16 text-center">
            <p className="text-stone-500">
              Tidak ada menu yang sesuai dalam kategori ini.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
