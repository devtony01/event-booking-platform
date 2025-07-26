import { isValidEmail, isValidPassword, getErrorMessage, truncateText, slugify } from '@lib/utils'

describe('Validation Utilities', () => {
  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      const validEmails = [
        'test@example.com',
        'user.name@domain.co.uk',
        'user+tag@example.org',
        'user123@test-domain.com'
      ]

      validEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(true)
      })
    })

    it('should reject invalid email formats', () => {
      const invalidEmails = [
        'invalid-email',
        '@example.com',
        'user@',
        'user@.com',
        ''
      ]

      invalidEmails.forEach(email => {
        expect(isValidEmail(email)).toBe(false)
      })
    })
  })

  describe('isValidPassword', () => {
    it('should validate strong passwords', () => {
      const validPasswords = [
        'Password123',
        'StrongPass1',
        'MySecure123',
        'Test1234'
      ]

      validPasswords.forEach(password => {
        expect(isValidPassword(password)).toBe(true)
      })
    })

    it('should reject weak passwords', () => {
      const invalidPasswords = [
        'password', // no uppercase or number
        'PASSWORD', // no lowercase or number
        '12345678', // no letters
        'Pass1', // too short
        'password123', // no uppercase
        'PASSWORD123', // no lowercase
        ''
      ]

      invalidPasswords.forEach(password => {
        expect(isValidPassword(password)).toBe(false)
      })
    })
  })

  describe('getErrorMessage', () => {
    it('should extract message from Error objects', () => {
      const error = new Error('Test error message')
      expect(getErrorMessage(error)).toBe('Test error message')
    })

    it('should convert non-Error objects to strings', () => {
      expect(getErrorMessage('String error')).toBe('String error')
      expect(getErrorMessage(123)).toBe('123')
      expect(getErrorMessage(null)).toBe('null')
      expect(getErrorMessage(undefined)).toBe('undefined')
    })

    it('should handle complex objects', () => {
      const complexError = { message: 'Complex error', code: 500 }
      const result = getErrorMessage(complexError)
      expect(typeof result).toBe('string')
      expect(result).toBe('[object Object]')
    })
  })

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'This is a very long text that should be truncated'
      const result = truncateText(longText, 20)
      
      expect(result.length).toBeLessThanOrEqual(23) // 20 + '...'
      expect(result).toContain('...')
    })

    it('should not truncate short text', () => {
      const shortText = 'Short text'
      const result = truncateText(shortText, 20)
      
      expect(result).toBe(shortText)
      expect(result).not.toContain('...')
    })

    it('should handle edge cases', () => {
      expect(truncateText('', 10)).toBe('')
      expect(truncateText('Test', 4)).toBe('Test')
      expect(truncateText('Test', 3)).toBe('Tes...')
    })
  })

  describe('slugify', () => {
    it('should convert text to URL-friendly slugs', () => {
      expect(slugify('Hello World')).toBe('hello-world')
      expect(slugify('Test Event 2024')).toBe('test-event-2024')
      expect(slugify('Special Characters!@#')).toBe('special-characters')
    })

    it('should handle multiple spaces', () => {
      expect(slugify('Multiple   Spaces')).toBe('multiple-spaces')
      expect(slugify('  Leading and trailing  ')).toBe('-leading-and-trailing-')
    })

    it('should handle empty strings', () => {
      expect(slugify('')).toBe('')
    })

    it('should remove special characters', () => {
      expect(slugify('Test & Event!')).toBe('test-event')
      expect(slugify('Price: $50.00')).toBe('price-5000')
    })
  })
})