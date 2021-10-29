import { FC, useRef } from 'react';

import Button from '~/components/Button';
import { MinusIcon, PlusIcon } from '~/components/icons';
import Input from '~/components/Input';
import { formatMultiplier } from '~/utils/format';

const SCROLL_SPEED_MULTIPLIER_INCREMENT = 0.1;

const PopUpPage: FC = () => {
  const speedMultiplierInputRef = useRef<HTMLInputElement>(null);

  function handleIncrementScrollSpeedMultitplier(increment: number) {
    const speedMultiplierInput = speedMultiplierInputRef.current;
    if (!speedMultiplierInput) return;

    const speedMultiplier = parseFloat(speedMultiplierInput.value);
    const newScrollSpeedMultiplier = speedMultiplier + increment;

    speedMultiplierInput.value = formatMultiplier(newScrollSpeedMultiplier);
  }

  return (
    <div className="p-4 space-y-1 bg-gray-50">
      <div className="flex items-end justify-center space-x-1">
        <Input
          ref={speedMultiplierInputRef}
          label="Scroll speed multiplier"
          defaultValue="1x"
          className="cursor-default"
          readOnly
        />
        <Button
          renderIcon={PlusIcon}
          onClick={() =>
            handleIncrementScrollSpeedMultitplier(
              SCROLL_SPEED_MULTIPLIER_INCREMENT,
            )
          }
          className="mb-1"
        />
        <Button
          renderIcon={MinusIcon}
          onClick={() =>
            handleIncrementScrollSpeedMultitplier(
              -SCROLL_SPEED_MULTIPLIER_INCREMENT,
            )
          }
          className="mb-1"
        />
      </div>
    </div>
  );
};

export default PopUpPage;
