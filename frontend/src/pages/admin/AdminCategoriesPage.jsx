import { memo, useEffect, useMemo, useState } from 'react';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import Button from '../../components/ui/Button';
import AdminSingleImageField from '../../components/admin/AdminSingleImageField';
import { resolveImageUrl } from '../../components/admin/AdminImageUpload';
import categoryService from '../../services/categoryService';
import { useUI } from '../../context';

const emptyForm = {
  name: '',
  slug: '',
  description: '',
  image: '',
};

const SECTION_PRESETS = [
  {
    name: 'Grocery',
    slug: 'grocery',
    description: 'Daily pantry and household essentials.',
  },
  {
    name: 'Cosmetic',
    slug: 'cosmetic',
    description: 'Beauty color essentials and daily makeup must-haves.',
  },
  {
    name: 'Electronics',
    slug: 'electronics',
    description: 'Smart devices and accessories for daily life.',
  },
  {
    name: 'Men and Women Essentials',
    slug: 'essentials',
    description: 'Shared wardrobe and personal essentials for everyone.',
  },
  {
    name: 'Luggage',
    slug: 'luggage',
    description: 'Travel-ready carry-ons and storage for every trip.',
  },
];

const AdminCategoriesPage = () => {
  const { showToast } = useUI();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const loadCategories = async () => {
    setLoading(true);
    try {
      const { data } = await categoryService.getAll({ limit: 100 });
      setCategories(data.data || []);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load categories', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(q) ||
        category.slug.toLowerCase().includes(q) ||
        (category.description || '').toLowerCase().includes(q)
    );
  }, [categories, search]);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const applyPreset = (preset) => {
    setEditingId(null);
    setForm({
      name: preset.name,
      slug: preset.slug,
      description: preset.description,
      image: '',
    });
  };

  const startEdit = (category) => {
    setEditingId(category.id);
    setForm({
      name: category.name || '',
      slug: category.slug || '',
      description: category.description || '',
      image: category.image || '',
    });
  };

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || undefined,
      description: form.description.trim() || null,
      image: form.image.trim() || null,
    };

    try {
      if (editingId) {
        await categoryService.update(editingId, payload);
        showToast('Category updated', 'success');
      } else {
        await categoryService.create(payload);
        showToast('Category created', 'success');
      }
      await loadCategories();
      resetForm();
    } catch (err) {
      const message = err.response?.data?.message || 'Save failed';
      const errors = err.response?.data?.errors;
      showToast(errors?.[0]?.message ? `${message}: ${errors[0].message}` : message, 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (category) => {
    if (!window.confirm(`Delete category "${category.name}"?`)) return;

    try {
      await categoryService.remove(category.id);
      showToast('Category deleted', 'success');
      await loadCategories();
      if (editingId === category.id) resetForm();
    } catch (err) {
      showToast(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="label-caps text-accent tracking-[0.15em]">Sections</p>
          <h1 className="font-heading text-3xl text-text">Categories</h1>
          <p className="text-sm text-text-muted mt-2 max-w-2xl">
            Create and manage all storefront sections here, including Grocery, Cosmetic,
            Electronics, Men and Women Essentials, Luggage, and the existing beauty groups.
          </p>
        </div>

        <Button variant="outline" size="sm" onClick={loadCategories} disabled={loading}>
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[420px_minmax(0,1fr)] gap-6">
        <form onSubmit={handleSubmit} className="space-y-5 bg-surface border border-outline/20 rounded-sm p-6 md:p-8 h-fit">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl text-text">
                {editingId ? 'Edit Category' : 'Add Category'}
              </h2>
              <p className="text-xs text-text-muted mt-1">
                Use this to create a section that appears in the admin panel and storefront.
              </p>
            </div>
            {editingId && (
              <Button type="button" variant="ghost" size="sm" onClick={resetForm}>
                Cancel
              </Button>
            )}
          </div>

          <div className="space-y-4">
            <div className="space-y-2 rounded-sm border border-outline/20 bg-supporting/30 p-4">
              <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted">
                Quick presets
              </p>
              <div className="flex flex-wrap gap-2">
                {SECTION_PRESETS.map((preset) => (
                  <button
                    key={preset.slug}
                    type="button"
                    onClick={() => applyPreset(preset)}
                    className="rounded-full border border-outline/40 bg-ivory px-3 py-1.5 text-xs tracking-wide text-text-muted transition-colors hover:border-primary hover:text-text"
                  >
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">Name *</label>
              <input
                required
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">Slug</label>
              <input
                value={form.slug}
                onChange={(e) => updateField('slug', e.target.value)}
                placeholder="auto-generated if empty"
                className="w-full px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">Description</label>
              <textarea
                rows={4}
                value={form.description}
                onChange={(e) => updateField('description', e.target.value)}
                className="w-full px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary resize-y"
              />
            </div>

            <AdminSingleImageField
              value={form.image}
              onChange={(value) => updateField('image', value)}
              label="Section Image"
              compact
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" variant="primary" disabled={saving} className="gap-2">
              {editingId ? <Pencil className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              {saving ? 'Saving…' : editingId ? 'Update Category' : 'Create Category'}
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
            <div>
              <h2 className="font-heading text-2xl text-text">All Sections</h2>
              <p className="text-sm text-text-muted mt-1">
                Manage every storefront section from one place.
              </p>
            </div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search sections…"
              className="w-full sm:w-72 px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary text-sm"
            />
          </div>

          {loading ? (
            <p className="text-text-muted py-6">Loading categories…</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredCategories.map((category) => (
                <article key={category.id} className="bg-surface border border-outline/20 rounded-sm overflow-hidden">
                  <div className="flex gap-4 p-4">
                    <div className="shrink-0 w-24 h-24 rounded-sm overflow-hidden bg-supporting border border-outline/20">
                      {category.image ? (
                        <img src={resolveImageUrl(category.image)} alt={category.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-text-muted/40 text-xs uppercase tracking-widest">
                          No image
                        </div>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="font-medium text-text truncate">{category.name}</h3>
                          <p className="text-xs text-text-muted mt-1 font-mono truncate">{category.slug}</p>
                        </div>
                        <span className="text-[10px] uppercase tracking-wider px-2 py-1 bg-supporting text-text-muted rounded-sm">
                          {category.productCount ?? 0} products
                        </span>
                      </div>

                      {category.description && (
                        <p className="text-sm text-text-muted mt-3 line-clamp-3">{category.description}</p>
                      )}

                      <div className="flex items-center gap-2 mt-4">
                        <Button type="button" variant="outline" size="sm" onClick={() => startEdit(category)} className="gap-2">
                          <HiOutlinePencil className="w-4 h-4" />
                          Edit
                        </Button>
                        <Button type="button" variant="ghost" size="sm" onClick={() => handleDelete(category)} className="gap-2 text-red-600 hover:text-red-700">
                          <HiOutlineTrash className="w-4 h-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && filteredCategories.length === 0 && (
            <p className="text-text-muted py-6">No categories found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(AdminCategoriesPage);