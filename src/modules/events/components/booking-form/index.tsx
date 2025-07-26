"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Minus, Plus, ShoppingCart, Loader2 } from 'lucide-react'
import { BookingFormProps, BookingFormData } from '@modules/events/types'
import { formatCurrency, getAvailableSeats } from '@lib/utils'
import { Button } from '@design/ui/src/components/button'
import { Text } from '@design/ui/src/components/text'
import { cn } from '@lib/utils'
import toast from 'react-hot-toast'

const BookingForm = ({ event, disabled = false, status, className }: BookingFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const availableSeats = getAvailableSeats(event)
  
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      numberOfTickets: 1,
      totalAmount: event.price,
      customerName: '',
      customerEmail: '',
    },
  })

  const numberOfTickets = watch('numberOfTickets')
  const totalAmount = numberOfTickets * event.price

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(1, Math.min(availableSeats, numberOfTickets + change))
    setValue('numberOfTickets', newQuantity)
    setValue('totalAmount', newQuantity * event.price)
  }

  const onSubmit = async (data: BookingFormData) => {
    try {
      setIsSubmitting(true)
      
      // Create booking via API
      const response = await fetch(`/api/bookings/${event._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          eventId: event._id,
          numberOfTickets: data.numberOfTickets,
          totalAmount: totalAmount,
        }),
      })
      
      const result = await response.json()
      
      if (!response.ok) {
        toast.error(result.error || 'Failed to book tickets')
        return
      }
      
      toast.success(`Successfully booked ${data.numberOfTickets} ticket${data.numberOfTickets > 1 ? 's' : ''} for ${event.title}!`)
      
      // Reset form
      setValue('numberOfTickets', 1)
      setValue('totalAmount', event.price)
      
    } catch (error) {
      toast.error('Failed to book tickets. Please try again.')
      console.error('Booking error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const getStatusMessage = () => {
    switch (status) {
      case 'sold-out':
        return {
          message: 'This event is sold out',
          className: 'text-red-600',
        }
      case 'past':
        return {
          message: 'This event has already ended',
          className: 'text-gray-600',
        }
      case 'starting-soon':
        return {
          message: 'Event starting soon - limited availability',
          className: 'text-orange-600',
        }
      default:
        return {
          message: `${availableSeats} seats available`,
          className: 'text-green-600',
        }
    }
  }

  const statusInfo = getStatusMessage()

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border p-6", className)}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <Text className="text-gray-900">
            Book Tickets
          </Text>
          <div className="text-right">
            {event.price === 0 ? (
              <Text className="text-green-600">
                Free
              </Text>
            ) : (
              <Text className="text-gray-900">
                {formatCurrency(event.price)}
              </Text>
            )}
            <Text className="text-gray-500">
              per ticket
            </Text>
          </div>
        </div>
        
        <Text className={statusInfo.className}>
          {statusInfo.message}
        </Text>
      </div>

      {!disabled ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Quantity Selector */}
          <div>
            <Text className="text-gray-700 mb-2">
              Number of tickets
            </Text>
            <div className="flex items-center justify-between border rounded-lg p-2">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                disabled={numberOfTickets <= 1}
                className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Minus className="w-4 h-4" />
              </button>
              
              <div className="flex-1 text-center">
                <input
                  {...register('numberOfTickets', {
                    min: { value: 1, message: 'Minimum 1 ticket required' },
                    max: { value: availableSeats, message: `Maximum ${availableSeats} tickets available` },
                  })}
                  type="number"
                  min="1"
                  max={availableSeats}
                  className="w-16 text-center border-0 focus:outline-none"
                  onChange={(e) => {
                    const value = parseInt(e.target.value) || 1
                    setValue('numberOfTickets', value)
                    setValue('totalAmount', value * event.price)
                  }}
                />
              </div>
              
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                disabled={numberOfTickets >= availableSeats}
                className="p-2 hover:bg-gray-100 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            {errors.numberOfTickets && (
              <Text className="text-red-600 mt-1">
                {errors.numberOfTickets.message}
              </Text>
            )}
          </div>

          {/* Price Summary */}
          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">
                {numberOfTickets} × {formatCurrency(event.price)}
              </span>
              <span className="text-gray-900">
                {formatCurrency(totalAmount)}
              </span>
            </div>
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">
                {formatCurrency(totalAmount)}
              </span>
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || availableSeats === 0}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4 mr-2" />
                {event.price === 0 ? 'Reserve Tickets' : 'Book Now'}
              </>
            )}
          </Button>

          {/* Additional Info */}
          <div className="text-center">
            <Text className="text-gray-500">
              {event.price === 0 
                ? 'Free registration required' 
                : 'Secure payment processing'
              }
            </Text>
          </div>
        </form>
      ) : (
        <div className="text-center py-6">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShoppingCart className="w-6 h-6 text-gray-400" />
          </div>
          <Text className="text-gray-600 mb-2">
            {status === 'sold-out' 
              ? 'Tickets no longer available'
              : 'This event has ended'
            }
          </Text>
          <Text className="text-gray-500">
            Check out other upcoming events
          </Text>
        </div>
      )}
    </div>
  )
}

export default BookingForm
