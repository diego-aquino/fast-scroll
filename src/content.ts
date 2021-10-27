import config from '~/config';
import { scrollAxis } from '~/utils/scroll';

attachWheelListener();

function attachWheelListener() {
  window.addEventListener('wheel', handleWheelEvent, { passive: false });
}

function handleWheelEvent(wheelEvent: WheelEvent) {
  if (wheelEvent.altKey && !wheelEvent.ctrlKey) {
    applyScrollSpeedMultiplier(wheelEvent, config.scrollSpeedMultiplier);
  }
}

function applyScrollSpeedMultiplier(
  wheelEvent: WheelEvent,
  scrollSpeedMultiplier: number,
) {
  wheelEvent.preventDefault();

  const scrollDelta = wheelEvent.deltaY;
  const multipliedScrollDelta = scrollDelta * scrollSpeedMultiplier;

  const eventTarget = wheelEvent.target as Element | null;

  if (!eventTarget) return;

  const selectedScrollAxis = wheelEvent.shiftKey
    ? scrollAxis.horizontal
    : scrollAxis.vertical;

  const elementToScroll =
    selectedScrollAxis.findFirstScrollableElement(eventTarget);
  selectedScrollAxis.scrollBy(elementToScroll, multipliedScrollDelta);
}
