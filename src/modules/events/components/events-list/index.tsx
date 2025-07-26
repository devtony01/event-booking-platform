"use client"

import { Loader2 } from 'lucide-react'
import EventCard from '@modules/events/components/event-card'
import type { EventsListProps } from '@modules/events/types'
import { Button } from '@design/ui/src/components/button'
import { Text } from '@design/ui/src/components/text'
import { cn } from '@lib/utils'

const EventsList = ({ 
  events, 
  loading = false, 
  error = null, 
  pagination, 
  onPageChange, 
  onEventClick, 
  className 
}: EventsListProps) => {
  const handleEventClick = (eventId: string) => {
    if (onEventClick) {
      onEventClick(eventId)
    }
  }

  const handlePageChange = (page: number) => {
    if (onPageChange) {
      onPageChange(page)
    }
  }

  const hasMorePages = pagination ? pagination.page < pagination.totalPages : false

  return (
    <div className={cn("space-y-6", className)}>
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <Text className="text-gray-600">
          {loading ? (
            "Searching events..."
          ) : (
            `Showing ${events.length} of ${pagination?.total || 0} events`
          )}
        </Text>
      </div>

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <Text className="text-red-700">
            Error: {error}
          </Text>
          <Button
            variant="transparent"
            size="small"
            onClick={() => window.location.reload()}
            className="mt-2 text-red-600 hover:text-red-700"
          >
            Try Again
          </Button>
        </div>
      )}

      {/* Events Grid */}
      {events.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => (
              <EventCard 
                key={event._id} 
                event={event} 
                onClick={() => handleEventClick(event._id)}
              />
            ))}
          </div>

          {/* Load More Button */}
          {hasMorePages && (
            <div className="flex justify-center">
              <Button
                variant="secondary"
                onClick={() => handlePageChange((pagination?.page || 1) + 1)}
                disabled={loading}
                className="min-w-[120px]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More Events'
                )}
              </Button>
            </div>
          )}
        </>
      ) : (
        // Empty State
        <div className="text-center py-12">
          {loading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="w-8 h-8 animate-spin text-gray-400 mb-4" />
              <Text className="text-gray-600">
                Loading events...
              </Text>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">🎪</span>
              </div>
              <Text size="large" weight="plus" className="text-gray-900 mb-2">
                No events found
              </Text>
              <Text className="text-gray-600 mb-4">
                Try adjusting your search criteria or check back later for new events.
              </Text>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default EventsList