import { render, screen, fireEvent } from '@testing-library/react'
import EventCard from '@modules/events/components/event-card'
import { Event } from '@modules/events/types'

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />
  },
}))

const mockEvent: Event = {
  _id: '1',
  title: 'Test Event',
  description: 'This is a test event description',
  category: 'Technology',
  address: '123 Test Street',
  city: 'Test City',
  date: new Date(Date.now() + 86400000 * 7), // 1 week from now
  availableSeats: 100,
  bookedSeats: 30,
  price: 50,
  organizer: 'test-organizer',
  imageUrl: 'https://example.com/test-image.jpg',
  reviews: [],
  createdAt: new Date(),
}

describe('EventCard', () => {
  it('renders event information correctly', () => {
    render(<EventCard event={mockEvent} />)
    
    expect(screen.getByText('Test Event')).toBeInTheDocument()
    expect(screen.getByText('This is a test event description')).toBeInTheDocument()
    expect(screen.getByText('Technology')).toBeInTheDocument()
    expect(screen.getByText(/Test City/)).toBeInTheDocument()
    expect(screen.getByText('$50.00')).toBeInTheDocument()
  })

  it('displays available seats correctly', () => {
    render(<EventCard event={mockEvent} />)
    
    expect(screen.getByText('70 seats available')).toBeInTheDocument()
  })

  it('shows "Available" status for future events with seats', () => {
    render(<EventCard event={mockEvent} />)
    
    expect(screen.getByText('Available')).toBeInTheDocument()
  })

  it('shows "Sold Out" status when no seats available', () => {
    const soldOutEvent = {
      ...mockEvent,
      bookedSeats: 100, // Same as availableSeats
    }
    
    render(<EventCard event={soldOutEvent} />)
    
    expect(screen.getByText('Sold Out')).toBeInTheDocument()
  })

  it('shows "Past Event" status for past events', () => {
    const pastEvent = {
      ...mockEvent,
      date: new Date(Date.now() - 86400000), // Yesterday
    }
    
    render(<EventCard event={pastEvent} />)
    
    expect(screen.getByText('Past Event')).toBeInTheDocument()
  })

  it('displays "Free" for events with zero price', () => {
    const freeEvent = {
      ...mockEvent,
      price: 0,
    }
    
    render(<EventCard event={freeEvent} />)
    
    expect(screen.getByText('Free')).toBeInTheDocument()
  })

  it('calls onClick when card is clicked', () => {
    const mockOnClick = jest.fn()
    render(<EventCard event={mockEvent} onClick={mockOnClick} />)
    
    const card = screen.getByText('Test Event').closest('div')
    fireEvent.click(card!)
    
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('disables interaction for sold out events', () => {
    const soldOutEvent = {
      ...mockEvent,
      bookedSeats: 100,
    }
    
    render(<EventCard event={soldOutEvent} />)
    
    const button = screen.getByText('Sold Out')
    expect(button).toBeDisabled()
  })

  it('disables interaction for past events', () => {
    const pastEvent = {
      ...mockEvent,
      date: new Date(Date.now() - 86400000),
    }
    
    render(<EventCard event={pastEvent} />)
    
    const button = screen.getByText('Past Event')
    expect(button).toBeDisabled()
  })

  it('renders event image with correct alt text', () => {
    render(<EventCard event={mockEvent} />)
    
    const image = screen.getByAltText('Test Event')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', mockEvent.imageUrl)
  })

  it('applies custom className when provided', () => {
    const { container } = render(
      <EventCard event={mockEvent} className="custom-class" />
    )
    
    expect(container.firstChild).toHaveClass('custom-class')
  })
})