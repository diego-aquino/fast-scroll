export function round(value: number, fractionDigits = 0): number {
  return Number(value.toFixed(fractionDigits));
}
