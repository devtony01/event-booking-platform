"use client"

import React from 'react';
import { useForm, Controller } from "react-hook-form";

import Input from "@modules/common/components/input"
import { LOGIN_VIEW } from "@modules/account/templates/login-template"
import { signUp } from "@modules/account/actions"
import ErrorMessage from "@modules/common/components/error-message"
import { SubmitButton } from "@modules/common/components/submit-button"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

type Props = {
  setCurrentView: (view: LOGIN_VIEW) => void
}

const Register = ({ setCurrentView }: Props) => {
  const { handleSubmit, control, watch, formState: { errors, isSubmitting }, reset } = useForm();

  const onSubmit = async (data: any) => {
    const { rsaPin, surname, email, password, confirmPassword } = data;

    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const formData = new FormData();
      formData.set('username', surname);
      formData.set('email', email);
      formData.set('password', password);
      
      await signUp(formData);
      reset();
      alert('Registration successful!');
    } catch (error) {
      alert('Failed to register: ' + (error as Error).message);
    }
  };

  return (
    <>
      <div className="flex flex-wrap gap-2.5 items-center w-full text-base leading-relaxed text-neutral-500 max-md:max-w-full">
        <img
          loading="lazy"
          src="svg/caret-left.svg"
          alt=""
          className="object-contain shrink-0 self-stretch my-auto aspect-[0.56] w-[5px]"
        />
        <button className="self-stretch my-auto">Back to home</button>
      </div>

      <div className="flex flex-col mt-7 max-w-full w-[332px]">
        <h1 className="text-5xl font-bold leading-6 text-neutral-950 max-md:text-4xl max-md:leading-6">
          Register
        </h1>
        <p className="mt-3 text-base leading-relaxed text-neutral-500">
          Enter your details to start your pension process
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col mt-11 w-full max-md:mt-10 max-md:max-w-full">
        <Controller
          name="rsaPin"
          control={control}
          defaultValue=""
          render={({ field }) => 
            <Input
              topLabel="RSA Pin"
              {...field}
            />
          }
        />
        {errors.rsaPin && <ErrorMessage error={errors.rsaPin?.message as string} />}

        <div className="mt-8">
          <Controller
            name="surname"
            control={control}
            defaultValue=""
            render={({ field }) => 
              <Input
                topLabel="Surname"
                type="text"
                {...field}
              />
            }
          />
          {errors.surname && <ErrorMessage error={errors.surname?.message as string} />}
        </div>

        <div className="mt-8">
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email address' } }}
            render={({ field }) => 
              <Input
                topLabel="Email Address"
                type="email"
                autoComplete="email"
                {...field}
              />
            }
          />
          {errors.email && <ErrorMessage error={errors.email?.message as string} />}
        </div>

        <div className="flex gap-6 justify-between items-end mt-8 w-full max-md:max-w-full">
          <div className="flex flex-col min-w-[240px] w-[259px]">
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'Password is required' }}
              render={({ field }) => 
                <Input
                  topLabel="Password"
                  type="password"
                  {...field}
                />
              }
            />
            {errors.password && <ErrorMessage error={errors.password?.message as string} />}
          </div>
          <div className="flex flex-col min-w-[240px] w-[259px]">
            <Controller
              name="confirmPassword"
              control={control}
              defaultValue=""
              rules={{ required: 'Confirmation is required' }}
              render={({ field }) => 
                <Input
                  topLabel="Confirm Password"
                  type="password"
                  {...field}
                />
              }
            />
            {errors.confirmPassword && <ErrorMessage error={errors.confirmPassword?.message as string} />}
          </div>
        </div>

        <span className="mt-8 text-base leading-relaxed text-stone-500 max-md:max-w-full">
          By creating an account, you agree to our{" "}
          <LocalizedClientLink
            href="/content/privacy-policy"
            className="underline"
          >
            Privacy Policy
          </LocalizedClientLink>{" "}
          and{" "}
          <LocalizedClientLink
            href="/content/terms-of-use"
            className="underline"
          >
            Terms of Use
          </LocalizedClientLink>
          .
        </span>
        <div className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full">
          <SubmitButton type="submit" className="overflow-hidden gap-2.5 self-stretch py-3 pr-60 pl-60 w-full text-lg leading-none text-white whitespace-nowrap bg-green-800 max-md:px-5 max-md:max-w-full rounded" disabled={isSubmitting}>Register</SubmitButton>

          <span className="mt-8 text-base leading-relaxed text-stone-500 max-md:max-w-full">
            Already have an account or are not a retiree?{" "}
            <button
              onClick={() => setCurrentView(LOGIN_VIEW.SIGN_IN)}
              className="text-green-800 underline"
            >
              Login here
            </button>
          </span>
        </div>
      </form>
    </>
  )
}

export default Register
