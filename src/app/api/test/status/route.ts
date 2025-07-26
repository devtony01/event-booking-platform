import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const resultsPath = path.join(process.cwd(), 'test-results.json')
    
    if (fs.existsSync(resultsPath)) {
      const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'))
      
      // Generate badge URL
      const passRate = results.passRate || 0
      const color = passRate >= 80 ? 'brightgreen' : passRate >= 60 ? 'yellow' : 'red'
      const badgeUrl = `https://img.shields.io/badge/tests-${results.passing}%2F${results.total}%20(${passRate}%25)-${color}`
      
      return NextResponse.json({
        success: true,
        data: {
          ...results,
          badgeUrl,
          status: passRate >= 80 ? 'passing' : passRate >= 60 ? 'warning' : 'failing',
          lastUpdated: results.timestamp
        }
      })
    } else {
      return NextResponse.json({
        success: false,
        error: 'No test results found',
        data: {
          passing: 0,
          failing: 0,
          total: 0,
          passRate: 0,
          status: 'unknown',
          badgeUrl: 'https://img.shields.io/badge/tests-unknown-lightgrey'
        }
      }, { status: 404 })
    }
  } catch (error) {
    console.error('Error reading test status:', error)
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to read test status',
        data: {
          passing: 0,
          failing: 0,
          total: 0,
          passRate: 0,
          status: 'error',
          badgeUrl: 'https://img.shields.io/badge/tests-error-red'
        }
      },
      { status: 500 }
    )
  }
}