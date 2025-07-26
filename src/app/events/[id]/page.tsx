import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Calendar, MapPin, Users, DollarSign, Clock, Tag } from 'lucide-react';
import { Event } from '@modules/events/types';
import { getEventById, getAllEvents } from '@lib/data/events';
import { formatDate, formatTime, formatCurrency, getAvailableSeats, getEventStatus } from '@lib/utils';
import { Button } from '@design/ui/src/components/button';
import { Text } from '@design/ui/src/components/text';
import BookingForm from '@modules/events/components/booking-form';

interface EventPageProps {
  params: Promise<{ id: string }>;
}

// Get event by ID
async function getEvent(id: string): Promise<Event | null> {
  return getEventById(id) || null;
}

// Generate static params for SSG
export async function generateStaticParams() {
  const events = getAllEvents();
  return events.map((event) => ({
    id: event._id,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: EventPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const event = await getEvent(resolvedParams.id);
  
  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: `${event.title} | Event Booking Platform`,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.imageUrl!],
    },
  };
}

export default async function EventPage({ params }: EventPageProps) {
  const resolvedParams = await params;
  const event = await getEvent(resolvedParams.id);

  if (!event) {
    notFound();
  }

  const availableSeats = getAvailableSeats(event);
  const status = getEventStatus(event);
  const isBookingDisabled = status === 'sold-out' || status === 'past';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={event.imageUrl!}
                alt={event.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {event.category}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                {status === 'sold-out' && (
                  <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                    Sold Out
                  </span>
                )}
                {status === 'starting-soon' && (
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
                    Starting Soon
                  </span>
                )}
                {status === 'past' && (
                  <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    Past Event
                  </span>
                )}
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Text className="text-gray-900 mb-4">
                {event.title}
              </Text>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-5 h-5 mr-3" />
                  <div>
                    <Text>
                      {formatDate(event.date)}
                    </Text>
                    <Text className="text-gray-500">
                      {formatTime(event.date)}
                    </Text>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-3" />
                  <div>
                    <Text>
                      {event.city}
                    </Text>
                    <Text className="text-gray-500">
                      {event.address}
                    </Text>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <Users className="w-5 h-5 mr-3" />
                  <div>
                    <Text>
                      {availableSeats} seats available
                    </Text>
                    <Text className="text-gray-500">
                      of {event.availableSeats} total
                    </Text>
                  </div>
                </div>

                <div className="flex items-center text-gray-600">
                  <DollarSign className="w-5 h-5 mr-3" />
                  <div>
                    <Text>
                      {event.price === 0 ? 'Free' : formatCurrency(event.price)}
                    </Text>
                    <Text className="text-gray-500">
                      per ticket
                    </Text>
                  </div>
                </div>
              </div>

              <div className="prose prose-gray max-w-none">
                <Text className="text-gray-700 leading-relaxed">
                  {event.description}
                </Text>
              </div>
            </div>

            {/* Additional Event Information */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <Text className="text-gray-900 mb-4">
                Event Information
              </Text>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Clock className="w-5 h-5 mr-3 mt-0.5 text-gray-400" />
                  <div>
                    <Text className="text-gray-900">
                      Duration
                    </Text>
                    <Text className="text-gray-600">
                      Event duration and schedule details will be provided closer to the event date.
                    </Text>
                  </div>
                </div>

                <div className="flex items-start">
                  <Tag className="w-5 h-5 mr-3 mt-0.5 text-gray-400" />
                  <div>
                    <Text className="text-gray-900">
                      What's Included
                    </Text>
                    <Text className="text-gray-600">
                      Entry to the event, access to all activities, and complimentary materials where applicable.
                    </Text>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <BookingForm 
                event={event}
                disabled={isBookingDisabled}
                status={status}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const revalidate = 3600; // Revalidate every hour
