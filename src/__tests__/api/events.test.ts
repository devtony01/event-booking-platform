import { NextRequest } from 'next/server'
import { GET, POST } from '@/app/api/events/route'

// Mock the events data store
jest.mock('@lib/data/events', () => ({
  getAllEvents: jest.fn(() => [
    {
      _id: '1',
      title: 'Test Event 1',
      description: 'Test Description 1',
      category: 'Technology',
      city: 'San Francisco',
      date: new Date('2025-12-25'),
      availableSeats: 100,
      bookedSeats: 30,
      price: 50,
      organizer: 'test-organizer',
      imageUrl: 'test1.jpg',
      reviews: [],
      createdAt: new Date(),
    },
    {
      _id: '2',
      title: 'Test Event 2',
      description: 'Test Description 2',
      category: 'Music',
      city: 'New York',
      date: new Date('2025-12-26'),
      availableSeats: 200,
      bookedSeats: 50,
      price: 75,
      organizer: 'test-organizer-2',
      imageUrl: 'test2.jpg',
      reviews: [],
      createdAt: new Date(),
    },
  ]),
  getEventsByCategory: jest.fn((category) => [
    {
      _id: '1',
      title: 'Test Event 1',
      category,
      city: 'San Francisco',
      date: new Date('2025-12-25'),
      availableSeats: 100,
      bookedSeats: 30,
      price: 50,
    },
  ]),
  getEventsByCity: jest.fn((city) => [
    {
      _id: '1',
      title: 'Test Event 1',
      category: 'Technology',
      city,
      date: new Date('2025-12-25'),
      availableSeats: 100,
      bookedSeats: 30,
      price: 50,
    },
  ]),
  searchEvents: jest.fn((query) => [
    {
      _id: '1',
      title: `Test Event containing ${query}`,
      category: 'Technology',
      city: 'San Francisco',
      date: new Date('2025-12-25'),
      availableSeats: 100,
      bookedSeats: 30,
      price: 50,
    },
  ]),
  addEvent: jest.fn((eventData) => ({
    _id: 'new-event-id',
    ...eventData,
    createdAt: new Date(),
  })),
}))

describe('/api/events', () => {
  describe('GET', () => {
    it('should return all events when no filters are provided', async () => {
      const request = new NextRequest('http://localhost:3001/api/events')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(2)
      expect(data.data[0].title).toBe('Test Event 1')
    })

    it('should filter events by category', async () => {
      const request = new NextRequest('http://localhost:3001/api/events?category=Technology')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(1)
      expect(data.data[0].category).toBe('Technology')
    })

    it('should filter events by city', async () => {
      const request = new NextRequest('http://localhost:3001/api/events?city=San Francisco')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(1)
      expect(data.data[0].city).toBe('San Francisco')
    })

    it('should search events by query', async () => {
      const request = new NextRequest('http://localhost:3001/api/events?search=test')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toHaveLength(1)
      expect(data.data[0].title).toContain('test')
    })

    it('should handle pagination parameters', async () => {
      const request = new NextRequest('http://localhost:3001/api/events?page=1&limit=1')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.pagination).toBeDefined()
      expect(data.pagination.page).toBe(1)
      expect(data.pagination.limit).toBe(1)
    })
  })

  describe('POST', () => {
    it('should create a new event with valid data', async () => {
      const eventData = {
        title: 'New Test Event',
        description: 'New Test Description',
        category: 'Technology',
        address: '123 Test St',
        city: 'Test City',
        date: '2025-12-25T10:00:00Z',
        availableSeats: 100,
        price: 50,
        organizer: 'test-organizer',
        imageUrl: 'test.jpg',
      }

      const request = new NextRequest('http://localhost:3001/api/events', {
        method: 'POST',
        body: JSON.stringify(eventData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data.title).toBe(eventData.title)
      expect(data.data._id).toBe('new-event-id')
      expect(data.message).toBe('Event created successfully')
    })

    it('should return 400 for missing required fields', async () => {
      const incompleteData = {
        title: 'Incomplete Event',
        // Missing required fields
      }

      const request = new NextRequest('http://localhost:3001/api/events', {
        method: 'POST',
        body: JSON.stringify(incompleteData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('is required')
    })

    it('should validate availableSeats is a positive number', async () => {
      const invalidData = {
        title: 'Test Event',
        description: 'Test Description',
        category: 'Technology',
        city: 'Test City',
        date: '2025-12-25T10:00:00Z',
        availableSeats: -10, // Invalid
      }

      const request = new NextRequest('http://localhost:3001/api/events', {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Available seats must be a positive number')
    })

    it('should validate price is not negative', async () => {
      const invalidData = {
        title: 'Test Event',
        description: 'Test Description',
        category: 'Technology',
        city: 'Test City',
        date: '2025-12-25T10:00:00Z',
        availableSeats: 100,
        price: -50, // Invalid
      }

      const request = new NextRequest('http://localhost:3001/api/events', {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('Price cannot be negative')
    })
  })
})