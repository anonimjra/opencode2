'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Plus, Trash2, AlertCircle, CheckCircle2 } from 'lucide-react';
import type { SiteSettings, OpeningHour } from '@/types/database';
import { updateLandingContent } from '@/app/actions/content';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/shared/ImageUploader';

type LandingContentFormProps = {
  settings: SiteSettings;
};

export function LandingContentForm({ settings }: LandingContentFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [hours, setHours] = useState<OpeningHour[]>(
    settings.opening_hours?.length ? settings.opening_hours : [{ day: '', time: '' }],
  );
  const heroRef = useRef<File | null>(null);
  const aboutRef = useRef<File | null>(null);

  function updateHour(index: number, key: keyof OpeningHour, value: string) {
    setHours((prev) => prev.map((h, i) => (i === index ? { ...h, [key]: value } : h)));
  }

  function addHour() {
    setHours((prev) => [...prev, { day: '', time: '' }]);
  }

  function removeHour(index: number) {
    setHours((prev) => prev.filter((_, i) => i !== index));
  }

  function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);
    formData.set('opening_hours', JSON.stringify(hours.filter((h) => h.day && h.time)));
    if (heroRef.current) formData.set('hero_image', heroRef.current);
    if (aboutRef.current) formData.set('about_image', aboutRef.current);
    startTransition(async () => {
      const result = await updateLandingContent(formData);
      if (result.success) {
        setSuccess('Konten berhasil disimpan dan langsung tampil di landing page.');
        router.refresh();
      } else {
        setError(result.error ?? 'Gagal menyimpan konten.');
      }
    });
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 font-display text-2xl font-bold text-stone-900">
        Kelola Konten Landing Page
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

      <form action={handleSubmit} className="space-y-6">
        <section className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="font-semibold text-stone-900">Bagian Hero</h2>
          <Input name="hero_title" label="Judul Banner" defaultValue={settings.hero_title} maxLength={200} />
          <Textarea name="hero_subtitle" label="Subjudul Banner" defaultValue={settings.hero_subtitle} rows={3} />
          <ImageUploader
            label="Gambar Background Hero"
            currentImageUrl={settings.hero_image_url}
            onImageSelected={(file) => (heroRef.current = file)}
            onImageRemoved={() => (heroRef.current = null)}
          />
        </section>

        <section className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="font-semibold text-stone-900">Bagian Tentang Kami</h2>
          <Input name="about_title" label="Judul Cerita" defaultValue={settings.about_title} maxLength={200} />
          <Textarea name="about_description" label="Isi Cerita" defaultValue={settings.about_description} rows={4} />
          <ImageUploader
            label="Foto Cerita"
            currentImageUrl={settings.about_image_url}
            onImageSelected={(file) => (aboutRef.current = file)}
            onImageRemoved={() => (aboutRef.current = null)}
          />
        </section>

        <section className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="font-semibold text-stone-900">Kontak &amp; WhatsApp</h2>
          <Input
            name="whatsapp_number"
            label="Nomor WhatsApp (format 62...)"
            defaultValue={settings.whatsapp_number}
            placeholder="6281234567890"
          />
          <Textarea name="address" label="Alamat Fisik Toko" defaultValue={settings.address} rows={2} />
          <Input
            name="google_maps_embed_url"
            label="URL Embed Google Maps"
            defaultValue={settings.google_maps_embed_url ?? ''}
            placeholder="https://www.google.com/maps/embed?..."
          />
        </section>

        <section className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-stone-900">Jam Operasional</h2>
            <Button type="button" variant="outline" size="sm" onClick={addHour}>
              <Plus className="h-4 w-4" />
              Tambah Baris
            </Button>
          </div>
          <div className="space-y-2">
            {hours.map((hour, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  value={hour.day}
                  onChange={(e) => updateHour(index, 'day', e.target.value)}
                  placeholder="Senin - Jumat"
                  aria-label={`Hari baris ${index + 1}`}
                  className="flex-1 rounded-xl border border-stone-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <input
                  value={hour.time}
                  onChange={(e) => updateHour(index, 'time', e.target.value)}
                  placeholder="08:00 - 22:00"
                  aria-label={`Jam baris ${index + 1}`}
                  className="flex-1 rounded-xl border border-stone-300 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
                <button
                  type="button"
                  onClick={() => removeHour(index)}
                  aria-label={`Hapus baris ${index + 1}`}
                  className="rounded-lg p-2 text-stone-500 hover:bg-red-50 hover:text-red-600 focus-ring"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="font-semibold text-stone-900">Tautan Media Sosial</h2>
          <Input name="instagram_url" label="Instagram" defaultValue={settings.instagram_url ?? ''} />
          <Input name="tiktok_url" label="TikTok" defaultValue={settings.tiktok_url ?? ''} />
          <Input name="facebook_url" label="Facebook" defaultValue={settings.facebook_url ?? ''} />
        </section>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isPending}>
            {!isPending && <Save className="h-4 w-4" />}
            Simpan Seluruh Perubahan Konten
          </Button>
        </div>
      </form>
    </div>
  );
}
