// Re-export types from the database types
export type {
  Event,
  EventFilters,
  PaginatedResponse,
  CreateEventData,
  UpdateEventData,
  EventSearchParams,
  EventStats,
  BookingFormData
} from '@lib/types/database';

// Import for local use
import type { Event, EventFilters } from '@lib/types/database';

// Additional event-specific types
export interface EventCardProps {
  event: Event;
  onBookingClick?: (eventId: string) => void;
  onClick?: () => void;
  className?: string;
}

export interface EventsListProps {
  events: Event[];
  loading?: boolean;
  error?: string | null;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
  onPageChange?: (page: number) => void;
  onEventClick?: (eventId: string) => void;
  className?: string;
}

export interface EventFiltersProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
  categories: string[];
  cities: string[];
  loading?: boolean;
  className?: string;
}

export interface BookingFormProps {
  event: Event;
  loading?: boolean;
  error?: string | null;
  disabled?: boolean;
  status?: string;
  className?: string;
}

export interface EventDetailsProps {
  event: Event;
  loading?: boolean;
  error?: string | null;
  onBookingClick?: () => void;
}

// Event status types
export type EventStatus = 'upcoming' | 'starting-soon' | 'sold-out' | 'past';

// Event category types
export type EventCategory = 
  | 'conference'
  | 'workshop'
  | 'seminar'
  | 'networking'
  | 'concert'
  | 'festival'
  | 'sports'
  | 'exhibition'
  | 'theater'
  | 'comedy'
  | 'other';

// Event sort options
export type EventSortOption = 
  | 'date-asc'
  | 'date-desc'
  | 'price-asc'
  | 'price-desc'
  | 'title-asc'
  | 'title-desc'
  | 'popularity';

export interface EventSortProps {
  sortBy: EventSortOption;
  onSortChange: (sortBy: EventSortOption) => void;
}

// Event creation form types
export interface EventFormData {
  title: string;
  description: string;
  category: EventCategory;
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

export interface EventFormProps {
  initialData?: Partial<EventFormData>;
  onSubmit: (data: EventFormData) => void;
  loading?: boolean;
  error?: string | null;
  mode: 'create' | 'edit';
}

// Event management types
export interface EventManagementProps {
  events: Event[];
  loading?: boolean;
  error?: string | null;
  onEventEdit: (eventId: string) => void;
  onEventDelete: (eventId: string) => void;
  onEventStatusChange: (eventId: string, status: Event['status']) => void;
}

// Event analytics types
export interface EventAnalytics {
  eventId: string;
  views: number;
  bookings: number;
  revenue: number;
  conversionRate: number;
  popularityScore: number;
  demographics: {
    ageGroups: Record<string, number>;
    locations: Record<string, number>;
    referralSources: Record<string, number>;
  };
}

export interface EventAnalyticsProps {
  analytics: EventAnalytics;
  loading?: boolean;
  error?: string | null;
  dateRange: {
    start: Date;
    end: Date;
  };
  onDateRangeChange: (range: { start: Date; end: Date }) => void;
}