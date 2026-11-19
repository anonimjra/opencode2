'use client';

import { useState, useTransition } from 'react';
import { Pencil, Trash2, Plus } from 'lucide-react';
import type { CategoryWithCount } from '@/types/database';
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from '@/app/actions/categories';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

type CategoryListProps = {
  categories: CategoryWithCount[];
};

type FormState = { id?: string; name: string; sortOrder: number };

export function CategoryList({ categories }: CategoryListProps) {
  const [isPending, startTransition] = useTransition();
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>({ name: '', sortOrder: 0 });
  const [error, setError] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<CategoryWithCount | null>(null);

  function openCreate() {
    setForm({ name: '', sortOrder: categories.length + 1 });
    setError(null);
    setModalOpen(true);
  }

  function openEdit(category: CategoryWithCount) {
    setForm({ id: category.id, name: category.name, sortOrder: category.sort_order });
    setError(null);
    setModalOpen(true);
  }

  function handleSave() {
    setError(null);
    startTransition(async () => {
      const result = form.id
        ? await updateCategory(form.id, form.name, form.sortOrder)
        : await createCategory(form.name, form.sortOrder);
      if (result.success) {
        setModalOpen(false);
      } else {
        setError(result.error ?? 'Gagal menyimpan kategori.');
      }
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteCategory(deleteTarget.id);
      if (!result.success) {
        setError(result.error ?? 'Gagal menghapus kategori.');
        setDeleteTarget(null);
      } else {
        setDeleteTarget(null);
      }
    });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-stone-900">Kelola Kategori</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Tambah Kategori Baru
        </Button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-4 py-3">Nama</th>
              <th className="hidden px-4 py-3 sm:table-cell">Slug</th>
              <th className="px-4 py-3">Urutan</th>
              <th className="px-4 py-3">Produk</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {categories.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-stone-500">
                  Belum ada kategori. Tambahkan kategori pertama Anda.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id} className="hover:bg-stone-50">
                  <td className="px-4 py-3 font-medium text-stone-900">{category.name}</td>
                  <td className="hidden px-4 py-3 text-stone-500 sm:table-cell">
                    {category.slug}
                  </td>
                  <td className="px-4 py-3 text-stone-600">{category.sort_order}</td>
                  <td className="px-4 py-3 text-stone-600">
                    {category.products?.[0]?.count ?? 0}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => openEdit(category)}
                        aria-label={`Edit ${category.name}`}
                        className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-primary focus-ring"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(category)}
                        aria-label={`Hapus ${category.name}`}
                        className="rounded-lg p-2 text-stone-500 hover:bg-red-50 hover:text-red-600 focus-ring"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? 'Edit Kategori' : 'Tambah Kategori'}
      >
        <div className="space-y-4">
          <Input
            label="Nama Kategori"
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            placeholder="Contoh: Espresso & Kopi Susu"
            maxLength={100}
          />
          <Input
            label="Urutan Tampil"
            type="number"
            value={form.sortOrder}
            onChange={(e) =>
              setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))
            }
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSave} isLoading={isPending}>
              Simpan
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title="Konfirmasi Hapus"
      >
        <p className="text-sm text-stone-600">
          Yakin ingin menghapus kategori{' '}
          <strong>{deleteTarget?.name}</strong>? Tindakan ini tidak dapat dibatalkan.
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
