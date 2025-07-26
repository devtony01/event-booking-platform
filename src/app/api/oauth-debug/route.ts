import { NextResponse } from 'next/server'

export async function GET() {
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3001'
  
  return NextResponse.json({
    environment: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ? 
        `${process.env.GOOGLE_CLIENT_ID.substring(0, 10)}...` : 'Not set',
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ? 'Set' : 'Not set',
      NODE_ENV: process.env.NODE_ENV,
    },
    expectedCallbackUrl: `${baseUrl}/api/auth/callback/google`,
    googleConsoleSetup: {
      authorizedRedirectUris: [
        `${baseUrl}/api/auth/callback/google`
      ],
      authorizedJavaScriptOrigins: [
        baseUrl
      ]
    },
    troubleshooting: {
      commonIssues: [
        'Redirect URI mismatch in Google Console',
        'Wrong Client ID or Secret',
        'Domain not authorized in Google Console',
        'NEXTAUTH_URL environment variable incorrect'
      ]
    }
  })
}