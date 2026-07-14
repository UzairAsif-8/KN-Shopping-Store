import { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUI } from '../../context';
import { cn } from '../../utils';

const Toast = () => {
  const { toast } = useUI();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={cn(
            'fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] px-6 py-3 rounded-sm text-sm font-medium shadow-lg',
            toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-secondary text-ivory'
          )}
        >
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default memo(Toast);
