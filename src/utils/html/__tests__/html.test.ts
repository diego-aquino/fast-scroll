import { isSameOriginIframe, selectAllInputValue } from '~/utils/html/html';

describe('HTML utilities', () => {
  describe('Input value selection', () => {
    it('should select the whole range of the input entries', () => {
      const input = document.createElement('input');
      input.value = 'email@example.com';

      const setSelectionRangeMock = jest.fn();
      input.setSelectionRange = setSelectionRangeMock;

      selectAllInputValue(input);

      expect(setSelectionRangeMock).toHaveBeenCalledWith(0, input.value.length);
    });
  });

  describe('Iframes', () => {
    const pageURL = 'https://example.com/example';

    it('should correctly assess if an iframe is of the same origin as the current page', () => {
      const iframe = document.createElement('iframe');
      iframe.src = 'https://example.com/iframe';

      expect(isSameOriginIframe(iframe, pageURL)).toBe(true);
    });

    it('should correctly assess if an iframe is not of the same origin as the current page', () => {
      const iframeWithDifferentProtocol = document.createElement('iframe');
      iframeWithDifferentProtocol.src = 'http://example.com/iframe';
      expect(isSameOriginIframe(iframeWithDifferentProtocol, pageURL)).toBe(false);

      const iframeWithDifferentHostname = document.createElement('iframe');
      iframeWithDifferentHostname.src = 'https://example-iframe.com/iframe';
      expect(isSameOriginIframe(iframeWithDifferentHostname, pageURL)).toBe(false);

      const iframeWithDifferentPort = document.createElement('iframe');
      iframeWithDifferentPort.src = 'https://example.com:81/iframe';
      expect(isSameOriginIframe(iframeWithDifferentPort, pageURL)).toBe(false);
    });

    it('should assess that an iframe with no meaningful source is not of the same origin as the current page', () => {
      const iframe = document.createElement('iframe');
      iframe.src = '';

      expect(isSameOriginIframe(iframe, pageURL)).toBe(false);
    });
  });
});
