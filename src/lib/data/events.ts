import { Event } from '@lib/types/database';

// Generate consistent future dates for events
const now = new Date();
const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
const nextMonth = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
const twoMonths = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000);
const threeMonths = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000);
const fourMonths = new Date(now.getTime() + 120 * 24 * 60 * 60 * 1000);
const fiveMonths = new Date(now.getTime() + 150 * 24 * 60 * 60 * 1000);
const sixMonths = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
const sevenMonths = new Date(now.getTime() + 210 * 24 * 60 * 60 * 1000);

// Central data store for all events
export const mockEvents: Event[] = [
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
    description: 'Three days of amazing music with top artists from around the world. Experience live performances from Grammy-winning artists, discover new talent, and enjoy food trucks and craft vendors.',
    category: 'Music',
    address: 'Central Park, Main Stage Area',
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
    description: 'Exclusive opening of contemporary art exhibition featuring local artists. Enjoy wine, networking, and discover amazing artwork from emerging and established artists.',
    category: 'Art',
    address: '456 Gallery Ave, Downtown Arts District',
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
    description: 'Taste the finest cuisine and wines from renowned chefs and vineyards. Sample dishes from 50+ restaurants and taste wines from award-winning wineries.',
    category: 'Food',
    address: '789 Culinary Blvd, Waterfront Park',
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
    description: 'Annual city marathon with prizes for top finishers in multiple categories. Join thousands of runners in this scenic route through the city.',
    category: 'Sports',
    address: 'City Center, Starting Line Plaza',
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
  {
    _id: '6',
    title: 'Business Conference',
    description: 'Network with industry leaders and learn about the latest business trends. Featuring keynote speakers, panel discussions, and networking sessions.',
    category: 'Business',
    address: 'Convention Center, Grand Ballroom',
    city: 'Seattle',
    date: fiveMonths,
    availableSeats: 300,
    bookedSeats: 45,
    price: 150,
    organizer: 'org-6',
    imageUrl: 'https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800',
    reviews: [],
    createdAt: new Date('2024-03-10T00:00:00Z'),
  },
  {
    _id: '7',
    title: 'Stand-up Comedy Night',
    description: 'Laugh out loud with the best comedians in town. Featuring headliner acts and local comedy talent in an intimate venue setting.',
    category: 'Entertainment',
    address: 'Comedy Club, Main Theater',
    city: 'Austin',
    date: sixMonths,
    availableSeats: 150,
    bookedSeats: 90,
    price: 35,
    organizer: 'org-7',
    imageUrl: 'https://images.unsplash.com/photo-1541532713592-79a0317b6b77?w=800',
    reviews: [],
    createdAt: new Date('2024-04-05T00:00:00Z'),
  },
  {
    _id: '8',
    title: 'Photography Workshop',
    description: 'Learn professional photography techniques from experienced photographers. Hands-on workshop covering composition, lighting, and post-processing.',
    category: 'Workshop',
    address: 'Studio Space, Creative District',
    city: 'Portland',
    date: sevenMonths,
    availableSeats: 25,
    bookedSeats: 12,
    price: 80,
    organizer: 'org-8',
    imageUrl: 'https://images.unsplash.com/photo-1542038784456-1ea8e732331d?w=800',
    reviews: [],
    createdAt: new Date('2024-05-01T00:00:00Z'),
  },
];

// Helper functions for event data
export const getEventById = (id: string): Event | undefined => {
  return mockEvents.find(event => event._id === id);
};

export const getAllEvents = (): Event[] => {
  return mockEvents;
};

export const getEventsByCategory = (category: string): Event[] => {
  return mockEvents.filter(event => 
    event.category.toLowerCase() === category.toLowerCase()
  );
};

export const getEventsByCity = (city: string): Event[] => {
  return mockEvents.filter(event => 
    event.city.toLowerCase() === city.toLowerCase()
  );
};

export const searchEvents = (query: string): Event[] => {
  const searchTerm = query.toLowerCase();
  return mockEvents.filter(event => 
    event.title.toLowerCase().includes(searchTerm) ||
    event.description.toLowerCase().includes(searchTerm) ||
    event.category.toLowerCase().includes(searchTerm) ||
    event.city.toLowerCase().includes(searchTerm)
  );
};

export const getAvailableCategories = (): string[] => {
  return Array.from(new Set(mockEvents.map(event => event.category)));
};

export const getAvailableCities = (): string[] => {
  return Array.from(new Set(mockEvents.map(event => event.city)));
};

export const updateEvent = (id: string, updates: Partial<Event>): Event | null => {
  const eventIndex = mockEvents.findIndex(event => event._id === id);
  if (eventIndex === -1) {
    return null;
  }

  mockEvents[eventIndex] = {
    ...mockEvents[eventIndex],
    ...updates,
    date: updates.date ? new Date(updates.date) : mockEvents[eventIndex].date,
  };

  return mockEvents[eventIndex];
};

export const deleteEvent = (id: string): boolean => {
  const eventIndex = mockEvents.findIndex(event => event._id === id);
  if (eventIndex === -1) {
    return false;
  }

  mockEvents.splice(eventIndex, 1);
  return true;
};

export const addEvent = (eventData: Omit<Event, '_id' | 'createdAt'>): Event => {
  const newEvent: Event = {
    ...eventData,
    _id: Date.now().toString(),
    createdAt: new Date(),
  };

  mockEvents.push(newEvent);
  return newEvent;
};