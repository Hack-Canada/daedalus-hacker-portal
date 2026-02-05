import { statusLabels } from "@/config/status";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: ApplicationStatus | "coming_soon";
  className?: string;
  customLabel?: string;
}

const badgeStyles = {
  not_applied: "bg-primary/20 text-primary border border-primary/30",
  pending: "bg-primary/20 text-primary border border-primary/30",
  accepted: "bg-green-500/20 text-green-400 border border-green-500/30",
  rejected: "bg-error/20 text-red-400 border border-error/30",
  waitlisted: "bg-warning/20 text-amber-400 border border-warning/30",
  coming_soon: "bg-primary/20 text-primary border border-primary/30",
  cancelled: "bg-error/20 text-red-400 border border-error/30",
};

export const StatusBadge = ({
  status,
  className,
  customLabel,
}: StatusBadgeProps) => {
  return (
    <span
      className={cn(
        "w-fit rounded-md px-2 py-1 text-[10px] font-medium md:text-xs",
        badgeStyles[status],
        className,
      )}
    >
      {customLabel || statusLabels[status]}
    </span>
  );
};
