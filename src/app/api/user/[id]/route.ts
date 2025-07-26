import { NextRequest, NextResponse } from 'next/server';

// Mock user data
const mockUsers = [
  {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    role: 'user',
  },
  {
    id: '2',
    email: 'organizer@example.com',
    name: 'Jane Smith',
    role: 'organizer',
  },
];

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
