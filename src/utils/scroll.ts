abstract class AbstractScrollAxis {
  abstract scrollBy(element: Element, delta: number): void;
  abstract isScrollable(element: Element): boolean;

  findFirstScrollableElement(element: Element): Element {
    if (
      element === document.body &&
      document.scrollingElement &&
      this.isScrollable(document.scrollingElement)
    ) {
      return document.scrollingElement;
    }

    if (this.isScrollable(element) || !element.parentElement) {
      return element;
    }

    return this.findFirstScrollableElement(element.parentElement);
  }
}

class HorizontalScrollAxis extends AbstractScrollAxis {
  scrollBy(element: Element, deltaX: number): void {
    element.scrollBy(deltaX, 0);
  }

  isScrollable(element: Element): boolean {
    const hasHorizontalScrollEnabled = ['scroll', 'auto'].includes(
      window.getComputedStyle(element).overflowX,
    );
    const hasHorizontalContentOverflow =
      element.scrollWidth > element.clientWidth;

    return hasHorizontalScrollEnabled && hasHorizontalContentOverflow;
  }
}

class VerticalScrollAxis extends AbstractScrollAxis {
  scrollBy(element: Element, deltaY: number): void {
    element.scrollBy(0, deltaY);
  }

  isScrollable(element: Element): boolean {
    const hasVerticalScrollEnabled = ['scroll', 'auto'].includes(
      window.getComputedStyle(element).overflowY,
    );
    const hasVerticalContentOverflow =
      element.scrollHeight > element.clientHeight;

    return hasVerticalScrollEnabled && hasVerticalContentOverflow;
  }
}

export const scrollAxis = {
  horizontal: new HorizontalScrollAxis(),
  vertical: new VerticalScrollAxis(),
};
