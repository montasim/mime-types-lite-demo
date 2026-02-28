import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { CURRENCY, LOCALE } from './constants';

/**
 * Utility function to merge Tailwind CSS classes with proper precedence.
 * This combines clsx for conditional class names and tailwind-merge to
 * handle Tailwind's class conflicts.
 *
 * @param inputs - Class names to merge
 * @returns Merged class string
 *
 * @example
 * ```tsx
 * cn("px-2 py-1", isActive && "bg-blue-500", "hover:bg-blue-600")
 * // Returns: "px-2 py-1 bg-blue-500 hover:bg-blue-600" (if isActive is true)
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a date to a localized string.
 *
 * @param date - Date to format
 * @param locale - Locale for formatting (default: en-US)
 * @returns Formatted date string
 *
 * @example
 * ```ts
 * formatDate(new Date(), LOCALE.EN_US) // "2/27/2026"
 * formatDate(new Date(), LOCALE.DE_DE) // "27.2.2026"
 * ```
 */
export function formatDate(date: Date, locale: string = LOCALE.EN_US): string {
  return new Intl.DateTimeFormat(locale).format(date);
}

/**
 * Format a number as currency.
 *
 * @param amount - Amount to format
 * @param currency - Currency code (default: USD)
 * @param locale - Locale for formatting (default: en-US)
 * @returns Formatted currency string
 *
 * @example
 * ```ts
 * formatCurrency(1234.56) // "$1,234.56"
 * formatCurrency(1234.56, CURRENCY.EUR, LOCALE.DE_DE) // "1.234,56 €"
 * ```
 */
export function formatCurrency(
  amount: number,
  currency: string = CURRENCY.USD,
  locale: string = LOCALE.EN_US
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Format a number with thousand separators.
 *
 * @param num - Number to format
 * @param locale - Locale for formatting (default: en-US)
 * @returns Formatted number string
 *
 * @example
 * ```ts
 * formatNumber(1234567.89) // "1,234,567.89"
 * formatNumber(1234567.89, LOCALE.DE_DE) // "1.234.567,89"
 * ```
 */
export function formatNumber(num: number, locale: string = LOCALE.EN_US): string {
  return new Intl.NumberFormat(locale).format(num);
}

/**
 * Truncate text to a specified length with ellipsis.
 *
 * @param text - Text to truncate
 * @param maxLength - Maximum length before truncation
 * @returns Truncated text
 *
 * @example
 * ```ts
 * truncate("Hello world", 5) // "Hello..."
 * truncate("Hello", 10) // "Hello"
 * ```
 */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

/**
 * Debounce a function call.
 *
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 * @returns Debounced function
 *
 * @example
 * ```ts
 * const debouncedSearch = debounce((query: string) => {
 *   console.log("Searching for:", query);
 * }, 300);
 * ```
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null;
      func(...args);
    };

    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
