import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {invalid?: boolean}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, invalid = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground autofill:shadow-[inset_0_0_0px_1000px_white] dark:autofill:shadow-[inset_0_0_0px_1000px_#030712] focus-visible:outline-none focus-visible:ring-1  disabled:cursor-not-allowed disabled:opacity-50 disabled:border-gray-400 disabled:bg-gray-200 ${invalid ? 'border-red-500 focus-visible:ring-red-500' : 'border-input focus-visible:ring-ring'}`,
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
