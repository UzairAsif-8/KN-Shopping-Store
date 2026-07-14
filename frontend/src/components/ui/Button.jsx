import { memo } from 'react';
import { cn } from '../../utils';

const variants = {
  primary: 'bg-secondary text-ivory hover:bg-text px-8 py-3.5',
  secondary: 'bg-primary text-text hover:bg-primary/80 px-8 py-3.5',
  outline: 'border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-ivory px-8 py-3.5',
  ghost: 'text-secondary hover:text-text px-4 py-2',
  white: 'bg-ivory text-secondary hover:bg-white px-8 py-3.5',
  'white-outline': 'border border-ivory text-ivory bg-transparent hover:bg-ivory hover:text-secondary px-8 py-3.5',
};

const sizes = {
  sm: 'text-xs px-5 py-2.5',
  md: 'text-sm px-8 py-3.5',
  lg: 'text-sm px-10 py-4',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  as: Component = 'button',
  ...props
}) => (
  <Component
    className={cn(
      'inline-flex items-center justify-center font-medium tracking-wider uppercase transition-all duration-300 rounded-sm',
      variants[variant],
      sizes[size],
      className
    )}
    {...props}
  >
    {children}
  </Component>
);

export default memo(Button);
