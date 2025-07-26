import { Calendar, Ticket, User, Settings } from "lucide-react"
import { Button } from "@design/ui/src/components/button"
import { Text } from "@design/ui/src/components/text"
import Link from "next/link"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Text size="xlarge" weight="plus" className="text-gray-900 mb-2">
            Welcome back!
          </Text>
          <Text className="text-gray-600">
            Manage your events and bookings from your dashboard.
          </Text>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg">
                <Ticket className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <Text size="large" weight="plus" className="text-gray-900">
                  5
                </Text>
                <Text className="text-gray-600">Active Bookings</Text>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-lg">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <Text size="large" weight="plus" className="text-gray-900">
                  12
                </Text>
                <Text className="text-gray-600">Events Attended</Text>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <Text size="large" weight="plus" className="text-gray-900">
                  Gold
                </Text>
                <Text className="text-gray-600">Member Status</Text>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Bookings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <Text size="large" weight="plus" className="text-gray-900">
                Recent Bookings
              </Text>
              <Button variant="transparent" size="small" asChild>
                <Link href="/account/bookings">View All</Link>
              </Button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Text weight="plus" className="text-gray-900">
                    Tech Conference 2024
                  </Text>
                  <Text className="text-gray-600">March 15, 2024</Text>
                </div>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Confirmed
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Text weight="plus" className="text-gray-900">
                    Summer Music Festival
                  </Text>
                  <Text className="text-gray-600">June 20, 2024</Text>
                </div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                  Upcoming
                </span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <Text size="large" weight="plus" className="text-gray-900 mb-6">
              Quick Actions
            </Text>
            
            <div className="space-y-4">
              <Button className="w-full justify-start" asChild>
                <Link href="/events">
                  <Calendar className="h-4 w-4 mr-3" />
                  Browse Events
                </Link>
              </Button>
              
              <Button variant="transparent" className="w-full justify-start" asChild>
                <Link href="/account/bookings">
                  <Ticket className="h-4 w-4 mr-3" />
                  My Bookings
                </Link>
              </Button>
              
              <Button variant="transparent" className="w-full justify-start" asChild>
                <Link href="/account/profile">
                  <User className="h-4 w-4 mr-3" />
                  Edit Profile
                </Link>
              </Button>
              
              <Button variant="transparent" className="w-full justify-start" asChild>
                <Link href="/account/settings">
                  <Settings className="h-4 w-4 mr-3" />
                  Settings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}