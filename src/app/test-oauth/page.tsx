"use client"

import { useSession, signIn, getProviders } from "next-auth/react"
import { useEffect, useState } from "react"
import { Button } from "@design/ui"

export default function TestOAuth() {
  const { data: session, status } = useSession()
  const [providers, setProviders] = useState<any>(null)
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get providers
        const availableProviders = await getProviders()
        setProviders(availableProviders)

        // Get debug info
        const debugResponse = await fetch('/api/auth/debug')
        const debugData = await debugResponse.json()
        setDebugInfo(debugData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [])

  const handleGoogleSignIn = async () => {
    setIsLoading(true)
    try {
      console.log('Testing Google sign-in...')
      const result = await signIn('google', { 
        callbackUrl: '/events',
        redirect: false 
      })
      console.log('Result:', result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">OAuth Test Page</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Session Status</h2>
            <div className="space-y-2">
              <p><strong>Status:</strong> {status}</p>
              <p><strong>User:</strong> {session?.user?.email || 'Not signed in'}</p>
              <p><strong>Name:</strong> {session?.user?.name || 'N/A'}</p>
            </div>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Available Providers</h2>
            <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto">
              {providers ? JSON.stringify(providers, null, 2) : 'Loading...'}
            </pre>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
            <pre className="text-sm bg-gray-100 p-3 rounded overflow-auto">
              {debugInfo ? JSON.stringify(debugInfo, null, 2) : 'Loading...'}
            </pre>
          </div>

          <div className="bg-white border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
            <div className="space-y-3">
              <Button
                onClick={handleGoogleSignIn}
                disabled={isLoading || !providers?.google}
                className="w-full"
              >
                {isLoading ? 'Testing...' : 'Test Google Sign-In'}
              </Button>
              
              {!providers?.google && (
                <p className="text-red-600 text-sm">
                  Google provider not available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}