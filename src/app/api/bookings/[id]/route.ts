import { NextRequest, NextResponse } from 'next/server';

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
