import { memo } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '../../utils';
import { BRAND } from '../../constants';

const SOURCES = {
  navbar: '/logo.png',
  header: '/logo.png',
  footer: '/logo-full.png',
  hero: '/logo-full.png',
  sm: '/logo-full.png',
  auth: '/logo-full.png',
};

const SIZES = {
  navbar: 'h-[32px] sm:h-[36px] md:h-[38px] w-auto',
  header: 'h-[32px] sm:h-[36px] md:h-[38px] w-auto',
  footer: 'h-28 md:h-32 w-auto',
  hero: 'h-44 md:h-52 w-auto',
  sm: 'h-12 w-auto',
  auth: 'h-36 md:h-40 w-auto',
};

const TITLE_SIZES = {
  navbar: 'text-[8px] sm:text-[9px] leading-none tracking-[0.06em] mt-0.5 whitespace-nowrap max-w-[9.5rem] sm:max-w-[11rem] truncate',
  header: 'text-[8px] sm:text-[9px] leading-none tracking-[0.06em] mt-0.5 whitespace-nowrap max-w-[9.5rem] sm:max-w-[11rem] truncate',
  footer: 'text-[11px] sm:text-[12px] md:text-[13px] leading-snug tracking-[0.05em] mt-1.5 max-w-[14rem]',
  hero: 'text-[10px] sm:text-[11px] leading-snug tracking-[0.05em] mt-1',
  sm: 'text-[8px] sm:text-[9px] leading-snug tracking-[0.04em] mt-1',
  auth: 'text-[10px] sm:text-[11px] leading-snug tracking-[0.05em] mt-1.5',
};

const Logo = ({
  variant = 'header',
  className,
  imgClassName,
  link = true,
  onClick,
  showTitle = true,
}) => {
  const src = SOURCES[variant] || SOURCES.header;

  const content = (
    <span
      className={cn(
        'inline-flex flex-col items-center justify-center text-center shrink-0 gap-0.5',
        className
      )}
    >
      <img
        src={src}
        alt={`${BRAND.name} — ${BRAND.tagline}`}
        className={cn(
          SIZES[variant] || SIZES.header,
          'block w-auto max-w-full object-contain mx-auto',
          imgClassName
        )}
      />
      {showTitle && (
        <span
          className={cn(
            'block text-center font-body text-text-muted/80',
            TITLE_SIZES[variant] || TITLE_SIZES.header
          )}
        >
          {BRAND.fullName}
        </span>
      )}
    </span>
  );

  if (!link) return content;

  return (
    <Link
      to="/"
      onClick={onClick}
      className="inline-flex flex-col items-center justify-center shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
    >
      {content}
    </Link>
  );
};

export default memo(Logo);
