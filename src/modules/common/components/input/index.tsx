import { Label } from "@design/ui/src"
import React, { useEffect, useImperativeHandle, useState } from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string,
  placeholder?: string
  topLabel: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, placeholder, label, touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="text-base leading-relaxed text-stone-500">{topLabel}*</Label>
        )}
        <div className="flex overflow-hidden justify-between items-center px-4 py-[8px] mt-1.5 w-full bg-white rounded border border-solid border-zinc-400">
          <input
            type={inputType}
            name={name}
            placeholder={placeholder}
            required={required}
            className="w-full outline-none"
            {...props}
            ref={inputRef}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="focus:outline-none"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input
