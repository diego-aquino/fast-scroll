import { FC, useEffect, useRef } from 'react';

import Button from '~/components/Button';
import { MinusIcon, PlusIcon } from '~/components/icons';
import Input from '~/components/Input';
import config from '~/config';
import { formatMultiplier } from '~/utils/format';
import { round } from '~/utils/math';

const SPEED_MULTIPLIER_INCREMENT = 0.1;

const PopUpPage: FC = () => {
  const speedMultiplierInputRef = useRef<HTMLInputElement>(null);

  async function incrementScrollSpeedMultiplier(increment: number) {
    const speedMultiplierInput = speedMultiplierInputRef.current;
    if (!speedMultiplierInput) return;

    const speedMultiplier = parseFloat(speedMultiplierInput.value);
    const newSpeedMultiplier = round(speedMultiplier + increment, 1);

    speedMultiplierInput.value = formatMultiplier(newSpeedMultiplier);
    await config.setScrollSpeedMultiplier(newSpeedMultiplier);
  }

  useEffect(() => {
    (async () => {
      await config.loadFromStorage();

      const speedMultiplierInput = speedMultiplierInputRef.current;
      if (!speedMultiplierInput) return;

      speedMultiplierInput.value = formatMultiplier(
        config.scrollSpeedMultiplier,
      );
    })();
  }, []);

  return (
    <div className="p-4 space-y-1 bg-gray-50">
      <div className="flex items-end justify-center space-x-1">
        <Input
          ref={speedMultiplierInputRef}
          label="Scroll speed multiplier"
          defaultValue={formatMultiplier(config.scrollSpeedMultiplier)}
          className="cursor-default"
          readOnly
        />
        <Button
          renderIcon={PlusIcon}
          onClick={() =>
            incrementScrollSpeedMultiplier(SPEED_MULTIPLIER_INCREMENT)
          }
          className="mb-1"
        />
        <Button
          renderIcon={MinusIcon}
          onClick={() =>
            incrementScrollSpeedMultiplier(-SPEED_MULTIPLIER_INCREMENT)
          }
          className="mb-1"
        />
      </div>
    </div>
  );
};

export default PopUpPage;
