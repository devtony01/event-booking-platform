#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m'
};

class TestRunner {
  constructor() {
    this.results = {
      passing: [],
      failing: [],
      total: 0,
      startTime: Date.now()
    };
  }

  log(message, color = 'white') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  async runCurlTest(name, url, options = {}) {
    return new Promise((resolve) => {
      const method = options.method || 'GET';
      const headers = options.headers || {};
      const data = options.data;
      
      let curlArgs = ['-s', '-w', '\\n%{http_code}'];
      
      if (method !== 'GET') {
        curlArgs.push('-X', method);
      }
      
      Object.entries(headers).forEach(([key, value]) => {
        curlArgs.push('-H', `${key}: ${value}`);
      });
      
      if (data) {
        curlArgs.push('-d', JSON.stringify(data));
      }
      
      curlArgs.push(url);
      
      const curl = spawn('curl', curlArgs);
      let output = '';
      let error = '';
      
      curl.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      curl.stderr.on('data', (data) => {
        error += data.toString();
      });
      
      curl.on('close', (code) => {
        const lines = output.trim().split('\n');
        const statusCode = lines[lines.length - 1];
        const body = lines.slice(0, -1).join('\n');
        
        resolve({
          name,
          statusCode: parseInt(statusCode) || 0,
          body,
          error,
          success: code === 0
        });
      });
    });
  }

  async runJestTest() {
    return new Promise((resolve) => {
      const jest = spawn('npm', ['test', '--', '--json', '--passWithNoTests'], {
        cwd: process.cwd()
      });
      
      let output = '';
      let error = '';
      
      jest.stdout.on('data', (data) => {
        output += data.toString();
      });
      
      jest.stderr.on('data', (data) => {
        error += data.toString();
      });
      
      jest.on('close', (code) => {
        try {
          // Extract JSON from output
          const jsonMatch = output.match(/\{[\s\S]*\}/);
          const result = jsonMatch ? JSON.parse(jsonMatch[0]) : null;
          resolve({ result, error, code });
        } catch (e) {
          resolve({ result: null, error: error + e.message, code });
        }
      });
    });
  }

  displayResults() {
    console.clear();
    this.log('🧪 Dynamic Test Runner - Live Results', 'cyan');
    this.log('=' * 50, 'blue');
    
    const duration = ((Date.now() - this.results.startTime) / 1000).toFixed(2);
    this.log(`⏱️  Test Duration: ${duration}s`, 'yellow');
    this.log(`📊 Total Tests: ${this.results.total}`, 'blue');
    this.log(`✅ Passing: ${this.results.passing.length}`, 'green');
    this.log(`❌ Failing: ${this.results.failing.length}`, 'red');
    this.log('', 'white');
    
    if (this.results.passing.length > 0) {
      this.log('✅ PASSING TESTS:', 'green');
      this.results.passing.forEach(test => {
        this.log(`  ✓ ${test.name} - ${test.details}`, 'green');
      });
      this.log('', 'white');
    }
    
    if (this.results.failing.length > 0) {
      this.log('❌ FAILING TESTS:', 'red');
      this.results.failing.forEach(test => {
        this.log(`  ✗ ${test.name} - ${test.details}`, 'red');
        if (test.error) {
          this.log(`    Error: ${test.error}`, 'yellow');
        }
      });
      this.log('', 'white');
    }
  }

  addResult(test, passed, details, error = null) {
    this.results.total++;
    if (passed) {
      this.results.passing.push({ name: test, details, error });
    } else {
      this.results.failing.push({ name: test, details, error });
    }
    this.displayResults();
  }

