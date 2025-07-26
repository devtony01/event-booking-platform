# Google OAuth Testing Guide

## 🔐 Google OAuth Configuration

### Current Setup
- **Google Client ID**: `206495327972-fs8tvbh83c454lr99kj5b8mk9c5jaj6k.apps.googleusercontent.com`
- **Production URL**: https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app
- **Callback URL**: https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app/api/auth/callback/google

## 🧪 Testing Steps

### 1. **Access the Application**
```bash
# Open in browser
https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app
```

### 2. **Navigate to Authentication**
- Click "Get Started" button on homepage
- Or go directly to: https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app/account

### 3. **Test Google OAuth**
- Look for "Continue with Google" button
- Click the button
- Should redirect to Google OAuth consent screen
- After Google authentication, should redirect back to `/events` page

### 4. **Debug Page (if needed)**
```bash
# Access debug page for troubleshooting
https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app/auth-debug
```

## 🔍 Expected Behavior

### ✅ **Successful Flow:**
1. User clicks "Continue with Google"
2. Redirects to Google OAuth (accounts.google.com)
3. User grants permissions
4. Redirects back to application
5. User is logged in and redirected to `/events`
6. Session is created with user information

### ❌ **Common Issues:**
1. **Redirect URI Mismatch**: Check Google Cloud Console settings
2. **Invalid Client ID**: Verify environment variables
3. **CORS Issues**: Check domain configuration
4. **Session Issues**: Check NextAuth configuration

## 🛠️ Google Cloud Console Configuration

### Required Settings:
1. **Authorized JavaScript Origins**:
   - `https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app`

2. **Authorized Redirect URIs**:
   - `https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app/api/auth/callback/google`

## 📋 Manual Testing Checklist

- [ ] Homepage loads correctly
- [ ] "Get Started" button works
- [ ] Account page displays login/register forms
- [ ] "Continue with Google" button is visible
- [ ] Google OAuth redirect works
- [ ] User can complete Google authentication
- [ ] Successful redirect to `/events` page
- [ ] User session is created
- [ ] User can access protected features

## 🐛 Debugging Commands

### Check OAuth Providers
```bash
curl -s https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app/api/auth/providers | jq
```

### Check CSRF Token
```bash
curl -s https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app/api/auth/csrf | jq
```

### Test Session Endpoint
```bash
curl -s https://next-po77wy2wk-chibueze-ogbujis-projects.vercel.app/api/auth/session | jq
```

## 📝 Test Results

### Environment Variables Status:
- ✅ GOOGLE_CLIENT_ID: Configured
- ✅ GOOGLE_CLIENT_SECRET: Configured  
- ✅ NEXTAUTH_SECRET: Configured
- ✅ NEXTAUTH_URL: Set for production

### OAuth Flow Status:
- [ ] Google OAuth button appears
- [ ] OAuth redirect works
- [ ] User authentication succeeds
- [ ] Session creation works
- [ ] Redirect to events page works

## 🔧 Troubleshooting

### If OAuth Fails:
1. Check browser console for errors
2. Verify Google Cloud Console settings
3. Check NextAuth logs in Vercel dashboard
4. Test with debug page
5. Verify environment variables in Vercel

### Common Fixes:
- Update redirect URIs in Google Cloud Console
- Check domain verification
- Verify OAuth consent screen configuration
- Ensure proper environment variable deployment