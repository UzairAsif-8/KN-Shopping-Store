import { memo } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Logo from '../components/common/Logo';

const NotFoundPage = () => (
  <div className="min-h-[80vh] flex items-center justify-center px-6 pt-[88px] pb-16">
    <div className="text-center space-y-6 max-w-md flex flex-col items-center">
      <Logo variant="sm" />
      <span className="font-heading text-6xl text-primary block">404</span>
      <h1 className="headline-lg text-text">Page Not Found</h1>
      <p className="text-text-muted">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>
      <Button variant="primary" as={Link} to="/">
        Return Home
      </Button>
    </div>
  </div>
);

export default memo(NotFoundPage);
