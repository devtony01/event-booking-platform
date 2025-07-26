"use client"

import { useState } from 'react'
import { Search, Filter, X } from 'lucide-react'
import type { EventFiltersProps, EventFilters } from '@modules/events/types'
import { Button } from '@design/ui/src/components/button'
import { Text } from '@design/ui/src/components/text'
import { cn } from '@lib/utils'

interface LocalEventFilters {
  search: string;
  category: string;
  city: string;
  priceRange: 'all' | 'free' | 'paid';
  dateRange: 'all' | 'today' | 'tomorrow' | 'this-week' | 'this-month';
}

const EventFilters = ({ 
  filters, 
  onFiltersChange, 
  categories, 
  cities, 
  loading, 
  className 
}: EventFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [localFilters, setLocalFilters] = useState<LocalEventFilters>({
    search: filters.search || '',
    category: filters.category || 'All Categories',
    city: filters.city || 'All Cities',
    priceRange: 'all',
    dateRange: 'all',
  })

  const handleFilterChange = (key: keyof LocalEventFilters, value: string) => {
    const newLocalFilters = { ...localFilters, [key]: value }
    setLocalFilters(newLocalFilters)
    
    // Convert display values to API values
    const apiFilters: EventFilters = {
      search: newLocalFilters.search,
      category: newLocalFilters.category === 'All Categories' ? undefined : newLocalFilters.category,
      city: newLocalFilters.city === 'All Cities' ? undefined : newLocalFilters.city,
    }
    
    onFiltersChange(apiFilters)
  }

  const clearFilters = () => {
    const defaultFilters: LocalEventFilters = {
      search: '',
      category: 'All Categories',
      city: 'All Cities',
      priceRange: 'all',
      dateRange: 'all',
    }
    setLocalFilters(defaultFilters)
    onFiltersChange({})
  }

  const hasActiveFilters = 
    localFilters.search !== '' ||
    localFilters.category !== 'All Categories' ||
    localFilters.city !== 'All Cities' ||
    localFilters.priceRange !== 'all' ||
    localFilters.dateRange !== 'all'

  return (
    <div className={cn("bg-white rounded-lg shadow-sm border p-4", className)}>
      {/* Search Bar */}
      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search events..."
          value={localFilters.search}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <Text size="small" weight="plus" className="text-gray-700">
          Filters
        </Text>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <Button
              variant="transparent"
              size="small"
              onClick={clearFilters}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-4 h-4 mr-1" />
              Clear
            </Button>
          )}
          <Button
            variant="transparent"
            size="small"
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-700"
          >
            <Filter className="w-4 h-4 mr-1" />
            {isExpanded ? 'Hide' : 'Show'} Filters
          </Button>
        </div>
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Category Filter */}
          <div>
            <Text size="small" weight="plus" className="text-gray-700 mb-2">
              Category
            </Text>
            <select
              value={localFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All Categories">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* City Filter */}
          <div>
            <Text size="small" weight="plus" className="text-gray-700 mb-2">
              City
            </Text>
            <select
              value={localFilters.city}
              onChange={(e) => handleFilterChange('city', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="All Cities">All Cities</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter */}
          <div>
            <Text size="small" weight="plus" className="text-gray-700 mb-2">
              Price
            </Text>
            <select
              value={localFilters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Events</option>
              <option value="free">Free Events</option>
              <option value="paid">Paid Events</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <Text size="small" weight="plus" className="text-gray-700 mb-2">
              Date
            </Text>
            <select
              value={localFilters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
            </select>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex flex-wrap gap-2">
            {localFilters.search && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Search: "{localFilters.search}"
                <button
                  onClick={() => handleFilterChange('search', '')}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {localFilters.category !== 'All Categories' && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {localFilters.category}
                <button
                  onClick={() => handleFilterChange('category', 'All Categories')}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {localFilters.city !== 'All Cities' && (
              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                {localFilters.city}
                <button
                  onClick={() => handleFilterChange('city', 'All Cities')}
                  className="ml-1 hover:text-blue-600"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default EventFilters