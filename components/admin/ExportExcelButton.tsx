'use client';

import { useState } from 'react';
import { FileSpreadsheet } from 'lucide-react';
import { cn } from '@/lib/utils';

type ExportExcelButtonProps = {
  endpoint: string;
  label?: string;
  variant?: 'outline' | 'secondary';
};

function extractFileName(contentDisposition: string | null, fallback: string): string {
  if (!contentDisposition) return fallback;
  const match = /filename="?([^";]+)"?/i.exec(contentDisposition);
  return match?.[1] ?? fallback;
}

export function ExportExcelButton({
  endpoint,
  label = 'Export Excel',
  variant = 'outline',
}: ExportExcelButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setIsDownloading(true);
    setError(null);
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        setError(
          response.status === 401
            ? 'Sesi Anda telah berakhir. Silakan login ulang.'
            : 'Gagal mengunduh file Excel.',
        );
        return;
      }
      const blob = await response.blob();
      const fallbackName = `${endpoint.split('/').pop() ?? 'export'}-${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`;
      const fileName = extractFileName(
        response.headers.get('Content-Disposition'),
        fallbackName,
      );
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch {
      setError('Gagal mengunduh file. Periksa koneksi internet Anda.');
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleDownload}
        disabled={isDownloading}
        className={cn(
          'inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors focus-ring disabled:opacity-60',
          variant === 'secondary'
            ? 'border-stone-300 bg-stone-100 text-stone-700 hover:bg-stone-200'
            : 'border-stone-300 text-stone-700 hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700',
        )}
      >
        <FileSpreadsheet
          className={cn('h-4 w-4', isDownloading && 'animate-pulse')}
        />
        {isDownloading ? 'Mengunduh Excel...' : label}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
