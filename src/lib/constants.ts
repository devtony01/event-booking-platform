// View constants for authentication
export const LOGIN_VIEW = 'login';
export const REGISTER_VIEW = 'register';
export const FORGOT_PASSWORD_VIEW = 'forgot-password';

// Event status constants
export const EVENT_STATUS = {
  DRAFT: 'draft',
  PUBLISHED: 'published',
  CANCELLED: 'cancelled',
  COMPLETED: 'completed',
} as const;

// User roles
export const USER_ROLES = {
  USER: 'user',
  ORGANIZER: 'organizer',
  ADMIN: 'admin',
} as const;

// Booking status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded',
} as const;

// Payment status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
} as const;