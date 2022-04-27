export function selectAllInputValue(inputElement: HTMLInputElement): void {
  inputElement.setSelectionRange(0, inputElement.value.length);
}

export function isSameOriginIframe(iframe: HTMLIFrameElement, pageURLAsString: string): boolean {
  if (iframe.src.trim() === '') return false;

  const pageURL = new URL(pageURLAsString);
  const iframeSourceURL = new URL(iframe.src);

  const isFromSameOriginAsPage =
    pageURL.protocol === iframeSourceURL.protocol &&
    pageURL.hostname === iframeSourceURL.hostname &&
    pageURL.port === iframeSourceURL.port;

  return isFromSameOriginAsPage;
}
