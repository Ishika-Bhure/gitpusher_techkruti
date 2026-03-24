import * as React from "react"
import { cva } from "class-variance-authority";
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-xl border border-transparent bg-clip-padding text-[15px] font-semibold whitespace-nowrap transition-all outline-none select-none shadow-sm hover:shadow-md focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:translate-y-px active:shadow-sm disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white shadow-blue-600/30 hover:bg-blue-700 [a]:hover:bg-blue-700/80",
        outline:
          "border-slate-200 bg-white hover:bg-slate-50 hover:text-blue-700 aria-expanded:bg-slate-50 aria-expanded:text-slate-900 dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-none aria-expanded:bg-blue-200 aria-expanded:text-blue-800",
        ghost:
          "shadow-none hover:bg-slate-100 hover:text-slate-900 aria-expanded:bg-slate-100 aria-expanded:text-slate-900 dark:hover:bg-slate-800/50",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:border-red-400 focus-visible:ring-red-200 shadow-red-600/30 dark:bg-red-800 dark:hover:bg-red-900 dark:focus-visible:ring-red-400",
        link: "text-blue-600 underline-offset-4 hover:underline shadow-none",
      },
      size: {
        default:
          "h-11 px-5 py-2.5 has-data-[icon=inline-end]:pr-4 has-data-[icon=inline-start]:pl-4",
        xs: "h-8 rounded-lg px-3 text-xs in-data-[slot=button-group]:rounded-xl has-data-[icon=inline-end]:pr-2.5 has-data-[icon=inline-start]:pl-2.5 [&_svg:not([class*='size-'])]:size-4",
        sm: "h-9 rounded-xl px-4 text-sm in-data-[slot=button-group]:rounded-xl has-data-[icon=inline-end]:pr-3 has-data-[icon=inline-start]:pl-3 [&_svg:not([class*='size-'])]:size-4",
        lg: "h-14 rounded-2xl px-8 text-lg has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6 [&_svg:not([class*='size-'])]:size-6",
        icon: "size-11",
        "icon-xs":
          "size-8 rounded-lg in-data-[slot=button-group]:rounded-xl [&_svg:not([class*='size-'])]:size-4",
        "icon-sm":
          "size-9 rounded-xl in-data-[slot=button-group]:rounded-xl",
        "icon-lg": "size-14 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
