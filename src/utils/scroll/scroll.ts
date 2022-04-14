const SCROLLING_OVERFLOW_VALUES = ['scroll', 'auto'];

export abstract class ScrollAxis {
  abstract scrollBy(element: Element, delta: number): void;

  abstract isScrollable(element: Element): boolean;

  abstract perpendicularAxis(): ScrollAxis;

  findFirstScrollableElement(element: Element): Element {
    if (element === document.body && document.scrollingElement && this.isScrollable(document.scrollingElement)) {
      return document.scrollingElement;
    }

    if (this.isScrollable(element) || !element.parentElement) {
      return element;
    }

    return this.findFirstScrollableElement(element.parentElement);
  }
}

class HorizontalScrollAxis extends ScrollAxis {
  scrollBy(element: Element, deltaX: number): void {
    element.scrollBy(deltaX, 0);
  }

  isScrollable(element: Element): boolean {
    const rootElement = document.querySelector(':root');
    const computedOverflowX = window.getComputedStyle(element).overflowX;

    if (element === rootElement && computedOverflowX === 'visible') {
      return true;
    }

    const hasHorizontalScrollEnabled = SCROLLING_OVERFLOW_VALUES.includes(computedOverflowX);
    const hasHorizontalContentOverflow = element.scrollWidth > element.clientWidth;

    return hasHorizontalScrollEnabled && hasHorizontalContentOverflow;
  }

  perpendicularAxis(): ScrollAxis {
    return new VerticalScrollAxis();
  }
}

class VerticalScrollAxis extends ScrollAxis {
  scrollBy(element: Element, deltaY: number): void {
    element.scrollBy(0, deltaY);
  }

  isScrollable(element: Element): boolean {
    const rootElement = document.querySelector(':root');
    const computedOverflowY = window.getComputedStyle(element).overflowY;

    if (element === rootElement && computedOverflowY === 'visible') {
      return true;
    }

    const hasVerticalScrollEnabled = SCROLLING_OVERFLOW_VALUES.includes(computedOverflowY);
    const hasVerticalContentOverflow = element.scrollHeight > element.clientHeight;

    return hasVerticalScrollEnabled && hasVerticalContentOverflow;
  }

  perpendicularAxis(): ScrollAxis {
    return new HorizontalScrollAxis();
  }
}

export const scrollAxis = {
  horizontal: new HorizontalScrollAxis(),
  vertical: new VerticalScrollAxis(),
};

export function hasSmoothScrollEnabled(element: Element): boolean {
  return window.getComputedStyle(element).scrollBehavior === 'smooth';
}

export function enableSmoothScroll(element: HTMLElement): void {
  element.style.scrollBehavior = 'smooth';
}

export function disableSmoothScroll(element: HTMLElement): void {
  element.style.scrollBehavior = 'auto';
}
