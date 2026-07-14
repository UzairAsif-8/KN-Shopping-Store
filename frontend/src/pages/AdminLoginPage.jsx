import { memo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import Button from '../components/ui/Button';
import adminService from '../services/adminService';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('kn_admin_token');
    if (!token) return;

    adminService
      .getProfile()
      .then(() => navigate('/admin/dashboard', { replace: true }))
      .catch(() => localStorage.removeItem('kn_admin_token'));
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { data } = await adminService.login({ email, password });
      const token = data.data?.accessToken;

      if (token) {
        localStorage.setItem('kn_admin_token', token);
      }

      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6 pt-32 pb-24 md:pt-40">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-4">
          <Logo variant="auth" link={false} />
          <p className="label-caps text-accent tracking-[0.15em]">Admin Portal</p>
          <h1 className="font-heading text-3xl text-text">Sign In</h1>
          <p className="text-sm text-text-muted">
            Manage products, categories, and store content.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-sm">
              {error}
            </p>
          )}
          <input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3.5 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary transition-colors"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-3.5 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary transition-colors"
          />
          <Button type="submit" variant="primary" className="w-full" disabled={loading}>
            {loading ? 'Signing in…' : 'Admin Login'}
          </Button>
        </form>

        <p className="text-center">
          <Link to="/" className="text-sm text-text-muted hover:text-primary transition-colors">
            ← Back to store
          </Link>
        </p>
      </div>
    </section>
  );
};

export default memo(AdminLoginPage);
