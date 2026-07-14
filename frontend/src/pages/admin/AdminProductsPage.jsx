import { memo, useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePencil, HiOutlineTrash, HiOutlinePlus } from 'react-icons/hi';
import Button from '../../components/ui/Button';
import { resolveImageUrl } from '../../components/admin/AdminImageUpload';
import productService from '../../services/productService';
import { useUI } from '../../context';

const AdminProductsPage = () => {
  const { showToast } = useUI();
  const [products, setProducts] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(1);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await productService.getAll({
        page,
        limit: 10,
        search: search || undefined,
        sort: 'newest',
      });
      setProducts(data.data || []);
      setMeta(data.meta);
      setSelected([]);
    } catch (err) {
      showToast(err.response?.data?.message || 'Failed to load products', 'error');
    } finally {
      setLoading(false);
    }
  }, [page, search, showToast]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  const toggleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selected.length === products.length) {
      setSelected([]);
    } else {
      setSelected(products.map((p) => p.id));
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This cannot be undone.`)) return;

    try {
      await productService.remove(id);
      showToast('Product deleted', 'success');
      fetchProducts();
    } catch (err) {
      showToast(err.response?.data?.message || 'Delete failed', 'error');
    }
  };

  const handleBulkDelete = async () => {
    if (!selected.length) return;
    if (!window.confirm(`Delete ${selected.length} product(s)?`)) return;

    try {
      await productService.bulkDelete(selected);
      showToast(`${selected.length} product(s) deleted`, 'success');
      fetchProducts();
    } catch (err) {
      showToast(err.response?.data?.message || 'Bulk delete failed', 'error');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="label-caps text-accent tracking-[0.15em]">Catalog</p>
          <h1 className="font-heading text-3xl text-text">Products</h1>
        </div>
        <Link to="/admin/products/new">
          <Button variant="primary" size="sm" className="gap-2">
            <HiOutlinePlus className="w-4 h-4" />
            Add Product
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <form onSubmit={handleSearch} className="flex-1 flex gap-2">
          <input
            type="text"
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-4 py-2.5 bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary text-sm"
          />
          <Button type="submit" variant="outline" size="sm">
            Search
          </Button>
        </form>
        {selected.length > 0 && (
          <Button variant="outline" size="sm" onClick={handleBulkDelete} className="text-red-600 border-red-200">
            Delete ({selected.length})
          </Button>
        )}
      </div>

      <div className="bg-surface border border-outline/20 rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-outline/20 bg-supporting/50">
                <th className="p-4 w-10">
                  <input
                    type="checkbox"
                    checked={products.length > 0 && selected.length === products.length}
                    onChange={toggleSelectAll}
                    className="rounded"
                  />
                </th>
                <th className="p-4 text-left label-caps text-[10px] text-text-muted">Product</th>
                <th className="p-4 text-left label-caps text-[10px] text-text-muted hidden md:table-cell">Category</th>
                <th className="p-4 text-left label-caps text-[10px] text-text-muted">Price</th>
                <th className="p-4 text-left label-caps text-[10px] text-text-muted hidden sm:table-cell">Stock</th>
                <th className="p-4 text-left label-caps text-[10px] text-text-muted hidden lg:table-cell">Status</th>
                <th className="p-4 text-right label-caps text-[10px] text-text-muted">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-text-muted">
                    Loading products…
                  </td>
                </tr>
              )}
              {!loading && products.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-text-muted">
                    No products found.{' '}
                    <Link to="/admin/products/new" className="text-primary hover:underline">
                      Add your first product
                    </Link>
                  </td>
                </tr>
              )}
              {!loading &&
                products.map((product) => (
                  <tr key={product.id} className="border-b border-outline/10 hover:bg-supporting/30">
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={selected.includes(product.id)}
                        onChange={() => toggleSelect(product.id)}
                        className="rounded"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        {product.images?.[0] && (
                          <img
                            src={resolveImageUrl(product.images[0])}
                            alt=""
                            className="w-10 h-10 rounded-sm object-cover bg-supporting"
                          />
                        )}
                        <div>
                          <p className="font-medium text-text">{product.name}</p>
                          <p className="text-xs text-text-muted">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-text-muted hidden md:table-cell">
                      {product.category?.name || '—'}
                    </td>
                    <td className="p-4 text-text">${Number(product.price).toFixed(2)}</td>
                    <td className="p-4 text-text-muted hidden sm:table-cell">{product.stock}</td>
                    <td className="p-4 hidden lg:table-cell">
                      <div className="flex gap-1.5 flex-wrap">
                        {product.featured && (
                          <span className="text-[10px] px-2 py-0.5 bg-primary/30 rounded-full uppercase tracking-wider">
                            Featured
                          </span>
                        )}
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider ${
                            product.active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {product.active ? 'Active' : 'Draft'}
                        </span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="p-2 text-text-muted hover:text-primary transition-colors"
                          aria-label="Edit"
                        >
                          <HiOutlinePencil className="w-4 h-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id, product.name)}
                          className="p-2 text-text-muted hover:text-red-600 transition-colors"
                          aria-label="Delete"
                        >
                          <HiOutlineTrash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {meta && meta.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-outline/20">
            <p className="text-xs text-text-muted">
              Page {meta.page} of {meta.totalPages} ({meta.total} total)
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={!meta.hasPrevPage}
                onClick={() => setPage((p) => p - 1)}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={!meta.hasNextPage}
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(AdminProductsPage);
