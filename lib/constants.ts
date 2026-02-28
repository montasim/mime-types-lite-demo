/**
 * Application-wide constants.
 *
 * This file contains all constant values used throughout the application.
 * Defining constants here provides:
 * - Type safety through TypeScript
 * - Single source of truth
 * - Autocomplete support
 * - Protection against typos
 */

// Import HTTP status codes from http-status-lite package
import httpStatusLite from 'http-status-lite';

/**
 * HTTP status codes from http-status-lite.
 * Provides standard HTTP status codes with type safety.
 *
 * @example
 * ```ts
 * import { HttpStatus } from '@/lib/constants';
 *
 * return Response.json(data, { status: HttpStatus.OK });
 * ```
 */
export const HttpStatus = httpStatusLite;

/**
 * HTTP status code key names.
 */
export type HttpStatusKey = keyof typeof HttpStatus;

/**
 * Environment constants.
 * These represent the valid Node.js environment values.
 */
export const ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;

/**
 * Type representing valid environment values.
 */
export type Environment = (typeof ENV)[keyof typeof ENV];

/**
 * Pagination defaults.
 */
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
} as const;

/**
 * Date format constants.
 */
export const DATE_FORMAT = {
  ISO: 'YYYY-MM-DD',
  DISPLAY: 'MMM DD, YYYY',
  DISPLAY_WITH_TIME: 'MMM DD, YYYY HH:mm',
} as const;

/**
 * Currency codes.
 */
export const CURRENCY = {
  USD: 'USD',
  EUR: 'EUR',
  GBP: 'GBP',
  JPY: 'JPY',
  INR: 'INR',
} as const;

/**
 * Locale constants.
 */
export const LOCALE = {
  EN_US: 'en-US',
  EN_GB: 'en-GB',
  DE_DE: 'de-DE',
  FR_FR: 'fr-FR',
  ES_ES: 'es-ES',
  JA_JP: 'ja-JP',
  HI_IN: 'hi-IN',
} as const;

/**
 * Regular expression patterns.
 */
export const REGEX = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  URL: /^https?:\/\/[\w\-.]+(:\d+)?(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i,
  PHONE: /^\+?[\d\s\-()]+$/,
  SLUG: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
} as const;

/**
 * Storage keys for localStorage/sessionStorage.
 */
export const STORAGE_KEY = {
  AUTH_TOKEN: 'auth_token',
  USER_PREFERENCES: 'user_preferences',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
} as const;

/**
 * Event names for analytics and tracking.
 */
export const EVENT = {
  PAGE_VIEW: 'page_view',
  USER_LOGIN: 'user_login',
  USER_LOGOUT: 'user_logout',
  USER_SIGN_UP: 'user_sign_up',
  SEARCH: 'search',
  BUTTON_CLICK: 'button_click',
} as const;

/**
 * Error codes.
 */
export const ERROR_CODE = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT',
} as const;

/**
 * API endpoints (base URLs).
 */
export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || '/api',
  VERSION: 'v1',
} as const;

/**
 * Time constants in milliseconds.
 */
export const TIME = {
  SECOND: 1000,
  MINUTE: 60 * 1000,
  HOUR: 60 * 60 * 1000,
  DAY: 24 * 60 * 60 * 1000,
  WEEK: 7 * 24 * 60 * 60 * 1000,
  MONTH: 30 * 24 * 60 * 60 * 1000,
  YEAR: 365 * 24 * 60 * 60 * 1000,
} as const;

/**
 * Debounce default times.
 */
export const DEBOUNCE = {
  SEARCH: 300,
  INPUT: 500,
  BUTTON_CLICK: 300,
} as const;

/**
 * Theme constants.
 */
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

/**
 * Type representing valid theme values.
 */
export type Theme = (typeof THEME)[keyof typeof THEME];
