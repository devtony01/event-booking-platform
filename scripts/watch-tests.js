#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const TestBadgeGenerator = require('./generate-test-badge');

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

class TestWatcher {
  constructor() {
    this.generator = new TestBadgeGenerator();
    this.isRunning = false;
  }

  log(message, color = 'reset') {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`${colors[color]}[${timestamp}] ${message}${colors.reset}`);
  }

  async runTestsAndUpdate() {
    if (this.isRunning) {
      this.log('Tests already running, skipping...', 'yellow');
      return;
    }

    this.isRunning = true;
    this.log('🧪 Running tests and updating documentation...', 'cyan');

    try {
      await this.generator.updateReadme();
      await this.generator.generateLiveTestPage();
      this.log('✅ Tests completed and documentation updated', 'green');
    } catch (error) {
      this.log(`❌ Error: ${error.message}`, 'red');
    } finally {
      this.isRunning = false;
    }
  }

  startWatching() {
    this.log('👀 Starting test watcher...', 'cyan');
    this.log('Watching for changes in test files and source code', 'blue');
    this.log('Press Ctrl+C to stop', 'yellow');

    // Watch test files and source files
    const watchPaths = [
      'src/__tests__',
      'src/lib',
      'src/modules',
      'src/components'
    ];

    const watchers = watchPaths.map(watchPath => {
      if (fs.existsSync(watchPath)) {
        return fs.watch(watchPath, { recursive: true }, (eventType, filename) => {
          if (filename && (filename.endsWith('.test.ts') || filename.endsWith('.test.tsx') || 
                          filename.endsWith('.ts') || filename.endsWith('.tsx'))) {
            this.log(`📝 File changed: ${filename}`, 'blue');
            // Debounce: wait 2 seconds before running tests
            clearTimeout(this.debounceTimer);
            this.debounceTimer = setTimeout(() => {
              this.runTestsAndUpdate();
            }, 2000);
          }
        });
      }
      return null;
    }).filter(Boolean);

    // Run initial test
    this.runTestsAndUpdate();

    // Auto-run tests every 5 minutes
    this.intervalTimer = setInterval(() => {
      this.log('⏰ Scheduled test run...', 'yellow');
      this.runTestsAndUpdate();
    }, 5 * 60 * 1000);

    // Cleanup on exit
    process.on('SIGINT', () => {
      this.log('🛑 Stopping test watcher...', 'yellow');
      watchers.forEach(watcher => watcher?.close());
      clearInterval(this.intervalTimer);
      clearTimeout(this.debounceTimer);
      process.exit(0);
    });
  }

  async runOnce() {
    this.log('🚀 Running tests once and updating documentation...', 'cyan');
    await this.runTestsAndUpdate();
    this.log('✨ Done!', 'green');
  }
}

// CLI interface
const command = process.argv[2];
const watcher = new TestWatcher();

switch (command) {
  case 'watch':
    watcher.startWatching();
    break;
  case 'once':
  default:
    watcher.runOnce();
    break;
}