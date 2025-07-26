import Link from 'next/link';
import { Calendar, Users, Star, ArrowRight } from 'lucide-react';
import { Button, Text } from '@design/ui';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <Text className="text-white mb-6">
              Discover Amazing Events
            </Text>
            <Text className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Find and book tickets for concerts, conferences, workshops, and more. 
              Your next unforgettable experience is just a click away.
            </Text>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="/events">
                  Browse Events
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button className="text-white border-white hover:bg-white/10" asChild>
                <Link href="/account">
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Text className="text-gray-900 mb-4">
              Why Choose EventHub?
            </Text>
            <Text className="text-gray-600 max-w-2xl mx-auto">
              We make discovering and booking events simple, secure, and enjoyable.
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Calendar className="w-8 h-8 text-blue-600" />
              </div>
              <Text className="text-gray-900 mb-3">
                Easy Booking
              </Text>
              <Text className="text-gray-600">
                Book tickets in just a few clicks with our streamlined checkout process.
              </Text>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <Text className="text-gray-900 mb-3">
                Diverse Events
              </Text>
              <Text className="text-gray-600">
                From tech conferences to music festivals, find events that match your interests.
              </Text>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-purple-600" />
              </div>
              <Text className="text-gray-900 mb-3">
                Trusted Platform
              </Text>
              <Text className="text-gray-600">
                Secure payments and reliable customer support for peace of mind.
              </Text>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Text className="text-gray-900 mb-4">
            Ready to Get Started?
          </Text>
          <Text className="text-gray-600 mb-8">
            Join thousands of event-goers who trust EventHub for their booking needs.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/events">
                Explore Events
              </Link>
            </Button>
            <Button asChild>
              <Link href="/account">
                Create Account
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
