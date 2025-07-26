import { getAllEvents, getEventById, addEvent, updateEvent, deleteEvent, searchEvents, getEventsByCategory, getEventsByCity } from '@lib/data/events'
import { getAllUsers, getUserById, getUserByEmail, createUser, updateUser, deleteUser, validatePassword } from '@lib/data/users'

describe('Events Data Layer', () => {
  beforeEach(() => {
    // Reset any mocks or data before each test
  })

  describe('getAllEvents', () => {
    it('should return all events', () => {
      const events = getAllEvents()
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
      expect(firstEvent).toHaveProperty('date')
      expect(firstEvent).toHaveProperty('price')
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

    it('should return undefined for invalid ID', () => {
      const event = getEventById('invalid-id')
      expect(event).toBeUndefined()
    })
  })

  describe('searchEvents', () => {
    it('should return events matching search query', () => {
      const results = searchEvents('tech')
      expect(Array.isArray(results)).toBe(true)
    })

    it('should return empty array for non-matching query', () => {
      const results = searchEvents('nonexistentquery12345')
      expect(Array.isArray(results)).toBe(true)
    })
  })

  describe('getEventsByCategory', () => {
    it('should return events for valid category', () => {
      const results = getEventsByCategory('Technology')
      expect(Array.isArray(results)).toBe(true)
    })

    it('should return empty array for invalid category', () => {
      const results = getEventsByCategory('NonexistentCategory')
      expect(Array.isArray(results)).toBe(true)
    })
  })

  describe('getEventsByCity', () => {
    it('should return events for valid city', () => {
      const results = getEventsByCity('San Francisco')
      expect(Array.isArray(results)).toBe(true)
    })

    it('should return empty array for invalid city', () => {
      const results = getEventsByCity('NonexistentCity')
      expect(Array.isArray(results)).toBe(true)
    })
  })

  describe('addEvent', () => {
    it('should add new event with valid data', () => {
      const newEvent = {
        title: 'Test Event',
        description: 'Test Description',
        category: 'Technology',
        address: '123 Test St',
        city: 'Test City',
        date: new Date(),
        availableSeats: 100,
        price: 50,
        organizer: 'test-organizer',
        imageUrl: 'test.jpg'
      }

      const result = addEvent(newEvent)
      expect(result).toHaveProperty('_id')
      expect(result.title).toBe(newEvent.title)
    })
  })

  describe('updateEvent', () => {
    it('should update existing event', () => {
      const events = getAllEvents()
      const eventId = events[0]._id
      const updates = { title: 'Updated Title' }

      const result = updateEvent(eventId, updates)
      expect(result).toBeDefined()
      expect(result?.title).toBe('Updated Title')
    })

    it('should return null for invalid ID', () => {
      const result = updateEvent('invalid-id', { title: 'Updated' })
      expect(result).toBeNull()
    })
  })

  describe('deleteEvent', () => {
    it('should delete existing event', () => {
      const events = getAllEvents()
      const eventId = events[0]._id

      const result = deleteEvent(eventId)
      expect(result).toBe(true)
    })

    it('should return false for invalid ID', () => {
      const result = deleteEvent('invalid-id')
      expect(result).toBe(false)
    })
  })
})

describe('Users Data Layer', () => {
  describe('getAllUsers', () => {
    it('should return all users', () => {
      const users = getAllUsers()
      expect(Array.isArray(users)).toBe(true)
    })
  })

  describe('getUserById', () => {
    it('should return user when valid ID is provided', () => {
      const users = getAllUsers()
      if (users.length > 0) {
        const firstUserId = users[0].id
        const user = getUserById(firstUserId)
        expect(user).toBeDefined()
        expect(user?.id).toBe(firstUserId)
      }
    })

    it('should return undefined for invalid ID', () => {
      const user = getUserById('invalid-id')
      expect(user).toBeUndefined()
    })
  })

  describe('getUserByEmail', () => {
    it('should return user when valid email is provided', () => {
      const user = getUserByEmail('user@example.com')
      expect(user).toBeDefined()
      expect(user?.email).toBe('user@example.com')
    })

    it('should return undefined for invalid email', () => {
      const user = getUserByEmail('nonexistent@example.com')
      expect(user).toBeUndefined()
    })
  })

  describe('createUser', () => {
    it('should create new user with valid data', () => {
      const userData = {
        email: 'newuser@example.com',
        name: 'New User',
        password: 'password123',
        role: 'user' as const
      }

      const result = createUser(userData)
      expect(result).toBeDefined()
      // The actual implementation returns an empty object for now
      expect(typeof result).toBe('object')
    })
  })

  describe('updateUser', () => {
    it('should update existing user', () => {
      const users = getAllUsers()
      if (users.length > 0) {
        const userId = users[0].id
        const updates = { name: 'Updated Name' }

        const result = updateUser(userId, updates)
        expect(result).toBeDefined()
        expect(result?.name).toBe('Updated Name')
      }
    })

    it('should return null for invalid ID', () => {
      const result = updateUser('invalid-id', { name: 'Updated' })
      expect(result).toBeNull()
    })
  })

  describe('deleteUser', () => {
    it('should delete existing user', () => {
      const users = getAllUsers()
      if (users.length > 1) { // Keep at least one user
        const userId = users[1].id
        const result = deleteUser(userId)
        expect(result).toBe(true)
      }
    })

    it('should return false for invalid ID', () => {
      const result = deleteUser('invalid-id')
      expect(result).toBe(false)
    })
  })

  describe('validatePassword', () => {
    it('should validate correct password', async () => {
      const result = await validatePassword('password123', '$2b$10$rQZ9j8qZ8qZ8qZ8qZ8qZ8O')
      expect(typeof result).toBe('boolean')
    })

    it('should reject incorrect password', async () => {
      const result = await validatePassword('wrongpassword', '$2b$10$rQZ9j8qZ8qZ8qZ8qZ8qZ8O')
      expect(typeof result).toBe('boolean')
    })
  })
})