import { memo } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { HiOutlineViewGrid, HiOutlineShoppingBag, HiOutlineLogout, HiOutlineHome, HiOutlinePhotograph, HiOutlineCog } from 'react-icons/hi';
import Logo from '../common/Logo';
import adminService from '../../services/adminService';
import { cn } from '../../utils';

const navLinkClass = ({ isActive }) =>
  cn(
    'flex items-center gap-3 px-4 py-3 text-sm transition-colors rounded-sm',
    isActive
      ? 'bg-primary/20 text-text font-medium'
      : 'text-text-muted hover:text-text hover:bg-supporting'
  );

const AdminShell = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await adminService.logout();
    } catch {
      // ignore
    }
    localStorage.removeItem('kn_admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-[calc(100vh-72px)] bg-background">
      <div className="container-kn py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar */}
          <aside className="lg:w-56 shrink-0">
            <div className="sticky top-24 space-y-8">
              <Logo variant="sm" link={false} className="!h-16 mx-auto lg:mx-0" />

              <nav className="space-y-1">
                <NavLink to="/admin/dashboard" className={navLinkClass}>
                  <HiOutlineViewGrid className="w-5 h-5" />
                  Dashboard
                </NavLink>
                <NavLink to="/admin/products" className={navLinkClass}>
                  <HiOutlineShoppingBag className="w-5 h-5" />
                  Products
                </NavLink>
                <NavLink to="/admin/site-images" className={navLinkClass}>
                  <HiOutlinePhotograph className="w-5 h-5" />
                  Site Images
                </NavLink>
                <NavLink to="/admin/profile" className={navLinkClass}>
                  <HiOutlineCog className="w-5 h-5" />
                  Profile
                </NavLink>
              </nav>

              <div className="pt-4 border-t border-outline/20 space-y-1">
                <Link
                  to="/"
                  className="flex items-center gap-3 px-4 py-3 text-sm text-text-muted hover:text-text transition-colors rounded-sm"
                >
                  <HiOutlineHome className="w-5 h-5" />
                  View Store
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-text-muted hover:text-text transition-colors rounded-sm"
                >
                  <HiOutlineLogout className="w-5 h-5" />
                  Log Out
                </button>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AdminShell);
