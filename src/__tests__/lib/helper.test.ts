import { getFromLocalStorage, getFromSessionStorage } from '@lib/utils/helper'

// Mock localStorage and sessionStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    }
  }
})()

const sessionStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value
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

Object.defineProperty(window, 'sessionStorage', {
  value: sessionStorageMock
})

describe('Helper Functions', () => {
  beforeEach(() => {
    localStorageMock.clear()
    sessionStorageMock.clear()
  })

  describe('getFromLocalStorage', () => {
    it('should return value from localStorage when it exists', () => {
      localStorage.setItem('testKey', 'testValue')
      const result = getFromLocalStorage('testKey')
      expect(result).toBe('testValue')
    })

    it('should return null when key does not exist', () => {
      const result = getFromLocalStorage('nonExistentKey')
      expect(result).toBeNull()
    })

    it('should return null when window is undefined', () => {
      const originalWindow = global.window
      delete (global as any).window

      const result = getFromLocalStorage('testKey')
      expect(result).toBeNull()

      ;(global as any).window = originalWindow
    })
  })

  describe('getFromSessionStorage', () => {
    it('should return value from sessionStorage when it exists', () => {
      sessionStorage.setItem('testKey', 'testValue')
      const result = getFromSessionStorage('testKey')
      expect(result).toBe('testValue')
    })

    it('should return null when key does not exist', () => {
      const result = getFromSessionStorage('nonExistentKey')
      expect(result).toBeNull()
    })

    it('should return null when sessionStorage is undefined', () => {
      const originalSessionStorage = global.sessionStorage
      delete (global as any).sessionStorage

      const result = getFromSessionStorage('testKey')
      expect(result).toBeNull()

      ;(global as any).sessionStorage = originalSessionStorage
    })
  })
})