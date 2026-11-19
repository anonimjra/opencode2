'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Upload, X } from 'lucide-react';
import { validateImageFile } from '@/lib/validation';

type ImageUploaderProps = {
  currentImageUrl?: string | null;
  onImageSelected: (file: File) => void;
  onImageRemoved: () => void;
  label?: string;
};

export function ImageUploader({
  currentImageUrl,
  onImageSelected,
  onImageRemoved,
  label = 'Foto',
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(currentImageUrl ?? null);
  const [error, setError] = useState<string | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    setPreview(currentImageUrl ?? null);
  }, [currentImageUrl]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  function handleFile(file: File | undefined) {
    if (!file) return;
    const validation = validateImageFile(file);
    if (!validation.valid) {
      setError(validation.error ?? 'File tidak valid.');
      return;
    }
    setError(null);
    if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    const url = URL.createObjectURL(file);
    objectUrlRef.current = url;
    setPreview(url);
    onImageSelected(file);
  }

  function handleRemove() {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }
    setPreview(null);
    setError(null);
    if (inputRef.current) inputRef.current.value = '';
    onImageRemoved();
  }

  return (
    <div>
      <span className="mb-1.5 block text-sm font-medium text-stone-700">{label}</span>
      <div className="flex items-start gap-4">
        <div className="relative h-28 w-28 overflow-hidden rounded-xl border border-stone-200 bg-stone-100">
          {preview ? (
            <Image
              src={preview}
              alt="Pratinjau gambar"
              fill
              sizes="112px"
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center text-stone-400">
              <Upload className="h-6 w-6" />
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
            id="image-upload-input"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-xl border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 focus-ring"
          >
            Pilih Gambar
          </button>
          {preview && (
            <button
              type="button"
              onClick={handleRemove}
              className="inline-flex items-center gap-1 rounded-xl px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 focus-ring"
            >
              <X className="h-4 w-4" />
              Hapus
            </button>
          )}
          <p className="text-xs text-stone-400">JPG, PNG, WebP. Maks 2MB.</p>
        </div>
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
