'use client';

import { useState, useTransition } from 'react';
import { Plus, Pencil, Trash2, Star, AlertCircle } from 'lucide-react';
import type { Testimonial } from '@/types/database';
import {
  createTestimonial,
  updateTestimonial,
  toggleTestimonialActive,
  deleteTestimonial,
} from '@/app/actions/testimonials';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';

type TestimonialManagerProps = {
  testimonials: Testimonial[];
};

type FormState = {
  id?: string;
  customer_name: string;
  customer_role: string;
  review_text: string;
  rating: number;
  sort_order: number;
};

const emptyForm: FormState = {
  customer_name: '',
  customer_role: 'Pelanggan Setia',
  review_text: '',
  rating: 5,
  sort_order: 0,
};

export function TestimonialManager({ testimonials }: TestimonialManagerProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Testimonial | null>(null);
  const [overrides, setOverrides] = useState<Record<string, boolean>>({});

  function openCreate() {
    setForm({ ...emptyForm, sort_order: testimonials.length + 1 });
    setAvatarFile(null);
    setError(null);
    setModalOpen(true);
  }

  function openEdit(item: Testimonial) {
    setForm({
      id: item.id,
      customer_name: item.customer_name,
      customer_role: item.customer_role ?? 'Pelanggan Setia',
      review_text: item.review_text,
      rating: item.rating,
      sort_order: item.sort_order,
    });
    setAvatarFile(null);
    setError(null);
    setModalOpen(true);
  }

  function handleSave() {
    setError(null);
    const formData = new FormData();
    formData.set('customer_name', form.customer_name);
    formData.set('customer_role', form.customer_role);
    formData.set('review_text', form.review_text);
    formData.set('rating', String(form.rating));
    formData.set('sort_order', String(form.sort_order));
    if (avatarFile) formData.set('avatar', avatarFile);

    startTransition(async () => {
      const result = form.id
        ? await updateTestimonial(form.id, formData)
        : await createTestimonial(formData);
      if (result.success) {
        setModalOpen(false);
      } else {
        setError(result.error ?? 'Gagal menyimpan testimoni.');
      }
    });
  }

  function handleToggle(item: Testimonial) {
    const next = !(overrides[item.id] ?? item.is_active);
    setOverrides((prev) => ({ ...prev, [item.id]: next }));
    startTransition(async () => {
      const result = await toggleTestimonialActive(item.id, next);
      if (!result.success) {
        setOverrides((prev) => ({ ...prev, [item.id]: item.is_active }));
      }
    });
  }

  function handleDelete() {
    if (!deleteTarget) return;
    startTransition(async () => {
      const result = await deleteTestimonial(deleteTarget.id);
      if (!result.success) setError(result.error ?? 'Gagal menghapus testimoni.');
      setDeleteTarget(null);
    });
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-bold text-stone-900">Kelola Testimoni</h1>
        <Button onClick={openCreate}>
          <Plus className="h-4 w-4" />
          Tambah Testimoni Baru
        </Button>
      </div>

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}

      <div className="overflow-x-auto rounded-2xl border border-stone-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-stone-200 bg-stone-50 text-xs uppercase tracking-wider text-stone-500">
            <tr>
              <th className="px-4 py-3">Pelanggan</th>
              <th className="px-4 py-3">Rating</th>
              <th className="px-4 py-3">Ulasan</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-stone-500">
                  Belum ada testimoni.
                </td>
              </tr>
            ) : (
              testimonials.map((item) => {
                const active = overrides[item.id] ?? item.is_active;
                return (
                  <tr key={item.id} className="hover:bg-stone-50">
                    <td className="px-4 py-3">
                      <p className="font-medium text-stone-900">{item.customer_name}</p>
                      <p className="text-xs text-stone-500">{item.customer_role}</p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={cn(
                              'h-3.5 w-3.5',
                              i < item.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-stone-200 text-stone-200',
                            )}
                          />
                        ))}
                      </div>
                    </td>
                    <td className="max-w-[260px] px-4 py-3">
                      <p className="line-clamp-2 text-stone-600">{item.review_text}</p>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleToggle(item)}
                        aria-label={`Toggle status ${item.customer_name}`}
                        className={cn(
                          'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium focus-ring',
                          active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-stone-200 text-stone-600',
                        )}
                      >
                        <span
                          className={cn(
                            'h-2 w-2 rounded-full',
                            active ? 'bg-green-500' : 'bg-stone-400',
                          )}
                        />
                        {active ? 'Tampil' : 'Sembunyi'}
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(item)}
                          aria-label="Edit testimoni"
                          className="rounded-lg p-2 text-stone-500 hover:bg-stone-100 hover:text-primary focus-ring"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(item)}
                          aria-label="Hapus testimoni"
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
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title={form.id ? 'Edit Testimoni' : 'Tambah Testimoni'}
      >
        <div className="space-y-4">
          <Input
            label="Nama Pelanggan"
            value={form.customer_name}
            onChange={(e) => setForm((f) => ({ ...f, customer_name: e.target.value }))}
            maxLength={120}
          />
          <Input
            label="Peran / Status (contoh: Pelanggan Setia)"
            value={form.customer_role}
            onChange={(e) => setForm((f) => ({ ...f, customer_role: e.target.value }))}
            maxLength={100}
          />
          <Textarea
            label="Isi Testimoni"
            value={form.review_text}
            onChange={(e) => setForm((f) => ({ ...f, review_text: e.target.value }))}
            rows={3}
          />
          <div>
            <span className="mb-1.5 block text-sm font-medium text-stone-700">Rating</span>
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, i) => {
                const starValue = i + 1;
                return (
                  <button
                    key={starValue}
                    type="button"
                    onClick={() => setForm((f) => ({ ...f, rating: starValue }))}
                    aria-label={`Beri ${starValue} bintang`}
                    className="focus-ring"
                  >
                    <Star
                      className={cn(
                        'h-7 w-7',
                        starValue <= form.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-stone-200 text-stone-200',
                      )}
                    />
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-stone-700">
              Avatar Pelanggan (Opsional)
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => setAvatarFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-stone-600 file:mr-3 file:rounded-lg file:border-0 file:bg-primary file:px-3 file:py-2 file:text-sm file:font-medium file:text-primary-foreground"
            />
          </div>
          <Input
            label="Urutan Tampil"
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))}
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
        title="Konfirmasi Hapus Testimoni"
      >
        <p className="text-sm text-stone-600">
          Yakin ingin menghapus testimoni dari{' '}
          <strong>{deleteTarget?.customer_name}</strong>?
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
