import { ChangeEvent, FC, FocusEvent, useEffect, useRef } from 'react';

import Button from '~/components/Button';
import { MinusIcon, PlusIcon } from '~/components/icons';
import Input from '~/components/Input';
import config from '~/config';
import { round } from '~/utils/math';

const SPEED_MULTIPLIER_INCREMENT = 0.1;

const PopUpPage: FC = () => {
  const speedMultiplierInputRef = useRef<HTMLInputElement>(null);

  async function incrementScrollSpeedMultiplier(increment: number) {
    const speedMultiplierInput = speedMultiplierInputRef.current;
    if (!speedMultiplierInput) return;

    const speedMultiplier = parseFloat(speedMultiplierInput.value);
    const roundedNewSpeedMultiplier = round(speedMultiplier + increment, 1);

    speedMultiplierInput.value = `${roundedNewSpeedMultiplier}x`;
    await config.setScrollSpeedMultiplier(roundedNewSpeedMultiplier);
  }

  const previousSpeedMultiplier = useRef<number>(1);

  async function handleSpeedMultiplierChange(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const speedMultiplierInput = speedMultiplierInputRef.current;
    if (!speedMultiplierInput) return;

    const selectionStart = event.target.selectionStart ?? 1;
    const selectionEnd = event.target.selectionEnd ?? 1;

    const normalizedMultiplier = event.target.value.replace(/[^\d.]/g, '');
    const atLeastOneInvalidCharacterWasRemoved =
      normalizedMultiplier.length < event.target.value.length - 1;

    const isValid = !Number.isNaN(Number(normalizedMultiplier));

    if (isValid) {
      const multiplierAsNumber = Number(normalizedMultiplier);
      const roundedMultiplierAsNumber = round(multiplierAsNumber, 1);

      speedMultiplierInput.value = `${normalizedMultiplier}x`;
      previousSpeedMultiplier.current = multiplierAsNumber;

      if (atLeastOneInvalidCharacterWasRemoved) {
        speedMultiplierInput.setSelectionRange(
          selectionStart - 1,
          selectionEnd - 1,
        );
      } else {
        speedMultiplierInput.setSelectionRange(selectionStart, selectionEnd);
      }

      await config.setScrollSpeedMultiplier(roundedMultiplierAsNumber);
    } else {
      speedMultiplierInput.value = `${previousSpeedMultiplier.current}x`;
      speedMultiplierInput.setSelectionRange(
        selectionStart - 1,
        selectionEnd - 1,
      );
    }
  }

  function handleSpeedMultiplierFocus(event: FocusEvent<HTMLInputElement>) {
    event.target.setSelectionRange(0, event.target.value.length);
  }

  useEffect(() => {
    (async () => {
      await config.loadFromStorage();

      const speedMultiplierInput = speedMultiplierInputRef.current;
      if (!speedMultiplierInput) return;

      speedMultiplierInput.value = `${config.scrollSpeedMultiplier}x`;
    })();
  }, []);

  return (
    <div className="p-4 space-y-1 bg-gray-50">
      <div className="flex items-end justify-center space-x-1">
        <Input
          ref={speedMultiplierInputRef}
          label="Scroll speed multiplier"
          onChange={handleSpeedMultiplierChange}
          onFocus={handleSpeedMultiplierFocus}
          className="cursor-default"
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
