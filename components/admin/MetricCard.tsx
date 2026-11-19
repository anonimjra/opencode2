import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type MetricCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  description?: string;
  badgeText?: string;
  badgeVariant?: 'default' | 'success' | 'warning';
};

const badgeClasses: Record<NonNullable<MetricCardProps['badgeVariant']>, string> = {
  default: 'bg-primary-light text-primary',
  success: 'bg-green-100 text-green-700',
  warning: 'bg-amber-100 text-amber-700',
};

export function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  badgeText,
  badgeVariant = 'default',
}: MetricCardProps) {
  return (
    <div className="flex items-start justify-between rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-sm font-medium text-stone-500">{title}</p>
        <p className="mt-2 text-3xl font-bold text-stone-900">{value}</p>
        {description && <p className="mt-1 text-xs text-stone-500">{description}</p>}
        {badgeText && (
          <span
            className={cn(
              'mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-medium',
              badgeClasses[badgeVariant],
            )}
          >
            {badgeText}
          </span>
        )}
      </div>
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-light text-primary">
        <Icon className="h-6 w-6" />
      </span>
    </div>
  );
}
