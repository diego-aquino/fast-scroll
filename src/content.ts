import config from '~/config';
import { horizontalScroll, verticalScroll } from '~/utils/scroll';

function applyScrollSpeedMultiplier(
  wheelEvent: WheelEvent,
  scrollSpeedMultiplier: number,
) {
  wheelEvent.preventDefault();

  const scrollDelta = wheelEvent.deltaY;
  const multipliedScrollDelta = scrollDelta * scrollSpeedMultiplier;

  const eventTarget = wheelEvent.target as Element | null;

  if (!eventTarget) return;

  if (wheelEvent.shiftKey) {
    const elementToScroll = horizontalScroll.isScrollable(eventTarget)
      ? eventTarget
      : horizontalScroll.findFirstScrollableParent(eventTarget);

    horizontalScroll.scrollBy(elementToScroll, multipliedScrollDelta);
  } else {
    const elementToScroll = verticalScroll.isScrollable(eventTarget)
      ? eventTarget
      : verticalScroll.findFirstScrollableParent(eventTarget);

    verticalScroll.scrollBy(elementToScroll, multipliedScrollDelta);
  }
}

function handleWheelEvent(wheelEvent: WheelEvent) {
  if (wheelEvent.altKey && !wheelEvent.ctrlKey) {
    applyScrollSpeedMultiplier(wheelEvent, config.scrollSpeedMultiplier);
  }
}

window.addEventListener('wheel', handleWheelEvent, { passive: false });
