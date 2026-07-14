import { memo } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/common/PageHero';
import Button from '../components/ui/Button';
import Logo from '../components/common/Logo';
import { useCart, useSiteContent } from '../context';
import { formatPrice } from '../utils';

const CheckoutPage = () => {
  const { items, subtotal } = useCart();
  const { getImage } = useSiteContent();

  return (
    <div>
      <PageHero
        image={getImage('placeholders.checkout')}
        eyebrow="Secure Checkout"
        title="Your Order"
      />
      <section className="container-kn py-16 md:py-24 max-w-3xl">
        {items.length === 0 ? (
          <div className="text-center space-y-6 py-12">
            <Logo variant="auth" />
            <p className="text-text-muted">Your bag is empty.</p>
            <Button variant="primary" as={Link} to="/shop">Continue Shopping</Button>
          </div>
        ) : (
          <div className="space-y-8">
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4 items-center border-b border-outline/20 pb-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-supporting shrink-0">
                    <LazyImage src={item.image} alt={item.name} aspectRatio="" wrapperClassName="h-full" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-xl">{item.name}</h3>
                    <p className="text-sm text-text-muted">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                </li>
              ))}
            </ul>
            <div className="flex justify-between text-lg font-medium pt-4 border-t border-outline/30">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <Button variant="primary" className="w-full">Place Order</Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default memo(CheckoutPage);
