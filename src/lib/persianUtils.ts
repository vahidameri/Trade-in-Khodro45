/**
 * Utility functions for Persian number formatting and localization
 */

/**
 * Convert English digits to Persian digits
 */
export function toPersianDigits(input: string | number): string {
  const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
  return String(input).replace(/[0-9]/g, (digit) => persianDigits[parseInt(digit)]);
}

/**
 * Format number with Persian digits and thousand separators
 */
export function formatPersianNumber(value: number): string {
  return toPersianDigits(value.toLocaleString('en-US'));
}

/**
 * Format price with Persian digits and thousand separators
 */
export function formatPersianPrice(price: number): string {
  return formatPersianNumber(price);
}

/**
 * Format mileage with Persian digits and thousand separators
 */
export function formatPersianMileage(mileage: number): string {
  return formatPersianNumber(mileage);
}