'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Event, EventFilters } from '@modules/events/types';
import EventsList from '../components/events-list';
import EventFiltersComponent from '../components/event-filters';
import { Text } from '@design/ui/src/components/text';

interface EventsTemplateProps {
  initialEvents: Event[];
}

export default function EventsTemplate({ initialEvents }: EventsTemplateProps) {
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<EventFilters>({});
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: initialEvents.length,
    totalPages: Math.ceil(initialEvents.length / 10),
    hasNext: false,
    hasPrev: false,
  });

  // Extract unique categories and cities from events
  const categories = Array.from(new Set(initialEvents.map(event => event.category)));
  const cities = Array.from(new Set(initialEvents.map(event => event.city)));

  const fetchEvents = async (newFilters: EventFilters = filters, page: number = 1) => {
    setLoading(true);
    setError(null);

    try {
      const searchParams = new URLSearchParams();
      
      if (newFilters.category) searchParams.set('category', newFilters.category);
      if (newFilters.city) searchParams.set('city', newFilters.city);
      if (newFilters.search) searchParams.set('search', newFilters.search);
      searchParams.set('page', page.toString());
      searchParams.set('limit', pagination.limit.toString());

      const response = await fetch(`/api/events?${searchParams.toString()}`);
      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
        setPagination(data.pagination);
      } else {
        setError(data.error || 'Failed to fetch events');
      }
    } catch (err) {
      setError('Failed to fetch events');
      console.error('Error fetching events:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltersChange = (newFilters: EventFilters) => {
    setFilters(newFilters);
    fetchEvents(newFilters, 1);
  };

  const handlePageChange = (page: number) => {
    fetchEvents(filters, page);
  };

  const handleEventClick = (eventId: string) => {
    // Navigate to event details page using Next.js router
    router.push(`/events/${eventId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          {/* Back Button */}
          <div className="mb-4">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
          
          <Text size="xlarge" weight="plus" className="text-gray-900 mb-2">
            Discover Amazing Events
          </Text>
          <Text className="text-gray-600">
            Find and book tickets for concerts, conferences, workshops, and more.
          </Text>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <EventFiltersComponent
                filters={filters}
                onFiltersChange={handleFiltersChange}
                categories={categories}
                cities={cities}
                loading={loading}
              />
            </div>
          </div>

          {/* Events List */}
          <div className="lg:col-span-3">
            <EventsList
              events={events}
              loading={loading}
              error={error}
              pagination={pagination}
              onPageChange={handlePageChange}
              onEventClick={handleEventClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}