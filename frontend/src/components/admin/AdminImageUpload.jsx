import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { HiOutlinePhotograph, HiOutlineTrash, HiOutlineUpload } from 'react-icons/hi';
import productService from '../../services/productService';
import { useUI } from '../../context';
import { cn } from '../../utils';

const API_ORIGIN =
  (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/api\/?$/, '');

export const resolveImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('blob:') || url.startsWith('data:')) return url;
  if (url.startsWith('/')) return `${API_ORIGIN}${url}`;
  return url;
};

const AdminImageUpload = ({ images = [], onChange, disabled = false }) => {
  const { showToast } = useUI();
  const inputRef = useRef(null);
  const zoneRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  const uploadFiles = useCallback(
    async (files) => {
      const imageFiles = Array.from(files).filter((f) => f.type.startsWith('image/'));
      if (!imageFiles.length) return;

      setUploading(true);
      try {
        const formData = new FormData();
        imageFiles.forEach((file) => formData.append('images', file));
        const { data } = await productService.uploadImages(formData);
        const urls = data.data?.urls || [];
        if (urls.length) {
          onChange([...images, ...urls]);
          showToast(`${urls.length} image(s) uploaded`, 'success');
        }
      } catch (err) {
        showToast(err.response?.data?.message || 'Image upload failed', 'error');
        throw err;
      } finally {
        setUploading(false);
      }
    },
    [images, onChange, showToast]
  );

  const processFiles = useCallback(
    async (files) => {
      if (disabled || uploading) return;
      try {
        await uploadFiles(files);
      } catch {
        // caller handles toast
        throw new Error('Upload failed');
      }
    },
    [disabled, uploading, uploadFiles]
  );

  useEffect(() => {
    const handlePaste = (e) => {
      if (disabled || uploading) return;

      const items = e.clipboardData?.items;
      if (!items) return;

      const files = [];
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile();
          if (file) files.push(file);
        }
      }

      if (files.length) {
        e.preventDefault();
        processFiles(files).catch(() => {});
      }
    };

    document.addEventListener('paste', handlePaste);
    return () => document.removeEventListener('paste', handlePaste);
  }, [disabled, uploading, processFiles]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled || uploading) return;
    processFiles(e.dataTransfer.files).catch(() => {});
  };

  const handleFileChange = (e) => {
    if (e.target.files?.length) {
      processFiles(e.target.files).catch(() => {});
      e.target.value = '';
    }
  };

  const removeImage = (index) => {
    onChange(images.filter((_, i) => i !== index));
  };

  const addUrl = () => {
    const url = urlInput.trim();
    if (!url) return;
    onChange([...images, url]);
    setUrlInput('');
  };

  return (
    <div className="space-y-4">
      <div
        ref={zoneRef}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={cn(
          'relative border-2 border-dashed rounded-sm p-8 text-center transition-colors',
          dragOver ? 'border-primary bg-primary/10' : 'border-outline/40 bg-supporting/30',
          disabled && 'opacity-50 pointer-events-none'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          multiple
          className="hidden"
          onChange={handleFileChange}
        />

        <HiOutlinePhotograph className="w-10 h-10 mx-auto text-text-muted/60 mb-3" />

        <p className="text-sm text-text mb-1">
          {uploading ? 'Uploading…' : 'Drag & drop images here'}
        </p>
        <p className="text-xs text-text-muted mb-4">
          or browse files · paste with Ctrl+V
        </p>

        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-secondary text-ivory rounded-sm hover:bg-text transition-colors disabled:opacity-50"
        >
          <HiOutlineUpload className="w-4 h-4" />
          Choose from folder
        </button>
      </div>

      {/* URL fallback */}
      <div className="flex gap-2">
        <input
          type="url"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          placeholder="Or paste / type image URL"
          className="flex-1 px-3 py-2 text-sm bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary"
          onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addUrl())}
        />
        <button
          type="button"
          onClick={addUrl}
          className="px-4 py-2 text-sm border border-outline/30 rounded-sm hover:border-primary transition-colors"
        >
          Add URL
        </button>
      </div>

      {/* Previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((url, index) => (
            <div
              key={`${url}-${index}`}
              className="relative group aspect-square rounded-sm overflow-hidden bg-supporting border border-outline/20"
            >
              <img
                src={resolveImageUrl(url)}
                alt={`Product ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '';
                  e.target.className = 'hidden';
                }}
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 p-1.5 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <HiOutlineTrash className="w-3.5 h-3.5" />
              </button>
              <span className="absolute bottom-1 left-1 text-[10px] bg-black/50 text-white px-1.5 py-0.5 rounded">
                {index + 1}
              </span>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-text-muted">
        {images.length} image{images.length !== 1 ? 's' : ''} added · JPEG, PNG, WEBP, GIF · max 5MB each
      </p>
    </div>
  );
};

export default memo(AdminImageUpload);
