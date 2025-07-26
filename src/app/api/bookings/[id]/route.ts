import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';

// Mock booking data
const mockBookings = [
  {
    id: '1',
    userId: 'user1',
    eventId: '1',
    numberOfSeats: 2,
    totalPrice: 598,
    status: 'confirmed',
    paymentStatus: 'paid',
    bookingDate: new Date('2024-01-15'),
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    const booking = mockBookings.find(b => b.id === resolvedParams.id);
    
    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch booking' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const resolvedParams = await params;
  try {
    // Check if user is authenticated
    const session = await getServerSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    const { eventId, numberOfTickets, totalAmount } = await request.json();
    
    // Validate input
    if (!eventId || !numberOfTickets || !totalAmount) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new booking
    const newBooking = {
      id: Date.now().toString(),
      userId: session.user.email || 'anonymous',
      eventId: resolvedParams.id,
      numberOfSeats: numberOfTickets,
      totalPrice: totalAmount,
      status: 'confirmed',
      paymentStatus: 'paid',
      bookingDate: new Date(),
      customerName: session.user.name || 'Guest',
      customerEmail: session.user.email || '',
    };

    // Add to mock storage
    mockBookings.push(newBooking);

    return NextResponse.json({
      success: true,
      data: newBooking,
      message: 'Booking created successfully',
    });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create booking' },
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
    const bookingIndex = mockBookings.findIndex(b => b.id === resolvedParams.id);
    
    if (bookingIndex === -1) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Mark as cancelled instead of deleting
    mockBookings[bookingIndex].status = 'cancelled';

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}
