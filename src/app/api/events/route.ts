import { NextRequest, NextResponse } from 'next/server';
import { Event } from '@lib/types/database';

// Mock events data for demonstration
const mockEvents: Event[] = [
{
    _id: '1',
    title: 'Tech Conference 2024',
    description: 'Annual technology conference featuring the latest trends in AI, blockchain, and web development.',
    category: 'Tech',
    address: '123 Tech St, Springfield',
    city: 'Springfield',
    date: new Date('2024-03-15T09:00:00Z'),
    availableSeats: 500,
    bookedSeats: 120,
    price: 299,
    organizer: '66e85b511ce4af78a3681bfa',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    reviews: [],
    createdAt: new Date('2024-01-01T00:00:00Z')
  },
  {
    _id: '2',
    title: 'Summer Music Fest',
    description: 'A magical evening filled with a curated set of performances, food, and drinks.',
    category: 'Music',
    address: 'Central Park, Metropolis',
    city: 'Metropolis',
    date: new Date('2024-06-20T18:00:00Z'),
    availableSeats: 1500,
    bookedSeats: 300,
    price: 75,
    organizer: '66e85b511ce4af78a3681bfa',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800',
    reviews: [],
    createdAt: new Date('2024-02-15T00:00:00Z')
  },
  {
    _id: '3',
    title: 'Art Expo 2024',
    description: 'A collection of breathtaking artworks from local artists.',
    category: 'Art',
    address: 'Gallery Ave, Gotham',
    city: 'Gotham',
    date: new Date('2024-02-28T19:00:00Z'),
    availableSeats: 200,
    bookedSeats: 75,
    price: 40,
    organizer: '66e85b511ce4af78a3681bfa',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800',
    reviews: [],
    createdAt: new Date('2024-03-01T00:00:00Z')
  },
  {
    _id: '4',
    title: 'Food Carnival',
    description: 'Savor diverse flavors and exquisite cuisines.',
    category: 'Food',
    address: 'Culinary Blvd, Star City',
    city: 'Star City',
    date: new Date('2024-05-10T16:00:00Z'),
    availableSeats: 500,
    bookedSeats: 180,
    price: 20,
    organizer: '66e85b511ce4af78a3681bfa',
    imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
    reviews: [],
    createdAt: new Date('2024-02-20T00:00:00Z')
  },
  {
    _id: '5',
    title: 'City Marathon 2024',
    description: 'Run alongside athletes and enthusiasts in this city-wide marathon event.',
    category: 'Sports',
    address: 'City Center, Central City',
    city: 'Central City',
    date: new Date('2024-04-15T06:00:00Z'),
    availableSeats: 500,
    bookedSeats: 200,
    price: 25,
    organizer: '66e85b511ce4af78a3681bfa',
    imageUrl: 'https://images.unsplash.com/photo-1544657616-f4420c6c4e90?w=800',
    reviews: [],
    createdAt: new Date('2024-01-20T00:00:00Z')
  },
  {
    _id: '6',
    title: 'Business Conference',
    description: 'Network with industry leaders and learn about the latest business trends.',
    category: 'Conference',
    address: 'Convention Center, Capital City',
    city: 'Capital City',
    date: new Date('2024-07-20T09:00:00Z'),
    availableSeats: 300,
    bookedSeats: 45,
    price: 150,
    organizer: '66e85b511ce4af78a3681bfa',
    imageUrl: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800',
    reviews: [],
    createdAt: new Date('2024-03-10T00:00:00Z')
  },
  {
    _id: '7',
    title: 'Stand-up Comedy Night',
    description: 'Laugh out loud with the best comedians in town.',
    category: 'Entertainment',
    address: 'Comedy Club, Downtown',
    city: 'Downtown',
    date: new Date('2024-08-15T20:00:00Z'),
    availableSeats: 150,
    bookedSeats: 90,
    price: 35,
    organizer: '66e85b511ce4af78a3681bfa',
    imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800',
    reviews: [],
    createdAt: new Date('2024-04-05T00:00:00Z')
  },
  {
    _id: '8',
    title: 'Photography Workshop',
    description: 'Learn professional photography techniques from experienced photographers.',
    category: 'Workshop',
    address: 'Studio Space, Creative District',
    city: 'Creative District',
    date: new Date('2024-09-05T10:00:00Z'),
    availableSeats: 25,
    bookedSeats: 12,
    price: 80,
    organizer: '66e85b511ce4af78a3681bfa',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e732331d?w=800',
    reviews: [],
    createdAt: new Date('2024-05-01T00:00:00Z')
  },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    let filteredEvents = [...mockEvents];

    // Apply filters
    if (category && category !== 'all') {
      filteredEvents = filteredEvents.filter(
        event => event.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (city) {
      filteredEvents = filteredEvents.filter(
        event => event.city.toLowerCase().includes(city.toLowerCase())
      );
    }

    if (search) {
      filteredEvents = filteredEvents.filter(
        event =>
          event.title.toLowerCase().includes(search.toLowerCase()) ||
          event.description.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort by date (upcoming first)
    filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedEvents = filteredEvents.slice(startIndex, endIndex);

    return NextResponse.json({
      success: true,
      data: paginatedEvents,
      pagination: {
        page,
        limit,
        total: filteredEvents.length,
        totalPages: Math.ceil(filteredEvents.length / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const eventData = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'address', 'city', 'date', 'availableSeats', 'imageUrl'];
    for (const field of requiredFields) {
      if (!eventData[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create new event (in a real app, this would save to database)
    const newEvent: Event = {
      _id: Date.now().toString(),
      ...eventData,
      date: new Date(eventData.date),
      bookedSeats: 0,
      price: eventData.price || 0,
      organizer: 'current-user-id', // In real app, get from session
      reviews: [],
      createdAt: new Date(),
    };

    // Add to mock data (in memory only for demo)
    mockEvents.push(newEvent);

    return NextResponse.json({
      success: true,
      data: newEvent,
      message: 'Event created successfully',
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
