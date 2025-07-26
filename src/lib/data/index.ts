// Mock data layer for the account system
// In a real app, this would connect to a database

export interface User {
  id: string;
  email: string;
  password?: string;
  name?: string;
  role?: 'user' | 'organizer' | 'admin';
}

// Mock users storage (in-memory for demo)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    password: 'password123',
    name: 'Demo User',
    role: 'user'
  },
  {
    id: '2', 
    email: 'organizer@example.com',
    password: 'password123',
    name: 'Demo Organizer',
    role: 'organizer'
  }
];

let currentUser: User | null = null;

export async function createUser(userData: { email: string; password: string; name?: string }): Promise<User> {
  // Check if user already exists
  const existingUser = mockUsers.find(user => user.email === userData.email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  const newUser: User = {
    id: Date.now().toString(),
    email: userData.email,
    password: userData.password,
    name: userData.name || userData.email.split('@')[0],
    role: 'user'
  };

  mockUsers.push(newUser);
  return newUser;
}

export async function getToken(credentials: { email: string; password: string }): Promise<string> {
  const user = mockUsers.find(
    u => u.email === credentials.email && u.password === credentials.password
  );

  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Set current user
  currentUser = user;
  
  // Return mock token
  return `mock-token-${user.id}`;
}

export async function getUser(): Promise<User> {
  if (!currentUser) {
    throw new Error('No authenticated user');
  }
  
  return currentUser;
}

export async function signOut(): Promise<void> {
  currentUser = null;
}
