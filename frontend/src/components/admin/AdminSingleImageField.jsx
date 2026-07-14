import { memo, useCallback, useRef, useState } from 'react';
import { HiOutlinePhotograph, HiOutlineUpload } from 'react-icons/hi';
import productService from '../../services/productService';
import { resolveImageUrl } from './AdminImageUpload';
import { cn } from '../../utils';

const AdminSingleImageField = ({
  value = '',
  onChange,
  disabled = false,
  label,
  compact = false,
}) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [dragOver, setDragOver] = useState(false);

  const uploadFile = useCallback(
    async (file) => {
      if (!file?.type?.startsWith('image/')) return;

      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('images', file);
        const { data } = await productService.uploadImages(formData);
        const url = data.data?.urls?.[0];
        if (url) onChange(url);
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled || uploading) return;
    const file = e.dataTransfer.files?.[0];
    if (file) uploadFile(file);
  };

  const applyUrl = () => {
    const url = urlInput.trim();
    if (url) {
      onChange(url);
      setUrlInput('');
    }
  };

  return (
    <div className="space-y-3">
      {label && <p className="text-xs font-medium text-text-muted uppercase tracking-wider">{label}</p>}

      <div className={cn('flex gap-4', compact ? 'flex-col sm:flex-row' : 'flex-col lg:flex-row')}>
        <div
          className={cn(
            'shrink-0 rounded-sm overflow-hidden bg-supporting border border-outline/20',
            compact ? 'w-full sm:w-36 h-28' : 'w-full lg:w-48 h-36'
          )}
        >
          {value ? (
            <img
              src={resolveImageUrl(value)}
              alt=""
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-muted/40">
              <HiOutlinePhotograph className="w-8 h-8" />
            </div>
          )}
        </div>

        <div className="flex-1 space-y-3 min-w-0">
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={cn(
              'border border-dashed rounded-sm p-4 text-center transition-colors',
              dragOver ? 'border-primary bg-primary/10' : 'border-outline/30',
              disabled && 'opacity-50 pointer-events-none'
            )}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) uploadFile(file);
                e.target.value = '';
              }}
            />
            <p className="text-xs text-text-muted mb-2">
              {uploading ? 'Uploading…' : 'Drop image or browse'}
            </p>
            <button
              type="button"
              disabled={uploading || disabled}
              onClick={() => inputRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs bg-secondary text-ivory rounded-sm hover:bg-text transition-colors disabled:opacity-50"
            >
              <HiOutlineUpload className="w-3.5 h-3.5" />
              Upload
            </button>
          </div>

          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Or paste image URL"
              disabled={disabled}
              className="flex-1 min-w-0 px-3 py-2 text-xs bg-supporting border border-outline/30 rounded-sm outline-none focus:border-primary"
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), applyUrl())}
            />
            <button
              type="button"
              onClick={applyUrl}
              disabled={disabled}
              className="px-3 py-2 text-xs border border-outline/30 rounded-sm hover:border-primary transition-colors shrink-0"
            >
              Use URL
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(AdminSingleImageField);
