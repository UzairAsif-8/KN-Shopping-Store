import { memo, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import adminService from '../services/adminService';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminService
      .getDashboard()
      .then(({ data }) => setStats(data.data))
      .catch((err) => setError(err.response?.data?.message || 'Failed to load dashboard'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <p className="label-caps text-accent tracking-[0.15em]">Overview</p>
        <h1 className="font-heading text-3xl text-text">Dashboard</h1>
      </div>

      {loading && <p className="text-text-muted">Loading dashboard…</p>}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-sm">
          {error}
        </p>
      )}

      {stats && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: 'Total Products', value: stats.totalProducts },
              { label: 'Categories', value: stats.totalCategories },
              { label: 'Featured', value: stats.featuredProducts },
            ].map((item) => (
              <div
                key={item.label}
                className="p-6 bg-surface border border-outline/20 rounded-sm text-center"
              >
                <p className="text-3xl font-heading text-text">{item.value}</p>
                <p className="text-xs tracking-wider uppercase text-text-muted mt-2">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            <Link to="/admin/products">
              <Button variant="primary" size="sm">
                Manage Products
              </Button>
            </Link>
            <Link to="/admin/site-images">
              <Button variant="outline" size="sm">
                Manage Site Images
              </Button>
            </Link>
            <Link to="/admin/products/new">
              <Button variant="outline" size="sm">
                Add Product
              </Button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(AdminDashboardPage);
