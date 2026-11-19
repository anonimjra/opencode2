'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { Product, Category } from '@/types/database';
import { createProduct, updateProduct } from '@/app/actions/products';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/shared/ImageUploader';

type ProductFormProps = {
  initialData?: Product;
  categories: Category[];
  isEditing?: boolean;
};

export function ProductForm({
  initialData,
  categories,
  isEditing = false,
}: ProductFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);
    if (imageFile) {
      formData.set('image', imageFile);
    }
    startTransition(async () => {
      const result = isEditing && initialData
        ? await updateProduct(initialData.id, formData)
        : await createProduct(formData);
      if (result.success) {
        setSuccess('Produk berhasil disimpan.');
        router.push('/admin/products');
        router.refresh();
      } else {
        setError(result.error ?? 'Gagal menyimpan produk.');
      }
    });
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 font-display text-2xl font-bold text-stone-900">
        {isEditing ? 'Edit Produk' : 'Tambah Produk Baru'}
      </h1>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
      {success && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <CheckCircle2 className="h-4 w-4" />
          {success}
        </div>
      )}

      <form
        ref={formRef}
        action={handleSubmit}
        className="space-y-5 rounded-2xl border border-stone-200 bg-white p-6"
      >
        <Input
          name="name"
          label="Nama Produk"
          defaultValue={initialData?.name ?? ''}
          placeholder="Contoh: Kopi Susu Gula Aren"
          required
          maxLength={150}
        />

        <div>
          <label htmlFor="category_id" className="mb-1.5 block text-sm font-medium text-stone-700">
            Kategori
          </label>
          <select
            id="category_id"
            name="category_id"
            defaultValue={initialData?.category_id ?? ''}
            className="w-full rounded-xl border border-stone-300 bg-white px-3.5 py-2.5 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="">Tanpa Kategori</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <Input
          name="price"
          label="Harga (Rupiah)"
          type="number"
          min={0}
          step={500}
          defaultValue={initialData?.price ?? ''}
          placeholder="22000"
          required
        />

        <Textarea
          name="description"
          label="Deskripsi Menu"
          defaultValue={initialData?.description ?? ''}
          placeholder="Bahan baku, rasa, atau catatan khusus..."
          rows={4}
          maxLength={500}
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            name="sort_order"
            label="Urutan Tampil"
            type="number"
            defaultValue={initialData?.sort_order ?? 0}
          />
          <div className="flex items-end pb-2">
            <label className="flex items-center gap-2 text-sm text-stone-700">
              <input
                type="checkbox"
                name="is_available"
                defaultChecked={initialData?.is_available ?? true}
                className="h-4 w-4 rounded border-stone-300 text-primary focus:ring-primary"
              />
              Tersedia untuk dipesan
            </label>
          </div>
        </div>

        <ImageUploader
          label="Foto Menu"
          currentImageUrl={initialData?.image_url ?? null}
          onImageSelected={(file) => setImageFile(file)}
          onImageRemoved={() => setImageFile(null)}
        />

        <div className="flex justify-end gap-2 border-t border-stone-100 pt-4">
          <Link
            href="/admin/products"
            className="inline-flex items-center justify-center rounded-xl border border-stone-300 px-4 py-2.5 text-sm font-medium text-stone-700 hover:bg-stone-50 focus-ring"
          >
            Batal
          </Link>
          <Button type="submit" isLoading={isPending}>
            {!isPending && <Save className="h-4 w-4" />}
            Simpan Produk
          </Button>
        </div>
      </form>
    </div>
  );
}
