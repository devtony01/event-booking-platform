import { setLocalStorage, getLocalStorage, removeLocalStorage } from '@lib/utils'

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value ? value.toString() : 'null'
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('Local Storage Utilities', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  describe('setLocalStorage', () => {
    it('should store string values', () => {
      setLocalStorage('testKey', 'testValue')
      expect(localStorage.getItem('testKey')).toBe('"testValue"')
    })

    it('should store object values', () => {
      const testObject = { name: 'Test', value: 123 }
      setLocalStorage('testObject', testObject)
      
      const stored = localStorage.getItem('testObject')
      expect(stored).toBe(JSON.stringify(testObject))
    })

    it('should store array values', () => {
      const testArray = [1, 2, 3, 'test']
      setLocalStorage('testArray', testArray)
      
      const stored = localStorage.getItem('testArray')
      expect(stored).toBe(JSON.stringify(testArray))
    })

    it('should handle null and undefined', () => {
      setLocalStorage('nullValue', null)
      setLocalStorage('undefinedValue', undefined)
      
      expect(localStorage.getItem('nullValue')).toBe('null')
      expect(localStorage.getItem('undefinedValue')).toBe('null') // undefined becomes null in our mock
    })
  })

  describe('getLocalStorage', () => {
    it('should retrieve stored string values', () => {
      localStorage.setItem('testString', '"Hello World"')
      const result = getLocalStorage('testString', 'default')
      expect(result).toBe('Hello World')
    })

    it('should retrieve stored object values', () => {
      const testObject = { name: 'Test', value: 123 }
      localStorage.setItem('testObject', JSON.stringify(testObject))
      
      const result = getLocalStorage('testObject', {})
      expect(result).toEqual(testObject)
    })

    it('should return default value for non-existent keys', () => {
      const defaultValue = 'default'
      const result = getLocalStorage('nonExistentKey', defaultValue)
      expect(result).toBe(defaultValue)
    })

    it('should return default value for invalid JSON', () => {
      localStorage.setItem('invalidJSON', 'invalid json string')
      const defaultValue = 'default'
      const result = getLocalStorage('invalidJSON', defaultValue)
      expect(result).toBe(defaultValue)
    })

    it('should handle different data types as defaults', () => {
      expect(getLocalStorage('missing1', 'string')).toBe('string')
      expect(getLocalStorage('missing2', 123)).toBe(123)
      expect(getLocalStorage('missing3', true)).toBe(true)
      expect(getLocalStorage('missing4', [])).toEqual([])
      expect(getLocalStorage('missing5', {})).toEqual({})
    })
  })

  describe('removeLocalStorage', () => {
    it('should remove existing items', () => {
      localStorage.setItem('testKey', 'testValue')
      expect(localStorage.getItem('testKey')).toBe('testValue')
      
      removeLocalStorage('testKey')
      expect(localStorage.getItem('testKey')).toBeNull()
    })

    it('should handle removal of non-existent keys', () => {
      // Should not throw error
      expect(() => removeLocalStorage('nonExistentKey')).not.toThrow()
    })
  })

  describe('Edge cases', () => {
    it('should handle localStorage being unavailable', () => {
      // Mock window being undefined (server-side)
      const originalWindow = global.window
      delete (global as any).window

      // Should not throw errors
      expect(() => setLocalStorage('test', 'value')).not.toThrow()
      expect(() => getLocalStorage('test', 'default')).not.toThrow()
      expect(() => removeLocalStorage('test')).not.toThrow()

      // Should return default values when window is unavailable
      expect(getLocalStorage('test', 'default')).toBe('default')

      // Restore window
      ;(global as any).window = originalWindow
    })
  })
})