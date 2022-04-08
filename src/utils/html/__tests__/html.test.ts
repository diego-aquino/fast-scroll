import { selectAllInputValue } from '~/utils/html/html';

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
});
