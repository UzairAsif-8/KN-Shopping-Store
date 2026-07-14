import { memo, useCallback, useEffect, useState } from 'react';
import { HiOutlineRefresh } from 'react-icons/hi';
import AdminSingleImageField from '../../components/admin/AdminSingleImageField';
import { resolveImageUrl } from '../../components/admin/AdminImageUpload';
import Button from '../../components/ui/Button';
import siteContentService from '../../services/siteContentService';
import { useUI, useSiteContent } from '../../context';

const SectionCard = ({ section, onSaved }) => {
  const { showToast } = useUI();
  const { refresh: refreshSiteContent } = useSiteContent();
  const [image, setImage] = useState(section.image);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);

  useEffect(() => {
    setImage(section.image);
  }, [section.image]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await siteContentService.update(section.key, image);
      showToast(`${section.label} updated`, 'success');
      await refreshSiteContent();
      onSaved();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to save image', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    setResetting(true);
    try {
      await siteContentService.reset(section.key);
      setImage(section.defaultImage);
      showToast(`${section.label} reset to default`, 'success');
      await refreshSiteContent();
      onSaved();
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to reset image', 'error');
    } finally {
      setResetting(false);
    }
  };

  const isDirty = image !== section.image;
  const isCustom = section.isCustom || image !== section.defaultImage;

  return (
    <div className="p-5 bg-surface border border-outline/20 rounded-sm space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-medium text-text">{section.label}</h3>
          <p className="text-xs text-text-muted mt-0.5 font-mono">{section.key}</p>
        </div>
        {isCustom && (
          <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-accent/15 text-accent rounded-sm">
            Custom
          </span>
        )}
      </div>

      <AdminSingleImageField value={image} onChange={setImage} compact />

      <div className="flex flex-wrap gap-2 pt-1">
        <Button
          variant="primary"
          size="sm"
          onClick={handleSave}
          disabled={saving || resetting || !image || !isDirty}
        >
          {saving ? 'Saving…' : 'Save'}
        </Button>
        {isCustom && (
          <Button variant="outline" size="sm" onClick={handleReset} disabled={saving || resetting}>
            {resetting ? 'Resetting…' : 'Reset to Default'}
          </Button>
        )}
      </div>

      {section.defaultImage && section.defaultImage !== image && (
        <div className="pt-2 border-t border-outline/10">
          <p className="text-[10px] uppercase tracking-wider text-text-muted mb-2">Default preview</p>
          <img
            src={resolveImageUrl(section.defaultImage)}
            alt=""
            className="w-20 h-14 object-cover rounded-sm opacity-70"
          />
        </div>
      )}
    </div>
  );
};

const AdminSiteImagesPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeGroup, setActiveGroup] = useState('');

  const loadSections = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const { data } = await siteContentService.getAll();
      const nextGroups = data.data?.groups || [];
      setGroups(nextGroups);
      setActiveGroup((current) => current || nextGroups[0]?.id || '');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load site sections');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSections();
  }, [loadSections]);

  const currentGroup = groups.find((g) => g.id === activeGroup) || groups[0];

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label-caps text-accent tracking-[0.15em]">Content</p>
          <h1 className="font-heading text-3xl text-text">Site Images</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl">
            Manage header images, hero banners, category cards, and editorial photos across the website.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={loadSections} disabled={loading}>
          <HiOutlineRefresh className="w-4 h-4 mr-1.5 inline" />
          Refresh
        </Button>
      </div>

      {loading && <p className="text-text-muted">Loading sections…</p>}

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-100 px-4 py-3 rounded-sm">
          {error}
        </p>
      )}

      {!loading && groups.length > 0 && (
        <>
          <div className="flex flex-wrap gap-2 border-b border-outline/20 pb-4">
            {groups.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveGroup(group.id)}
                className={`px-4 py-2 text-sm rounded-sm transition-colors ${
                  currentGroup?.id === group.id
                    ? 'bg-secondary text-ivory'
                    : 'bg-supporting text-text-muted hover:text-text'
                }`}
              >
                {group.label}
                <span className="ml-2 text-xs opacity-70">({group.sections.length})</span>
              </button>
            ))}
          </div>

          {currentGroup && (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
              {currentGroup.sections.map((section) => (
                <SectionCard key={section.key} section={section} onSaved={loadSections} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default memo(AdminSiteImagesPage);
