import clsx from 'clsx';
import {
  forwardRef,
  ForwardRefRenderFunction as FR,
  ReactElement,
} from 'react';

import { HTMLInputProps } from '~/types/html';

export interface Props extends HTMLInputProps {
  label?: string;
  renderIcon?: (props: { className: string }) => ReactElement;
}

const Input: FR<HTMLInputElement, Props> = (
  { label, renderIcon, id, className, ...rest },
  ref,
) => (
  <label htmlFor={id} className="relative font-semibold">
    {label}

    <input
      ref={ref}
      id={id}
      type="text"
      className={clsx(
        'py-1 border-2 border-orange-200 bg-orange-50 rounded-lg focus:border-orange-400 transition-colors outline-none',
        label && 'mt-0.5',
        renderIcon ? 'pl-6 pr-2' : 'px-2',
        className,
      )}
      {...rest}
    />

    <div className="absolute transform translate-y-1/4 bottom-3 left-2">
      {renderIcon?.({
        className: 'w-3.5 h-3.5 stroke-current fill-current text-orange-500',
      })}
    </div>
  </label>
);

export default forwardRef(Input);
