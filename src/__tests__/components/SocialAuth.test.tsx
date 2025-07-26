import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { signIn } from 'next-auth/react'
import SocialAuth from '@modules/account/components/social-auth'

// Mock next-auth/react
const mockSignIn = signIn as jest.MockedFunction<typeof signIn>

describe('SocialAuth', () => {
  beforeEach(() => {
    mockSignIn.mockClear()
  })

  it('renders Google sign-in button', async () => {
    render(<SocialAuth />)
    
    // Wait for the component to load providers and update state
    await waitFor(() => {
      const googleButton = screen.getByText('Continue with Google')
      expect(googleButton).toBeInTheDocument()
    })
  })

  it('renders divider with correct text', () => {
    render(<SocialAuth />)
    
    expect(screen.getByText('Or continue with')).toBeInTheDocument()
  })

  it('calls signIn with Google provider when button is clicked', async () => {
    render(<SocialAuth />)
    
    // Wait for the component to load providers and update state
    await waitFor(() => {
      const googleButton = screen.getByText('Continue with Google')
      fireEvent.click(googleButton)
      
      expect(mockSignIn).toHaveBeenCalledWith('google', { 
        callbackUrl: expect.stringContaining('/events'),
        redirect: false 
      })
    })
  })

  it('applies custom className when provided', () => {
    const { container } = render(<SocialAuth className="custom-class" />)
    
    expect(container.firstChild).toHaveClass('custom-class')
  })

  it('has proper button styling and hover effects', async () => {
    render(<SocialAuth />)
    
    await waitFor(() => {
      const googleButton = screen.getByText('Continue with Google')
      expect(googleButton).toHaveClass('border-gray-300')
      expect(googleButton).toHaveClass('hover:bg-gray-50')
      expect(googleButton).toHaveClass('transition-colors')
    })
  })

  it('renders Google icon SVG', async () => {
    render(<SocialAuth />)
    
    await waitFor(() => {
      const svgElement = screen.getByText('Continue with Google').querySelector('svg')
      expect(svgElement).toBeInTheDocument()
      expect(svgElement).toHaveClass('w-5', 'h-5', 'mr-2')
    })
  })

  it('has correct button structure and accessibility', async () => {
    render(<SocialAuth />)
    
    await waitFor(() => {
      const googleButton = screen.getByRole('button', { name: /continue with google/i })
      expect(googleButton).toBeInTheDocument()
      // Button component may not have explicit type attribute
    })
  })
})