# 🔧 Fix Google OAuth Callback Domain Mismatch

## Problem
The callback domain configured in Google Cloud Console doesn't match your current deployment URL, causing Google OAuth to fail.

## Current Configuration
Based on the documentation, the current setup expects:
- **Production URL**: `https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app`
- **Callback URL**: `https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app/api/auth/callback/google`

## Solution Options

### Option 1: Update Google Cloud Console (Recommended)
Update your Google Cloud Console to match your current Vercel deployment URL.

#### Steps:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Navigate to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID: `206495327972-fs8tvbh83c454lr99kj5b8mk9c5jaj6k.apps.googleusercontent.com`
5. Click **Edit** (pencil icon)
6. Update the **Authorized redirect URIs** section:

#### Required Redirect URIs:
```
# For your current Vercel deployment (replace with your actual domain)
https://YOUR-ACTUAL-VERCEL-DOMAIN.vercel.app/api/auth/callback/google

# For local development
http://localhost:3001/api/auth/callback/google

# If you have a custom domain
https://your-custom-domain.com/api/auth/callback/google
```

#### Required JavaScript Origins:
```
# For your current Vercel deployment
https://YOUR-ACTUAL-VERCEL-DOMAIN.vercel.app

# For local development
http://localhost:3001

# If you have a custom domain
https://your-custom-domain.com
```

### Option 2: Update Environment Variables
If you want to use a different Vercel deployment URL, update your environment variables.

#### Update .env.local (for local development):
```env
NEXTAUTH_URL=http://localhost:3001
```

#### Update Vercel Environment Variables (for production):
1. Go to your Vercel dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Update or add:
```
NEXTAUTH_URL=https://YOUR-ACTUAL-VERCEL-DOMAIN.vercel.app
```

## How to Find Your Current Vercel Domain

### Method 1: Vercel Dashboard
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Find your project
3. The domain will be shown in the project card

### Method 2: Vercel CLI
```bash
cd next
vercel ls
```

### Method 3: Git Remote
```bash
cd next
git remote -v
# Look for the Vercel deployment URL in the remote URLs
```

## Testing the Fix

### 1. Local Testing
```bash
# Start local server
yarn dev

# Test OAuth providers endpoint
curl -s http://localhost:3001/api/auth/providers | jq

# Look for Google provider in the response
```

### 2. Production Testing
```bash
# Replace with your actual domain
curl -s https://YOUR-DOMAIN.vercel.app/api/auth/providers | jq
```

### 3. Manual Browser Testing
1. Open your application in browser
2. Navigate to `/account` page
3. Click \"Continue with Google\"
4. Should redirect to Google OAuth
5. Complete authentication
6. Should redirect back to your app

## Common Error Messages

### \"redirect_uri_mismatch\"
```
Error 400: redirect_uri_mismatch
The redirect URI in the request, https://your-domain.vercel.app/api/auth/callback/google, does not match the ones authorized for the OAuth client.
```
**Fix**: Update the redirect URIs in Google Cloud Console

### \"invalid_client\"
```
Error 401: invalid_client
The OAuth client was not found.
```
**Fix**: Check that your GOOGLE_CLIENT_ID is correct

## Quick Fix Script

Here's a script to help you identify the correct domains:

```bash
#!/bin/bash
echo \"🔍 OAuth Domain Diagnostic\"
echo \"=========================\"

echo \"\\n1. Current Environment Variables:\"
echo \"NEXTAUTH_URL: $NEXTAUTH_URL\"
echo \"GOOGLE_CLIENT_ID: ${GOOGLE_CLIENT_ID:0:20}...\"

echo \"\\n2. Vercel Deployments:\"
vercel ls 2>/dev/null || echo \"Vercel CLI not installed or not logged in\"

echo \"\\n3. Required Google Cloud Console Settings:\"
echo \"Authorized JavaScript Origins:\"
echo \"  - http://localhost:3001\"
echo \"  - https://YOUR-VERCEL-DOMAIN.vercel.app\"

echo \"\\nAuthorized Redirect URIs:\"
echo \"  - http://localhost:3001/api/auth/callback/google\"
echo \"  - https://YOUR-VERCEL-DOMAIN.vercel.app/api/auth/callback/google\"

echo \"\\n4. Next Steps:\"
echo \"  1. Find your actual Vercel domain\"
echo \"  2. Update Google Cloud Console with correct URLs\"
echo \"  3. Update NEXTAUTH_URL environment variable if needed\"
echo \"  4. Test OAuth flow\"
```

## Need Help?

Please provide:
1. **Your actual Vercel deployment URL**
2. **The callback URLs currently configured in Google Cloud Console**
3. **Any error messages you see in the browser console**

This will help me give you the exact configuration needed to fix the OAuth issue.