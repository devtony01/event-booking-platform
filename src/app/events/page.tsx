import { Metadata } from 'next';
import EventsTemplate from '@modules/events/templates/events-template';
import { Event } from '@modules/events/types';

export const metadata: Metadata = {
  title: 'Browse Events | Event Booking Platform',
  description: 'Discover and book tickets for amazing events in your area. Browse concerts, conferences, workshops, and more.',
};

// Static generation - fetch events at build time
async function getEvents(): Promise<Event[]> {
  try {
    // In production, this would be an actual API call
    // For now, we'll return the same mock data as the API
    const mockEvents: Event[] = [
      {
        _id: '1',
        title: 'Tech Conference 2024',
        description: 'Annual technology conference featuring the latest trends in AI, blockchain, and web development.',
        category: 'Technology',
        address: '123 Tech Street',
        city: 'San Francisco',
        date: new Date('2024-03-15T09:00:00Z'),
        availableSeats: 500,
        bookedSeats: 120,
        price: 299,
        organizer: 'org-1',
        imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
        reviews: [],
        createdAt: new Date('2024-01-01T00:00:00Z'),
      },
      {
        _id: '2',
        title: 'Summer Music Festival',
        description: 'Three days of amazing music with top artists from around the world.',
        category: 'Music',
        address: 'Central Park',
        city: 'New York',
        date: new Date('2024-06-20T18:00:00Z'),
        availableSeats: 10000,
        bookedSeats: 3500,
        price: 150,
        organizer: 'org-2',
        imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
        reviews: [],
        createdAt: new Date('2024-01-15T00:00:00Z'),
      },
      {
        _id: '3',
        title: 'Art Gallery Opening',
        description: 'Exclusive opening of contemporary art exhibition featuring local artists.',
        category: 'Art',
        address: '456 Gallery Ave',
        city: 'Los Angeles',
        date: new Date('2024-02-28T19:00:00Z'),
        availableSeats: 100,
        bookedSeats: 45,
        price: 0,
        organizer: 'org-3',
        imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
        reviews: [],
        createdAt: new Date('2024-01-20T00:00:00Z'),
      },
      {
        _id: '4',
        title: 'Food & Wine Festival',
        description: 'Taste the finest cuisine and wines from renowned chefs and vineyards.',
        category: 'Food',
        address: '789 Culinary Blvd',
        city: 'Chicago',
        date: new Date('2024-05-10T16:00:00Z'),
        availableSeats: 300,
        bookedSeats: 85,
        price: 75,
        organizer: 'org-4',
        imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
        reviews: [],
        createdAt: new Date('2024-02-01T00:00:00Z'),
      },
      {
        _id: '5',
        title: 'Marathon Championship',
        description: 'Annual city marathon with prizes for top finishers in multiple categories.',
        category: 'Sports',
        address: 'City Center',
        city: 'Boston',
        date: new Date('2024-04-15T06:00:00Z'),
        availableSeats: 2000,
        bookedSeats: 1200,
        price: 50,
        organizer: 'org-5',
        imageUrl: 'https://images.unsplash.com/photo-1544657616-f4420c6c4e90?w=800',
        reviews: [],
        createdAt: new Date('2024-02-10T00:00:00Z'),
      },
    ];

    return mockEvents;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    return [];
  }
}

export default async function EventsPage() {
  const initialEvents = await getEvents();

  return <EventsTemplate initialEvents={initialEvents} />;
}

export const revalidate = 3600; // Revalidate every hour
