import * as React from "react"
import type { IconProps } from "../types"

const EyeOff = React.forwardRef<SVGSVGElement, IconProps>(
  ({ color = "currentColor", ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        ref={ref}
        {...props}
      >
        <path
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 3l14 14M10.5 10.5A2.5 2.5 0 0 1 7.5 7.5m0 0L5.5 5.5m2 2L10 10m0 0l2.5 2.5M10 10V7.5m0 2.5h2.5M17.5 10s-1.5-3-3.5-4.5M2.5 10s1.5 3 3.5 4.5"
        />
      </svg>
    )
  }
)
EyeOff.displayName = "EyeOff"
export default EyeOff