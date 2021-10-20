const SCROLL_SPEED_MULTIPLIER = 3;

const isPressed = {
  ctrlKey: false,
  altKey: false,
  shiftKey: false,
};

function handleKeyboardEvent(keyboardEvent) {
  isPressed.ctrlKey = keyboardEvent.ctrlKey;
  isPressed.altKey = keyboardEvent.altKey;
  isPressed.shiftKey = keyboardEvent.shiftKey;
}

window.addEventListener('keydown', handleKeyboardEvent);
window.addEventListener('keyup', handleKeyboardEvent);

function isHorizontallyScrollable(element) {
  return (
    element.scrollWidth > element.clientWidth &&
    ['scroll', 'auto'].includes(window.getComputedStyle(element).overflowX)
  );
}

function isVerticallyScrollable(element) {
  return (
    element.scrollHeight > element.clientHeight &&
    ['scroll', 'auto'].includes(window.getComputedStyle(element).overflowY)
  );
}

function getElementsToScroll(wheelEvent) {
  return {
    elementToScrollHorizontally: isHorizontallyScrollable(wheelEvent.target)
      ? wheelEvent.target
      : window,
    elementToScrollVertically: isVerticallyScrollable(wheelEvent.target)
      ? wheelEvent.target
      : window,
  };
}

function handleWheelEvent(wheelEvent) {
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
