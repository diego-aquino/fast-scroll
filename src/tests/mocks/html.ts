import { HTMLTagName } from '~/types/html';

export function createElementMock(tag: HTMLTagName, container: HTMLElement = document.body): HTMLElement {
  const scrollByMock = jest.fn();
  window.HTMLElement.prototype.scrollBy = scrollByMock;

  const element = document.createElement(tag);
  container.appendChild(element);

  return element;
}
