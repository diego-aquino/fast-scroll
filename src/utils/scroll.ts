export function isHorizontallyScrollable(element: Element): boolean {
  const hasHorizontalScrollEnabled = ['scroll', 'auto'].includes(
    window.getComputedStyle(element).overflowX,
  );
  const hasHorizontalContentOverflow =
    element.scrollWidth > element.clientWidth;

  return hasHorizontalScrollEnabled && hasHorizontalContentOverflow;
}

export function isVerticallyScrollable(element: Element): boolean {
  const hasVerticalScrollEnabled = ['scroll', 'auto'].includes(
    window.getComputedStyle(element).overflowY,
  );
  const hasVerticalContentOverflow =
    element.scrollHeight > element.clientHeight;

  return hasVerticalScrollEnabled && hasVerticalContentOverflow;
}
