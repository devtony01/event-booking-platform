"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@lib/utils"
import { Button, Text } from "@design/ui"

interface NavbarProps {
  className?: string
}

export const Navbar = ({ className }: NavbarProps) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push("/")
  }

  return (
    <nav className={cn(
      "flex items-center justify-between w-full px-6 py-4 bg-white border-b border-gray-200",
      className
    )}>
      {/* Brand/Logo */}
      <Link href="/" className="flex items-center space-x-2">
        <Text className="text-xl font-bold text-gray-900">
          EventBooking
        </Text>
      </Link>

      {/* Navigation Links */}
      <div className="hidden md:flex items-center space-x-8">
        <Link href="/events" className="text-gray-600 hover:text-gray-900 transition-colors">
          <Text>Events</Text>
        </Link>
        <Link href="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
          <Text>About</Text>
        </Link>
        <Link href="/contact" className="text-gray-600 hover:text-gray-900 transition-colors">
          <Text>Contact</Text>
        </Link>
      </div>

      {/* Auth Section */}
      <div className="flex items-center space-x-4">
        {status === "loading" ? (
          <div className="animate-pulse">
            <div className="h-8 w-16 bg-gray-200 rounded"></div>
          </div>
        ) : session ? (
          <div className="flex items-center space-x-4">
            <Link href="/dashboard">
              <Button> 
                Dashboard
              </Button>
            </Link>
            <div className="flex items-center space-x-2">
              <Text className="text-sm text-gray-600">
                Welcome, {session.user?.name || session.user?.email}
              </Text>
              <Button
                
                
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <Link href="/account">
              <Button  >
                Sign In
              </Button>
            </Link>
            <Link href="/account">
              <Button >
                Sign Up
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button - can be expanded later */}
      <div className="md:hidden">
        <Button  >
          <Text className="text-sm">Menu</Text>
        </Button>
      </div>
    </nav>
  )
}

export default Navbar
