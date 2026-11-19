import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-stone-50 px-4 text-center">
      <p className="font-display text-7xl font-bold text-primary">404</p>
      <h1 className="mt-4 font-display text-2xl font-bold text-stone-900">
        Halaman Tidak Ditemukan
      </h1>
      <p className="mt-2 max-w-md text-stone-600">
        Halaman yang Anda tuju mungkin telah dipindahkan atau tautan tidak valid.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover focus-ring"
      >
        <Home className="h-4 w-4" />
        Kembali ke Beranda
      </Link>
    </div>
  );
}
