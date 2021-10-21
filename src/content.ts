import config from '~/config';
import { watchModifierKeys } from '~/utils/modifierKeys';
import {
  isHorizontallyScrollable,
  isVerticallyScrollable,
} from '~/utils/scroll';

const modifierKeys = watchModifierKeys();

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

function scrollElementHorizontally(element: Window | Element, deltaX: number) {
  element.scrollBy(deltaX, 0);
}

function scrollElementVertically(element: Window | Element, deltaY: number) {
  element.scrollBy(0, deltaY);
}

function handleWheelEvent(wheelEvent: WheelEvent) {
  if (!modifierKeys.alt.isPressed || modifierKeys.ctrl.isPressed) return;

  wheelEvent.preventDefault();

  const { elementToScrollHorizontally, elementToScrollVertically } =
    getElementsToScroll(wheelEvent);

  const { deltaY: delta } = wheelEvent;

  if (modifierKeys.shift.isPressed) {
    scrollElementHorizontally(
      elementToScrollHorizontally,
      delta * config.scrollSpeedMultiplier,
    );
  } else {
    scrollElementVertically(
      elementToScrollVertically,
      delta * config.scrollSpeedMultiplier,
    );
  }
}

window.addEventListener('wheel', handleWheelEvent, { passive: false });
