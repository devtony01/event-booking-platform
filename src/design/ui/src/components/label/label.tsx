"use client"

import * as Primitives from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"
import * as React from "react"

import { clx } from "../../utils/clx"

const labelVariants = cva({
  base: "font-sans",
  variants: {
    size: {
      xsmall: "txt-compact-xsmall",
      small: "txt-compact-small",
      base: "txt-compact-medium",
      large: "txt-compact-large",
    },
    weight: {
      regular: "font-normal",
      plus: "font-medium",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "regular",
  },
})

interface LabelProps
  extends React.ComponentPropsWithoutRef<"label">,
    VariantProps<typeof labelVariants> {
  size?: "xsmall" | "small" | "base" | "large"
  weight?: "regular" | "plus"
}

/**
 * This component is based on the [Radix UI Label](https://www.radix-ui.com/primitives/docs/components/label) primitive.
 */
const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ 
    className, 
    /**
     * The label's size.
     */
    size = "base", 
    /**
     * The label's font weight.
     */
    weight = "regular", 
    ...props
  }: LabelProps, ref) => {
    return (
      <Primitives.Root
        ref={ref}
        className={clx(
          // @ts-ignore - cva type issue
          labelVariants({ size, weight }),
          className
        )}
        {...props}
      />
    )
  }
)
Label.displayName = "Label"

export { Label }
