import { Skeleton } from '@/components/ui/Skeleton';

export default function AdminLoading() {
  return (
    <div className="min-h-screen bg-stone-100">
      <div className="flex">
        <div className="hidden h-screen w-64 shrink-0 border-r border-stone-200 bg-white p-4 md:block">
          <Skeleton className="mb-6 h-9 w-40" />
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full" />
            ))}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex h-16 items-center justify-between border-b border-stone-200 bg-white px-6">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-9 w-24" />
          </div>
          <div className="grid gap-4 p-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-28 w-full" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
