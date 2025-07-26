import { NextRequest, NextResponse } from 'next/server'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'

export async function POST(request: NextRequest) {
  try {
    // Run tests and capture results
    const testResults = await runTests()
    
    // Save results to JSON file
    const resultsPath = path.join(process.cwd(), 'test-results.json')
    fs.writeFileSync(resultsPath, JSON.stringify(testResults, null, 2))
    
    return NextResponse.json({
      success: true,
      data: testResults,
      message: 'Tests completed successfully'
    })
  } catch (error) {
    console.error('Error running tests:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to run tests',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    // Return cached test results
    const resultsPath = path.join(process.cwd(), 'test-results.json')
    
    if (fs.existsSync(resultsPath)) {
      const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'))
      return NextResponse.json({
        success: true,
        data: results,
        cached: true
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'No test results found',
        message: 'Run tests first to generate results'
      }, { status: 404 })
    }
  } catch (error) {
    console.error('Error reading test results:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to read test results',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

async function runTests(): Promise<any> {
  return new Promise((resolve, reject) => {
    const jest = spawn('npm', ['test', '--', '--json', '--passWithNoTests'], {
      cwd: process.cwd(),
      stdio: ['pipe', 'pipe', 'pipe']
    })
    
    let output = ''
    let error = ''
    
    jest.stdout.on('data', (data) => {
      output += data.toString()
    })
    
    jest.stderr.on('data', (data) => {
      error += data.toString()
    })
    
    jest.on('close', (code) => {
      try {
        // Extract JSON from output
        const jsonMatch = output.match(/\{[\s\S]*\}/)
        const result = jsonMatch ? JSON.parse(jsonMatch[0]) : null
        
        if (result) {
          const { numPassedTests, numFailedTests, numTotalTests, testResults } = result
          const passRate = numTotalTests > 0 ? Math.round((numPassedTests / numTotalTests) * 100) : 0
          
          const processedResults = {
            passing: numPassedTests,
            failing: numFailedTests,
            total: numTotalTests,
            passRate,
            timestamp: new Date().toISOString(),
            suites: testResults?.map((suite: any) => ({
              name: path.basename(suite.name, '.test.ts').replace('.test.tsx', ''),
              passing: suite.numPassingTests,
              failing: suite.numFailingTests,
              total: suite.numPassingTests + suite.numFailingTests,
              status: suite.numFailingTests === 0 ? 'passing' : 'failing'
            })) || []
          }
          
          resolve(processedResults)
        } else {
          reject(new Error('Failed to parse test results: ' + error))
        }
      } catch (e) {
        reject(new Error('Failed to process test results: ' + (e instanceof Error ? e.message : 'Unknown error')))
      }
    })
    
    jest.on('error', (err) => {
      reject(new Error('Failed to start test process: ' + err.message))
    })
  })
}