  async runAllTests() {
    const baseUrl = process.argv[2] || 'http://localhost:3001';
    
    this.log(`🚀 Starting tests against: ${baseUrl}`, 'cyan');
    this.log('', 'white');
    
    // Test 1: Homepage
    const homepage = await this.runCurlTest('Homepage', baseUrl);
    this.addResult(
      'Homepage Load',
      homepage.statusCode === 200,
      `Status: ${homepage.statusCode}`,
      homepage.error
    );
    
    // Test 2: Events API
    const events = await this.runCurlTest('Events API', `${baseUrl}/api/events`);
    this.addResult(
      'Events API',
      events.statusCode === 200,
      `Status: ${events.statusCode}`,
      events.error
    );
    
    // Test 3: Specific Event
    const event1 = await this.runCurlTest('Event Detail', `${baseUrl}/api/events/1`);
    this.addResult(
      'Event Detail API',
      event1.statusCode === 200,
      `Status: ${event1.statusCode}`,
      event1.error
    );
    
    // Test 4: Non-existent Event (should fail)
    const event999 = await this.runCurlTest('Non-existent Event', `${baseUrl}/api/events/999`);
    this.addResult(
      'Non-existent Event (404)',
      event999.statusCode === 404,
      `Status: ${event999.statusCode} (Expected: 404)`,
      event999.error
    );
    
    // Test 5: OAuth Providers
    const providers = await this.runCurlTest('OAuth Providers', `${baseUrl}/api/auth/providers`);
    this.addResult(
      'OAuth Providers',
      providers.statusCode === 200,
      `Status: ${providers.statusCode}`,
      providers.error
    );
    
    // Test 6: CSRF Token
    const csrf = await this.runCurlTest('CSRF Token', `${baseUrl}/api/auth/csrf`);
    this.addResult(
      'CSRF Token',
      csrf.statusCode === 200,
      `Status: ${csrf.statusCode}`,
      csrf.error
    );
    
    // Test 7: User Registration
    const registration = await this.runCurlTest('User Registration', `${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
        password: 'testpassword123'
      }
    });
    this.addResult(
      'User Registration',
      registration.statusCode === 200,
      `Status: ${registration.statusCode}`,
      registration.error
    );
    
    // Test 8: Invalid Registration (should fail)
    const invalidReg = await this.runCurlTest('Invalid Registration', `${baseUrl}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: {
        name: '',
        email: 'invalid-email',
        password: '123'
      }
    });
    this.addResult(
      'Invalid Registration (400)',
      invalidReg.statusCode === 400,
      `Status: ${invalidReg.statusCode} (Expected: 400)`,
      invalidReg.error
    );
    
    // Test 9: Google OAuth Signin URL
    const googleAuth = await this.runCurlTest('Google OAuth Signin', `${baseUrl}/api/auth/signin/google`);
    this.addResult(
      'Google OAuth Signin',
      googleAuth.statusCode === 200 || googleAuth.statusCode === 302,
      `Status: ${googleAuth.statusCode} (Redirect or HTML)`,
      googleAuth.error
    );
    
    // Test 10: Google OAuth Callback (should redirect)
    const googleCallback = await this.runCurlTest('Google OAuth Callback', `${baseUrl}/api/auth/callback/google`);
    this.addResult(
      'Google OAuth Callback',
      googleCallback.statusCode === 302 || googleCallback.statusCode === 400,
      `Status: ${googleCallback.statusCode} (Redirect or Bad Request without params)`,
      googleCallback.error
    );
    
    this.log('', 'white');
    this.log('🔍 Detailed OAuth Analysis:', 'cyan');
    
    // Analyze OAuth responses
    if (providers.body) {
      try {
        const providersData = JSON.parse(providers.body);
        if (providersData.google) {
          this.log('  ✓ Google provider is configured', 'green');
          this.log(`  📋 Google OAuth URL: ${baseUrl}/api/auth/signin/google`, 'blue');
        } else {
          this.log('  ✗ Google provider not found in configuration', 'red');
        }
      } catch (e) {
        this.log('  ⚠️  Could not parse providers response', 'yellow');
      }
    }
    
    // Run Jest tests
    this.log('', 'white');
    this.log('🧪 Running Unit Tests...', 'cyan');
    const jestResult = await this.runJestTest();
    
    if (jestResult.result) {
      const { numPassedTests, numFailedTests, testResults } = jestResult.result;
      this.log(`📊 Jest Results: ${numPassedTests} passed, ${numFailedTests} failed`, 'blue');
      
      if (testResults) {
        testResults.forEach(suite => {
          suite.assertionResults.forEach(test => {
            this.addResult(
              `Unit: ${test.title}`,
              test.status === 'passed',
              `${test.status} - ${suite.name}`,
              test.failureMessages ? test.failureMessages.join(', ') : null
            );
          });
        });
      }
    } else {
      this.addResult(
        'Unit Tests',
        false,
        'Jest execution failed',
        jestResult.error
      );
    }
    
    // Final summary
    this.log('', 'white');
    this.log('🎯 Test Summary:', 'cyan');
    const passRate = ((this.results.passing.length / this.results.total) * 100).toFixed(1);
    this.log(`📈 Pass Rate: ${passRate}%`, passRate > 70 ? 'green' : 'red');
    
    if (this.results.failing.length === 0) {
      this.log('🎉 All tests passed!', 'green');
    } else {
      this.log(`⚠️  ${this.results.failing.length} tests need attention`, 'yellow');
    }
  }
}

// Run the tests
const runner = new TestRunner();
runner.runAllTests().catch(console.error);