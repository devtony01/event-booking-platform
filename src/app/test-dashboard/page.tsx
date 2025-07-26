"use client"

import { useState, useEffect } from 'react'
import { Button } from '@design/ui/src/components/button'
import { Text } from '@design/ui/src/components/text'

interface TestResult {
  passing: number
  failing: number
  total: number
  passRate: number
  timestamp: string
  suites?: Array<{
    name: string
    passing: number
    failing: number
    total: number
  }>
}

interface TestSuite {
  name: string
  status: 'passing' | 'failing' | 'running'
  tests: Array<{
    name: string
    status: 'passed' | 'failed' | 'running'
    duration?: number
    error?: string
  }>
}

export default function TestDashboard() {
  const [testResults, setTestResults] = useState<TestResult | null>(null)
  const [isRunning, setIsRunning] = useState(false)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(false)
  const [testSuites, setTestSuites] = useState<TestSuite[]>([])

  // Load test results from JSON file
  const loadTestResults = async () => {
    try {
      const response = await fetch('/test-results.json')
      if (response.ok) {
        const data = await response.json()
        setTestResults(data)
        setLastUpdate(new Date(data.timestamp))
      }
    } catch (error) {
      console.error('Failed to load test results:', error)
    }
  }

  // Run tests via API
  const runTests = async () => {
    setIsRunning(true)
    try {
      const response = await fetch('/api/test/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
      
      if (response.ok) {
        const data = await response.json()
        setTestResults(data)
        setLastUpdate(new Date())
      }
    } catch (error) {
      console.error('Failed to run tests:', error)
    } finally {
      setIsRunning(false)
    }
  }

  // Mock test suites for demonstration
  useEffect(() => {
    setTestSuites([
      {
        name: 'Utility Functions',
        status: 'passing',
        tests: [
          { name: 'formatDate should format date correctly', status: 'passed', duration: 21 },
          { name: 'formatTime should format time correctly', status: 'passed', duration: 1 },
          { name: 'formatCurrency should format currency with dollar sign', status: 'passed', duration: 4 },
          { name: 'getEventStatus should return "available" for future events', status: 'failed', error: 'Expected "available" but received "upcoming"' }
        ]
      },
      {
        name: 'EventCard Component',
        status: 'failing',
        tests: [
          { name: 'renders event information correctly', status: 'failed', error: 'React version mismatch' },
          { name: 'displays available seats correctly', status: 'failed', error: 'React version mismatch' },
          { name: 'shows correct status for events', status: 'failed', error: 'React version mismatch' }
        ]
      },
      {
        name: 'Events Data Store',
        status: 'passing',
        tests: [
          { name: 'getAllEvents should return all events', status: 'passed', duration: 5 },
          { name: 'getEventById should return event when valid ID provided', status: 'passed', duration: 2 },
          { name: 'getEventsByCategory should filter correctly', status: 'passed', duration: 3 }
        ]
      },
      {
        name: 'API Routes',
        status: 'passing',
        tests: [
          { name: 'GET /api/events should return all events', status: 'passed', duration: 15 },
          { name: 'GET /api/events/[id] should return single event', status: 'passed', duration: 8 },
          { name: 'POST /api/events should create new event', status: 'passed', duration: 12 }
        ]
      }
    ])
  }, [])

  // Auto-refresh functionality
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(loadTestResults, 10000) // Every 10 seconds
      return () => clearInterval(interval)
    }
  }, [autoRefresh])

  // Load initial results
  useEffect(() => {
    loadTestResults()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passing':
      case 'passed':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'failing':
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'running':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passing':
      case 'passed':
        return '✅'
      case 'failing':
      case 'failed':
        return '❌'
      case 'running':
        return '⏳'
      default:
        return '⚪'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <Text className="text-3xl font-bold text-gray-900">🧪 Test Dashboard</Text>
              <Text className="text-gray-600 mt-1">Real-time test results and monitoring</Text>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                onClick={() => setAutoRefresh(!autoRefresh)}
                variant={autoRefresh ? "primary" : "secondary"}
                className="flex items-center space-x-2"
              >
                <span>{autoRefresh ? '⏸️' : '▶️'}</span>
                <span>{autoRefresh ? 'Stop Auto-refresh' : 'Start Auto-refresh'}</span>
              </Button>
              <Button
                onClick={runTests}
                disabled={isRunning}
                className="flex items-center space-x-2"
              >
                <span>{isRunning ? '⏳' : '🔄'}</span>
                <span>{isRunning ? 'Running Tests...' : 'Run Tests'}</span>
              </Button>
            </div>
          </div>

          {/* Test Results Summary */}
          {testResults && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600">{testResults.total}</div>
                <div className="text-sm text-blue-600">Total Tests</div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-green-600">{testResults.passing}</div>
                <div className="text-sm text-green-600">Passing</div>
              </div>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-red-600">{testResults.failing}</div>
                <div className="text-sm text-red-600">Failing</div>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600">{testResults.passRate}%</div>
                <div className="text-sm text-purple-600">Pass Rate</div>
              </div>
            </div>
          )}

          {lastUpdate && (
            <div className="mt-4 text-sm text-gray-500">
              Last updated: {lastUpdate.toLocaleString()}
            </div>
          )}
        </div>

        {/* Test Suites */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {testSuites.map((suite, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{getStatusIcon(suite.status)}</span>
                  <Text className="text-lg font-semibold">{suite.name}</Text>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(suite.status)}`}>
                  {suite.status}
                </span>
              </div>

              <div className="space-y-2">
                {suite.tests.map((test, testIndex) => (
                  <div key={testIndex} className="flex items-start justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span>{getStatusIcon(test.status)}</span>
                        <Text className="text-sm font-medium">{test.name}</Text>
                      </div>
                      {test.error && (
                        <Text className="text-xs text-red-600 mt-1 ml-6">{test.error}</Text>
                      )}
                    </div>
                    {test.duration && (
                      <Text className="text-xs text-gray-500">{test.duration}ms</Text>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Test Commands */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
          <Text className="text-lg font-semibold mb-4">🔧 Test Commands</Text>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <Text className="font-medium mb-2">Run All Tests</Text>
              <code className="text-sm bg-gray-800 text-green-400 p-2 rounded block">npm test</code>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <Text className="font-medium mb-2">Watch Mode</Text>
              <code className="text-sm bg-gray-800 text-green-400 p-2 rounded block">npm run test:watch</code>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <Text className="font-medium mb-2">Coverage Report</Text>
              <code className="text-sm bg-gray-800 text-green-400 p-2 rounded block">npm run test:coverage</code>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <Text className="font-medium mb-2">Update Badge</Text>
              <code className="text-sm bg-gray-800 text-green-400 p-2 rounded block">npm run test:badge</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}