"use client"

import { useSession, signIn, signOut } from "next-auth/react"
import { Button } from "@design/ui/src/components/button"
import { Text } from "@design/ui/src/components/text"

export default function AuthDebugPage() {
  const { data: session, status } = useSession()

  const handleGoogleSignIn = async () => {
    console.log('Current URL:', window.location.href)
    console.log('Origin:', window.location.origin)
    
    try {
      const result = await signIn('google', { 
        callbackUrl: `${window.location.origin}/events`,
        redirect: true 
      })
      console.log('Sign-in result:', result)
    } catch (error) {
      console.error('Sign-in error:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
        <Text className="text-xl font-bold mb-6">Auth Debug Page</Text>
        
        <div className="space-y-4">
          <div>
            <Text className="font-semibold">Session Status:</Text>
            <Text className="text-gray-600">{status}</Text>
          </div>
          
          {session ? (
            <div>
              <Text className="font-semibold">User Info:</Text>
              <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                {JSON.stringify(session, null, 2)}
              </pre>
              <Button onClick={() => signOut()} className="mt-2">
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="space-y-2">
              <Button onClick={handleGoogleSignIn} className="w-full">
                Sign In with Google
              </Button>
              <Button 
                onClick={() => signIn('credentials', { 
                  email: 'user@example.com', 
                  password: 'password123',
                  callbackUrl: '/events'
                })} 
                variant="secondary" 
                className="w-full"
              >
                Sign In with Demo Credentials
              </Button>
            </div>
          )}
          
          <div className="mt-6 pt-4 border-t">
            <Text className="font-semibold">Environment Info:</Text>
            <div className="text-xs space-y-1">
              <div>Current URL: {typeof window !== 'undefined' ? window.location.href : 'N/A'}</div>
              <div>Origin: {typeof window !== 'undefined' ? window.location.origin : 'N/A'}</div>
              <div>Google Client ID: {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 'Not exposed'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}