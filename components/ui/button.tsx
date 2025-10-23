import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-background hover:bg-blue-500 hover:shadow-[0_6px_20px_rgba(0,118,255,0.3)] hover:shadow-primary focus-visible:ring-blue-500",
        primary:
          "px-8 py-2 bg-gradient-to-b from-blue-500 to-blue-600 shadow-sm text-white hover:shadow-xl focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 duration-200",
        destructive:
          "bg-error text-background hover:bg-error/90 hover:shadow-[0_6px_20px_rgba(244,67,54,0.3)] focus-visible:ring-error/70",
        outline:
          "border-2 border-border bg-background text-textPrimary/75 hover:bg-gradient-to-r hover:bg-primaryLight/50 hover:text-primary hover:border-primary focus-visible:ring-primary focus-visible:ring-offset-primaryLight",
        secondary:
          "bg-secondary text-background hover:bg-secondaryDark hover:shadow-lg focus-visible:ring-secondaryDark",
        ghost:
          "text-textSecondary hover:bg-primary/10 hover:text-primary focus-visible:ring-primary",
        link: "text-primary underline-offset-4 hover:underline hover:text-primaryDark focus-visible:ring-primary",
        auth: "rounded-sm bg-gradient-to-r from-[#132C57] to-[#0A1F44] text-white shadow-md hover:shadow-lg hover:tracking-widest hover:shadow-[#0A1F44]/50 focus-visible:ring-[#0A1F44]",
        unstyled: "",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
      loading: {
        true: "cursor-wait opacity-70",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      children,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, loading, className }))}
        ref={ref}
        {...props}
        aria-disabled={props.disabled || loading}
        disabled={props.disabled || loading}
        tabIndex={props.disabled || loading ? -1 : undefined}
      >
        {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
        {children}
      </Comp>
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
