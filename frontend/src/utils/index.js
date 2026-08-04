export const formatPrice = (price) =>
  new Intl.NumberFormat('en-PK', { style: 'currency', currency: 'PKR' }).format(price);

export const cn = (...classes) => classes.filter(Boolean).join(' ');

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
