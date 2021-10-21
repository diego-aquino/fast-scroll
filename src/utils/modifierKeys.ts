interface ModifierKeysState {
  readonly ctrl: { isPressed: boolean };
  readonly alt: { isPressed: boolean };
  readonly shift: { isPressed: boolean };
}

export function watchModifierKeys(): ModifierKeysState {
  const modifierKeysState: ModifierKeysState = {
    ctrl: { isPressed: false },
    alt: { isPressed: false },
    shift: { isPressed: false },
  };

  function handleKeyboardEvent(keyboardEvent: KeyboardEvent) {
    modifierKeysState.ctrl.isPressed = keyboardEvent.ctrlKey;
    modifierKeysState.alt.isPressed = keyboardEvent.altKey;
    modifierKeysState.shift.isPressed = keyboardEvent.shiftKey;
  }

  window.addEventListener('keydown', handleKeyboardEvent);
  window.addEventListener('keyup', handleKeyboardEvent);

  return modifierKeysState;
}
