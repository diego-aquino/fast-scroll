import clsx from 'clsx';
import { forwardRef, ForwardRefRenderFunction as FR } from 'react';

import { HTMLInputProps } from '~/types/html';

interface Props extends HTMLInputProps {
  label?: string;
}

const Input: FR<HTMLInputElement, Props> = (
  { label, id, className, ...rest },
  ref,
) => (
  <label htmlFor={id} className="font-semibold">
    {label}

    <input
      ref={ref}
      id={id}
      type="text"
      className={clsx(
        'px-2 py-1 border-2 border-orange-200 bg-orange-50 rounded-lg focus:border-orange-400 transition-colors outline-none',
        label && 'mt-0.5',
        className,
      )}
      {...rest}
    />
  </label>
);

export default forwardRef(Input);
