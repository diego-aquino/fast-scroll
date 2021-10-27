function findFirstScrollableElement(
  this: { isScrollable: (elementToCheck: Element) => boolean },
  element: Element,
): Element {
  if (element === document.body && document.scrollingElement) {
    if (this.isScrollable(document.scrollingElement)) {
      return document.scrollingElement;
    }
  }

  if (this.isScrollable(element) || !element.parentElement) {
    return element;
  }

  return findFirstScrollableElement.call(this, element.parentElement);
}

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

  findFirstScrollableElement,
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

  findFirstScrollableElement,
};
