import { memo } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import ScrollToTop from '../common/ScrollToTop';
import SearchModal from '../common/SearchModal';
import CartDrawer from '../cart/CartDrawer';
import Toast from '../ui/Toast';
import SocialFloatingLinks from '../common/SocialFloatingLinks';

const MainLayout = () => (
  <div className="min-h-screen flex flex-col">
    <ScrollToTop />
    <Header />
    <main className="flex-1">
      <Outlet />
    </main>
    <Footer />
    <SearchModal />
    <CartDrawer />
    <SocialFloatingLinks />
    <Toast />
  </div>
);

export default memo(MainLayout);
