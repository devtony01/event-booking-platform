// Database types for the event booking platform

export interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'user' | 'organizer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Event {
  _id: string;
  id?: string;
  title: string;
  description: string;
  category: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  venue?: string;
  address: string;
  city: string;
  state?: string;
  zipCode?: string;
  price: number;
  availableSeats: number;
  bookedSeats: number;
  imageUrl?: string;
  organizerId?: string;
  organizer?: User | string;
  status?: 'draft' | 'published' | 'cancelled' | 'completed';
  tags?: string[];
  reviews?: any[];
  createdAt: Date;
  updatedAt?: Date;
}

export interface Booking {
  _id: string;
  id: string;
  eventId: string;
  event?: Event;
  userId: string;
  user?: User;
  numberOfTickets: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
  paymentId?: string;
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  bookingDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface EventFilters {
  category?: string;
  city?: string;
  dateRange?: {
    start: Date;
    end: Date;
  };
  priceRange?: {
    min: number;
    max: number;
  };
  search?: string;
  tags?: string[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form types
export interface CreateEventData {
  title: string;
  description: string;
  category: string;
  date: Date;
  startTime: string;
  endTime: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  price: number;
  availableSeats: number;
  imageUrl?: string;
  tags: string[];
}

export interface UpdateEventData extends Partial<CreateEventData> {
  id: string;
}

export interface CreateBookingData {
  eventId: string;
  numberOfTickets: number;
  totalAmount: number;
}

export interface BookingFormData {
  numberOfTickets: number;
  totalAmount: number;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  specialRequests?: string;
}

export interface RegisterUserData {
  name: string;
  email: string;
  password: string;
  role?: 'user' | 'organizer';
}

export interface LoginUserData {
  email: string;
  password: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  role?: 'user' | 'organizer';
}

// Search and filter types
export interface EventSearchParams {
  q?: string;
  category?: string;
  city?: string;
  minPrice?: number;
  maxPrice?: number;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
  sortBy?: 'date' | 'price' | 'title' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface EventStats {
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;
  upcomingEvents: number;
  completedEvents: number;
  cancelledEvents: number;
}

export interface UserStats {
  totalUsers: number;
  totalOrganizers: number;
  newUsersThisMonth: number;
  activeUsers: number;
}

export interface BookingStats {
  totalBookings: number;
  totalRevenue: number;
  averageTicketsPerBooking: number;
  bookingsThisMonth: number;
  revenueThisMonth: number;
}