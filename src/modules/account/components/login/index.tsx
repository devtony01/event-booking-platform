"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, ArrowLeft, Calendar } from "lucide-react"
import { Button } from "@design/ui/src/components/button"
import { Text } from "@design/ui/src/components/text"
import { isValidEmail } from "@lib/utils"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import toast from "react-hot-toast"

interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

type Props = {
  setCurrentView?: (view: LOGIN_VIEW) => void
}

const Login = ({ setCurrentView }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true)
      setApiError(null)

      const result = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      })

      if (result?.error) {
        setApiError('Invalid email or password')
        return
      }

      if (result?.ok) {
        toast.success('Successfully logged in!')
        // Force a hard redirect to ensure session is properly loaded
        window.location.href = '/events'
      }
    } catch (error) {
      setApiError('An error occurred. Please try again.')
      console.error('Login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // If used within template, render without full page layout
  if (setCurrentView) {
    return (
      <div className="flex flex-col w-full p-8">
        {/* Back to Home */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4">
            <Calendar className="h-8 w-8 text-white" />
          </div>
          <Text size="xlarge" weight="plus" className="text-gray-900 mb-2">
            Welcome back
          </Text>
          <Text className="text-gray-600">
            Sign in to your EventHub account
          </Text>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                {...register('email', {
                  required: 'Email is required',
                  validate: (value: string) => isValidEmail(value) || 'Please enter a valid email',
                })}
                type="email"
                autoComplete="email"
                className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <Text className="text-red-600 text-sm mt-1">{errors.email.message}</Text>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                className={`w-full pl-11 pr-11 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                  errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <Text className="text-red-600 text-sm mt-1">{errors.password.message}</Text>
            )}
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                {...register('rememberMe')}
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Remember me</span>
            </label>
            <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
              Forgot password?
            </Link>
          </div>

          {/* Error Message */}
          {apiError && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
              <Text className="text-red-700 text-sm">{apiError}</Text>
            </div>
          )}

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full py-3 text-base"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-6">
          <Text className="text-gray-600">
            Don't have an account?{' '}
            <button
              onClick={() => {
                console.log('Switching to register view')
                setCurrentView(LOGIN_VIEW.REGISTER)
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign up for free
            </button>
          </Text>
        </div>
      </div>
    )
  }

  // Standalone page layout
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back to Home */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to home
          </Link>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mx-auto mb-4">
              <Calendar className="h-8 w-8 text-white" />
            </div>
            <Text size="xlarge" weight="plus" className="text-gray-900 mb-2">
              Welcome back
            </Text>
            <Text className="text-gray-600">
              Sign in to your EventHub account
            </Text>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  {...register('email', {
                    required: 'Email is required',
                    validate: (value: string) => isValidEmail(value) || 'Please enter a valid email',
                  })}
                  type="email"
                  autoComplete="email"
                  className={`w-full pl-11 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.email ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <Text className="text-red-600 text-sm mt-1">{errors.email.message}</Text>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  className={`w-full pl-11 pr-11 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                    errors.password ? 'border-red-300 focus:ring-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && (
                <Text className="text-red-600 text-sm mt-1">{errors.password.message}</Text>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  {...register('rememberMe')}
                  type="checkbox"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-700">
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {apiError && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                <Text className="text-red-700 text-sm">{apiError}</Text>
              </div>
            )}

            {/* Submit Button */}
            <Button 
              type="submit" 
              className="w-full py-3 text-base"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          {/* Divider */}
          <div className="my-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Social Login Info */}
          <div className="text-center py-4">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <Text className="text-blue-800 text-sm">
                💡 <strong>Demo Mode:</strong> Social authentication requires OAuth setup.
              </Text>
              <Text className="text-blue-600 text-xs mt-1">
                See SOCIAL_AUTH_SETUP.md for configuration instructions.
              </Text>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center mt-6">
            <Text className="text-gray-600">
              Don't have an account?{' '}
              <Link href="/account" className="text-blue-600 hover:text-blue-700 font-medium">
                Sign up for free
              </Link>
            </Text>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login