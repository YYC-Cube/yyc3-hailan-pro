"use client"

import * as React from "react"
import {
  Root,
  Trigger,
  Close,
  Portal,
  Overlay,
  Content,
  Title,
  Description
} from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"

const Sheet = Root

const SheetTrigger = React.forwardRef<
  React.ElementRef<typeof Trigger>,
  React.ComponentPropsWithoutRef<typeof Trigger>
>(({ className, children, ...props }, ref) => {
  // @ts-ignore - explicitly remove asChild if it exists in props to prevent usage
  const { asChild, ...rest } = props
  return (
    <Trigger className={className} ref={ref} {...rest}>
      {children}
    </Trigger>
  )
})
SheetTrigger.displayName = Trigger.displayName

const SheetClose = React.forwardRef<
  React.ElementRef<typeof Close>,
  React.ComponentPropsWithoutRef<typeof Close>
>(({ className, children, ...props }, ref) => {
  // @ts-ignore
  const { asChild, ...rest } = props
  return (
    <Close
      className={cn(
        "opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary",
        className
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Close>
  )
})
SheetClose.displayName = Close.displayName

const SheetPortal = Portal

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof Overlay>,
  React.ComponentPropsWithoutRef<typeof Overlay>
>(({ className, ...props }, ref) => {
  // @ts-ignore
  const { asChild, ...rest } = props
  return (
    <Overlay
      className={cn(
        "fixed inset-0 z-50 bg-brand-navy/60 backdrop-blur-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        className
      )}
      {...rest}
      ref={ref}
    />
  )
})
SheetOverlay.displayName = Overlay.displayName

const sheetVariants = cva(
  "fixed z-50 gap-4 bg-background p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:duration-500",
  {
    variants: {
      side: {
        top: "inset-x-0 top-0 border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
        bottom:
          "inset-x-0 bottom-0 border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
        left: "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
        right:
          "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
      },
    },
    defaultVariants: {
      side: "right",
    },
  }
)

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof Content>,
    VariantProps<typeof sheetVariants> {}

const SheetContent = React.forwardRef<
  React.ElementRef<typeof Content>,
  SheetContentProps
>(({ side = "right", className, children, ...props }, ref) => {
  // @ts-ignore
  const { asChild, ...rest } = props
  return (
    <SheetPortal>
      <SheetOverlay />
      <Content
        ref={ref}
        className={cn(sheetVariants({ side }), className)}
        {...rest}
      >
        {children}
        <Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-secondary">
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </Close>
      </Content>
    </SheetPortal>
  )
})
SheetContent.displayName = Content.displayName

const SheetHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    )}
    {...props}
  />
)
SheetHeader.displayName = "SheetHeader"

const SheetFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    )}
    {...props}
  />
)
SheetFooter.displayName = "SheetFooter"

const SheetTitle = React.forwardRef<
  React.ElementRef<typeof Title>,
  React.ComponentPropsWithoutRef<typeof Title>
>(({ className, ...props }, ref) => {
  // @ts-ignore
  const { asChild, ...rest } = props
  return (
    <Title
      ref={ref}
      className={cn("text-lg font-semibold text-foreground", className)}
      {...rest}
    />
  )
})
SheetTitle.displayName = Title.displayName

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof Description>,
  React.ComponentPropsWithoutRef<typeof Description>
>(({ className, ...props }, ref) => {
  // @ts-ignore
  const { asChild, ...rest } = props
  return (
    <Description
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...rest}
    />
  )
})
SheetDescription.displayName = Description.displayName

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
