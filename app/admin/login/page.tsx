import Link from 'next/link';
import { Lock, ArrowLeft } from 'lucide-react';
import { LoginForm } from '@/components/admin/LoginForm';

export const metadata = {
  title: 'Login Admin',
};

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-stone-100 p-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-stone-200 bg-white p-8 shadow-lg">
          <div className="mb-6 text-center">
            <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-light text-primary">
              <Lock className="h-7 w-7" />
            </span>
            <h1 className="font-display text-2xl font-bold text-stone-900">
              Masuk ke Portal Admin
            </h1>
            <p className="mt-2 text-sm text-stone-500">
              Kelola katalog menu dan konten website Kopi Senja.
            </p>
          </div>
          <LoginForm />
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm text-stone-500 transition-colors hover:text-primary focus-ring"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Website
          </Link>
        </div>
      </div>
    </div>
  );
}
