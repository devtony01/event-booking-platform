"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import Input from "@modules/common/components/input"
import { logUserIn } from "@modules/account/actions"
import ErrorMessage from "@modules/common/components/error-message"
import { SubmitButton } from "@modules/common/components/submit-button"
import { isValidEmail } from "@lib/utils"
import toast from "react-hot-toast"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

interface LoginFormData {
  email: string
  password: string
}

const Login = ({ setCurrentView }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
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
    },
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true)
      setApiError(null)

      const formData = new FormData()
      formData.set('email', data.email)
      formData.set('password', data.password)

      const error = await logUserIn(null, formData)

      if (error) {
        setApiError(error)
        return
      }

      toast.success('Successfully logged in!')
      router.push('/events')
      router.refresh()
    } catch (error) {
      setApiError('An error occurred. Please try again.')
      console.error('Login error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-2.5 items-center w-full text-base leading-relaxed text-neutral-500 max-md:max-w-full">
        <img
          loading="lazy"
          src="svg/caret-left.svg"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-[0.56] w-[5px]"
        />
        <button className="self-stretch my-auto" onClick={() => router.push('/')}>Back to home</button>
      </div>

      <div className="flex flex-col mt-7 max-w-full w-[332px]">
        <h1 className="text-5xl font-bold leading-6 text-neutral-950 max-md:text-4xl max-md:leading-6">
          Login
        </h1>
        <p className="mt-3 text-base leading-relaxed text-neutral-500">
          Enter your details to access your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-11 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-col justify-between gap-y-4">
          <div>
            <Input
              topLabel="Email Address"
              {...register('email', {
                required: 'Email is required',
                validate: (value: string) => isValidEmail(value) || 'Please enter a valid email',
              })}
              type="email"
              autoComplete="email"
            />
            {errors.email && (
              <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <Input
              topLabel="Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
              })}
              type="password"
              autoComplete="current-password"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>
        </div>

        <ErrorMessage error={apiError!} />

        <div className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full">
          <SubmitButton 
            className="overflow-hidden gap-2.5 self-stretch py-3 pr-60 pl-60 w-full text-lg leading-none text-white whitespace-nowrap bg-green-800 max-md:px-5 max-md:max-w-full rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </SubmitButton>

          <span className="mt-8 text-base leading-relaxed text-stone-500 max-md:max-w-full">
            Are you a retiree without an account?{" "}
            <button
              type="button"
              onClick={() => setCurrentView(LOGIN_VIEW.REGISTER)}
              className="text-green-800 underline"
            >
              Register here
            </button>
          </span>
        </div>
      </form>
    </>
  )
}

export default Login
