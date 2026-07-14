import { memo } from 'react';
import { cn } from '../../utils';

const Skeleton = ({ className, variant = 'rect' }) => (
  <div
    className={cn(
      'skeleton',
      variant === 'circle' && 'rounded-full',
      variant === 'text' && 'h-4 rounded',
      variant === 'rect' && 'rounded-lg',
      className
    )}
    aria-hidden="true"
  />
);

export const ProductCardSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="aspect-square w-full" />
    <Skeleton className="h-6 w-3/4" variant="text" />
    <Skeleton className="h-4 w-1/2" variant="text" />
    <Skeleton className="h-4 w-1/4" variant="text" />
  </div>
);

export const PageSkeleton = () => (
  <div className="container-kn py-20 space-y-8">
    <Skeleton className="h-12 w-1/3" variant="text" />
    <Skeleton className="h-64 w-full" />
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {Array.from({ length: 4 }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  </div>
);

export default memo(Skeleton);
