export function selectAllInputValue(inputElement: HTMLInputElement): void {
  inputElement.setSelectionRange(0, inputElement.value.length);
}
