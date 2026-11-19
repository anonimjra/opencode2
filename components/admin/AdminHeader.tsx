'use client';

import { useTransition } from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { logoutAction } from '@/app/actions/auth';

type AdminHeaderProps = {
  email: string;
  onOpenSidebar?: () => void;
};

export function AdminHeader({ email, onOpenSidebar }: AdminHeaderProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-stone-200 bg-white/90 px-4 backdrop-blur-md sm:px-6">
      <button
        type="button"
        onClick={onOpenSidebar}
        aria-label="Buka menu sidebar"
        className="rounded-lg p-2 text-stone-600 hover:bg-stone-100 focus-ring md:hidden"
      >
        <Menu className="h-6 w-6" />
      </button>

      <div className="hidden md:block">
        <p className="text-sm font-semibold text-stone-900">Dashboard Admin</p>
        <p className="text-xs text-stone-500">Kelola konten website Kopi Senja</p>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="hidden items-center gap-2 rounded-xl bg-stone-100 px-3 py-1.5 sm:flex">
          <User className="h-4 w-4 text-stone-500" />
          <span className="max-w-[180px] truncate text-sm text-stone-700">{email}</span>
        </div>
        <button
          type="button"
          onClick={() => startTransition(() => logoutAction())}
          disabled={isPending}
          className="inline-flex items-center gap-2 rounded-xl border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 transition-colors hover:bg-stone-50 focus-ring disabled:opacity-50"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Keluar</span>
        </button>
      </div>
    </header>
  );
}
