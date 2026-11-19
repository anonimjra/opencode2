'use client';

import { useRef, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Save, AlertCircle, CheckCircle2, Check } from 'lucide-react';
import type { SiteSettings } from '@/types/database';
import { updateBrandAndTheme } from '@/app/actions/settings';
import { THEME_PRESETS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { ImageUploader } from '@/components/shared/ImageUploader';

type ThemeSettingsFormProps = {
  settings: SiteSettings;
};

export function ThemeSettingsForm({ settings }: ThemeSettingsFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [color, setColor] = useState(settings.primary_color || '#7C2D12');
  const logoRef = useRef<File | null>(null);

  function handleSubmit(formData: FormData) {
    setError(null);
    setSuccess(null);
    formData.set('primary_color', color);
    if (logoRef.current) formData.set('logo', logoRef.current);
    startTransition(async () => {
      const result = await updateBrandAndTheme(formData);
      if (result.success) {
        setSuccess('Pengaturan tampilan berhasil diterapkan.');
        router.refresh();
      } else {
        setError(result.error ?? 'Gagal menyimpan pengaturan.');
      }
    });
  }

  return (
    <div className="max-w-3xl">
      <h1 className="mb-6 font-display text-2xl font-bold text-stone-900">
        Pengaturan Tampilan &amp; Brand
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
          <h2 className="font-semibold text-stone-900">Identitas Brand</h2>
          <Input name="brand_name" label="Nama Brand Usaha" defaultValue={settings.brand_name} maxLength={100} />
          <Input name="tagline" label="Tagline Usaha" defaultValue={settings.tagline} maxLength={255} />
          <ImageUploader
            label="Logo Brand"
            currentImageUrl={settings.logo_url}
            onImageSelected={(file) => (logoRef.current = file)}
            onImageRemoved={() => (logoRef.current = null)}
          />
        </section>

        <section className="space-y-4 rounded-2xl border border-stone-200 bg-white p-6">
          <h2 className="font-semibold text-stone-900">Warna Tema Utama</h2>
          <div className="flex items-center gap-4">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              aria-label="Pemilih warna tema"
              className="h-12 w-16 cursor-pointer rounded-lg border border-stone-300"
            />
            <input
              type="text"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              aria-label="Kode warna HEX"
              maxLength={7}
              className="w-32 rounded-xl border border-stone-300 px-3 py-2 text-sm uppercase focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <span
              className="flex h-12 flex-1 items-center justify-center rounded-lg text-sm font-semibold text-white"
              style={{ backgroundColor: color }}
            >
              Pratinjau
            </span>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-stone-700">Preset Tema Cepat</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {THEME_PRESETS.map((preset) => (
                <button
                  key={preset.color}
                  type="button"
                  onClick={() => setColor(preset.color)}
                  className={cn(
                    'flex flex-col items-center gap-2 rounded-xl border p-3 text-xs font-medium transition-colors focus-ring',
                    color.toLowerCase() === preset.color.toLowerCase()
                      ? 'border-primary bg-primary-light'
                      : 'border-stone-200 hover:bg-stone-50',
                  )}
                >
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{ backgroundColor: preset.color }}
                  >
                    {color.toLowerCase() === preset.color.toLowerCase() && (
                      <Check className="h-4 w-4 text-white" />
                    )}
                  </span>
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit" isLoading={isPending}>
            {!isPending && <Save className="h-4 w-4" />}
            Terapkan Perubahan Tampilan
          </Button>
        </div>
      </form>
    </div>
  );
}
