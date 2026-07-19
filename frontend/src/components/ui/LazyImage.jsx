import { memo, useState, useEffect, useMemo } from 'react';
import { cn } from '../../utils';
import { FALLBACK_IMAGE } from '../../constants/images';
import { optimizeImageUrl, IMAGE_WIDTHS } from '../../utils/optimizeImageUrl';

const LazyImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  aspectRatio = 'aspect-square',
  fallback = FALLBACK_IMAGE,
  /** Eager-load above-the-fold images (hero, etc.) */
  priority = false,
  /** Target display width for CDN resizing */
  width = IMAGE_WIDTHS.card,
  sizes,
  ...props
}) => {
  const optimizedSrc = useMemo(
    () => optimizeImageUrl(src, { width }) || src,
    [src, width]
  );
  const optimizedFallback = useMemo(
    () => optimizeImageUrl(fallback, { width: IMAGE_WIDTHS.card }) || fallback,
    [fallback]
  );

  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(optimizedSrc);

  useEffect(() => {
    setCurrentSrc(optimizedSrc);
    setLoaded(false);
  }, [optimizedSrc]);

  const handleError = () => {
    if (currentSrc !== optimizedFallback) {
      setCurrentSrc(optimizedFallback);
      setLoaded(false);
    }
  };

  return (
    <div className={cn('relative overflow-hidden bg-supporting/40', aspectRatio, wrapperClassName)}>
      {!loaded && (
        <div className="absolute inset-0 skeleton" aria-hidden="true" />
      )}
      <img
        src={currentSrc}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-200',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default memo(LazyImage);
