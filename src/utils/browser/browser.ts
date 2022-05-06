export function canInjectScript(url: string) {
  return (
    !url.startsWith('chrome') &&
    !url.startsWith('https://chrome.google.com/webstore') &&
    !url.startsWith('data') &&
    !url.startsWith('devtools') &&
    !url.startsWith('view-source')
  );
}
