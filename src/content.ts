const SCROLL_SPEED_MULTIPLIER = 3;

const isPressed = {
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
};

function handleKeyboardEvent(keyboardEvent: KeyboardEvent) {
  isPressed.ctrlKey = keyboardEvent.ctrlKey;
  isPressed.altKey = keyboardEvent.altKey;
  isPressed.shiftKey = keyboardEvent.shiftKey;
}

window.addEventListener('keydown', handleKeyboardEvent);
window.addEventListener('keyup', handleKeyboardEvent);

function isHorizontallyScrollable(element: Element) {
  return (
    element.scrollWidth > element.clientWidth &&
    ['scroll', 'auto'].includes(window.getComputedStyle(element).overflowX)
  );
}

function isVerticallyScrollable(element: Element) {
  return (
    element.scrollHeight > element.clientHeight &&
    ['scroll', 'auto'].includes(window.getComputedStyle(element).overflowY)
  );
}

function getElementsToScroll(wheelEvent: WheelEvent) {
  const eventTarget = wheelEvent.target as Element | null;

  if (!eventTarget) {
    return {
      elementToScrollHorizontally: window,
      elementToScrollVertically: window,
    };
  }

  return {
    elementToScrollHorizontally: isHorizontallyScrollable(eventTarget)
      ? eventTarget
      : window,
    elementToScrollVertically: isVerticallyScrollable(eventTarget)
      ? eventTarget
      : window,
  };
}

function handleWheelEvent(wheelEvent: WheelEvent) {
  if (!isPressed.altKey || isPressed.ctrlKey) return;

  wheelEvent.preventDefault();

  const { elementToScrollHorizontally, elementToScrollVertically } =
    getElementsToScroll(wheelEvent);

  const { deltaY: delta } = wheelEvent;

  if (isPressed.shiftKey) {
    elementToScrollHorizontally.scrollBy(delta * SCROLL_SPEED_MULTIPLIER, 0);
  } else {
    elementToScrollVertically.scrollBy(0, delta * SCROLL_SPEED_MULTIPLIER);
  }
}

window.addEventListener('wheel', handleWheelEvent, { passive: false });
