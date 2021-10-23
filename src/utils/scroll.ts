export const horizontalScroll = {
  scrollBy(element: Element, deltaX: number): void {
    element.scrollBy(deltaX, 0);
  },

  isScrollable(element: Element): boolean {
    const hasHorizontalScrollEnabled = ['scroll', 'auto'].includes(
      window.getComputedStyle(element).overflowX,
    );
    const hasHorizontalContentOverflow =
      element.scrollWidth > element.clientWidth;

    return hasHorizontalScrollEnabled && hasHorizontalContentOverflow;
  },

  findFirstScrollableParent(element: Element): Element {
    if (!element.parentElement) {
      return element;
    }
    if (horizontalScroll.isScrollable(element.parentElement)) {
      return element.parentElement;
    }
    return horizontalScroll.findFirstScrollableParent(element.parentElement);
  },
};

export const verticalScroll = {
  scrollBy(element: Element, deltaY: number): void {
    element.scrollBy(0, deltaY);
  },

  isScrollable(element: Element): boolean {
    const hasVerticalScrollEnabled = ['scroll', 'auto'].includes(
      window.getComputedStyle(element).overflowY,
    );
    const hasVerticalContentOverflow =
      element.scrollHeight > element.clientHeight;

    return hasVerticalScrollEnabled && hasVerticalContentOverflow;
  },

  findFirstScrollableParent(element: Element): Element {
    if (!element.parentElement) {
      return element;
    }
    if (verticalScroll.isScrollable(element.parentElement)) {
      return element.parentElement;
    }
    return verticalScroll.findFirstScrollableParent(element.parentElement);
  },
};
