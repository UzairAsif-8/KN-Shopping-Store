import { memo, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { useUI } from '../../context';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const { showToast } = useUI();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      showToast('Welcome to the KN Beauty Community!');
      setEmail('');
    }
  };

  return (
    <section className="container-kn section-gap">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto text-center space-y-6"
      >
        <span className="label-caps text-text-muted">Stay Inspired</span>
        <h2 className="headline-xl text-text">Join the KN Beauty Community</h2>
        <p className="body-lg text-text-muted">
          Be the first to discover new arrivals, exclusive offers, and beauty insights 
          curated just for you.
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mt-8 max-w-lg mx-auto">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="flex-1 px-5 py-3.5 bg-supporting border border-outline/30 rounded-sm text-text placeholder:text-text-muted outline-none focus:border-primary transition-colors font-body"
          />
          <Button type="submit" variant="primary" className="shrink-0">
            Subscribe
          </Button>
        </form>
      </motion.div>
    </section>
  );
};

export default memo(Newsletter);
