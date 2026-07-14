import { memo } from 'react';
import PageHero from '../components/common/PageHero';
import Logo from '../components/common/Logo';
import Button from '../components/ui/Button';
import { useSiteContent } from '../context';

const AccountPage = () => {
  const { getImage } = useSiteContent();

  return (
    <div>
      <PageHero
        image={getImage('placeholders.account')}
        eyebrow="Your Account"
        title="My Profile"
      />
      <section className="container-kn py-16 md:py-24">
        <div className="max-w-md mx-auto space-y-8">
          <Logo variant="auth" />
          <p className="body-lg text-text-muted text-center">
            Sign in to manage your orders, saved addresses, and beauty preferences.
          </p>
          <div className="space-y-4">
            <Button variant="primary" className="w-full">Sign In</Button>
            <Button variant="outline" className="w-full">Create Account</Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(AccountPage);
