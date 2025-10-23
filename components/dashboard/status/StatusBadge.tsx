import { statusLabels } from "@/config/status";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ApplicationStatus | "coming_soon";
  className?: string;
  customLabel?: string;
}

const badgeStyles = {
  not_applied: "bg-primaryDark text-white",
  pending: "bg-primaryDark text-white",
  accepted: "bg-green-400 text-black",
  rejected: "bg-error text-white",
  waitlisted: "bg-warning text-black",
  coming_soon: "bg-primaryDark text-white",
  cancelled: "bg-error text-white",
};

export const StatusBadge = ({
  status,
  className,
  customLabel,
}: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "w-fit rounded-sm px-1 py-0.5 text-[10px] font-medium md:text-xs",
        badgeStyles[status],
        className,
      )}
    >
      {customLabel || statusLabels[status]}
    </span>
  );
};
