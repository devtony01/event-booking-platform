import {
  getUserById,
  getUserByEmail,
  createUser,
  validatePassword,
  getAllUsers,
  updateUser,
  deleteUser,
} from '@lib/data/users'

describe('Users Data Store', () => {
  describe('getUserById', () => {
    it('should return user when valid ID is provided', () => {
      const users = getAllUsers()
      const firstUserId = users[0].id
      const user = getUserById(firstUserId)
      
      expect(user).toBeDefined()
      expect(user?.id).toBe(firstUserId)
    })

    it('should return undefined when invalid ID is provided', () => {
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

    it('should return undefined when invalid email is provided', () => {
      const user = getUserByEmail('invalid@email.com')
      expect(user).toBeUndefined()
    })

    it('should be case insensitive', () => {
      const user = getUserByEmail('USER@EXAMPLE.COM')
      expect(user).toBeDefined()
      expect(user?.email).toBe('user@example.com')
    })
  })

  describe('createUser', () => {
    it('should create a new user with hashed password', async () => {
      const userData = {
        email: 'newuser@test.com',
        password: 'testpassword123',
        name: 'Test User',
        role: 'user' as const,
      }

      const initialCount = getAllUsers().length
      const newUser = await createUser(userData)
      const finalCount = getAllUsers().length

      expect(newUser).toBeDefined()
      expect(newUser.id).toBeDefined()
      expect(newUser.email).toBe(userData.email.toLowerCase())
      expect(newUser.name).toBe(userData.name)
      expect(newUser.role).toBe(userData.role)
      expect(newUser.password).not.toBe(userData.password) // Should be hashed
      expect(newUser.createdAt).toBeDefined()
      expect(finalCount).toBe(initialCount + 1)
    })

    it('should throw error when email already exists', async () => {
      const userData = {
        email: 'user@example.com', // Existing email
        password: 'testpassword123',
        name: 'Test User',
      }

      await expect(createUser(userData)).rejects.toThrow('User with this email already exists')
    })

    it('should default role to user when not provided', async () => {
      const userData = {
        email: 'defaultrole@test.com',
        password: 'testpassword123',
        name: 'Default Role User',
      }

      const newUser = await createUser(userData)
      expect(newUser.role).toBe('user')
    })
  })

  describe('validatePassword', () => {
    it('should return true for correct password', async () => {
      // Using known demo user password
      const user = getUserByEmail('user@example.com')
      expect(user).toBeDefined()
      
      const isValid = await validatePassword('password123', user!.password)
      expect(isValid).toBe(true)
    })

    it('should return false for incorrect password', async () => {
      const user = getUserByEmail('user@example.com')
      expect(user).toBeDefined()
      
      const isValid = await validatePassword('wrongpassword', user!.password)
      expect(isValid).toBe(false)
    })
  })

  describe('getAllUsers', () => {
    it('should return all users', () => {
      const users = getAllUsers()
      expect(users).toBeDefined()
      expect(Array.isArray(users)).toBe(true)
      expect(users.length).toBeGreaterThan(0)
    })

    it('should return users with required properties', () => {
      const users = getAllUsers()
      const firstUser = users[0]
      
      expect(firstUser).toHaveProperty('id')
      expect(firstUser).toHaveProperty('email')
      expect(firstUser).toHaveProperty('password')
      expect(firstUser).toHaveProperty('name')
      expect(firstUser).toHaveProperty('role')
      expect(firstUser).toHaveProperty('createdAt')
    })
  })

  describe('updateUser', () => {
    it('should update existing user and return updated user', () => {
      const users = getAllUsers()
      const userToUpdate = users[0]
      const updates = { name: 'Updated Name', role: 'organizer' as const }

      const updatedUser = updateUser(userToUpdate.id, updates)

      expect(updatedUser).toBeDefined()
      expect(updatedUser?.name).toBe(updates.name)
      expect(updatedUser?.role).toBe(updates.role)
      expect(updatedUser?.id).toBe(userToUpdate.id)
      expect(updatedUser?.email).toBe(userToUpdate.email) // Should remain unchanged
    })

    it('should return null for non-existent user', () => {
      const result = updateUser('invalid-id', { name: 'Updated' })
      expect(result).toBeNull()
    })
  })

  describe('deleteUser', () => {
    it('should delete existing user and return true', async () => {
      // Create a test user first
      const testUser = await createUser({
        email: 'usertodelete@test.com',
        password: 'testpassword',
        name: 'User to Delete',
      })

      const initialCount = getAllUsers().length
      const result = deleteUser(testUser.id)
      const finalCount = getAllUsers().length

      expect(result).toBe(true)
      expect(finalCount).toBe(initialCount - 1)
      expect(getUserById(testUser.id)).toBeUndefined()
    })

    it('should return false for non-existent user', () => {
      const result = deleteUser('invalid-id')
      expect(result).toBe(false)
    })
  })
})