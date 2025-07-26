import { NextRequest, NextResponse } from 'next/server';
import { Event } from '@lib/types/database';

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

    // Create new event (mock)
    const newEvent: Event = {
      _id: Date.now().toString(),
      ...eventData,
      date: new Date(eventData.date),
      bookedSeats: 0,
      price: eventData.price || 0,
      organizer: 'current-user-id',
      reviews: [],
      createdAt: new Date(),
    };

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
