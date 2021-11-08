import { forwardRef, ForwardRefRenderFunction as FR } from 'react';

import Button from '~/components/common/Button';
import { PlusIcon, MinusIcon } from '~/components/icons';

import Input, { Props as InputProps } from './Input';

const DEFAULT_MULTIPLIER_INCREMENT = 0.1;

interface Props extends InputProps {
  multiplierIncrement?: number;
  onIncrementMultiplier?: (multiplierIncrement: number) => void;
}

const MultiplierInput: FR<HTMLInputElement, Props> = (
  {
    label,
    multiplierIncrement = DEFAULT_MULTIPLIER_INCREMENT,
    onIncrementMultiplier,
    ...rest
  },
  ref,
) => (
  <div className="flex items-end justify-center space-x-1">
    <Input
      ref={ref}
      label={label}
      spellCheck={false}
      autoComplete="false"
      {...rest}
    />
    <Button
      title="Increment"
      aria-label="Increment"
      renderIcon={PlusIcon}
      onClick={() => onIncrementMultiplier?.(multiplierIncrement)}
      className="mb-3"
      style={{ transform: label && 'translateY(37.5%)' }}
    />
    <Button
      title="Decrement"
      aria-label="Decrement"
      renderIcon={MinusIcon}
      onClick={() => onIncrementMultiplier?.(-multiplierIncrement)}
      className="mb-3"
      style={{ transform: label && 'translateY(37.5%)' }}
    />
  </div>
);

export default forwardRef(MultiplierInput);
