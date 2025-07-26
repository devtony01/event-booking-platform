#!/usr/bin/env node

// Test script to debug Google OAuth configuration
const https = require('https');
const http = require('http');

console.log('🔐 Google OAuth Debug Test');
console.log('==========================');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

// Check environment variables
console.log('\n1. Environment Variables:');
console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID ? '✅ Set' : '❌ Missing');
console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET ? '✅ Set' : '❌ Missing');
console.log('NEXTAUTH_SECRET:', process.env.NEXTAUTH_SECRET ? '✅ Set' : '❌ Missing');
console.log('NEXTAUTH_URL:', process.env.NEXTAUTH_URL || 'Not set');

// Test if Google credentials are valid (not demo)
const isGoogleConfigured = process.env.GOOGLE_CLIENT_ID && 
  process.env.GOOGLE_CLIENT_SECRET && 
  !process.env.GOOGLE_CLIENT_ID.includes('demo') &&
  !process.env.GOOGLE_CLIENT_SECRET.includes('demo');

console.log('\n2. Google OAuth Configuration:');
console.log('Google Configured:', isGoogleConfigured ? '✅ Yes' : '❌ No');

if (process.env.GOOGLE_CLIENT_ID) {
  console.log('Client ID starts with:', process.env.GOOGLE_CLIENT_ID.substring(0, 20) + '...');
}

// Test local server endpoints
function testEndpoint(path, description) {
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 3001,
      path: path,
      method: 'GET',
      timeout: 5000
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`${description}: ✅ HTTP ${res.statusCode}`);
        if (path.includes('providers')) {
          try {
            const providers = JSON.parse(data);
            console.log('  Available providers:', Object.keys(providers).join(', '));
            if (providers.google) {
              console.log('  Google provider: ✅ Available');
            } else {
              console.log('  Google provider: ❌ Not found');
            }
          } catch (e) {
            console.log('  Response parsing failed');
          }
        }
        resolve();
      });
    });

    req.on('error', (err) => {
      console.log(`${description}: ❌ Error - ${err.message}`);
      resolve();
    });

    req.on('timeout', () => {
      console.log(`${description}: ❌ Timeout`);
      req.destroy();
      resolve();
    });

    req.end();
  });
}

async function runTests() {
  console.log('\n3. Testing Local Server Endpoints:');
  
  // Wait a bit for server to be ready
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  await testEndpoint('/', 'Homepage');
  await testEndpoint('/api/auth/providers', 'OAuth Providers');
  await testEndpoint('/api/auth/csrf', 'CSRF Token');
  await testEndpoint('/account', 'Account Page');
  
  console.log('\n4. Manual Testing Instructions:');
  console.log('📝 To test Google OAuth manually:');
  console.log('   1. Open http://localhost:3001/account');
  console.log('   2. Look for "Continue with Google" button');
  console.log('   3. Click the button');
  console.log('   4. Should redirect to Google OAuth');
  console.log('   5. Complete authentication');
  console.log('   6. Should redirect back to /events');
  
  console.log('\n5. Debug Page:');
  console.log('   Visit http://localhost:3001/auth-debug for detailed info');
  
  console.log('\n==========================');
  console.log('Debug test complete!');
}

runTests().catch(console.error);