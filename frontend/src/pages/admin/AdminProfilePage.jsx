import { memo, useEffect, useState } from 'react';
import Button from '../../components/ui/Button';
import adminService from '../../services/adminService';
import { useUI } from '../../context';

const inputClass =
  'w-full px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary';

const AdminProfilePage = () => {
  const { showToast } = useUI();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const [emailForm, setEmailForm] = useState({ email: '', currentPassword: '' });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [savingEmail, setSavingEmail] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    adminService
      .getProfile()
      .then(({ data }) => {
        const admin = data.data;
        setProfile(admin);
        setEmailForm((prev) => ({ ...prev, email: admin.email || '' }));
      })
      .catch((err) => {
        showToast(err.response?.data?.message || 'Failed to load profile', 'error');
      })
      .finally(() => setLoading(false));
  }, [showToast]);

  const persistToken = (accessToken) => {
    if (accessToken) {
      localStorage.setItem('kn_admin_token', accessToken);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setEmailError('');
    setSavingEmail(true);

    try {
      const { data } = await adminService.changeEmail({
        email: emailForm.email.trim(),
        currentPassword: emailForm.currentPassword,
      });

      persistToken(data.data?.accessToken);
      const admin = data.data?.admin;
      if (admin) {
        setProfile(admin);
        setEmailForm({ email: admin.email, currentPassword: '' });
      }

      showToast('Email updated successfully', 'success');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update email';
      const detail = err.response?.data?.errors?.[0]?.message;
      setEmailError(detail ? `${message}: ${detail}` : message);
    } finally {
      setSavingEmail(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setPasswordError('');

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    setSavingPassword(true);

    try {
      const { data } = await adminService.changePassword({
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
        confirmPassword: passwordForm.confirmPassword,
      });

      persistToken(data.data?.accessToken);
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showToast('Password updated successfully', 'success');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update password';
      const detail = err.response?.data?.errors?.[0]?.message;
      setPasswordError(detail ? `${message}: ${detail}` : message);
    } finally {
      setSavingPassword(false);
    }
  };

  if (loading) {
    return <p className="text-text-muted py-12">Loading profile…</p>;
  }

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <p className="label-caps text-accent tracking-[0.15em]">Account</p>
        <h1 className="font-heading text-3xl text-text">Profile Settings</h1>
        {profile && (
          <p className="text-sm text-text-muted mt-2">
            Signed in as {profile.name || 'Admin'} ({profile.email})
          </p>
        )}
      </div>

      <form
        onSubmit={handleEmailSubmit}
        className="space-y-5 bg-surface border border-outline/20 rounded-sm p-6 md:p-8"
      >
        <div>
          <h2 className="font-heading text-xl text-text">Change Email</h2>
          <p className="text-sm text-text-muted mt-1">
            Enter a new email and confirm with your current password.
          </p>
        </div>

        {emailError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-sm">
            {emailError}
          </p>
        )}

        <div>
          <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">
            New email *
          </label>
          <input
            type="email"
            required
            value={emailForm.email}
            onChange={(e) => setEmailForm((prev) => ({ ...prev, email: e.target.value }))}
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">
            Current password *
          </label>
          <input
            type="password"
            required
            value={emailForm.currentPassword}
            onChange={(e) =>
              setEmailForm((prev) => ({ ...prev, currentPassword: e.target.value }))
            }
            className={inputClass}
          />
        </div>

        <Button type="submit" variant="primary" disabled={savingEmail}>
          {savingEmail ? 'Saving…' : 'Update Email'}
        </Button>
      </form>

      <form
        onSubmit={handlePasswordSubmit}
        className="space-y-5 bg-surface border border-outline/20 rounded-sm p-6 md:p-8"
      >
        <div>
          <h2 className="font-heading text-xl text-text">Change Password</h2>
          <p className="text-sm text-text-muted mt-1">
            Use at least 8 characters with letters and numbers.
          </p>
        </div>

        {passwordError && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-sm">
            {passwordError}
          </p>
        )}

        <div>
          <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">
            Current password *
          </label>
          <input
            type="password"
            required
            value={passwordForm.currentPassword}
            onChange={(e) =>
              setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">
            New password *
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={passwordForm.newPassword}
            onChange={(e) =>
              setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))
            }
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">
            Confirm new password *
          </label>
          <input
            type="password"
            required
            minLength={8}
            value={passwordForm.confirmPassword}
            onChange={(e) =>
              setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
            }
            className={inputClass}
          />
        </div>

        <Button type="submit" variant="primary" disabled={savingPassword}>
          {savingPassword ? 'Saving…' : 'Update Password'}
        </Button>
      </form>
    </div>
  );
};

export default memo(AdminProfilePage);
