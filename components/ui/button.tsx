import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap  rounded-lg text-base font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        regular: "bg-regular text-white hover:bg-regular/90",
        info: "bg-info text-white hover:bg-info/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          " border border-primary text-primary hover:text-primary  hover:bg-transparent hover:opacity-95",
        "outline-white":
          " border border-gray-100/20 text-foreground hover:text-foreground  hover:bg-transparent hover:opacity-95",
        "outline-secondary":
          " border border-secondary text-secondary hover:text-secondary  hover:bg-transparent hover:opacity-95",
        "outline-warning":
          " border border-warning text-warning hover:text-warning  hover:bg-transparent hover:opacity-95",
        "outline-info":
          " border border-info text-info hover:text-info  hover:bg-transparent hover:opacity-95",
        "outline-destructive":
          " border border-destructive text-destructive hover:text-destructive  hover:bg-transparent hover:opacity-95",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-background hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline ",
      },
      size: {
        default: " lg:px-7 px-4 py-2 ",
        sm: "  rounded-lg px-2 py-1",
        lg: "  rounded-lg lg:px-10 px-8 py-2 text-xl",
        icon: "h-10 w-10 rounded-full",
        md: "p-[10px]"

      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
