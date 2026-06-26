/** Shared form validation helpers — keep all field rules in one place. */

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const MIN_PASSWORD_LENGTH = 8;

export const isValidEmail = (value: string): boolean => EMAIL_REGEX.test(value.trim());
