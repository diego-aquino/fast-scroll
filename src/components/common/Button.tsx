import clsx from 'clsx';
import { FC, ReactNode } from 'react';

import { HTMLButtonProps } from '~/types/html';

interface Props extends HTMLButtonProps {
  variant?: 'primary' | 'secondary' | 'tertiary';
  renderIcon?: (props: { className: string }) => ReactNode;
}

const Button: FC<Props> = ({
  variant = 'primary',
  renderIcon,
  className,
  children,
  ...rest
}) => (
  <button
    className={clsx(
      'rounded-lg transition-all duration-100 flex flex-wrap items-center justify-center font-bold focus-visible:outline-none',
      variant === 'primary' &&
        'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-500 focus-visible:ring-2 focus-visible:ring-orange-200',
      variant === 'secondary' &&
        'bg-orange-100 text-orange-800 hover:bg-orange-200 hover:text-orange-900 active:bg-orange-100 focus-visible:ring-2 focus-visible:ring-orange-300',
      variant === 'tertiary' &&
        'bg-transparent text-orange-700 hover:text-orange-900 hover:underline active:text-orange-700 focus-visible:underline',
      children && (renderIcon ? 'pl-2 pr-3 py-2' : 'px-4 py-2'),
      !children && 'p-1',
      className,
    )}
    {...rest}
  >
    {renderIcon?.({ className: clsx('w-4 h-4', children && 'mr-1') })}
    <div>{children}</div>
  </button>
);

export default Button;
