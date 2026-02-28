import { ENV } from '@/lib/constants';

/**
 * Environment variable validation and access.
 *
 * This file provides type-safe access to environment variables and validates
 * their presence at runtime. All environment variables should be defined here
 * to ensure type safety and early error detection.
 */

/**
 * Validates that a required environment variable is present.
 * Throws an error if the variable is missing or empty.
 *
 * @param key - The environment variable key
 * @param value - The environment variable value
 * @returns The validated value
 * @throws Error if the value is missing or empty
 */
function _getRequiredEnv(key: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

/**
 * Gets an optional environment variable with a default value.
 *
 * @param value - The environment variable value
 * @param defaultValue - The default value if the env var is missing
 * @returns The value or default value
 */
function getOptionalEnv(value: string | undefined, defaultValue: string): string {
  return value?.trim() || defaultValue;
}

/**
 * Validates that the environment value is one of the allowed values.
 *
 * @param value - The environment value to validate
 * @returns The validated environment value
 * @throws Error if the value is not a valid environment
 */
function validateEnv(value: string): (typeof ENV)[keyof typeof ENV] {
  const validEnvs = Object.values(ENV);
  if (!validEnvs.includes(value as (typeof ENV)[keyof typeof ENV])) {
    throw new Error(`Invalid NODE_ENV: "${value}". Must be one of: ${validEnvs.join(', ')}`);
  }
  return value as (typeof ENV)[keyof typeof ENV];
}

/**
 * Server-side environment variables.
 * These are only available on the server and must not be exposed to the client.
 */
export const serverEnv = {
  // Add server-side environment variables here
  // Example:
  // DATABASE_URL: _getRequiredEnv("DATABASE_URL", process.env.DATABASE_URL),
  // API_SECRET: _getRequiredEnv("API_SECRET", process.env.API_SECRET),
} as const;

/**
 * Public environment variables.
 * These are exposed to the client and can be used in browser code.
 */
export const publicEnv = {
  appUrl: getOptionalEnv(process.env.NEXT_PUBLIC_APP_URL, 'http://localhost:3000'),
  appName: getOptionalEnv(process.env.NEXT_PUBLIC_APP_NAME, 'Next.js App'),
  // Add more public environment variables here
  // Example:
  // NEXT_PUBLIC_ANALYTICS_ID: getOptionalEnv(
  //   process.env.NEXT_PUBLIC_ANALYTICS_ID,
  //   ""
  // ),
} as const;

/**
 * Type-safe environment variable access for both server and client.
 */
export const env = {
  ...serverEnv,
  ...publicEnv,
} as const;

/**
 * Runtime environment (development, production, test).
 * Validates that the environment is one of the allowed values.
 */
export const nodeEnv = validateEnv(getOptionalEnv(process.env.NODE_ENV, ENV.DEVELOPMENT));

/**
 * Check if the application is running in development mode.
 */
export const isDevelopment = nodeEnv === ENV.DEVELOPMENT;

/**
 * Check if the application is running in production mode.
 */
export const isProduction = nodeEnv === ENV.PRODUCTION;

/**
 * Check if the application is running in test mode.
 */
export const isTest = nodeEnv === ENV.TEST;
