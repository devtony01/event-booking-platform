"use client"

import { signIn, getProviders } from "next-auth/react"
import { Button, Text } from "@design/ui"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"

interface SocialAuthProps {
  className?: string
}

const SocialAuth = ({ className }: SocialAuthProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [providers, setProviders] = useState<any>(null)
  const [isGoogleAvailable, setIsGoogleAvailable] = useState(false)

  useEffect(() => {
    const checkProviders = async () => {
      try {
        const availableProviders = await getProviders()
        console.log('Available providers:', availableProviders)
        setProviders(availableProviders)
        setIsGoogleAvailable(!!availableProviders?.google)
      } catch (error) {
        console.error('Error fetching providers:', error)
        toast.error('Failed to load authentication providers')
      }
    }
    checkProviders()
  }, [])

  const handleGoogleSignIn = async () => {
    if (!isGoogleAvailable) {
      toast.error('Google sign-in is not available. Please check configuration.')
      return
    }

    try {
      setIsLoading(true)
      console.log('Initiating Google sign-in...');
      
      const result = await signIn('google', { 
        callbackUrl: `${window.location.origin}/events`,
        redirect: false // Changed to false to handle errors better
      });
      
      console.log('Google sign-in result:', result);
      
      if (result?.error) {
        console.error('Google sign-in error:', result.error)
        toast.error(`Sign-in failed: ${result.error}`)
      } else if (result?.ok) {
        toast.success('Signing in with Google...')
        // Redirect manually after success
        window.location.href = result.url || '/events'
      } else {
        console.log('Unexpected result:', result)
        toast.error('Sign-in failed. Please try again.')
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
      toast.error('An error occurred during sign-in. Please try again.')
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className={className}>
      {/* Divider */}
      <div className="my-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>
      </div>

      {/* Social Login */}
      <div className="grid grid-cols-1 gap-3">
        <Button 
          variant="transparent" 
          className="w-full py-3 border border-gray-300 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={handleGoogleSignIn}
          disabled={isLoading || !isGoogleAvailable}
        >
          {isLoading ? (
            <>
              <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              Signing in...
            </>
          ) : (
            <>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {isGoogleAvailable ? 'Continue with Google' : 'Google Sign-in Unavailable'}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default SocialAuth