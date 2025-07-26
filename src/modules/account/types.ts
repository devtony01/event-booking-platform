// Re-export types from database types
export type {
  User,
  RegisterUserData,
  LoginUserData
} from '@lib/types/database';

// Import for local use
import type { User, RegisterUserData, LoginUserData } from '@lib/types/database';

// Account-specific component types
export interface LoginFormProps {
  onSubmit: (data: LoginUserData) => void;
  loading?: boolean;
  error?: string | null;
  onSwitchToRegister?: () => void;
}

export interface RegisterFormProps {
  onSubmit: (data: RegisterUserData) => void;
  loading?: boolean;
  error?: string | null;
  onSwitchToLogin?: () => void;
}

export interface SignupFormProps {
  onSubmit: (data: RegisterUserData) => void;
  loading?: boolean;
  error?: string | null;
  onSwitchToLogin?: () => void;
}

export interface ProfileFormProps {
  user: User;
  onSubmit: (data: Partial<User>) => void;
  loading?: boolean;
  error?: string | null;
}

export interface AccountLayoutProps {
  children: React.ReactNode;
  user?: Omit<User, 'password'> | null;
  loading?: boolean;
}

// Form data types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role?: 'user' | 'organizer';
  agreeToTerms: boolean;
}

export interface ProfileUpdateData {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmNewPassword?: string;
}

export interface PasswordResetData {
  email: string;
}

export interface PasswordResetConfirmData {
  token: string;
  newPassword: string;
  confirmPassword: string;
}

// Account settings types
export interface AccountSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  marketingEmails: boolean;
  eventReminders: boolean;
  bookingConfirmations: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
}

export interface AccountSettingsProps {
  settings: AccountSettings;
  onSettingsUpdate: (settings: Partial<AccountSettings>) => void;
  loading?: boolean;
  error?: string | null;
}

// Account dashboard types
export interface AccountDashboardData {
  user: Omit<User, 'password'>;
  upcomingBookings: number;
  pastBookings: number;
  totalSpent: number;
  favoriteEvents: number;
  recentActivity: ActivityItem[];
}

export interface ActivityItem {
  id: string;
  type: 'booking' | 'cancellation' | 'event_update' | 'payment';
  title: string;
  description: string;
  date: Date;
  metadata?: Record<string, any>;
}

export interface AccountDashboardProps {
  data: AccountDashboardData;
  loading?: boolean;
  error?: string | null;
}

// Authentication state types
export interface AuthState {
  user: Omit<User, 'password'> | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (data: LoginUserData) => Promise<void>;
  register: (data: RegisterUserData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmPasswordReset: (data: PasswordResetConfirmData) => Promise<void>;
  clearError: () => void;
}

// Account navigation types
export interface AccountNavItem {
  id: string;
  label: string;
  href: string;
  icon?: React.ComponentType<any>;
  badge?: string | number;
  requiresAuth?: boolean;
  roles?: Array<'user' | 'organizer' | 'admin'>;
}

export interface AccountNavigationProps {
  items: AccountNavItem[];
  currentPath: string;
  user?: Omit<User, 'password'> | null;
}

// Account verification types
export interface EmailVerificationData {
  token: string;
}

export interface PhoneVerificationData {
  phoneNumber: string;
  verificationCode: string;
}

// Account deletion types
export interface AccountDeletionData {
  password: string;
  reason?: string;
  feedback?: string;
}