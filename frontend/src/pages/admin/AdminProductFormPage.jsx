import { memo, useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/ui/Button';
import AdminImageUpload from '../../components/admin/AdminImageUpload';
import productService from '../../services/productService';
import categoryService from '../../services/categoryService';
import { useUI, useProducts } from '../../context';

const QUICK_SECTION_SLUGS = [
  'skincare',
  'makeup',
  'fragrance',
  'grocery',
  'cosmetic',
  'electronics',
  'essentials',
  'luggage',
];

const SECTION_PRESETS = [
  { name: 'Grocery', slug: 'grocery', description: 'Daily pantry and household essentials.' },
  { name: 'Cosmetic', slug: 'cosmetic', description: 'Beauty color essentials and daily makeup must-haves.' },
  { name: 'Electronics', slug: 'electronics', description: 'Smart devices and accessories for daily life.' },
  {
    name: 'Men and Women Essentials',
    slug: 'essentials',
    description: 'Shared wardrobe and personal essentials for everyone.',
  },
  { name: 'Luggage', slug: 'luggage', description: 'Travel-ready carry-ons and storage for every trip.' },
];

const emptyForm = {
  name: '',
  slug: '',
  categoryId: '',
  shortDescription: '',
  description: '',
  price: '',
  stock: '0',
  featured: false,
  active: true,
};

const AdminProductFormPage = () => {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { showToast } = useUI();
  const { fetchProducts } = useProducts();

  const [form, setForm] = useState(emptyForm);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const quickSections = categories.filter((category) => QUICK_SECTION_SLUGS.includes(category.slug));
  const categoryOptions = useMemo(() => {
    const existingSlugs = new Set(categories.map((category) => category.slug));
    const presetOptions = SECTION_PRESETS.filter((preset) => !existingSlugs.has(preset.slug)).map((preset) => ({
      id: `preset:${preset.slug}`,
      name: preset.name,
      slug: preset.slug,
      description: preset.description,
      isPreset: true,
    }));

    return [...categories, ...presetOptions];
  }, [categories]);

  useEffect(() => {
    categoryService
      .getAll()
      .then(({ data }) => setCategories(data.data || []))
      .catch(() => showToast('Failed to load categories', 'error'));
  }, [showToast]);

  useEffect(() => {
    if (!isEdit) return;

    productService
      .getById(id)
      .then(({ data }) => {
        const product = data.data;
        setForm({
          name: product.name || '',
          slug: product.slug || '',
          categoryId: product.categoryId || product.category?.id || '',
          shortDescription: product.shortDescription || '',
          description: product.description || '',
          price: String(product.price ?? ''),
          stock: String(product.stock ?? 0),
          featured: product.featured ?? false,
          active: product.active ?? true,
        });
        setImages(product.images || []);
      })
      .catch((err) => {
        showToast(err.response?.data?.message || 'Product not found', 'error');
        navigate('/admin/products');
      })
      .finally(() => setLoading(false));
  }, [id, isEdit, navigate, showToast]);

  const updateField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resolveCategoryId = async () => {
    if (!form.categoryId.startsWith('preset:')) {
      return form.categoryId;
    }

    const slug = form.categoryId.replace('preset:', '');
    const preset = SECTION_PRESETS.find((item) => item.slug === slug);
    if (!preset) return form.categoryId;

    const existing = categories.find((category) => category.slug === slug);
    if (existing) return existing.id;

    try {
      const { data } = await categoryService.create({
        name: preset.name,
        slug: preset.slug,
        description: preset.description,
        image: null,
      });
      const created = data.data;
      setCategories((prev) => [...prev, created]);
      return created.id;
    } catch (err) {
      if (err.response?.status === 409) {
        const { data } = await categoryService.getAll({ limit: 100 });
        const refreshedCategories = data.data || [];
        setCategories(refreshedCategories);
        const refreshed = refreshedCategories.find((category) => category.slug === slug);
        if (refreshed) return refreshed.id;
      }
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim() || undefined,
      shortDescription: form.shortDescription.trim() || null,
      description: form.description.trim(),
      price: Number(form.price),
      stock: Number(form.stock),
      images,
      featured: form.featured,
      active: form.active,
    };

    try {
      const categoryId = await resolveCategoryId();
      payload.categoryId = categoryId;

      if (isEdit) {
        await productService.update(id, payload);
        showToast('Product updated', 'success');
      } else {
        await productService.create(payload);
        showToast('Product created', 'success');
      }
      await fetchProducts();
      navigate('/admin/products');
    } catch (err) {
      const message = err.response?.data?.message || 'Save failed';
      const errors = err.response?.data?.errors;
      showToast(errors?.[0]?.message ? `${message}: ${errors[0].message}` : message, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-text-muted py-12">Loading product…</p>;
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <Link to="/admin/products" className="text-sm text-text-muted hover:text-primary transition-colors">
          ← Back to products
        </Link>
        <h1 className="font-heading text-3xl text-text mt-2">
          {isEdit ? 'Edit Product' : 'Add Product'}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-surface border border-outline/20 rounded-sm p-6 md:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
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
            <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">Category *</label>
            <select
              required
              value={form.categoryId}
              onChange={(e) => updateField('categoryId', e.target.value)}
              className="w-full px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary"
            >
              <option value="">Select category</option>
              {categoryOptions.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.isPreset ? `${cat.name} (create section)` : cat.name}
                </option>
              ))}
            </select>
            {quickSections.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-[10px] uppercase tracking-[0.18em] text-text-muted">
                  Quick sections
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickSections.map((cat) => {
                    const active = form.categoryId === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => updateField('categoryId', cat.id)}
                        className={`rounded-full border px-3 py-1.5 text-xs tracking-wide transition-colors ${
                          active
                            ? 'border-primary bg-primary/15 text-text'
                            : 'border-outline/40 bg-supporting/50 text-text-muted hover:border-primary/60 hover:text-text'
                        }`}
                      >
                        {cat.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">Price *</label>
            <input
              required
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={(e) => updateField('price', e.target.value)}
              className="w-full px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary"
            />
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">Stock</label>
            <input
              type="number"
              min="0"
              value={form.stock}
              onChange={(e) => updateField('stock', e.target.value)}
              className="w-full px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">Short Description</label>
            <input
              value={form.shortDescription}
              onChange={(e) => updateField('shortDescription', e.target.value)}
              className="w-full px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-text-muted mb-1.5">Description *</label>
            <textarea
              required
              rows={4}
              value={form.description}
              onChange={(e) => updateField('description', e.target.value)}
              className="w-full px-4 py-3 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary resize-y"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs uppercase tracking-wider text-text-muted mb-3">Product Images</label>
            <AdminImageUpload
              images={images}
              onChange={setImages}
              disabled={saving}
            />
          </div>

          <div className="flex items-center gap-6 sm:col-span-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => updateField('featured', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-text">Featured</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={form.active}
                onChange={(e) => updateField('active', e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-text">Active</span>
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-2">
          <Button type="submit" variant="primary" disabled={saving}>
            {saving ? 'Saving…' : isEdit ? 'Update Product' : 'Create Product'}
          </Button>
          <Link to="/admin/products">
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default memo(AdminProductFormPage);
