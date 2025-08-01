import * as React from "react"
import type { IconProps } from "../types"

const Eye = React.forwardRef<SVGSVGElement, IconProps>(
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
          d="M2.5 10s3.5-6 7.5-6 7.5 6 7.5 6-3.5 6-7.5 6-7.5-6-7.5-6Z"
        />
        <circle
          cx={10}
          cy={10}
          r={2.5}
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
        />
      </svg>
    )
  }
)
Eye.displayName = "Eye"
export default Eye