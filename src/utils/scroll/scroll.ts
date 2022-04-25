const SCROLLING_OVERFLOW_VALUES = ['scroll', 'auto'];

export abstract class ScrollAxis {
  abstract scrollBy(element: Window | Element, delta: number): void;

  abstract isScrollable(element: Element): boolean;

  abstract perpendicularAxis(): ScrollAxis;

  findFirstScrollableElement(element: Element): Window | Element {
    if (element === document.body && document.scrollingElement && this.isScrollable(document.scrollingElement)) {
      return document.scrollingElement as HTMLElement;
    }

    if (this.isScrollable(element)) {
      return element;
    }

    if (!element.parentElement) {
      return window;
    }

    return this.findFirstScrollableElement(element.parentElement);
  }
}

class HorizontalScrollAxis extends ScrollAxis {
  override scrollBy(element: Window | Element, deltaX: number): void {
    element.scrollBy(deltaX, 0);
  }

  override isScrollable(element: Element): boolean {
    const computedOverflowX = window.getComputedStyle(element).overflowX;

    const rootElement = document.querySelector(':root');
    const bodyElement = document.body;

    if (computedOverflowX === 'visible' && (element === rootElement || element === bodyElement)) {
      return true;
    }

    const hasHorizontalScrollEnabled = SCROLLING_OVERFLOW_VALUES.includes(computedOverflowX);
    const hasHorizontalContentOverflow = element.scrollWidth > element.clientWidth;

    return hasHorizontalScrollEnabled && hasHorizontalContentOverflow;
  }

  override perpendicularAxis(): ScrollAxis {
    return new VerticalScrollAxis();
  }
}

class VerticalScrollAxis extends ScrollAxis {
  override scrollBy(element: Window | Element, deltaY: number): void {
    element.scrollBy(0, deltaY);
  }

  override isScrollable(element: Element): boolean {
    const computedOverflowY = window.getComputedStyle(element).overflowY;

    const rootElement = document.querySelector(':root');
    const bodyElement = document.body;

    if (computedOverflowY === 'visible' && (element === rootElement || element === bodyElement)) {
      return true;
    }

    const hasVerticalScrollEnabled = SCROLLING_OVERFLOW_VALUES.includes(computedOverflowY);
    const hasVerticalContentOverflow = element.scrollHeight > element.clientHeight;

    return hasVerticalScrollEnabled && hasVerticalContentOverflow;
  }

  override perpendicularAxis(): ScrollAxis {
    return new HorizontalScrollAxis();
  }
}

export const scrollAxis = {
  horizontal: new HorizontalScrollAxis(),
  vertical: new VerticalScrollAxis(),
};

export function isWindow<GenericElement>(element: GenericElement | Window): element is Window {
  return element === window;
}

export function isHTMLElement(element: Element | HTMLElement): element is HTMLElement {
  return Object.hasOwn(element, 'style');
}

export function hasSmoothScrollEnabled(element: Element): boolean {
  return window.getComputedStyle(element).scrollBehavior === 'smooth';
}

export function enableSmoothScroll(element: HTMLElement): void {
  element.style.setProperty('scroll-behavior', 'smooth', 'important');
}

export function disableSmoothScroll(element: HTMLElement): void {
  element.style.setProperty('scroll-behavior', 'auto', 'important');
}
