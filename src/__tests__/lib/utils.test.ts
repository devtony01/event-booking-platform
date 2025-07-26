import { formatDate, formatTime, formatCurrency, getAvailableSeats, getEventStatus } from '@lib/utils'
import { Event } from '@lib/types/database'

describe('Utility Functions', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2025-12-25T10:30:00Z')
      const formatted = formatDate(date)
      
      expect(formatted).toBeDefined()
      expect(typeof formatted).toBe('string')
      expect(formatted).toMatch(/Dec|December/)
      expect(formatted).toMatch(/25/)
      expect(formatted).toMatch(/2025/)
    })

    it('should handle different date formats', () => {
      const date1 = new Date('2025-01-01T00:00:00Z')
      const date2 = new Date('2025-06-15T12:00:00Z')
      
      const formatted1 = formatDate(date1)
      const formatted2 = formatDate(date2)
      
      expect(formatted1).toBeDefined()
      expect(formatted2).toBeDefined()
      expect(formatted1).not.toBe(formatted2)
    })
  })

  describe('formatTime', () => {
    it('should format time correctly', () => {
      const date = new Date('2025-12-25T14:30:00Z')
      const formatted = formatTime(date)
      
      expect(formatted).toBeDefined()
      expect(typeof formatted).toBe('string')
      // Should contain time information
      expect(formatted).toMatch(/\d{1,2}:\d{2}/)
    })

    it('should handle different times', () => {
      const morning = new Date('2025-12-25T09:00:00Z')
      const evening = new Date('2025-12-25T21:30:00Z')
      
      const formattedMorning = formatTime(morning)
      const formattedEvening = formatTime(evening)
      
      expect(formattedMorning).toBeDefined()
      expect(formattedEvening).toBeDefined()
      expect(formattedMorning).not.toBe(formattedEvening)
    })
  })

  describe('formatCurrency', () => {
    it('should format currency with dollar sign', () => {
      expect(formatCurrency(100)).toBe('$100.00')
      expect(formatCurrency(99.99)).toBe('$99.99')
      expect(formatCurrency(0)).toBe('$0.00')
    })

    it('should handle large numbers', () => {
      expect(formatCurrency(1000)).toBe('$1,000.00')
      expect(formatCurrency(1234567.89)).toBe('$1,234,567.89')
    })

    it('should handle decimal places correctly', () => {
      expect(formatCurrency(99.9)).toBe('$99.90')
      expect(formatCurrency(99.999)).toBe('$100.00') // Should round
    })
  })

  describe('getAvailableSeats', () => {
    it('should calculate available seats correctly', () => {
      const event: Event = {
        _id: '1',
        title: 'Test Event',
        description: 'Test',
        category: 'Test',
        address: 'Test',
        city: 'Test',
        date: new Date(),
        availableSeats: 100,
        bookedSeats: 30,
        price: 50,
        organizer: 'test',
        imageUrl: 'test.jpg',
        reviews: [],
        createdAt: new Date(),
      }

      const available = getAvailableSeats(event)
      expect(available).toBe(70) // 100 - 30
    })

    it('should handle zero booked seats', () => {
      const event: Event = {
        _id: '1',
        title: 'Test Event',
        description: 'Test',
        category: 'Test',
        address: 'Test',
        city: 'Test',
        date: new Date(),
        availableSeats: 100,
        bookedSeats: 0,
        price: 50,
        organizer: 'test',
        imageUrl: 'test.jpg',
        reviews: [],
        createdAt: new Date(),
      }

      const available = getAvailableSeats(event)
      expect(available).toBe(100)
    })

    it('should handle fully booked event', () => {
      const event: Event = {
        _id: '1',
        title: 'Test Event',
        description: 'Test',
        category: 'Test',
        address: 'Test',
        city: 'Test',
        date: new Date(),
        availableSeats: 100,
        bookedSeats: 100,
        price: 50,
        organizer: 'test',
        imageUrl: 'test.jpg',
        reviews: [],
        createdAt: new Date(),
      }

      const available = getAvailableSeats(event)
      expect(available).toBe(0)
    })
  })

  describe('getEventStatus', () => {
    it('should return "sold-out" when no seats available', () => {
      const event: Event = {
        _id: '1',
        title: 'Test Event',
        description: 'Test',
        category: 'Test',
        address: 'Test',
        city: 'Test',
        date: new Date(Date.now() + 86400000), // Tomorrow
        availableSeats: 100,
        bookedSeats: 100,
        price: 50,
        organizer: 'test',
        imageUrl: 'test.jpg',
        reviews: [],
        createdAt: new Date(),
      }

      const status = getEventStatus(event)
      expect(status).toBe('sold-out')
    })

    it('should return "past" for past events', () => {
      const event: Event = {
        _id: '1',
        title: 'Test Event',
        description: 'Test',
        category: 'Test',
        address: 'Test',
        city: 'Test',
        date: new Date(Date.now() - 86400000), // Yesterday
        availableSeats: 100,
        bookedSeats: 50,
        price: 50,
        organizer: 'test',
        imageUrl: 'test.jpg',
        reviews: [],
        createdAt: new Date(),
      }

      const status = getEventStatus(event)
      expect(status).toBe('past')
    })

    it('should return "starting-soon" for events starting within 24 hours', () => {
      const event: Event = {
        _id: '1',
        title: 'Test Event',
        description: 'Test',
        category: 'Test',
        address: 'Test',
        city: 'Test',
        date: new Date(Date.now() + 3600000), // 1 hour from now
        availableSeats: 100,
        bookedSeats: 50,
        price: 50,
        organizer: 'test',
        imageUrl: 'test.jpg',
        reviews: [],
        createdAt: new Date(),
      }

      const status = getEventStatus(event)
      expect(status).toBe('starting-soon')
    })

    it('should return "available" for future events with seats', () => {
      const event: Event = {
        _id: '1',
        title: 'Test Event',
        description: 'Test',
        category: 'Test',
        address: 'Test',
        city: 'Test',
        date: new Date(Date.now() + 86400000 * 7), // 1 week from now
        availableSeats: 100,
        bookedSeats: 50,
        price: 50,
        organizer: 'test',
        imageUrl: 'test.jpg',
        reviews: [],
        createdAt: new Date(),
      }

      const status = getEventStatus(event)
      expect(status).toBe('available')
    })
  })
})