import { Metadata } from 'next';
import EventsTemplate from '@modules/events/templates/events-template';
import { Event } from '@modules/events/types';
import { getAllEvents } from '@lib/data/events';

export const metadata: Metadata = {
  title: 'Browse Events | Event Booking Platform',
  description: 'Discover and book tickets for amazing events in your area. Browse concerts, conferences, workshops, and more.',
};

// Static generation - fetch events at build time
async function getEvents(): Promise<Event[]> {
  try {
    // Get events from central data store
    return getAllEvents();
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
