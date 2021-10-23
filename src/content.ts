import config from '~/config';
import {
  isHorizontallyScrollable,
  isVerticallyScrollable,
} from '~/utils/scroll';

function getElementToScrollHorizontally(element: Element): Element {
  if (isHorizontallyScrollable(element)) {
    return element;
  }
  if (element.parentElement) {
    return getElementToScrollHorizontally(element.parentElement);
  }
  return element;
}

function getElementToScrollVertically(element: Element): Element {
  if (isVerticallyScrollable(element)) {
    return element;
  }
  if (element.parentElement) {
    return getElementToScrollVertically(element.parentElement);
  }
  return element;
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
    elementToScrollHorizontally: getElementToScrollHorizontally(eventTarget),
    elementToScrollVertically: getElementToScrollVertically(eventTarget),
  };
}

function scrollElementHorizontally(element: Window | Element, deltaX: number) {
  element.scrollBy(deltaX, 0);
}

function scrollElementVertically(element: Window | Element, deltaY: number) {
  element.scrollBy(0, deltaY);
}

function handleWheelEvent(wheelEvent: WheelEvent) {
  if (!wheelEvent.altKey || wheelEvent.ctrlKey) return;

  wheelEvent.preventDefault();

  const { elementToScrollHorizontally, elementToScrollVertically } =
    getElementsToScroll(wheelEvent);

  const { deltaY: delta } = wheelEvent;

  if (wheelEvent.shiftKey) {
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
