import { memo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils';

const SOURCES = {
  navbar: '/logo.png',
  header: '/logo.png',
  footer: '/logo-full.png',
  hero: '/logo-full.png',
  sm: '/logo-full.png',
  auth: '/logo-full.png',
};

const SIZES = {
  navbar: 'h-[48px] sm:h-[52px] md:h-[56px] w-auto',
  header: 'h-[48px] sm:h-[52px] md:h-[56px] w-auto',
  footer: 'h-40 md:h-44 w-auto',
  hero: 'h-48 md:h-56 w-auto',
  sm: 'h-14 w-auto',
  auth: 'h-40 md:h-44 w-auto mx-auto',
};

const Logo = ({ variant = 'header', className, link = true, onClick }) => {
  const src = SOURCES[variant] || SOURCES.header;

  const image = (
    <img
      src={src}
      alt="KN Store — Beauty. Confidence. You."
      className={cn(SIZES[variant] || SIZES.header, 'object-contain object-left', className)}
    />
  );

  if (!link) return image;

  return (
    <Link
      to="/"
      onClick={onClick}
      className="inline-flex shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
    >
      {image}
    </Link>
  );
};

export default memo(Logo);
