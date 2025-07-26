import { NextRequest, NextResponse } from 'next/server';
import { Event } from '@lib/types/database';

// Generate future dates for events
const now = new Date();
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
const twoMonths = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
const threeMonths = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
const fourMonths = new Date(now.getTime() + 120 * 24 * 60 * 60 * 1000);

// Mock events data - in real app this would come from database
const mockEvents: Event[] = [
  {
    _id: '1',
    title: 'Tech Conference 2025',
    description: 'Annual technology conference featuring the latest trends in AI, blockchain, and web development. Join industry leaders, developers, and innovators for three days of cutting-edge presentations, workshops, and networking opportunities.',
    category: 'Technology',
    address: '123 Tech Street, Convention Center',
    city: 'San Francisco',
    date: nextMonth,
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
    date: threeMonths,
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
    date: nextWeek,
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
    date: twoMonths,
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
    date: fourMonths,
    availableSeats: 2000,
    bookedSeats: 1200,
    price: 50,
    organizer: 'org-5',
    imageUrl: 'https://images.unsplash.com/photo-1544657616-f4420c6c4e90?w=800',
    reviews: [],
    createdAt: new Date('2024-02-10T00:00:00Z'),
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    const { id } = resolvedParams;
    
    // Find event by ID
    const event = mockEvents.find(e => e._id === id);
    
    if (!event) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error('Error fetching event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch event' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    const { id } = resolvedParams;
    const updates = await request.json();
    
    // Find event index
    const eventIndex = mockEvents.findIndex(e => e._id === id);
    
    if (eventIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Update event
    mockEvents[eventIndex] = {
      ...mockEvents[eventIndex],
      ...updates,
      date: updates.date ? new Date(updates.date) : mockEvents[eventIndex].date,
    };
    
    return NextResponse.json({
      success: true,
      data: mockEvents[eventIndex],
      message: 'Event updated successfully',
    });
  } catch (error) {
    console.error('Error updating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update event' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    const { id } = resolvedParams;
    
    // Find event index
    const eventIndex = mockEvents.findIndex(e => e._id === id);
    
    if (eventIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Event not found' },
        { status: 404 }
      );
    }
    
    // Remove event
    mockEvents.splice(eventIndex, 1);
    
    return NextResponse.json({
      success: true,
      message: 'Event deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete event' },
      { status: 500 }
    );
  }
}
