'use client';

import { useState, useTransition } from 'react';
import Image from 'next/image';
import { Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import type { GalleryItem } from '@/types/database';
import {
  addGalleryPhoto,
  updateGalleryPhoto,
  deleteGalleryPhoto,
} from '@/app/actions/gallery';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

type GalleryManagerProps = {
  items: GalleryItem[];
};

export function GalleryManager({ items }: GalleryManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<GalleryItem | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<GalleryItem | null>(null);

  function handleFile(file: File | null) {
    setUploadFile(file);
    if (file) setUploadPreview(URL.createObjectURL(file));
    else setUploadPreview(null);
  }

  function handleUpload(formData: FormData) {
    setError(null);
    if (!uploadFile) {
      setError('Pilih foto terlebih dahulu.');
      return;
    }
    formData.set('photo', uploadFile);
    startTransition(async () => {
      const result = await addGalleryPhoto(formData);
      if (result.success) {
        setUploadOpen(false);
        setUploadFile(null);
        setUploadPreview(null);
      } else {
        setError(result.error ?? 'Gagal mengunggah foto.');
      }
    });
  }

  function handleEdit(formData: FormData) {
    if (!editItem) return;
    setError(null);
    startTransition(async () => {
      const result = await updateGalleryPhoto(
        editItem.id,
        String(formData.get('title') ?? ''),
        String(formData.get('caption') ?? ''),
        Number(formData.get('sort_order') ?? 0),
      );
      if (result.success) setEditItem(null);
      else setError(result.error ?? 'Gagal memperbarui foto.');
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteGalleryPhoto(
        deleteTarget.id,
        deleteTarget.image_url,
      );
      if (!result.success) setError(result.error ?? 'Gagal menghapus foto.');
      setDeleteTarget(null);
    });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-stone-900">Kelola Galeri Foto</h1>
        <Button onClick={() => setUploadOpen(true)}>
          <Plus className="h-4 w-4" />
          Unggah Foto Baru
        </Button>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white py-16 text-center text-stone-500">
          Belum ada foto galeri. Unggah foto pertama Anda.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="overflow-hidden rounded-2xl border border-stone-200 bg-white"
            >
              <div className="relative aspect-square bg-stone-100">
                <Image
                  src={item.image_url}
                  alt={item.title || 'Foto galeri'}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-stone-900">
                  {item.title || 'Tanpa Judul'}
                </p>
                <p className="line-clamp-1 text-xs text-stone-500">
                  {item.caption || '-'}
                </p>
                <p className="mt-1 text-xs text-stone-400">Urutan: {item.sort_order}</p>
                <div className="mt-2 flex justify-end gap-1">
                  <button
                    type="button"
                    onClick={() => setEditItem(item)}
                    aria-label="Edit keterangan foto"
                    className="rounded-lg p-1.5 text-stone-500 hover:bg-stone-100 hover:text-primary focus-ring"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDeleteTarget(item)}
                    aria-label="Hapus foto"
                    className="rounded-lg p-1.5 text-stone-500 hover:bg-red-50 hover:text-red-600 focus-ring"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal
        isOpen={uploadOpen}
        onClose={() => setUploadOpen(false)}
        title="Unggah Foto Baru"
      >
        <form action={handleUpload} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-stone-700">
              File Foto
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
            />
            {uploadPreview && (
              <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-xl">
                <Image
                  src={uploadPreview}
                  alt="Pratinjau"
                  fill
                  sizes="400px"
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
          </div>
          <Input name="title" label="Judul Foto (Opsional)" maxLength={150} />
          <Textarea name="caption" label="Caption (Opsional)" rows={2} />
          <Input name="sort_order" label="Urutan Tampil" type="number" defaultValue={items.length + 1} />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setUploadOpen(false)}>
              Batal
            </Button>
            <Button type="submit" isLoading={isPending}>
              Unggah
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={editItem !== null}
        onClose={() => setEditItem(null)}
        title="Edit Keterangan Foto"
      >
        <form action={handleEdit} className="space-y-4">
          <Input name="title" label="Judul" defaultValue={editItem?.title ?? ''} />
          <Textarea name="caption" label="Caption" defaultValue={editItem?.caption ?? ''} rows={2} />
          <Input
            name="sort_order"
            label="Urutan Tampil"
            type="number"
            defaultValue={editItem?.sort_order ?? 0}
          />
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setEditItem(null)}>
              Batal
            </Button>
            <Button type="submit" isLoading={isPending}>
              Simpan
            </Button>
          </div>
        </form>
      </Modal>

      <Modal
        isOpen={deleteTarget !== null}
        onClose={() => setDeleteTarget(null)}
        title="Konfirmasi Hapus Foto"
      >
        <p className="text-sm text-stone-600">
          Yakin ingin menghapus foto ini? Tindakan ini tidak dapat dibatalkan.
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
