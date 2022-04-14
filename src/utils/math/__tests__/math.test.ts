import { round } from '~/utils/math/math';

describe('Math utilities', () => {
  describe('Rounding', () => {
    it('should round numbers to the provided decimal precision', () => {
      expect(round(1)).toBe(1);
      expect(round(3.578)).toBe(4);

      expect(round(12.501, 1)).toBe(12.5);
      expect(round(12.449, 1)).toBe(12.4);

      expect(round(12.5018, 2)).toBe(12.5);
      expect(round(12.4991, 2)).toBe(12.5);
    });
  });
});
