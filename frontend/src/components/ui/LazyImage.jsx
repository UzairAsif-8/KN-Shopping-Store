import { memo, useState, useEffect } from 'react';
import { cn } from '../../utils';
import { FALLBACK_IMAGE } from '../../constants/images';

const LazyImage = ({
  src,
  alt,
  className,
  wrapperClassName,
  aspectRatio = 'aspect-square',
  fallback = FALLBACK_IMAGE,
  ...props
}) => {
  const [loaded, setLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
    setLoaded(false);
  }, [src]);

  const handleError = () => {
    if (currentSrc !== fallback) {
      setCurrentSrc(fallback);
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
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        onError={handleError}
        className={cn(
          'w-full h-full object-cover transition-opacity duration-500',
          loaded ? 'opacity-100' : 'opacity-0',
          className
        )}
        {...props}
      />
    </div>
  );
};

export default memo(LazyImage);
