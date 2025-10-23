import Link from "next/link";

import { cn } from "@/lib/utils";

import { buttonVariants } from "../../ui/button";

interface ActionButton {
  href: string;
  label: string;
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "ghost"
    | "destructive"
    | "outline";
}

interface StatusActionsProps {
  primaryAction?: ActionButton;
  secondaryAction?: ActionButton;
  className?: string;
}

export const StatusActions = ({
  primaryAction,
  secondaryAction,
  className,
}: StatusActionsProps) => {
  if (!primaryAction && !secondaryAction) return null;

  return (
    <div className={cn("flex gap-2 max-xs:flex-col", className)}>
      {primaryAction && (
        <Link
          href={primaryAction.href}
          className={buttonVariants({
            variant: primaryAction.variant || "primary",
            size: "sm",
            className: "w-fit max-xs:w-full",
          })}
        >
          {primaryAction.label}
        </Link>
      )}
      {secondaryAction && (
        <Link
          href={secondaryAction.href}
          className={buttonVariants({
            variant: secondaryAction.variant || "ghost",
            size: "sm",
            className: "w-fit max-xs:w-full",
          })}
        >
          {secondaryAction.label}
        </Link>
      )}
    </div>
  );
};
