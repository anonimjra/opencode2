import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'destructive' | 'outline' | 'warning';

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary-light text-primary',
  success: 'bg-green-100 text-green-800 border border-green-200',
  destructive: 'bg-red-100 text-red-700 border border-red-200',
  outline: 'border border-stone-300 text-stone-700',
  warning: 'bg-amber-100 text-amber-800 border border-amber-200',
};

const dotClasses: Record<BadgeVariant, string> = {
  default: 'bg-primary',
  success: 'bg-green-500',
  destructive: 'bg-red-500',
  outline: 'bg-stone-400',
  warning: 'bg-amber-500',
};

type BadgeProps = {
  variant?: BadgeVariant;
  dot?: boolean;
  animateDot?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Badge({
  variant = 'default',
  dot = false,
  animateDot = false,
  className,
  children,
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
        variantClasses[variant],
        className,
      )}
    >
      {dot && (
        <span className="relative flex h-2 w-2">
          {animateDot && (
            <span
              className={cn(
                'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                dotClasses[variant],
              )}
            />
          )}
          <span
            className={cn(
              'relative inline-flex h-2 w-2 rounded-full',
              dotClasses[variant],
            )}
          />
        </span>
      )}
      {children}
    </span>
  );
}
