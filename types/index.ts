/**
 * Common type definitions used throughout the application.
 *
 * This file contains reusable types that can be imported and used
 * across the codebase for consistency and type safety.
 */

/**
 * Standard API response wrapper for successful operations.
 *
 * @template T - The type of data returned in the response
 */
export interface ApiResponse<T> {
  success: true;
  data: T;
  message?: string;
}

/**
 * Standard API error response.
 */
export interface ApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Union type for all API responses (success or error).
 *
 * @template T - The type of data returned in successful responses
 */
export type ApiResult<T> = ApiResponse<T> | ApiError;

/**
 * Generic pagination parameters.
 */
export interface PaginationParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Generic paginated response.
 *
 * @template T - The type of items in the data array
 */
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
}

/**
 * User entity.
 */
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Session entity.
 */
export interface Session {
  user: User;
  token: string;
  expiresAt: Date;
}

/**
 * Common metadata for entities.
 */
export interface EntityMetadata {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

/**
 * Sort order direction.
 */
export type SortOrder = 'asc' | 'desc';

/**
 * Date range filter.
 */
export interface DateRange {
  from: Date;
  to: Date;
}

/**
 * Generic select option for form inputs.
 *
 * @template T - The type of value
 */
export interface SelectOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

/**
 * Form field error.
 */
export interface FieldError {
  field: string;
  message: string;
}

/**
 * Form validation result.
 */
export interface FormValidationResult {
  isValid: boolean;
  errors: FieldError[];
}

/**
 * Loading state for async operations.
 */
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

/**
 * Async operation state with data and error.
 *
 * @template T - The type of data on success
 * @template E - The type of error
 */
export interface AsyncState<T = unknown, E = Error> {
  status: LoadingState;
  data?: T;
  error?: E;
}

/**
 * Creates a loading async state.
 */
export function createLoadingState<T>(): AsyncState<T> {
  return { status: 'loading' };
}

/**
 * Creates a success async state with data.
 */
export function createSuccessState<T>(data: T): AsyncState<T> {
  return { status: 'success', data };
}

/**
 * Creates an error async state with error.
 */
export function createErrorState<T, E = Error>(error: E): AsyncState<T, E> {
  return { status: 'error', error };
}
