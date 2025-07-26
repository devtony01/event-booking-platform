const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Google OAuth Diagnostic Tool');
console.log('================================');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

console.log('\n1. Environment Variables Check:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || '❌ Not set');

// Check if Google is configured properly
const isGoogleConfigured = process.env.GOOGLE_CLIENT_ID && 
  process.env.GOOGLE_CLIENT_SECRET && 
  !process.env.GOOGLE_CLIENT_ID.includes('demo') &&
  !process.env.GOOGLE_CLIENT_SECRET.includes('demo');

console.log('\n2. Google OAuth Configuration:');
console.log('Is Google Configured:', isGoogleConfigured ? '✅ Yes' : '❌ No');

if (process.env.GOOGLE_CLIENT_ID) {
  console.log('Client ID Preview:', process.env.GOOGLE_CLIENT_ID.substring(0, 20) + '...');
  console.log('Client ID Length:', process.env.GOOGLE_CLIENT_ID.length);
}

// Check NextAuth configuration file
console.log('\n3. NextAuth Configuration Check:');
const authFilePath = path.join(__dirname, 'src/app/api/auth/[...nextauth]/route.ts');
if (fs.existsSync(authFilePath)) {
  console.log('Auth route file: ✅ Exists');
  const authContent = fs.readFileSync(authFilePath, 'utf8');
  
  if (authContent.includes('GoogleProvider')) {
    console.log('GoogleProvider import: ✅ Found');
  } else {
    console.log('GoogleProvider import: ❌ Missing');
  }
  
  if (authContent.includes('isGoogleConfigured')) {
    console.log('Google configuration check: ✅ Found');
  } else {
    console.log('Google configuration check: ❌ Missing');
  }
} else {
  console.log('Auth route file: ❌ Missing');
}

// Check social auth component
console.log('\n4. Social Auth Component Check:');
const socialAuthPath = path.join(__dirname, 'src/modules/account/components/social-auth/index.tsx');
if (fs.existsSync(socialAuthPath)) {
  console.log('Social auth component: ✅ Exists');
  const socialContent = fs.readFileSync(socialAuthPath, 'utf8');
  
  if (socialContent.includes('signIn(\'google\'')) {
    console.log('Google signIn call: ✅ Found');
  } else {
    console.log('Google signIn call: ❌ Missing');
  }
  
  if (socialContent.includes('Continue with Google')) {
    console.log('Google button text: ✅ Found');
  } else {
    console.log('Google button text: ❌ Missing');
  }
} else {
  console.log('Social auth component: ❌ Missing');
}

// Check if server is running
console.log('\n5. Development Server Check:');
try {
  const result = execSync('curl -s --connect-timeout 5 http://localhost:3001/api/auth/csrf', { encoding: 'utf8' });
  if (result) {
    console.log('Development server: ✅ Running');
    console.log('CSRF endpoint: ✅ Accessible');
  } else {
    console.log('Development server: ❌ Not responding');
  }
} catch (error) {
  console.log('Development server: ❌ Not accessible');
  console.log('Error:', error.message);
}

// Test OAuth providers endpoint
console.log('\n6. OAuth Providers Test:');
try {
  const result = execSync('curl -s --connect-timeout 5 http://localhost:3001/api/auth/providers', { encoding: 'utf8' });
  if (result) {
    console.log('Providers endpoint: ✅ Accessible');
    try {
      const providers = JSON.parse(result);
      console.log('Available providers:', Object.keys(providers).join(', '));
      if (providers.google) {
        console.log('Google provider: ✅ Available');
        console.log('Google provider details:', JSON.stringify(providers.google, null, 2));
      } else {
        console.log('Google provider: ❌ Not found');
      }
    } catch (parseError) {
      console.log('Response parsing: ❌ Failed');
      console.log('Raw response:', result.substring(0, 200) + '...');
    }
  } else {
    console.log('Providers endpoint: ❌ No response');
  }
} catch (error) {
  console.log('Providers endpoint: ❌ Error');
  console.log('Error:', error.message);
}

console.log('\n7. Recommendations:');
if (!isGoogleConfigured) {
  console.log('❌ Google OAuth is not properly configured');
  console.log('   - Check GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local');
  console.log('   - Ensure they don\'t contain "demo" placeholder values');
} else {
  console.log('✅ Google OAuth appears to be configured');
}

console.log('\n8. Next Steps:');
console.log('1. Start the development server: yarn dev');
console.log('2. Open http://localhost:3001/account in your browser');
console.log('3. Look for the "Continue with Google" button');
console.log('4. Check browser console for any JavaScript errors');
console.log('5. If button doesn\'t work, check browser Network tab for failed requests');

console.log('\n================================');
console.log('Diagnostic complete!');