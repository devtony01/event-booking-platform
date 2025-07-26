import { render, screen, fireEvent } from '@testing-library/react'
import { signIn } from 'next-auth/react'
import SocialAuth from '@modules/account/components/social-auth'

// Mock next-auth/react
jest.mock('next-auth/react')
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>

describe('SocialAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders Google sign-in button', () => {
    render(<SocialAuth />)
    
    const googleButton = screen.getByText('Continue with Google')
    expect(googleButton).toBeInTheDocument()
  })

  it('renders divider with correct text', () => {
    render(<SocialAuth />)
    
    expect(screen.getByText('Or continue with')).toBeInTheDocument()
  })

  it('calls signIn with Google provider when button is clicked', () => {
    render(<SocialAuth />)
    
    const googleButton = screen.getByText('Continue with Google')
    fireEvent.click(googleButton)
    
    expect(mockSignIn).toHaveBeenCalledWith('google', { callbackUrl: '/events' })
  })

  it('applies custom className when provided', () => {
    const { container } = render(<SocialAuth className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('has proper button styling and hover effects', () => {
    render(<SocialAuth />)
    
    const googleButton = screen.getByText('Continue with Google')
    expect(googleButton).toHaveClass('border-gray-300')
    expect(googleButton).toHaveClass('hover:bg-gray-50')
    expect(googleButton).toHaveClass('transition-colors')
  })

  it('renders Google icon SVG', () => {
    render(<SocialAuth />)
    
    const svgElement = screen.getByText('Continue with Google').querySelector('svg')
    expect(svgElement).toBeInTheDocument()
    expect(svgElement).toHaveClass('w-5', 'h-5', 'mr-2')
  })

  it('has correct button structure and accessibility', () => {
    render(<SocialAuth />)
    
    const googleButton = screen.getByRole('button', { name: /continue with google/i })
    expect(googleButton).toBeInTheDocument()
    expect(googleButton).toHaveAttribute('type', 'button')
  })
})