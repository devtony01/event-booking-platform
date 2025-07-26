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
  cyan: '\x1b[36m',
};

class TestBadgeGenerator {
  constructor() {
    this.results = {
      passing: 0,
      failing: 0,
      total: 0,
      passRate: 0,
      timestamp: new Date().toISOString(),
    };
  }

  log(message, color = 'reset') {
    console.log(`${colors[color]}${message}${colors.reset}`);
  }

  async runTests() {
    return new Promise((resolve) => {
      const jest = spawn('npm', ['test', '--', '--json', '--passWithNoTests'], {
        cwd: process.cwd(),
        stdio: ['pipe', 'pipe', 'pipe']
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

  generateBadgeUrl(passing, total, passRate) {
    const color = passRate >= 80 ? 'brightgreen' : passRate >= 60 ? 'yellow' : 'red';
    const label = 'tests';
    const message = `${passing}/${total} (${passRate}%)`;
    return `https://img.shields.io/badge/${label}-${encodeURIComponent(message)}-${color}`;
  }

  generateTestSummary(testResult) {
    if (!testResult) {
      return {
        badge: 'https://img.shields.io/badge/tests-error-red',
        summary: '❌ **Test Status**: Error running tests',
        details: 'Could not execute test suite'
      };
    }

    const { numPassedTests, numFailedTests, numTotalTests, testResults } = testResult;
    const passRate = numTotalTests > 0 ? Math.round((numPassedTests / numTotalTests) * 100) : 0;
    
    this.results = {
      passing: numPassedTests,
      failing: numFailedTests,
      total: numTotalTests,
      passRate,
      timestamp: new Date().toISOString(),
    };

    const badge = this.generateBadgeUrl(numPassedTests, numTotalTests, passRate);
    
    const statusIcon = passRate >= 80 ? '✅' : passRate >= 60 ? '⚠️' : '❌';
    const summary = `${statusIcon} **Test Status**: ${numPassedTests}/${numTotalTests} tests passing (${passRate}%)`;
    
    let details = `
### 📊 Test Results Summary

| Metric | Value |
|--------|-------|
| **Total Tests** | ${numTotalTests} |
| **Passing** | ${numPassedTests} ✅ |
| **Failing** | ${numFailedTests} ❌ |
| **Pass Rate** | ${passRate}% |
| **Last Updated** | ${new Date().toLocaleString()} |

`;

    if (testResults && testResults.length > 0) {
      details += `### 📁 Test Suites\n\n`;
      
      testResults.forEach(suite => {
        const suiteName = path.basename(suite.name, '.test.ts').replace('.test.tsx', '');
        const suitePassRate = suite.numPassingTests > 0 ? 
          Math.round((suite.numPassingTests / (suite.numPassingTests + suite.numFailingTests)) * 100) : 0;
        const suiteIcon = suite.numFailingTests === 0 ? '✅' : '❌';
        
        details += `- ${suiteIcon} **${suiteName}**: ${suite.numPassingTests}/${suite.numPassingTests + suite.numFailingTests} (${suitePassRate}%)\n`;
      });
    }

    details += `
### 🧪 Running Tests

\`\`\`bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- EventCard.test.tsx
\`\`\`

### 🔧 Test Configuration

- **Framework**: Jest with React Testing Library
- **Coverage Threshold**: 50% (branches, functions, lines, statements)
- **Test Environment**: jsdom
- **Mocking**: NextAuth, Next.js Router, Next Image

`;

    return { badge, summary, details };
  }

  async updateReadme() {
    const readmePath = path.join(process.cwd(), 'README.md');
    
    if (!fs.existsSync(readmePath)) {
      this.log('README.md not found', 'red');
      return;
    }

    this.log('🧪 Running tests...', 'cyan');
    const { result, error, code } = await this.runTests();
    
    if (result) {
      this.log(`✅ Tests completed: ${result.numPassedTests}/${result.numTotalTests} passing`, 'green');
    } else {
      this.log('❌ Test execution failed', 'red');
      this.log(error, 'yellow');
    }

    const { badge, summary, details } = this.generateTestSummary(result);
    
    let readme = fs.readFileSync(readmePath, 'utf8');
    
    // Add test badge after the title
    const titleMatch = readme.match(/^(# .+)$/m);
    if (titleMatch) {
      const badgeMarkdown = `\n\n![Test Status](${badge})\n`;
      if (!readme.includes('![Test Status]')) {
        readme = readme.replace(titleMatch[0], titleMatch[0] + badgeMarkdown);
      } else {
        readme = readme.replace(/!\[Test Status\]\([^)]+\)/, `![Test Status](${badge})`);
      }
    }

    // Update or add test section
    const testSectionRegex = /## 🧪 Testing[\s\S]*?(?=## |$)/;
    const newTestSection = `## 🧪 Testing

${summary}

${details}`;

    if (testSectionRegex.test(readme)) {
      readme = readme.replace(testSectionRegex, newTestSection);
    } else {
      // Insert before deployment section or at the end
      const deploymentMatch = readme.match(/## 🚀 Deployment/);
      if (deploymentMatch) {
        readme = readme.replace('## 🚀 Deployment', newTestSection + '\n## 🚀 Deployment');
      } else {
        readme += '\n\n' + newTestSection;
      }
    }

    fs.writeFileSync(readmePath, readme);
    this.log('📝 README.md updated with test results', 'green');
    
    // Also save test results to a JSON file for CI/CD
    const resultsPath = path.join(process.cwd(), 'test-results.json');
    fs.writeFileSync(resultsPath, JSON.stringify(this.results, null, 2));
    this.log('💾 Test results saved to test-results.json', 'blue');
  }

  async generateLiveTestPage() {
    const testPageContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Test Results - EventHub</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        .test-passing { @apply text-green-600 bg-green-50 border-green-200; }
        .test-failing { @apply text-red-600 bg-red-50 border-red-200; }
        .test-pending { @apply text-yellow-600 bg-yellow-50 border-yellow-200; }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">🧪 Live Test Results</h1>
                <div class="flex items-center space-x-4 mb-6">
                    <img src="${this.generateBadgeUrl(this.results.passing, this.results.total, this.results.passRate)}" alt="Test Status" class="h-6">
                    <span class="text-sm text-gray-500">Last updated: ${new Date().toLocaleString()}</span>
                    <button onclick="refreshTests()" class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                        🔄 Refresh Tests
                    </button>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div class="text-2xl font-bold text-blue-600">${this.results.total}</div>
                        <div class="text-sm text-blue-600">Total Tests</div>
                    </div>
                    <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div class="text-2xl font-bold text-green-600">${this.results.passing}</div>
                        <div class="text-sm text-green-600">Passing</div>
                    </div>
                    <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div class="text-2xl font-bold text-red-600">${this.results.failing}</div>
                        <div class="text-sm text-red-600">Failing</div>
                    </div>
                    <div class="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <div class="text-2xl font-bold text-purple-600">${this.results.passRate}%</div>
                        <div class="text-sm text-purple-600">Pass Rate</div>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-6">
                <h2 class="text-xl font-semibold mb-4">📊 Test Details</h2>
                <div id="test-results" class="space-y-2">
                    <div class="text-center text-gray-500 py-8">
                        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                        Loading test results...
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        async function refreshTests() {
            const button = document.querySelector('button');
            button.disabled = true;
            button.innerHTML = '⏳ Running Tests...';
            
            try {
                // In a real implementation, this would trigger a test run
                // For now, we'll just reload the page after a delay
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            } catch (error) {
                console.error('Error refreshing tests:', error);
                button.disabled = false;
                button.innerHTML = '🔄 Refresh Tests';
            }
        }

        // Auto-refresh every 30 seconds
        setInterval(() => {
            window.location.reload();
        }, 30000);
    </script>
</body>
</html>`;

    const testPagePath = path.join(process.cwd(), 'public', 'test-results.html');
    fs.writeFileSync(testPagePath, testPageContent);
    this.log('📄 Live test page generated at public/test-results.html', 'cyan');
  }
}

// Run the generator
async function main() {
  const generator = new TestBadgeGenerator();
  
  try {
    await generator.updateReadme();
    await generator.generateLiveTestPage();
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Test badge and documentation updated successfully!');
    console.log('📊 View live results at: http://localhost:3001/test-results.html');
    console.log('='.repeat(50));
  } catch (error) {
    console.error('❌ Error generating test badge:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = TestBadgeGenerator;