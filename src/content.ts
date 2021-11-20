import config from '~/config';
import {
  enableSmoothScroll,
  disableSmoothScroll,
  hasSmoothScrollEnabled,
  scrollAxis,
} from '~/utils/scroll';

attachWheelListener();

function attachWheelListener() {
  window.addEventListener('wheel', handleWheelEvent, { passive: false });
}

function handleWheelEvent(wheelEvent: WheelEvent) {
  if (wheelEvent.defaultPrevented) return;
  if (!wheelEvent.altKey || wheelEvent.ctrlKey) return;

  applyScrollSpeedMultiplier(wheelEvent, config.scrollSpeedMultiplier);
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

  const elementToScroll = selectedScrollAxis.findFirstScrollableElement(
    eventTarget,
  ) as HTMLElement;
  const elementHasSmoothScroll = hasSmoothScrollEnabled(elementToScroll);

  const rootElement = document.querySelector(':root') as HTMLElement;
  const rootElementHasSmoothScroll = hasSmoothScrollEnabled(rootElement);

  if (elementHasSmoothScroll) {
    disableSmoothScroll(elementToScroll);
  }
  if (rootElementHasSmoothScroll) {
    disableSmoothScroll(rootElement);
  }

  selectedScrollAxis.scrollBy(elementToScroll, multipliedScrollDelta);

  if (elementHasSmoothScroll) {
    enableSmoothScroll(elementToScroll);
  }
  if (rootElementHasSmoothScroll) {
    enableSmoothScroll(rootElement);
  }
}
