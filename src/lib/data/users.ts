import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'user' | 'organizer' | 'admin';
  createdAt: Date;
  emailVerified?: Date;
  image?: string;
}

// Central user data store
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'user@example.com',
    password: '$2b$12$m8axFJ9dZikfBcTE32LV/.WcBJfEQdrFhp.wvo967vvtDvMbzh38K', // password123
    name: 'John Doe',
    role: 'user',
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: '2',
    email: 'organizer@example.com',
    password: '$2b$12$m8axFJ9dZikfBcTE32LV/.WcBJfEQdrFhp.wvo967vvtDvMbzh38K', // password123
    name: 'Jane Smith',
    role: 'organizer',
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
];

// Helper functions for user data
export const getUserById = (id: string): User | undefined => {
  return mockUsers.find(user => user.id === id);
};

export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const createUser = async (userData: {
  email: string;
  password: string;
  name: string;
  role?: 'user' | 'organizer';
}): Promise<User> => {
  // Check if user already exists
  const existingUser = getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(userData.password, 12);

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    email: userData.email.toLowerCase(),
    password: hashedPassword,
    name: userData.name,
    role: userData.role || 'user',
    createdAt: new Date(),
  };

  // Add to mock storage
  mockUsers.push(newUser);

  return newUser;
};

export const validatePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};

export const getAllUsers = (): User[] => {
  return mockUsers;
};

export const updateUser = (id: string, updates: Partial<User>): User | null => {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return null;
  }

  mockUsers[userIndex] = { ...mockUsers[userIndex], ...updates };
  return mockUsers[userIndex];
};

export const deleteUser = (id: string): boolean => {
  const userIndex = mockUsers.findIndex(user => user.id === id);
  if (userIndex === -1) {
    return false;
  }

  mockUsers.splice(userIndex, 1);
  return true;
};