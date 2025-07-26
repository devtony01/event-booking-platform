import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Date formatting utilities
export function formatDate(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function formatTime(date: Date | string): string {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// Currency formatting
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

// Event status utilities
export function getEventStatus(event: { date: Date; availableSeats: number; bookedSeats: number }) {
  const now = new Date();
  const eventDate = new Date(event.date);
  
  if (eventDate < now) {
    return 'past';
  }
  
  if (event.bookedSeats >= event.availableSeats) {
    return 'sold-out';
  }
  
  // If event is within 24 hours
  const timeDiff = eventDate.getTime() - now.getTime();
  const hoursDiff = timeDiff / (1000 * 3600);
  
  if (hoursDiff <= 24) {
    return 'starting-soon';
  }
  
  return 'upcoming';
}

export function getAvailableSeats(event: { availableSeats: number; bookedSeats: number }): number {
  return Math.max(0, event.availableSeats - event.bookedSeats);
}

// String utilities
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

// Validation utilities
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function isValidPassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

// Export for global use
if (typeof window !== 'undefined') {
  (window as any).isValidPassword = isValidPassword;
}

// Error handling
export function getErrorMessage(error: unknown): string {
  if (error instanceof Error) return error.message;
  return String(error);
}

// Local storage utilities
export function setLocalStorage(key: string, value: any): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window !== 'undefined') {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

export function removeLocalStorage(key: string): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
}
