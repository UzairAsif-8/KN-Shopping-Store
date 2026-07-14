import { memo } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaPinterest, FaFacebookF } from 'react-icons/fa';
import Logo from '../common/Logo';
import { BRAND, FOOTER_LINKS, SOCIAL_LINKS } from '../../constants';

const socialIcons = {
  instagram: FaInstagram,
  pinterest: FaPinterest,
  facebook: FaFacebookF,
};

const Footer = () => (
  <footer className="bg-supporting border-t border-outline/20">
    <div className="container-kn py-16 md:py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
        {/* Brand Column */}
        <div className="space-y-5 sm:col-span-2 lg:col-span-1">
          <Logo variant="footer" />
          <p className="text-sm text-text-muted leading-relaxed max-w-xs">
            Curating beauty with intention. Premium cosmetics for the modern woman who values quality, ritual, and self-care.
          </p>
          <div className="flex gap-4 pt-1">
            {SOCIAL_LINKS.map((social) => {
              const Icon = socialIcons[social.icon];
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-outline/30 flex items-center justify-center text-text-muted hover:text-text hover:border-primary hover:bg-primary/10 transition-all duration-300"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Shop */}
        <div>
          <h4 className="label-caps text-text mb-4">Shop</h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.shop.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm text-text-muted hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="label-caps text-text mb-4">Company</h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.company.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm text-text-muted hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h4 className="label-caps text-text mb-4">Customer Care</h4>
          <ul className="space-y-3">
            {FOOTER_LINKS.customerCare.map((link) => (
              <li key={link.href}>
                <Link to={link.href} className="text-sm text-text-muted hover:text-primary transition-colors">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-outline/30 flex flex-col sm:flex-row justify-between items-center gap-6">
        <Logo variant="sm" className="opacity-60" />
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Link
            to="/admin/login"
            className="text-[10px] tracking-[0.2em] uppercase text-text-muted/70 hover:text-primary transition-colors"
          >
            Admin Login
          </Link>
          <p className="text-xs text-text-muted text-center sm:text-right">
            &copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  </footer>
);

export default memo(Footer);
