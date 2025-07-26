import { NextRequest, NextResponse } from 'next/server';
import { Event } from '@lib/types/database';
import { getAllEvents, getEventsByCategory, getEventsByCity, searchEvents, addEvent } from '@lib/data/events';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Get events from central data store
    let filteredEvents = getAllEvents();

    // Apply filters
    if (category) {
      filteredEvents = getEventsByCategory(category);
    }

    if (city) {
      filteredEvents = getEventsByCity(city);
    }

    if (search) {
      filteredEvents = searchEvents(search);
    }

    // Apply multiple filters if needed
    if ((category || city) && search) {
      let baseEvents = getAllEvents();
      if (category) baseEvents = getEventsByCategory(category);
      if (city) baseEvents = getEventsByCity(city);
      
      const searchTerm = search.toLowerCase();
      filteredEvents = baseEvents.filter(event => 
        event.title.toLowerCase().includes(searchTerm) ||
        event.description.toLowerCase().includes(searchTerm)
      );
    }

    if (category && city && !search) {
      filteredEvents = getAllEvents().filter(event => 
        event.category.toLowerCase() === category.toLowerCase() &&
        event.city.toLowerCase() === city.toLowerCase()
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
    const { title, description, category, address, city, date, availableSeats, price, organizer, imageUrl } = eventData;
    
    // Validate required fields
    const requiredFields = ['title', 'description', 'category', 'city', 'date', 'availableSeats'];
    for (const field of requiredFields) {
      if (!eventData[field]) {
        return NextResponse.json(
          { success: false, error: `${field} is required` },
          { status: 400 }
        );
      }
    }
    // Create new event (in a real app, this would save to database)
    // Create new event using central data store
    const newEvent = addEvent({
      title,
      description,
      category,
      address,
      city,
      date: new Date(date),
      availableSeats,
      bookedSeats: 0,
      price,
      organizer,
      imageUrl: imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      reviews: [],
    });

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
