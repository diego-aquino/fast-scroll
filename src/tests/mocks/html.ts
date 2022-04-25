import { HTMLTagName } from '~/types/html';

export function createElementMock(tag: HTMLTagName, container: HTMLElement = document.body): HTMLElement {
  jest.spyOn(window.HTMLElement.prototype, 'scrollBy');

  const element = document.createElement(tag);
  container.appendChild(element);

  return element;
}
