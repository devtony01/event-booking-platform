# 🔐 Social Authentication Setup Guide

This guide explains how to set up Google and GitHub OAuth for the EventHub platform.

## Current Status

- ✅ **Email/Password Authentication**: Fully working
- ⚠️ **Social Authentication**: Requires OAuth app setup

## Demo Credentials

For testing the email/password authentication:
- **Email**: `user@example.com`
- **Password**: `password123`

## Setting Up Google OAuth

### 1. Create Google OAuth App

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
5. Configure OAuth consent screen
6. Set application type to "Web application"
7. Add authorized redirect URIs:
   - `http://localhost:3001/api/auth/callback/google` (development)
   - `https://your-domain.vercel.app/api/auth/callback/google` (production)

### 2. Update Environment Variables

```env
GOOGLE_CLIENT_ID=your-actual-google-client-id
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
```

## Setting Up GitHub OAuth

### 1. Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in the application details:
   - **Application name**: EventHub
   - **Homepage URL**: `http://localhost:3001` (or your domain)
   - **Authorization callback URL**: `http://localhost:3001/api/auth/callback/github`
4. Click "Register application"
5. Copy the Client ID and generate a Client Secret

### 2. Update Environment Variables

```env
GITHUB_ID=your-actual-github-client-id
GITHUB_SECRET=your-actual-github-client-secret
```

## Environment Configuration

### Development (.env.local)
```env
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3001

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub OAuth
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### Production (Vercel Environment Variables)
Add the same variables in your Vercel dashboard:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable with the production values
4. Update `NEXTAUTH_URL` to your production domain

## Testing Social Authentication

1. **Update environment variables** with real OAuth credentials
2. **Restart the development server**:
   ```bash
   npm run dev
   ```
3. **Navigate to** `/account`
4. **Click on Google or GitHub buttons** - they should now redirect to OAuth providers
5. **Complete OAuth flow** and return to the application

## Troubleshooting

### Common Issues

1. **"OAuth app not found"**
   - Verify client IDs are correct
   - Check that OAuth apps are properly configured

2. **"Redirect URI mismatch"**
   - Ensure callback URLs match exactly in OAuth app settings
   - Include both development and production URLs

3. **"Invalid client secret"**
   - Regenerate client secret in OAuth provider
   - Update environment variables

### Debug Mode

Enable NextAuth debug mode by adding:
```env
NEXTAUTH_DEBUG=true
```

## Security Notes

- Never commit real OAuth credentials to version control
- Use different OAuth apps for development and production
- Regularly rotate client secrets
- Monitor OAuth app usage in provider dashboards

## Current Implementation

The application is configured to:
- ✅ Automatically detect if social providers are configured
- ✅ Show/hide social login buttons based on configuration
- ✅ Fall back to email/password authentication
- ✅ Handle OAuth callbacks properly
- ✅ Store user sessions securely

## Next Steps

1. Set up OAuth applications with Google and GitHub
2. Update environment variables with real credentials
3. Test social authentication flow
4. Deploy to production with production OAuth apps