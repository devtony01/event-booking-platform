"use client"

import { useSession, signIn, getProviders } from "next-auth/react"
import { useEffect, useState } from "react"

export default function AuthDebug() {
  const { data: session, status } = useSession()
  const [providers, setProviders] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const res = await getProviders()
        console.log('Available providers:', res)
        setProviders(res)
      } catch (err) {
        console.error('Error fetching providers:', err)
        setError('Failed to fetch providers')
      }
    }
    fetchProviders()
  }, [])

  const handleGoogleSignIn = async () => {
    try {
      console.log('Attempting Google sign-in...')
      setError(null)
      
      const result = await signIn('google', { 
        callbackUrl: '/events',
        redirect: false 
      })
      
      console.log('Sign-in result:', result)
      
      if (result?.error) {
        setError(`Sign-in error: ${result.error}`)
      }
    } catch (err) {
      console.error('Sign-in error:', err)
      setError(`Exception: ${err}`)
    }
  }

  const testAuthEndpoint = async () => {
    try {
      const response = await fetch('/api/auth/providers')
      const data = await response.json()
      console.log('Auth providers endpoint response:', data)
    } catch (err) {
      console.error('Error testing auth endpoint:', err)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Auth Debug Page</h1>
      
      <div className="space-y-6">
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Session Status</h2>
          <p>Status: {status}</p>
          <p>User: {session?.user?.email || 'Not signed in'}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Available Providers</h2>
          <pre className="text-sm overflow-auto">
            {providers ? JSON.stringify(providers, null, 2) : 'Loading...'}
          </pre>
        </div>

        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Environment Check</h2>
          <p>NEXTAUTH_URL: {process.env.NEXT_PUBLIC_NEXTAUTH_URL || 'Not set'}</p>
          <p>Google Client ID: {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? 'Set' : 'Not set publicly'}</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Test Google Sign-In
          </button>
          
          <button
            onClick={testAuthEndpoint}
            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Test Auth Endpoint
          </button>
        </div>
      </div>
    </div>
  )
}