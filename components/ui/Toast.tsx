'use client';

import { useEffect } from 'react';
import { CheckCircle2, XCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export type ToastVariant = 'success' | 'error' | 'info';

export type ToastData = {
  id: string;
  message: string;
  variant: ToastVariant;
};

const variantConfig: Record<
  ToastVariant,
  { icon: typeof CheckCircle2; className: string }
> = {
  success: { icon: CheckCircle2, className: 'border-green-200 bg-green-50 text-green-800' },
  error: { icon: XCircle, className: 'border-red-200 bg-red-50 text-red-700' },
  info: { icon: Info, className: 'border-blue-200 bg-blue-50 text-blue-700' },
};

type ToastProps = {
  toast: ToastData;
  onClose: (id: string) => void;
};

export function Toast({ toast, onClose }: ToastProps) {
  const config = variantConfig[toast.variant];
  const Icon = config.icon;

  useEffect(() => {
    const timer = setTimeout(() => onClose(toast.id), 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div
      role="status"
      className={cn(
        'pointer-events-auto flex items-center gap-2 rounded-xl border px-4 py-3 text-sm shadow-lg',
        config.className,
      )}
    >
      <Icon className="h-5 w-5 shrink-0" />
      <span className="flex-1">{toast.message}</span>
      <button
        type="button"
        onClick={() => onClose(toast.id)}
        aria-label="Tutup notifikasi"
        className="rounded p-0.5 hover:bg-black/5 focus-ring"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export function ToastContainer({
  toasts,
  onClose,
}: {
  toasts: ToastData[];
  onClose: (id: string) => void;
}) {
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[70] flex w-full max-w-sm -translate-x-1/2 flex-col gap-2 px-4">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onClose={onClose} />
      ))}
    </div>
  );
}
