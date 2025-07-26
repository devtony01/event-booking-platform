"use client"

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react'
import type { EventCardProps } from '@modules/events/types'
import { formatDate, formatTime, formatCurrency, getAvailableSeats, getEventStatus } from '@lib/utils'
import { Button } from '@design/ui/src/components/button'
import { Text } from '@design/ui/src/components/text'
import { cn } from '@lib/utils'

const EventCard = ({ event, onClick, className }: EventCardProps) => {
  const router = useRouter()
  const availableSeats = getAvailableSeats(event)
  const status = getEventStatus(event)
  
  const getStatusBadge = () => {
    switch (status) {
      case 'sold-out':
        return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Sold Out</span>
      case 'starting-soon':
        return <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Starting Soon</span>
      case 'past':
        return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Past Event</span>
      default:
        return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Available</span>
    }
  }

  const handleCardClick = () => {
    if (status === 'sold-out' || status === 'past') return;
    if (onClick) {
      onClick();
    } else {
      router.push(`/events/${event._id}`);
    }
  };

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer",
        status === 'sold-out' || status === 'past' ? 'cursor-not-allowed opacity-75' : '',
        className
      )}
      onClick={handleCardClick}
    >
      <div className="relative h-48">
        <Image
          src={event.imageUrl || '/placeholder-event.jpg'}
          alt={event.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 right-3">
          {getStatusBadge()}
        </div>
        <div className="absolute top-3 left-3">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {event.category}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-2">
          <Text size="base" weight="plus" className="text-gray-900 line-clamp-2">
            {event.title}
          </Text>
        </div>
        
        <div className="mb-3">
          <Text size="small" className="text-gray-600 line-clamp-2">
            {event.description}
          </Text>
        </div>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            <span>{formatDate(event.date)} at {formatTime(event.date)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            <span>{event.city}{event.address ? `, ${event.address}` : ''}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2" />
            <span>{availableSeats} seats available</span>
          </div>
          
          {event.price > 0 && (
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="w-4 h-4 mr-2" />
              <span>{formatCurrency(event.price)}</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <div>
            {event.price === 0 ? (
              <Text size="base" weight="plus" className="text-green-600">
                Free
              </Text>
            ) : (
              <Text size="base" weight="plus" className="text-gray-900">
                {formatCurrency(event.price)}
              </Text>
            )}
          </div>
          
          <Button 
            size="small"
            disabled={status === 'sold-out' || status === 'past'}
            onClick={(e) => {
              e.stopPropagation(); // Prevent card click
              handleCardClick();
            }}
          >
            {status === 'sold-out' ? 'Sold Out' : status === 'past' ? 'Past Event' : 'View Details'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EventCard