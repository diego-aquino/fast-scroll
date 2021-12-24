import { ChangeEvent, FC, FocusEvent, useEffect, useRef } from 'react';

import MultiplierInput from '~/components/forms/MultiplierInput';
import { ZapIcon } from '~/components/icons';
import useConfig from '~/hooks/useConfig';
import { selectAllInputValue } from '~/utils/html';
import { round } from '~/utils/math';

const PopUpPage: FC = () => {
  const { config } = useConfig();
  const speedMultiplierInputRef = useRef<HTMLInputElement>(null);

  async function incrementScrollSpeedMultiplier(increment: number) {
    const speedMultiplierInput = speedMultiplierInputRef.current;
    if (!speedMultiplierInput) return;

    const speedMultiplier = parseFloat(speedMultiplierInput.value);
    const roundedNewSpeedMultiplier = round(speedMultiplier + increment, 1);

    if (roundedNewSpeedMultiplier < 0) return;

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

    if (!isValid) {
      speedMultiplierInput.value = `${previousSpeedMultiplier.current}x`;
      speedMultiplierInput.setSelectionRange(
        selectionStart - 1,
        selectionEnd - 1,
      );
      return;
    }

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
  }

  function handleSpeedMultiplierFocus(event: FocusEvent<HTMLInputElement>) {
    selectAllInputValue(event.target);
  }

  useEffect(() => {
    const speedMultiplierInput = speedMultiplierInputRef.current;
    if (!speedMultiplierInput) return;

    speedMultiplierInput.value = `${config.scrollSpeedMultiplier}x`;
  }, [config.hasBeenLoaded, config.scrollSpeedMultiplier]);

  return (
    <div className="p-4 space-y-1 bg-gray-50">
      <MultiplierInput
        ref={speedMultiplierInputRef}
        label="Scroll speed multiplier"
        renderIcon={ZapIcon}
        onChange={handleSpeedMultiplierChange}
        onFocus={handleSpeedMultiplierFocus}
        onIncrementMultiplier={incrementScrollSpeedMultiplier}
        className="w-48"
      />
    </div>
  );
};

export default PopUpPage;
