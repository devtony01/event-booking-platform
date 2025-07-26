import { NextRequest, NextResponse } from 'next/server';
import { isValidEmail, isValidPassword } from '@lib/utils';

// Mock users storage (in a real app, this would be a database)
const mockUsers: Array<{
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
}> = [
  {
    id: '1',
    username: 'John Doe',
    email: 'user@example.com',
    password: 'password123',
    role: 'user',
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'Jane Smith',
    email: 'organizer@example.com',
    password: 'password123',
    role: 'organizer',
    createdAt: new Date().toISOString(),
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, email, password } = body;

    // Validate required fields
    if (!username || !email || !password) {
      return NextResponse.json(
        { success: false, message: 'All fields are required' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (!isValidPassword(password)) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Password must be at least 8 characters with uppercase, lowercase, and number' 
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
    if (existingUser) {
      return NextResponse.json(
        { success: false, message: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Create new user (in a real app, hash the password first)
    const newUser = {
      id: (mockUsers.length + 1).toString(),
      username: username.trim(),
      email: email.toLowerCase().trim(),
      password, // In production, use bcrypt.hash(password, 12)
      role: 'user',
      createdAt: new Date().toISOString(),
    };

    // Add to mock storage
    mockUsers.push(newUser);

    // Return success response (excluding password)
    const { password: _, ...userWithoutPassword } = newUser;
    
    return NextResponse.json({
      success: true,
      message: 'Account created successfully',
      data: userWithoutPassword,
    });

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
}
