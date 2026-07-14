export const formatPrice = (price) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
