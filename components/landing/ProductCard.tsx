import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import type { Product } from '@/types/database';
import { formatRupiah, cn } from '@/lib/utils';
import { generateWhatsAppOrderLink } from '@/lib/whatsapp';

type ProductCardProps = {
  product: Product;
  brandName: string;
  whatsappNumber: string;
};

export function ProductCard({ product, brandName, whatsappNumber }: ProductCardProps) {
  const imageSrc = product.image_url || '/images/placeholder-product.svg';
  const categoryName = product.category?.name;

  const waLink = generateWhatsAppOrderLink({
    phone: whatsappNumber,
    brandName,
    productName: product.name,
    price: product.price,
  });

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-200 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-stone-100">
        <Image
          src={imageSrc}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
        {categoryName && (
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-stone-700 backdrop-blur-sm">
            {categoryName}
          </span>
        )}
        {!product.is_available && (
          <div className="absolute inset-0 flex items-center justify-center bg-stone-900/40">
            <span className="rounded-full bg-red-600 px-4 py-1.5 text-sm font-semibold text-white">
              Habis
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h3 className="text-lg font-semibold text-stone-900">{product.name}</h3>
        {product.description && (
          <p className="mt-1 line-clamp-2 text-sm text-stone-500">
            {product.description}
          </p>
        )}
        <p className="mt-3 text-lg font-bold text-primary">
          {formatRupiah(product.price)}
        </p>

        <div className="mt-4">
          {product.is_available ? (
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-whatsapp-dark focus-ring"
            >
              <MessageCircle className="h-4 w-4" />
              Pesan via WhatsApp
            </a>
          ) : (
            <button
              type="button"
              disabled
              aria-disabled="true"
              className={cn(
                'inline-flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-500',
              )}
            >
              Stok Habis
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
