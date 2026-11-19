import { Skeleton } from '@/components/ui/Skeleton';

export default function Loading() {
  return (
    <div className="min-h-screen bg-stone-50">
      <div className="flex h-16 items-center justify-between border-b border-stone-200 bg-white px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="hidden h-8 w-64 md:block" />
        <Skeleton className="h-9 w-24" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-4 text-center">
          <Skeleton className="mx-auto h-12 w-3/4 max-w-xl" />
          <Skeleton className="mx-auto h-5 w-2/3 max-w-md" />
          <div className="flex justify-center gap-3 pt-4">
            <Skeleton className="h-12 w-40" />
            <Skeleton className="h-12 w-40" />
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3 rounded-2xl border border-stone-200 bg-white p-4">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
