import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import compression from 'vite-plugin-compression'

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
    compression({
      verbose: true,
      disable: false,
      threshold: 10240,
      algorithm: 'gzip',
      ext: '.gz',
    }),
    // Image compression plugin
    {
      name: 'compress-images',
      async generateBundle(options, bundle) {
        for (const fileName in bundle) {
          const file = bundle[fileName];
          // Compress image assets
          if (file.type === 'asset' && /\.(png|jpg|jpeg|webp)$/i.test(fileName)) {
            try {
              const sharp = (await import('sharp')).default;
              const buffer = Buffer.from(file.source);
              
              let compressedBuffer;
              if (fileName.endsWith('.png')) {
                compressedBuffer = await sharp(buffer)
                  .png({ quality: 80, progressive: true })
                  .toBuffer();
              } else if (fileName.endsWith('.webp')) {
                compressedBuffer = await sharp(buffer)
                  .webp({ quality: 75 })
                  .toBuffer();
              } else {
                compressedBuffer = await sharp(buffer)
                  .jpeg({ quality: 75, progressive: true })
                  .toBuffer();
              }
              
              if (compressedBuffer.length < buffer.length) {
                file.source = compressedBuffer;
              }
            } catch (err) {
              console.warn(`Could not compress ${fileName}:`, err.message);
            }
          }
        }
      },
    }
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor';
          if (id.includes('node_modules/react-router')) return 'vendor';
          if (id.includes('node_modules/framer-motion')) return 'motion';
          if (id.includes('node_modules/swiper')) return 'swiper';
        },
      },
    },
  },
})
