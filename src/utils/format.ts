/**
 * Formats a multiplier with the following pattern:
 * @example 12 -> '12x', 6.1 -> '6.1x', 12.0 -> '12x'
 */
export function formatMultiplier(
  multiplier: number,
  fractionDigits = 1,
): string {
  return `${Number(multiplier.toFixed(fractionDigits))}x`;
}
