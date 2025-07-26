#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

console.log('🔍 Finding Your Vercel Deployment Domain');
console.log('========================================');

// Read Vercel project info
let projectId = null;
try {
  const vercelConfig = JSON.parse(fs.readFileSync('.vercel/project.json', 'utf8'));
  projectId = vercelConfig.projectId;
  console.log('✅ Found Vercel project ID:', projectId);
} catch (error) {
  console.log('❌ Could not read Vercel project config');
}

// Check GitHub repository for clues
console.log('\n📋 Repository Information:');
console.log('GitHub Repo: https://github.com/devtony01/event-booking-platform.git');

// Common Vercel domain patterns
console.log('\n🌐 Possible Vercel Domains:');
const possibleDomains = [
  'event-booking-platform.vercel.app',
  'event-booking-platform-devtony01.vercel.app', 
  'event-booking-platform-git-main-devtony01.vercel.app',
  'next-po77wy2wk-chibueze-ogbujis-projects.vercel.app', // From docs
];

console.log('Testing common domain patterns...\n');

async function testDomain(domain) {
  return new Promise((resolve) => {
    const options = {
      hostname: domain,
      port: 443,
      path: '/',
      method: 'HEAD',
      timeout: 5000
    };

    const req = https.request(options, (res) => {
      console.log(`✅ https://${domain} - HTTP ${res.statusCode}`);
      if (res.statusCode === 200 || res.statusCode === 401) {
        console.log(`   🎯 This looks like your active deployment!`);
      }
      resolve({ domain, status: res.statusCode, active: res.statusCode === 200 || res.statusCode === 401 });
    });

    req.on('error', (err) => {
      console.log(`❌ https://${domain} - ${err.message}`);
      resolve({ domain, status: 'error', active: false });
    });

    req.on('timeout', () => {
      console.log(`⏰ https://${domain} - Timeout`);
      req.destroy();
      resolve({ domain, status: 'timeout', active: false });
    });

    req.end();
  });
}

async function findActiveDomain() {
  const results = [];
  
  for (const domain of possibleDomains) {
    const result = await testDomain(domain);
    results.push(result);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between requests
  }

  const activeDomains = results.filter(r => r.active);
  
  console.log('\n📊 Results Summary:');
  console.log('==================');
  
  if (activeDomains.length > 0) {
    console.log('🎉 Found active deployment(s):');
    activeDomains.forEach(domain => {
      console.log(`   ✅ https://${domain.domain}`);
    });
    
    const primaryDomain = activeDomains[0].domain;
    
    console.log('\n🔧 Google Cloud Console Configuration:');
    console.log('=====================================');
    console.log('Update your OAuth 2.0 Client ID with these settings:\n');
    
    console.log('📍 Authorized JavaScript Origins:');
    console.log(`   https://${primaryDomain}`);
    console.log('   http://localhost:3001');
    
    console.log('\n📍 Authorized Redirect URIs:');
    console.log(`   https://${primaryDomain}/api/auth/callback/google`);
    console.log('   http://localhost:3001/api/auth/callback/google');
    
    console.log('\n🔧 Environment Variables:');
    console.log('=========================');
    console.log('Update your Vercel environment variables:');
    console.log(`NEXTAUTH_URL=https://${primaryDomain}`);
    
    console.log('\n📝 Quick Test Commands:');
    console.log('======================');
    console.log(`curl -s https://${primaryDomain}/api/auth/providers`);
    console.log(`curl -s https://${primaryDomain}/api/auth/csrf`);
    
  } else {
    console.log('❌ No active deployments found');
    console.log('\n💡 Suggestions:');
    console.log('1. Deploy your project to Vercel first');
    console.log('2. Check if your project has a different name');
    console.log('3. Use Vercel CLI: vercel ls');
  }
  
  console.log('\n🚀 Next Steps:');
  console.log('==============');
  console.log('1. Copy the URLs above to your Google Cloud Console');
  console.log('2. Update your Vercel environment variables');
  console.log('3. Test the OAuth flow');
  console.log('4. If still not working, check browser console for errors');
}

findActiveDomain().catch(console.error);