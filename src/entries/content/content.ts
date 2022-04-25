import config from '~/config/config';
import {
  enableSmoothScroll,
  disableSmoothScroll,
  hasSmoothScrollEnabled,
  scrollAxis,
  ScrollAxis,
  isWindow,
  isHTMLElement,
} from '~/utils/scroll/scroll';

main();

export async function main() {
  await config.loadFromStorage();
  attachWheelListener();
}

function attachWheelListener() {
  window.addEventListener('wheel', handleWheelEvent, { passive: false });
}

function handleWheelEvent(wheelEvent: WheelEvent) {
  if (wheelEvent.defaultPrevented) return;
  if (!wheelEvent.altKey || wheelEvent.ctrlKey) return;

  wheelEvent.preventDefault();

  applyScrollSpeedMultiplier(wheelEvent.deltaX, scrollAxis.horizontal, wheelEvent);
  applyScrollSpeedMultiplier(wheelEvent.deltaY, scrollAxis.vertical, wheelEvent);
}

function applyScrollSpeedMultiplier(scrollDelta: number, baseScrollAxis: ScrollAxis, wheelEvent: WheelEvent) {
  const targetElement = wheelEvent.target as Element | null;
  if (!targetElement) return;

  const selectedScrollAxis = wheelEvent.shiftKey ? baseScrollAxis.perpendicularAxis() : baseScrollAxis;

  const elementToScroll = selectedScrollAxis.findFirstScrollableElement(targetElement);
  const elementHasSmoothScroll = !isWindow(elementToScroll) && hasSmoothScrollEnabled(elementToScroll);

  const rootElement = document.querySelector(':root') as HTMLElement;
  const rootElementHasSmoothScroll = hasSmoothScrollEnabled(rootElement);

  if (elementHasSmoothScroll && isHTMLElement(elementToScroll)) {
    disableSmoothScroll(elementToScroll);
  }
  if (rootElementHasSmoothScroll) {
    disableSmoothScroll(rootElement);
  }

  const multipliedScrollDelta = scrollDelta * config.scrollSpeedMultiplier();
  selectedScrollAxis.scrollBy(elementToScroll, multipliedScrollDelta);

  if (elementHasSmoothScroll && isHTMLElement(elementToScroll)) {
    enableSmoothScroll(elementToScroll);
  }
  if (rootElementHasSmoothScroll) {
    enableSmoothScroll(rootElement);
  }
}
