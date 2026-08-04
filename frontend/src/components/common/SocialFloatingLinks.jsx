import { memo } from 'react';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import { SOCIAL_LINKS } from '../../constants';

const iconMap = {
  instagram: FaInstagram,
  tiktok: FaTiktok,
  facebook: FaFacebookF,
};

const SocialFloatingLinks = () => (
  <div className="fixed bottom-4 right-4 z-50 flex flex-col items-center gap-3 sm:bottom-5 sm:right-5">
    {SOCIAL_LINKS.map((social) => {
      const Icon = iconMap[social.icon];

      return (
        <a
          key={social.label}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className="group flex h-11 w-11 items-center justify-center rounded-full border border-outline/30 bg-ivory/95 text-text-muted shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:bg-primary/10 hover:text-text"
        >
          <Icon className="h-4.5 w-4.5" />
        </a>
      );
    })}
  </div>
);

export default memo(SocialFloatingLinks);