import { NextResponse } from 'next/server'

export async function GET() {
  const isGoogleConfigured = process.env.GOOGLE_CLIENT_ID && 
    process.env.GOOGLE_CLIENT_SECRET && 
    !process.env.GOOGLE_CLIENT_ID.includes('demo') &&
    !process.env.GOOGLE_CLIENT_SECRET.includes('demo');

  const isGitHubConfigured = process.env.GITHUB_ID && 
    process.env.GITHUB_SECRET && 
    !process.env.GITHUB_ID.includes('demo') &&
    !process.env.GITHUB_SECRET.includes('demo');

  return NextResponse.json({
    google: {
      configured: isGoogleConfigured,
      hasClientId: !!process.env.GOOGLE_CLIENT_ID,
      hasClientSecret: !!process.env.GOOGLE_CLIENT_SECRET,
      clientIdPrefix: process.env.GOOGLE_CLIENT_ID?.substring(0, 10) + '...',
    },
    github: {
      configured: isGitHubConfigured,
      hasId: !!process.env.GITHUB_ID,
      hasSecret: !!process.env.GITHUB_SECRET,
    },
    nextauth: {
      url: process.env.NEXTAUTH_URL,
      hasSecret: !!process.env.NEXTAUTH_SECRET,
    }
  })
}