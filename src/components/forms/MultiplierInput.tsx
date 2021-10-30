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
    multiplierIncrement = DEFAULT_MULTIPLIER_INCREMENT,
    onIncrementMultiplier,
    ...rest
  },
  ref,
) => (
  <div className="flex items-end justify-center space-x-1">
    <Input ref={ref} spellCheck={false} autoComplete="false" {...rest} />
    <Button
      renderIcon={PlusIcon}
      onClick={() => onIncrementMultiplier?.(multiplierIncrement)}
      className="mb-1"
    />
    <Button
      renderIcon={MinusIcon}
      onClick={() => onIncrementMultiplier?.(-multiplierIncrement)}
      className="mb-1"
    />
  </div>
);

export default forwardRef(MultiplierInput);
