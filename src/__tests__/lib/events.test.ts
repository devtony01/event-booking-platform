import {
  getAllEvents,
  getEventById,
  getEventsByCategory,
  getEventsByCity,
  searchEvents,
  getAvailableCategories,
  getAvailableCities,
  updateEvent,
  deleteEvent,
  addEvent,
} from '@lib/data/events'

describe('Events Data Store', () => {
  describe('getAllEvents', () => {
    it('should return all events', () => {
      const events = getAllEvents()
      expect(events).toBeDefined()
      expect(Array.isArray(events)).toBe(true)
      expect(events.length).toBeGreaterThan(0)
    })

    it('should return events with required properties', () => {
      const events = getAllEvents()
      const firstEvent = events[0]
      
      expect(firstEvent).toHaveProperty('_id')
      expect(firstEvent).toHaveProperty('title')
      expect(firstEvent).toHaveProperty('description')
      expect(firstEvent).toHaveProperty('category')
      expect(firstEvent).toHaveProperty('city')
      expect(firstEvent).toHaveProperty('date')
      expect(firstEvent).toHaveProperty('price')
      expect(firstEvent).toHaveProperty('availableSeats')
      expect(firstEvent).toHaveProperty('bookedSeats')
    })
  })

  describe('getEventById', () => {
    it('should return event when valid ID is provided', () => {
      const events = getAllEvents()
      const firstEventId = events[0]._id
      const event = getEventById(firstEventId)
      
      expect(event).toBeDefined()
      expect(event?._id).toBe(firstEventId)
    })

    it('should return undefined when invalid ID is provided', () => {
      const event = getEventById('invalid-id')
      expect(event).toBeUndefined()
    })
  })

  describe('getEventsByCategory', () => {
    it('should return events filtered by category', () => {
      const category = 'Technology'
      const events = getEventsByCategory(category)
      
      expect(Array.isArray(events)).toBe(true)
      events.forEach(event => {
        expect(event.category.toLowerCase()).toBe(category.toLowerCase())
      })
    })

    it('should return empty array for non-existent category', () => {
      const events = getEventsByCategory('NonExistentCategory')
      expect(events).toEqual([])
    })
  })

  describe('getEventsByCity', () => {
    it('should return events filtered by city', () => {
      const city = 'San Francisco'
      const events = getEventsByCity(city)
      
      expect(Array.isArray(events)).toBe(true)
      events.forEach(event => {
        expect(event.city.toLowerCase()).toBe(city.toLowerCase())
      })
    })

    it('should return empty array for non-existent city', () => {
      const events = getEventsByCity('NonExistentCity')
      expect(events).toEqual([])
    })
  })

  describe('searchEvents', () => {
    it('should return events matching search query in title', () => {
      const query = 'Tech'
      const events = searchEvents(query)
      
      expect(Array.isArray(events)).toBe(true)
      events.forEach(event => {
        const matchesTitle = event.title.toLowerCase().includes(query.toLowerCase())
        const matchesDescription = event.description.toLowerCase().includes(query.toLowerCase())
        const matchesCategory = event.category.toLowerCase().includes(query.toLowerCase())
        const matchesCity = event.city.toLowerCase().includes(query.toLowerCase())
        
        expect(matchesTitle || matchesDescription || matchesCategory || matchesCity).toBe(true)
      })
    })

    it('should return empty array for non-matching query', () => {
      const events = searchEvents('NonExistentSearchTerm12345')
      expect(events).toEqual([])
    })
  })

  describe('getAvailableCategories', () => {
    it('should return unique categories', () => {
      const categories = getAvailableCategories()
      
      expect(Array.isArray(categories)).toBe(true)
      expect(categories.length).toBeGreaterThan(0)
      
      // Check for uniqueness
      const uniqueCategories = [...new Set(categories)]
      expect(categories.length).toBe(uniqueCategories.length)
    })
  })

  describe('getAvailableCities', () => {
    it('should return unique cities', () => {
      const cities = getAvailableCities()
      
      expect(Array.isArray(cities)).toBe(true)
      expect(cities.length).toBeGreaterThan(0)
      
      // Check for uniqueness
      const uniqueCities = [...new Set(cities)]
      expect(cities.length).toBe(uniqueCities.length)
    })
  })

  describe('addEvent', () => {
    it('should add a new event and return it with generated ID', () => {
      const newEventData = {
        title: 'Test Event',
        description: 'Test Description',
        category: 'Test',
        address: 'Test Address',
        city: 'Test City',
        date: new Date(),
        availableSeats: 100,
        bookedSeats: 0,
        price: 50,
        organizer: 'test-organizer',
        imageUrl: 'test-image.jpg',
        reviews: [],
      }

      const initialCount = getAllEvents().length
      const newEvent = addEvent(newEventData)
      const finalCount = getAllEvents().length

      expect(newEvent).toBeDefined()
      expect(newEvent._id).toBeDefined()
      expect(newEvent.title).toBe(newEventData.title)
      expect(newEvent.createdAt).toBeDefined()
      expect(finalCount).toBe(initialCount + 1)
    })
  })

  describe('updateEvent', () => {
    it('should update existing event and return updated event', () => {
      const events = getAllEvents()
      const eventToUpdate = events[0]
      const updates = { title: 'Updated Title', price: 999 }

      const updatedEvent = updateEvent(eventToUpdate._id, updates)

      expect(updatedEvent).toBeDefined()
      expect(updatedEvent?.title).toBe(updates.title)
      expect(updatedEvent?.price).toBe(updates.price)
      expect(updatedEvent?._id).toBe(eventToUpdate._id)
    })

    it('should return null for non-existent event', () => {
      const result = updateEvent('invalid-id', { title: 'Updated' })
      expect(result).toBeNull()
    })
  })

  describe('deleteEvent', () => {
    it('should delete existing event and return true', () => {
      // Add a test event first
      const testEvent = addEvent({
        title: 'Event to Delete',
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
      })

      const initialCount = getAllEvents().length
      const result = deleteEvent(testEvent._id)
      const finalCount = getAllEvents().length

      expect(result).toBe(true)
      expect(finalCount).toBe(initialCount - 1)
      expect(getEventById(testEvent._id)).toBeUndefined()
    })

    it('should return false for non-existent event', () => {
      const result = deleteEvent('invalid-id')
      expect(result).toBe(false)
    })
  })
})